import { Request, Response } from "express";
import prisma from "../../prisma";

export const findAll = async (req: Request, res: Response) => {
  const units = await prisma.unit.findMany();

  return res.json({
    data: units,
  });
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const unit = await prisma.unit.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!unit) {
    return res.json({
      message: `La unidad con id: ${id} no existe`,
    });
  }

  return res.json({
    data: unit,
  });
};

export const onCreate = async (req: Request, res: Response) => {
  const { name, abbreviation } = req.body;

  if (!name || !abbreviation) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  const isUnit = await prisma.unit.findFirst({
    where: {
      OR: [
        {
          name: {
            equals: name,
          },
        },
        {
          AND: {
            abbreviation: {
              equals: abbreviation,
            },
          },
        },
      ],
    },
  });

  if (isUnit) {
    return res.json({
      data: { isUnit },
      message: "Ya existe una unidad con esos datos",
    });
  }

  const newUnit = await prisma.unit.create({
    data: {
      name,
      abbreviation,
    },
    select: {
      name: true,
      abbreviation: true,
    },
  });

  return res.json({
    data: newUnit,
    message: "Unidad agregada correctamente",
  });
};

export const onUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, abbreviation } = req.body;

  const isUnit = await prisma.unit.findFirst({
    where: {
      name,
    },
  });

  if (isUnit) {
    return res.json({
      data: { name },
      message: "Ya existe una unidad con ese nombre",
    });
  }

  const unit = await prisma.unit.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!unit) {
    return res.json({
      message: `La unidad con id: ${id} no existe`,
    });
  }

  const updateUnit = await prisma.unit.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      abbreviation,
    },
  });

  res.json({
    data: updateUnit,
    message: `La unidad fue actualizada correctamente`,
  });
};

export const onDelete = async (req: Request, res: Response) => {
  const { id } = req.params;

  const unit = await prisma.unit.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!unit) {
    return res.json({
      message: `La unidad con id: ${id} no existe`,
    });
  }

  await prisma.unit.delete({
    where: {
      id: parseInt(id),
    },
  });

  return res.json({
    message: `La unidad con el id: ${id} fue eliminada correctamente`,
  });
};

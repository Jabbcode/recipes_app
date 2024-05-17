import { Request, Response } from "express";
import prisma from "../../prisma";

export const findAll = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();

  return res.json({
    data: categories,
  });
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!category) {
    return res.json({
      message: `La categoria con id: ${id} no existe`,
    });
  }

  return res.json({
    data: category,
  });
};

export const onCreate = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "El nombre es obligatatorio",
    });
  }

  const isCategory = await prisma.category.findFirst({
    where: {
      name,
    },
  });

  if (isCategory) {
    return res.json({
      data: { name },
      message: "Ya existe una categoria con ese nombre",
    });
  }

  const newCategory = await prisma.category.create({
    data: {
      name,
    },
    select: {
      name: true,
    },
  });

  return res.json({
    data: newCategory,
    message: "Categoria agregada correctamente",
  });
};

export const onUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const isCategory = await prisma.category.findFirst({
    where: {
      name,
    },
  });

  if (isCategory) {
    return res.json({
      data: { name },
      message: "Ya existe una categoria con ese nombre",
    });
  }

  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!category) {
    return res.json({
      message: `La categoria con id: ${id} no existe`,
    });
  }

  const updateCategory = await prisma.category.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
    },
  });

  res.json({
    data: updateCategory,
    message: `La Categoria fue actualizada correctamente`,
  });
};

export const onDelete = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!category) {
    return res.json({
      message: `La categoria con id: ${id} no existe`,
    });
  }

  await prisma.category.delete({
    where: {
      id: parseInt(id),
    },
  });

  return res.json({
    message: `La Categoria con el id: ${id} fue eliminada correctamente`,
  });
};

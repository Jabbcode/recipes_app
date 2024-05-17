import { Request, Response } from "express";
import prisma from "../../prisma";

export const findAll = async (req: Request, res: Response) => {
  const ingredients = await prisma.ingredient.findMany();

  return res.json({
    data: ingredients,
  });
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const ingredient = await prisma.ingredient.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!ingredient) {
    return res.json({
      message: `El ingrediente con id: ${id} no existe`,
    });
  }

  return res.json({
    data: ingredient,
  });
};

export const onCreate = async (req: Request, res: Response) => {
  const { name } = req.body;
  console.log(req.body);

  if (!name) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  const isIngredient = await prisma.ingredient.findFirst({
    where: {
      name,
    },
  });

  if (isIngredient) {
    return res.status(409).json({
      data: { name },
      message: "Ya existe un ingrediente con ese nombre",
    });
  }

  const newIngredient = await prisma.ingredient.create({
    data: {
      name,
    },
  });

  res.json({
    data: newIngredient,
    message: "Ingrediente agregado correctamente",
  });
};

export const onUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const isIngredient = await prisma.ingredient.findFirst({
    where: {
      name,
    },
  });

  if (isIngredient) {
    return res.json({
      data: { name },
      message: "Ya existe un ingrediente con ese nombre",
    });
  }

  const ingredient = await prisma.ingredient.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!ingredient) {
    return res.json({
      message: `El ingrediente con id: ${id} no existe`,
    });
  }

  const updateIngredient = await prisma.ingredient.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
    },
  });

  res.json({
    data: updateIngredient,
    message: `La unidad fue actualizada correctamente`,
  });
};

export const onDelete = async (req: Request, res: Response) => {
  const { id } = req.params;

  const ingredient = await prisma.ingredient.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!ingredient) {
    return res.json({
      message: `El ingrediente con id: ${id} no existe`,
    });
  }

  await prisma.ingredient.delete({
    where: {
      id: parseInt(id),
    },
  });

  return res.json({
    message: `El ingrediente con el id: ${id} fue eliminado correctamente`,
  });
};

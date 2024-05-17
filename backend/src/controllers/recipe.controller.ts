import { Request, Response } from "express";
import prisma from "../../prisma";
import { Category } from "../../types/category";
import { Ingredient } from "../../types/ingredient";

export const findAll = async (req: Request, res: Response) => {
  const recipes = await prisma.recipe.findMany({
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      ingredients: {
        include: {
          ingredient: true,
          unit: true,
        },
      },
    },
  });

  return res.json({
    data: recipes,
  });
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!recipe) {
    return res.json({
      message: `La receta con id: ${id} no existe`,
    });
  }

  return res.json({
    data: recipe,
  });
};

export const onCreate = async (req: Request, res: Response) => {
  const { name, categories, ingredients } = req.body;

  const newRecipe = await prisma.recipe.create({
    data: {
      name,
      categories: {
        create: [
          ...categories.map((cat: Category) => {
            return {
              category: {
                connect: {
                  id: cat.id,
                },
              },
            };
          }),
        ],
      },
      ingredients: {
        create: [
          ...ingredients.map((ingr: Ingredient) => {
            return {
              ingredient: {
                connect: {
                  id: ingr.id,
                },
              },
              quantity: ingr.quantity,
              unit: {
                connect: {
                  id: ingr.unit.id,
                },
              },
            };
          }),
        ],
      },
    },
    include: {
      categories: true,
      ingredients: true,
    },
  });

  return res.json({
    data: newRecipe,
    message: "Receta agregada correctamente",
  });
};

export const onUpdate = (req: Request, res: Response) => {
  const { id } = req.params;
  const {} = req.body;

  res.json({
    message: `Receta ${id} actualizada correctamente`,
  });
};

export const onDelete = async (req: Request, res: Response) => {
  const { id } = req.params;

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!recipe) {
    return res.json({
      message: `La receta con id: ${id} no existe`,
    });
  }

  await prisma.recipe.delete({
    where: {
      id: parseInt(id),
    },
  });

  return res.json({
    message: `La receta con el id: ${id} fue eliminada correctamente`,
  });
};

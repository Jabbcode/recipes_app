-- DropForeignKey
ALTER TABLE `ingredients_recipes` DROP FOREIGN KEY `Ingredients_Recipes_ingredientId_fkey`;

-- DropForeignKey
ALTER TABLE `ingredients_recipes` DROP FOREIGN KEY `Ingredients_Recipes_recipeId_fkey`;

-- AddForeignKey
ALTER TABLE `Ingredients_Recipes` ADD CONSTRAINT `Ingredients_Recipes_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ingredients_Recipes` ADD CONSTRAINT `Ingredients_Recipes_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

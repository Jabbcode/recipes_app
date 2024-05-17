-- DropForeignKey
ALTER TABLE `categories_recipes` DROP FOREIGN KEY `Categories_Recipes_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `categories_recipes` DROP FOREIGN KEY `Categories_Recipes_recipeId_fkey`;

-- AddForeignKey
ALTER TABLE `Categories_Recipes` ADD CONSTRAINT `Categories_Recipes_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Categories_Recipes` ADD CONSTRAINT `Categories_Recipes_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

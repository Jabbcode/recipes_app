/*
  Warnings:

  - Added the required column `unitId` to the `Ingredients_Recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ingredients_recipes` ADD COLUMN `unitId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Ingredients_Recipes` ADD CONSTRAINT `Ingredients_Recipes_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

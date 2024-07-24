/*
  Warnings:

  - Made the column `salary` on table `job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `job` MODIFY `salary` VARCHAR(191) NOT NULL;

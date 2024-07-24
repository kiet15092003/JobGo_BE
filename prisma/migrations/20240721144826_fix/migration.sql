/*
  Warnings:

  - You are about to alter the column `salary` on the `job` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `job` MODIFY `salary` VARCHAR(191) NULL;

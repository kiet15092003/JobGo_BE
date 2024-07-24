/*
  Warnings:

  - You are about to drop the column `copmpanyId` on the `address` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_copmpanyId_fkey`;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `copmpanyId`;

/*
  Warnings:

  - You are about to drop the column `email` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `company` table. All the data in the column will be lost.
  - Added the required column `websiteURL` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `company` DROP COLUMN `email`,
    DROP COLUMN `phone`,
    ADD COLUMN `websiteURL` VARCHAR(191) NOT NULL;

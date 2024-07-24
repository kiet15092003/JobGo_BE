/*
  Warnings:

  - You are about to drop the column `address` on the `job` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `job` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `job` DROP COLUMN `address`,
    DROP COLUMN `city`,
    DROP COLUMN `country`;

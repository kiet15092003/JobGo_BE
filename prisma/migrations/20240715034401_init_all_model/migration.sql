/*
  Warnings:

  - You are about to drop the column `city` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `experience` table. All the data in the column will be lost.
  - You are about to drop the column `candidateId` on the `experience` table. All the data in the column will be lost.
  - You are about to drop the column `imageURL` on the `job` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `recruiter` table. All the data in the column will be lost.
  - You are about to drop the `branch` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `companyId` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Recruiter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `branch` DROP FOREIGN KEY `Branch_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `experience` DROP FOREIGN KEY `Experience_branchId_fkey`;

-- DropForeignKey
ALTER TABLE `experience` DROP FOREIGN KEY `Experience_candidateId_fkey`;

-- DropForeignKey
ALTER TABLE `recruiter` DROP FOREIGN KEY `Recruiter_branchId_fkey`;

-- AlterTable
ALTER TABLE `application` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `candidate` DROP COLUMN `city`,
    DROP COLUMN `country`,
    DROP COLUMN `district`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `company` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `experience` DROP COLUMN `branchId`,
    DROP COLUMN `candidateId`,
    ADD COLUMN `companyId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `job` DROP COLUMN `imageURL`,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `recruiter` DROP COLUMN `branchId`,
    ADD COLUMN `companyId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `skill` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `phoneNum` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `branch`;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `copmpanyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Address_userId_key`(`userId`),
    UNIQUE INDEX `Address_copmpanyId_key`(`copmpanyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Recruiter` ADD CONSTRAINT `Recruiter_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_copmpanyId_fkey` FOREIGN KEY (`copmpanyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

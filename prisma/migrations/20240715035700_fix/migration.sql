-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_copmpanyId_fkey`;

-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_userId_fkey`;

-- DropIndex
DROP INDEX `Company_name_key` ON `company`;

-- AlterTable
ALTER TABLE `address` MODIFY `userId` INTEGER NULL,
    MODIFY `copmpanyId` INTEGER NULL;

-- AlterTable
ALTER TABLE `company` ADD COLUMN `imageURL` VARCHAR(191) NULL,
    ADD COLUMN `imgBackURL` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `imgBackURL` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_copmpanyId_fkey` FOREIGN KEY (`copmpanyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

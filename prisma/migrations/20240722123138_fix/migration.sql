-- AlterTable
ALTER TABLE `address` ADD COLUMN `copmpanyId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_copmpanyId_fkey` FOREIGN KEY (`copmpanyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

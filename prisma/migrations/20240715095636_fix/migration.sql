/*
  Warnings:

  - You are about to alter the column `status` on the `application` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Int`.
  - You are about to alter the column `position` on the `job` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Int`.
  - You are about to alter the column `jobType` on the `job` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Int`.
  - You are about to alter the column `timeType` on the `job` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `Int`.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `Int`.

*/
-- AlterTable
ALTER TABLE `application` MODIFY `status` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `job` MODIFY `position` INTEGER NOT NULL DEFAULT 2,
    MODIFY `jobType` INTEGER NOT NULL DEFAULT 0,
    MODIFY `timeType` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `user` MODIFY `role` INTEGER NOT NULL DEFAULT 0;

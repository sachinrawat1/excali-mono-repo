-- DropIndex
DROP INDEX `Chat_roomId_fkey` ON `chat`;

-- DropIndex
DROP INDEX `Chat_userId_fkey` ON `chat`;

-- DropIndex
DROP INDEX `Room_adminId_fkey` ON `room`;

-- AlterTable
ALTER TABLE `user` MODIFY `avatar` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

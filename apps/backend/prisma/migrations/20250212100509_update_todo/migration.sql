/*
  Warnings:

  - Made the column `authorId` on table `ToDo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ToDo" DROP CONSTRAINT "ToDo_authorId_fkey";

-- AlterTable
ALTER TABLE "ToDo" ADD COLUMN     "complete" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ToDo" ADD CONSTRAINT "ToDo_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

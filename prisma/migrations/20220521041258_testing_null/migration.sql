/*
  Warnings:

  - The `favourited_itineraries` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId]` on the table `Comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId]` on the table `Itineraries` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId]` on the table `Jobs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "favourited_itineraries",
ADD COLUMN     "favourited_itineraries" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Comments_userId_key" ON "Comments"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Itineraries_authorId_key" ON "Itineraries"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Jobs_authorId_key" ON "Jobs"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_key" ON "Rating"("userId");

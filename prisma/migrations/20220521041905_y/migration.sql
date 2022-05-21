/*
  Warnings:

  - The `favourited_itineraries` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Comments_userId_key";

-- DropIndex
DROP INDEX "Itineraries_authorId_key";

-- DropIndex
DROP INDEX "Jobs_authorId_key";

-- DropIndex
DROP INDEX "Rating_userId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "favourited_itineraries",
ADD COLUMN     "favourited_itineraries" INTEGER[];

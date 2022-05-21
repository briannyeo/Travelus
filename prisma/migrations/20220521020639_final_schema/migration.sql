/*
  Warnings:

  - You are about to drop the column `itineraries` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserOnItineraries` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isprivate` to the `Itineraries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserOnItineraries" DROP CONSTRAINT "UserOnItineraries_itinerariesId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnItineraries" DROP CONSTRAINT "UserOnItineraries_userId_fkey";

-- AlterTable
ALTER TABLE "Itineraries" ADD COLUMN     "isprivate" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "itineraries",
ADD COLUMN     "favourited_itineraries" INTEGER[];

-- DropTable
DROP TABLE "UserOnItineraries";

/*
  Warnings:

  - You are about to alter the column `pay` on the `Jobs` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Jobs" ALTER COLUMN "pay" SET DATA TYPE INTEGER;

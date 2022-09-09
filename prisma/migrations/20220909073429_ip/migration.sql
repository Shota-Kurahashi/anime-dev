/*
  Warnings:

  - Made the column `ipaddress` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "ipaddress" SET NOT NULL,
ALTER COLUMN "ipaddress" SET DATA TYPE TEXT;

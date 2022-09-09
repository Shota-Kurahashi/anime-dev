/*
  Warnings:

  - Made the column `ipAddress` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ipaddress` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "ipAddress" SET NOT NULL,
ALTER COLUMN "ipAddress" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "ipaddress" SET NOT NULL,
ALTER COLUMN "ipaddress" SET DATA TYPE TEXT;

/*
  Warnings:

  - You are about to drop the column `ipAddress` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `ipaddress` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "ipAddress",
ADD COLUMN     "ipaddress" TEXT NOT NULL;

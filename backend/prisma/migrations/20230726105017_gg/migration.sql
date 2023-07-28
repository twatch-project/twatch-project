/*
  Warnings:

  - You are about to drop the `Posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "postCode" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Portfolio" ALTER COLUMN "postCode" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Posts";

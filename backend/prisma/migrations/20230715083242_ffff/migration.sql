/*
  Warnings:

  - A unique constraint covering the columns `[citizenId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "citizenId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_citizenId_key" ON "Customer"("citizenId");

/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postCode` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "postCode" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Blog" (
    "blogId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "tag" "Tag" NOT NULL,
    "provider" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "sub_district" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("blogId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userId_key" ON "Customer"("userId");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

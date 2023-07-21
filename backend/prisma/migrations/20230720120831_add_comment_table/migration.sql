/*
  Warnings:

  - You are about to drop the column `companyname` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `companypersonId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `rateprice` on the `Company` table. All the data in the column will be lost.
  - The `tag` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `feed` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyName` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyRegistration` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postCode` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "companyname",
DROP COLUMN "companypersonId",
DROP COLUMN "rateprice",
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "companyRegistration" TEXT NOT NULL,
ADD COLUMN     "postCode" INTEGER NOT NULL,
DROP COLUMN "tag",
ADD COLUMN     "tag" TEXT[];

-- DropTable
DROP TABLE "feed";

-- DropEnum
DROP TYPE "Tag";

-- CreateTable
CREATE TABLE "Engineer" (
    "engineerId" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "licenseNo" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Engineer_pkey" PRIMARY KEY ("engineerId")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "portId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "tag" TEXT[],
    "province" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "sub_district" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postCode" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("portId")
);

-- CreateTable
CREATE TABLE "CommentPortfolio" (
    "commentId" SERIAL NOT NULL,
    "massage" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "portId" INTEGER NOT NULL,

    CONSTRAINT "CommentPortfolio_pkey" PRIMARY KEY ("commentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Engineer_licenseNo_key" ON "Engineer"("licenseNo");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");

-- AddForeignKey
ALTER TABLE "Engineer" ADD CONSTRAINT "Engineer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentPortfolio" ADD CONSTRAINT "CommentPortfolio_portId_fkey" FOREIGN KEY ("portId") REFERENCES "Portfolio"("portId") ON DELETE RESTRICT ON UPDATE CASCADE;

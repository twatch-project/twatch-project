/*
  Warnings:

  - You are about to drop the `Ueed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FeedToMag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MagToUeed` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FeedToMag" DROP CONSTRAINT "_FeedToMag_A_fkey";

-- DropForeignKey
ALTER TABLE "_FeedToMag" DROP CONSTRAINT "_FeedToMag_B_fkey";

-- DropForeignKey
ALTER TABLE "_MagToUeed" DROP CONSTRAINT "_MagToUeed_A_fkey";

-- DropForeignKey
ALTER TABLE "_MagToUeed" DROP CONSTRAINT "_MagToUeed_B_fkey";

-- DropTable
DROP TABLE "Ueed";

-- DropTable
DROP TABLE "_FeedToMag";

-- DropTable
DROP TABLE "_MagToUeed";

-- CreateTable
CREATE TABLE "FeedMag" (
    "id" SERIAL NOT NULL,
    "feedId" INTEGER,
    "magId" INTEGER,

    CONSTRAINT "FeedMag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeedMag" ADD CONSTRAINT "FeedMag_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedMag" ADD CONSTRAINT "FeedMag_magId_fkey" FOREIGN KEY ("magId") REFERENCES "Mag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

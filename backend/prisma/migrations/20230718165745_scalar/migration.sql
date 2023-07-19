/*
  Warnings:

  - You are about to drop the `Feed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeedMag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeedMag" DROP CONSTRAINT "FeedMag_feedId_fkey";

-- DropForeignKey
ALTER TABLE "FeedMag" DROP CONSTRAINT "FeedMag_magId_fkey";

-- DropTable
DROP TABLE "Feed";

-- DropTable
DROP TABLE "FeedMag";

-- DropTable
DROP TABLE "Mag";

-- CreateTable
CREATE TABLE "feed" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mets" TEXT[],

    CONSTRAINT "feed_pkey" PRIMARY KEY ("id")
);

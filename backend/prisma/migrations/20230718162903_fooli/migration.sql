-- CreateTable
CREATE TABLE "Feed" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Feed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FeedToMag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Mag_name_key" ON "Mag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FeedToMag_AB_unique" ON "_FeedToMag"("A", "B");

-- CreateIndex
CREATE INDEX "_FeedToMag_B_index" ON "_FeedToMag"("B");

-- AddForeignKey
ALTER TABLE "_FeedToMag" ADD CONSTRAINT "_FeedToMag_A_fkey" FOREIGN KEY ("A") REFERENCES "Feed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedToMag" ADD CONSTRAINT "_FeedToMag_B_fkey" FOREIGN KEY ("B") REFERENCES "Mag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

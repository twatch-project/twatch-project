-- CreateTable
CREATE TABLE "Ueed" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Ueed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MagToUeed" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MagToUeed_AB_unique" ON "_MagToUeed"("A", "B");

-- CreateIndex
CREATE INDEX "_MagToUeed_B_index" ON "_MagToUeed"("B");

-- AddForeignKey
ALTER TABLE "_MagToUeed" ADD CONSTRAINT "_MagToUeed_A_fkey" FOREIGN KEY ("A") REFERENCES "Mag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MagToUeed" ADD CONSTRAINT "_MagToUeed_B_fkey" FOREIGN KEY ("B") REFERENCES "Ueed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

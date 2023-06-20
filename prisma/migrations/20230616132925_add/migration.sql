-- CreateTable
CREATE TABLE "Image" (
    "image_id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "layout" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "alt" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("image_id")
);

/*
  Warnings:

  - Added the required column `priority` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('png', 'jpg', 'jpeg', 'webp');

-- CreateEnum
CREATE TYPE "ImageLayout" AS ENUM ('constrained', 'fullWidth', 'fixed');

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "priority" BOOLEAN NOT NULL,
ADD COLUMN     "type" "ImageType" NOT NULL;

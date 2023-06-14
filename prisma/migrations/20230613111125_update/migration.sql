/*
  Warnings:

  - The primary key for the `Dpage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `page_id` on the `Dpage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[path]` on the table `Dpage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dpage_id` to the `Dpage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dpage" DROP CONSTRAINT "Dpage_pkey",
DROP COLUMN "page_id",
ADD COLUMN     "data" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "dpage_id" TEXT NOT NULL,
ADD COLUMN     "head" JSONB NOT NULL DEFAULT '{}',
ADD CONSTRAINT "Dpage_pkey" PRIMARY KEY ("dpage_id");

-- CreateIndex
CREATE UNIQUE INDEX "Dpage_path_key" ON "Dpage"("path");

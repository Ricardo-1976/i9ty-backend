/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `FarmCulture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Farm" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "FarmCulture" DROP COLUMN "deletedAt";

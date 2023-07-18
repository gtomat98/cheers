/*
  Warnings:

  - You are about to drop the column `KKKK` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `banana` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "KKKK",
DROP COLUMN "banana",
ADD COLUMN     "role" TEXT;

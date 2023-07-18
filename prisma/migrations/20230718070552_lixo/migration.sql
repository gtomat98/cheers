/*
  Warnings:

  - Added the required column `KKKK` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "KKKK" TEXT NOT NULL;

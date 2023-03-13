/*
  Warnings:

  - Added the required column `activity_factor` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "genders" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "ActivityFactor" AS ENUM ('1.2', '1.375', '1.55', '1.725');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "activity_factor" "ActivityFactor" NOT NULL,
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "gender" "genders" NOT NULL,
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL;

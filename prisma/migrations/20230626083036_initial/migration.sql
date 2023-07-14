/*
  Warnings:

  - The primary key for the `meals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "foods" DROP CONSTRAINT "foods_meal_id_fkey";

-- AlterTable
ALTER TABLE "meals" DROP CONSTRAINT "meals_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "task_id" DROP NOT NULL,
ADD CONSTRAINT "meals_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "foods_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

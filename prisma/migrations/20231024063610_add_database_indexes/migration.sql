-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "foods" DROP CONSTRAINT "foods_meal_id_fkey";

-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_user_id_fkey";

-- DropForeignKey
ALTER TABLE "mealsHistoric" DROP CONSTRAINT "mealsHistoric_meal_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- CreateIndex
CREATE INDEX "accounts_user_id_idx" ON "accounts"("user_id");

-- CreateIndex
CREATE INDEX "foods_meal_id_idx" ON "foods"("meal_id");

-- CreateIndex
CREATE INDEX "meals_user_id_idx" ON "meals"("user_id");

-- CreateIndex
CREATE INDEX "mealsHistoric_meal_id_idx" ON "mealsHistoric"("meal_id");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

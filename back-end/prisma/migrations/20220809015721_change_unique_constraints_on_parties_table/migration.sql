/*
  Warnings:

  - A unique constraint covering the columns `[name,date,user_id]` on the table `parties` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "parties_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "parties_name_date_user_id_key" ON "parties"("name", "date", "user_id");

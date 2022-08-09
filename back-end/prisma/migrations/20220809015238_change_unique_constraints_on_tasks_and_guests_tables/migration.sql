/*
  Warnings:

  - A unique constraint covering the columns `[email,party_id]` on the table `guests` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description,party_id]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "guests_email_key";

-- DropIndex
DROP INDEX "tasks_description_key";

-- CreateIndex
CREATE UNIQUE INDEX "guests_email_party_id_key" ON "guests"("email", "party_id");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_description_party_id_key" ON "tasks"("description", "party_id");

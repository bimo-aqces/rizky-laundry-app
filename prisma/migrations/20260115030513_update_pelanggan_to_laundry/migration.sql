/*
  Warnings:

  - You are about to drop the column `umur` on the `Pelanggan` table. All the data in the column will be lost.
  - Added the required column `paket` to the `Pelanggan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Pelanggan` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pelanggan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tanggal" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nama" TEXT NOT NULL,
    "beratKg" REAL,
    "adt" TEXT,
    "paket" TEXT NOT NULL,
    "totalPrice" REAL NOT NULL
);
INSERT INTO "new_Pelanggan" ("id", "nama") SELECT "id", "nama" FROM "Pelanggan";
DROP TABLE "Pelanggan";
ALTER TABLE "new_Pelanggan" RENAME TO "Pelanggan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

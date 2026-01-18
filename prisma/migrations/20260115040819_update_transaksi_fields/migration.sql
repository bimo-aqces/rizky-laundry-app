/*
  Warnings:

  - You are about to drop the column `beratKg` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `harga` on the `Transaksi` table. All the data in the column will be lost.
  - Added the required column `totalCash` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQris` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTransfer` to the `Transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaksi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tanggal" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nama" TEXT NOT NULL,
    "totalCash" REAL NOT NULL,
    "totalQris" REAL NOT NULL,
    "totalTransfer" REAL NOT NULL
);
INSERT INTO "new_Transaksi" ("id", "nama") SELECT "id", "nama" FROM "Transaksi";
DROP TABLE "Transaksi";
ALTER TABLE "new_Transaksi" RENAME TO "Transaksi";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

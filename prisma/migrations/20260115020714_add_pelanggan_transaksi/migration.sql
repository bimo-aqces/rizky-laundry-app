-- CreateTable
CREATE TABLE "Pelanggan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "umur" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "beratKg" REAL NOT NULL,
    "harga" INTEGER NOT NULL
);

"use client";

import { useState } from "react";
import Link from "next/link";

export default function TransaksiPage() {
  const [nama, setNama] = useState("");
  const [totalCash, setTotalCash] = useState("");
  const [totalQris, setTotalQris] = useState("");
  const [totalTransfer, setTotalTransfer] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("/api/transaksi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama,
        totalCash,
        totalQris,
        totalTransfer,
      }),
    });

    alert("Transaksi berhasil disimpan");
    setNama("");
    setTotalCash("");
    setTotalQris("");
    setTotalTransfer("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-blue-400 to-blue-600 gap-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-6 rounded shadow-md w-96 space-y-3"
      >
        <h2 className="text-2xl text-center text-blue-800 font-bold mb-4">Form Transaksi</h2>

      
          <input
            type="text"
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border rounded border-gray-800 px-2 py-1 text-gray-600"
            required
          />
        
          <input
            type="number"
            placeholder="Total Cash"
            step="0.01"
            value={totalCash}
            onChange={(e) => setTotalCash(e.target.value)}
            className="w-full border rounded border-gray-800 px-2 py-1 text-gray-600"
          />

          <input
            type="number"
            step="0.01"
            placeholder="Total QRIS"
            value={totalQris}
            onChange={(e) => setTotalQris(e.target.value)}
            className="w-full border rounded border-gray-800 px-2 py-1 text-gray-600"
          />

          <input
            type="number"
            step="0.01"
            placeholder="Total Transfer"
            value={totalTransfer}
            onChange={(e) => setTotalTransfer(e.target.value)}
            className="w-full border rounded border-gray-800 px-2 py-1 text-gray-600"
          />
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Simpan
        </button>
      </form>
      <div className="flex gap-3">
        <Link
          href="/transaksi/data"
          className="bg-linear-to-b from-blue-400 to-blue-600 text-gray-100 font-bold border-gray-200 border-2 px-4 py-2 rounded">
          View Data
        </Link>
        <Link
            href="/"
            className="bg-linear-to-b from-blue-400 to-blue-600 text-gray-100 font-bold border-gray-200 border-2 px-4 py-2 rounded">
            Back
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

export default function PengeluaranPage() {
  const [keterangan, setKeterangan] = useState("");
  const [nominal, setNominal] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("/api/pengeluaran", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keterangan,
        nominal,
      }),
    });

    alert("Pengeluaran berhasil disimpan");

    setKeterangan("");
    setNominal("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-blue-400 to-blue-600 gap-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-6 rounded shadow-md w-96 space-y-3"
      >
        <h2 className="text-2xl font-bold text-blue-800 text-center">
          Form Pengeluaran
        </h2>

        <input
          type="text"
          placeholder="Keterangan"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          className="w-full border rounded border-gray-800 px-2 py-1 text-gray-600"
          required
        />

        <input
          type="number"
          step="0.01"
          placeholder="Nominal"
          value={nominal}
          onChange={(e) => setNominal(e.target.value)}
          className="w-full border rounded border-gray-800 px-2 py-1 text-gray-600"
          required
        />

        <button
          type="submit"
          className="w-full font-bold bg-linear-to-t from-blue-400 to-blue-600 text-white py-2 rounded"
        >
          Submit
        </button>
      </form>

      <div className="flex gap-3">
        <Link
          href="/pengeluaran/data"
          className="bg-linear-to-b from-blue-400 to-blue-600 text-gray-100 font-bold border-gray-200 border-2 px-4 py-2 rounded"
        >
          View Data
        </Link>

        <Link
          href="/"
          className="bg-linear-to-b from-blue-400 to-blue-600 text-gray-100 font-bold border-gray-200 border-2 px-4 py-2 rounded"
        >
          Back
        </Link>
      </div>
    </div>
  );
}

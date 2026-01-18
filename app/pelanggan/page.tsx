"use client";

import { useState } from "react";
import Link from "next/link";

export default function PelangganPage() {
  const [nama, setNama] = useState("");
  const [paket, setPaket] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [beratKg, setBeratKg] = useState("");
  const [adt, setAdt] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("/api/pelanggan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama,
        paket,
        totalPrice,
        beratKg,
        adt,
      }),
    });

    alert("Pelanggan berhasil disimpan");

    setNama("");
    setPaket("");
    setTotalPrice("");
    setBeratKg("");
    setAdt("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-blue-400 to-blue-600 gap-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-6 rounded shadow-md w-96 space-y-3">
        <h2 className="text-2xl font-bold text-blue-800 text-center">Form Customer</h2>

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
          step="0.01"
          placeholder="Berat (kg)"
          value={beratKg}
          onChange={(e) => setBeratKg(e.target.value)}
          className="w-full border border-gray-800 rounded px-2 py-1 text-gray-600"
        />

        <input
          type="text"
          placeholder="ADT (opsional)"
          value={adt}
          onChange={(e) => setAdt(e.target.value)}
          className="w-full border border-gray-800 rounded px-2 py-1 text-gray-600"
        />

        <input
          type="text"
          placeholder="Paket"
          value={paket}
          onChange={(e) => setPaket(e.target.value)}
          className="w-full border rounded border-gray-800 px-2 py-1 text-gray-600"
          required
        />

        <input
          type="number"
          step="0.01"
          placeholder="Total Price"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
          className="w-full border rounded border-gray-800 px-2 py-1 text-gray-600"
          required
        />

        <button
          type="submit"
          className="w-full font-bold bg-linear-to-t from-blue-400 to-blue-600 text-white py-2 rounded">
          Submit
        </button>
      </form>

      <div className="flex gap-3">
        <Link
          href="/pelanggan/data"
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

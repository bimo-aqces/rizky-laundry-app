"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Transaksi = {
  id: number;
  tanggal: string;
  nama: string;
  totalCash: number;
  totalQris: number;
  totalTransfer: number;}

export default function TransaksiDataPage() {
  const [data, setData] = useState<Transaksi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/transaksi")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin mau hapus transaksi ini?")) return;

    await fetch("/api/transaksi", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteAll = async () => {
  const ok = confirm("Yakin hapus SEMUA data transaksi?");
  if (!ok) return;

  await fetch("/api/transaksi", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ all: true }),
  });

  setData([]);
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-black bg-linear-to-b from-blue-400 to-blue-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-400 to-blue-600 p-6">
      <h1 className="text-2xl font-bold mb-4">Data Transaksi</h1>

      <div className="mb-4 flex justify-between">
        <Link
          href="/transaksi"
          className="bg-linear-to-b from-blue-400 to-blue-600 p-6 text-white border-gray-200 border-2 px-4 py-2 rounded">
          + Tambah Transaksi
        </Link>
        <Link
          href="/api/transaksi-export"
          className="bg-linear-to-b from bg-green-400 to-green-600 text-white border-gray-200 border-2 px-4 py-2 rounded">
          Export Excel
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        <div className="overflow-x-auto border-3 border-gray-800 rounded-xl max-h-[60vh] overflow-y-auto">
          <table className="w-full bg-white rounded shadow">
            <thead className="bg-linear-to-b from bg-yellow-400 to-yellow-600 sticky top-0">
              <tr>
                <th className="text-gray-800 p-2 text-center border-2 border-gray-600">Tanggal</th>
                <th className="text-gray-800 p-2 text-center border-2 border-gray-600">Nama</th>
                <th className="text-gray-800 p-2 text-center border-2 border-gray-600">totalCash</th>
                <th className="text-gray-800 p-2 text-center border-2 border-gray-600">totalQris</th>
                <th className="text-gray-800 p-2 text-center border-2 border-gray-600">totalTransfer</th>
                <th className="text-gray-800 p-2 text-center border-2 border-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-700">
                    Empty
                  </td>
                </tr>
              )}

              {data.map((item) => (
                <tr key={item.id} className="text-gray-800 text-center p-2 border-2 border-gray-600">
                  <td className="text-gray-800 text-center p-2 border-2 border-gray-600">
                    {item.tanggal
                      ? new Date(item.tanggal).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="text-gray-800 text-center p-2 border-2 border-gray-600">{item.nama}</td>
                  <td className="text-gray-800 text-center p-2 border-2 border-gray-600">Rp {item.totalCash}</td>
                  <td className="text-gray-800 text-center p-2 border-2 border-gray-600">Rp {item.totalQris}</td>
                  <td className="text-gray-800 text-center p-2 border-2 border-gray-600">Rp {item.totalTransfer}</td>
                  <td className="text-gray-800 text-center p-2 border-2 border-gray-600">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-linear-to-b from bg-red-400 to-red-600 text-white px-3 py-1 rounded border-2 border-gray-600 hover:bg-red-600">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-between">
          <Link   href="/"
            className="bg-linear-to-b from-blue-400 to-blue-600 p-6 text-white border-gray-200 rounded border-2 px-4 py-2">Home
          </Link>
          <button
            onClick={handleDeleteAll}
            className="flex bg-linear-to-b from-red-400 to-red-600 text-white border-gray-200 rounded border-2 px-4 py-2 hover:bg-red-600">
            Hapus Semua
          </button>
        </div>
      </div>
    </div>
  );
}

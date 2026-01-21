"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Pengeluaran = {
  id: number;
  tanggal: string;
  keterangan: string;
  nominal: number;
};

export default function PengeluaranDataPage() {
  const [data, setData] = useState<Pengeluaran[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pengeluaran")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin mau hapus data ini?");
    if (!confirmDelete) return;

    await fetch("/api/pengeluaran", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteAll = async () => {
    const ok = confirm("Yakin hapus SEMUA data pengeluaran?");
    if (!ok) return;

    await fetch("/api/pengeluaran", {
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
      <h1 className="text-2xl font-bold mb-4">Data Pengeluaran</h1>

      <div className="mb-4 flex justify-between">
        <Link
          href="/pengeluaran"
          className="bg-linear-to-b from-blue-400 to-blue-600 p-6 text-white border-gray-200 border-2 px-4 py-2 rounded"
        >
          + Tambah Pengeluaran
        </Link>

        <Link
          href="/api/pengeluaran-export"
          className="bg-linear-to-b from bg-green-400 to-green-600 text-white border-gray-200 border-2 px-4 py-2 rounded"
        >
          Export Excel
        </Link>
      </div>

      <div className="flex flex-col gap-5">
        <div className="overflow-x-auto border-3 border-gray-800 rounded-xl max-h-[60vh] overflow-y-auto">
          <table className="w-full bg-white rounded shadow">
            <thead className="bg-linear-to-b from bg-yellow-400 to-yellow-600 sticky top-0">
              <tr>
                <th className="text-gray-800 p-2 text-center border-2 border-gray-600">
                  Tanggal
                </th>
                <th className="text-gray-800 p-2 text-center border-2 border-gray-600">
                  Keterangan
                </th>
                <th className="text-gray-800 p-2 text-center border-2 border-gray-600">
                  Nominal
                </th>
                <th className="text-gray-800 p-2 text-center border-2 border-gray-600">
                  Delete
                </th>
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
                <tr key={item.id} className="border-t">
                  <td className="text-gray-800 text-center p-2 border-2 border-gray-600">
                    {item.tanggal
                      ? new Date(item.tanggal).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="text-gray-800 text-center p-2 border-2 border-gray-600">
                    {item.keterangan}
                  </td>

                  <td className="text-gray-800 text-center p-2 border-2 border-gray-600">
                    Rp {item.nominal.toLocaleString()}
                  </td>

                  <td className="p-2 text-center border-2 border-gray-600">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-linear-to-b from bg-red-400 to-red-600 text-white px-3 py-1 rounded border-2 border-gray-600 hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-row justify-between">
          <Link
            href="/"
            className="bg-linear-to-b from-blue-400 to-blue-600 p-6 text-white border-gray-200 rounded border-2 px-4 py-2"
          >
            Home
          </Link>

          <button
            onClick={handleDeleteAll}
            className="bg-linear-to-b from-red-400 to-red-600 text-white border-gray-200 rounded border-2 px-4 py-2 hover:bg-red-600"
          >
            Hapus Semua
          </button>
        </div>
      </div>
    </div>
  );
}

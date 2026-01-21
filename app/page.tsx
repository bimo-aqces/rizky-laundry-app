import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-linear-to-b from-blue-400 to-blue-600">
      <div className="flex">
        <Image src="/icon-laundry.png" alt="icon" width={200} height={200}></Image>
      </div>
      <h1 className="text-4xl text-center text-transparent font-bold bg-linear-to-r from-red-500 to-red-400 bg-clip-text [-webkit-text-stroke:1px_white]"> Rizky Laundry <br />Dashboard</h1>

      <Link
        href="/transaksi"
        className="bg-linear-to-b from bg-green-400 to-green-600 w-[50%] text-center font-bold text-blue-600 px-6 py-3 rounded border-2 border-white">
        Input Transaksi
      </Link>

      <Link
        href="/pelanggan"
        className="bg-linear-to-b from bg-yellow-400 to-yellow-600 w-[50%] text-center font-bold text-blue-600 px-6 py-3 rounded border-2 border-white">
        Input Customer
      </Link>

      <Link
        href="/pengeluaran"
        className="bg-linear-to-b from bg-red-400 to-red-600 w-[50%] text-center font-bold text-blue-600 px-6 py-3 rounded border-2 border-white">
        Input Pengeluaran
      </Link>
    </div>
  );
}

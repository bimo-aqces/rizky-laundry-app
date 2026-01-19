export const runtime = "nodejs";
export const dynamic = "force-dynamic";


import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.transaksi.findMany({
    orderBy: { id: "desc" },
  });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  await prisma.transaksi.create({
    data: {
      nama: body.nama,
      totalCash: Number(body.totalCash) || 0,
      totalQris: Number(body.totalQris) || 0,
      totalTransfer: Number(body.totalTransfer) || 0,
    },
  });

  return NextResponse.json({
    message: "Transaksi berhasil disimpan",
  });
}

export async function DELETE(req: Request) {
  const body = await req.json();

  if (body?.all === true) {
    await prisma.transaksi.deleteMany();
    return NextResponse.json({
      message: "Semua transaksi berhasil dihapus",
    });
  }

  await prisma.transaksi.delete({
    where: { id: Number(body.id) },
  });

  return NextResponse.json({
    message: "Transaksi berhasil dihapus",
  });
}

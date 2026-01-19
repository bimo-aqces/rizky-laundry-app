export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;



import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.pengeluaran.findMany({
    orderBy: { id: "desc" },
  });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  await prisma.pengeluaran.create({
    data: {
      keterangan: body.keterangan,
      nominal: Number(body.nominal),
    },
  });

  return NextResponse.json({
    message: "Pengeluaran berhasil disimpan",
  });
}

export async function DELETE(req: Request) {
  const body = await req.json();

  if (body?.all === true) {
    await prisma.pengeluaran.deleteMany();
    return NextResponse.json({
      message: "Semua pengeluaran berhasil dihapus",
    });
  }

  await prisma.pengeluaran.delete({
    where: { id: Number(body.id) },
  });

  return NextResponse.json({
    message: "Pengeluaran berhasil dihapus",
  });
}

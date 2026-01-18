import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.pelanggan.findMany({
    orderBy: { id: "desc" },
  });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  await prisma.pelanggan.create({
    data: {
      nama: body.nama,
      paket: body.paket,
      totalPrice: Number(body.totalPrice),
      beratKg: body.beratKg ? Number(body.beratKg) : null,
      adt: body.adt || null,
    },
  });

  return NextResponse.json({
    message: "Pelanggan berhasil disimpan",
  });
}

export async function DELETE(req: Request) {
  const body = await req.json();

  if (body?.all === true) {
    await prisma.pelanggan.deleteMany();
    return NextResponse.json({
      message: "Semua data pelanggan berhasil dihapus",
    });
  }

  await prisma.pelanggan.delete({
    where: {
      id: Number(body.id),
    },
  });

  return NextResponse.json({
    message: "Data berhasil dihapus",
  });
}

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.pelanggan.findMany({
    orderBy: { id: "desc" },
  });

  const tanggal = new Date().toISOString().split("T")[0];
  const filename = `pelanggan-${tanggal}.xlsx`;

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pelanggan");

  const buffer = XLSX.write(workbook, {
    type: "buffer",
    bookType: "xlsx",
  });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

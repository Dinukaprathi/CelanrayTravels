import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const data = await req.json();
  const { id } = await params;
  const hotel = await prisma.hotel.update({
    where: { id },
    data,
  });
  return NextResponse.json(hotel);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const hotel = await prisma.hotel.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Hotel deleted successfully", hotel });
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return NextResponse.json(
      { error: "Failed to delete hotel" },
      { status: 500 }
    );
  }
} 
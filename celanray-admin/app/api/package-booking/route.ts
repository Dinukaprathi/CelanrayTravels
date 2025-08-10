import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const bookings = await prisma.packageBooking.findMany({ 
      include: {
        package: true, // PackageWithoutOffers
        packageWithOffers: true, // PackageWithOffers
      },
      orderBy: { createdAt: "desc" } 
    });
    return NextResponse.json(bookings);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
} 
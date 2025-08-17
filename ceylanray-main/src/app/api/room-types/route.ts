import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Use a single PrismaClient instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const hotels = await prisma.hotel.findMany({
      where: {
        roomTypes: {
          isEmpty: false,
        },
      },
      select: {
        id: true,
        name: true,
        roomTypes: true,
      },
    });
    return NextResponse.json(hotels);
  } catch (error) {
    console.error('Error fetching room types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch room types' },
      { status: 500 }
    );
  }
} 
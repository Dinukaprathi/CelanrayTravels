import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get all hotels with their room types
    const hotels = await prisma.hotel.findMany({
      select: {
        roomTypes: true,
      },
      where: {
        roomTypes: {
          not: [],
        },
      },
    });

    // Extract and flatten all unique room types from all hotels
    const allRoomTypes = hotels
      .flatMap(hotel => hotel.roomTypes || [])
      .filter((type, index, array) => array.indexOf(type) === index); // Remove duplicates

    return NextResponse.json(allRoomTypes);
  } catch (error) {
    console.error('Error fetching room types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch room types' },
      { status: 500 }
    );
  }
} 
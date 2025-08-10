import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const hotel = await prisma.hotel.findUnique({
      where: { id },
      select: {
        roomTypes: true,
      },
    });

    if (!hotel) {
      return NextResponse.json(
        { error: 'Hotel not found' },
        { status: 404 }
      );
    }

    // Return room types if available, otherwise return empty array
    const roomTypes = hotel.roomTypes || [];
    return NextResponse.json(roomTypes);
  } catch (error) {
    console.error('Error fetching hotel room types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotel room types' },
      { status: 500 }
    );
  }
} 
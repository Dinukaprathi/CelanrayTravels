import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const hotelBookings = await prisma.hotelBooking.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(hotelBookings);
  } catch (error) {
    console.error('Error fetching hotel bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotel bookings' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const airTicketBookings = await prisma.airTicketBooking.findMany({
      include: {
        passengers: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(airTicketBookings);
  } catch (error) {
    console.error('Error fetching air ticket bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch air ticket bookings' },
      { status: 500 }
    );
  }
} 
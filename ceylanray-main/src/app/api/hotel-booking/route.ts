import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { 
      name, 
      email, 
      phone, 
      hotel_name, 
      checkIn, 
      checkOut, 
      roomType, 
      numGuests, 
      specialRequests 
    } = data;

    // Validate required fields
    if (!name || !email || !phone || !hotel_name || !checkIn || !checkOut || !roomType || !numGuests) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the hotel booking in the database
    const booking = await prisma.hotelBooking.create({
      data: {
        name,
        email,
        phone,
        hotel_name,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        roomType,
        numGuests,
        specialRequests: specialRequests || null,
      },
    });

    console.log('Hotel booking created:', booking);

    return NextResponse.json({ 
      success: true, 
      message: 'Hotel booking created successfully',
      bookingId: booking.id 
    });
  } catch (error) {
    console.error('Error creating hotel booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create hotel booking' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      bookingMode,
      tripType,
      flightClass,
      departureCity,
      arrivalCity,
      departureDate,
      returnDate,
      adults,
      children,
      totalPassengers,
      specialAssistance,
      mealPreference,
      passengers
    } = data;

    // Validate required fields
    if (!departureCity || !arrivalCity || !departureDate || !passengers || passengers.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the air ticket booking with passengers
    const airTicketBooking = await prisma.airTicketBooking.create({
      data: {
        bookingMode,
        tripType,
        flightClass,
        departureCity,
        arrivalCity,
        departureDate: new Date(departureDate),
        returnDate: returnDate ? new Date(returnDate) : null,
        adults: parseInt(adults),
        children: parseInt(children),
        totalPassengers: parseInt(totalPassengers),
        specialAssistance: specialAssistance || null,
        mealPreference: mealPreference || null,
        passengers: {
          create: passengers.map((passenger: any) => ({
            fullName: passenger.fullName,
            email: passenger.email,
            phone: passenger.phone,
            passport: passenger.passport
          }))
        }
      },
      include: {
        passengers: true
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Air ticket booking created successfully', 
      bookingId: airTicketBooking.id,
      booking: airTicketBooking
    });
  } catch (error) {
    console.error('Error creating air ticket booking:', error);
    return NextResponse.json(
      { error: 'Failed to create air ticket booking' },
      { status: 500 }
    );
  }
} 
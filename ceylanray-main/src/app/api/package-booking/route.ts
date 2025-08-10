import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, packageId } = body;

    // Validate required fields
    if (!name || !email || !phone || !packageId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if the package exists in either PackageWithOffers or PackageWithoutOffers
    const packageWithOffers = await prisma.packageWithOffers.findUnique({
      where: { id: packageId }
    });

    const packageWithoutOffers = await prisma.packageWithoutOffers.findUnique({
      where: { id: packageId }
    });

    if (!packageWithOffers && !packageWithoutOffers) {
      return NextResponse.json(
        { success: false, error: 'Package not found' },
        { status: 404 }
      );
    }

    // Create the booking with proper relation
    let booking;
    if (packageWithOffers) {
      // Package with offers
      booking = await prisma.packageBooking.create({
        data: {
          name,
          email,
          phone,
          message: message || null,
          packageWithOffersId: packageId,
        }
      });
    } else {
      // Package without offers
      booking = await prisma.packageBooking.create({
        data: {
          name,
          email,
          phone,
          message: message || null,
          packageId: packageId,
        }
      });
    }

    console.log('Package booking created:', booking);

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      message: 'Booking created successfully'
    });

  } catch (error) {
    console.error('Error creating package booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
} 
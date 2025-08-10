import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const hotels = await prisma.hotel.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        image: true,
        roomType: true,
        roomTypes: true,
      },
    });
    return NextResponse.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotels' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, location, image, roomTypes } = data;
    
    // Create hotel data object
    const hotelData = {
      name,
      location,
      image,
      starRating: "3", // Default star rating
    };

    // Add roomTypes if provided
    if (roomTypes && Array.isArray(roomTypes)) {
      hotelData.roomTypes = roomTypes;
    }

    const hotel = await prisma.hotel.create({
      data: hotelData
    });
    return NextResponse.json(hotel);
  } catch (error) {
    console.error('Error creating hotel:', error);
    return NextResponse.json(
      { error: 'Failed to create hotel' },
      { status: 500 }
    );
  }
} 
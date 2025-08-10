import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const { destination_id, destination, destination_name, description, image_url } = data;
    
    // Validate required fields
    if (!destination_id || !destination || !destination_name || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newDestination = await prisma.destination.create({
      data: {
        destination_id,
        destination,
        destination_name,
        description,
        image_url: image_url || null,
      }
    });
    
    return NextResponse.json(newDestination);
  } catch (error) {
    console.error('Error creating destination:', error);
    return NextResponse.json(
      { error: 'Failed to create destination' },
      { status: 500 }
    );
  }
} 
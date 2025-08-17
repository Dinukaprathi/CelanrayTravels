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
    const destinations = await prisma.destination.findMany();
    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    // Insert a test destination
    const result = await query(
      `INSERT INTO "Destination" ("id", "destination_id", "destination", "destination_name", "description", "image_url", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        crypto.randomUUID(),
        'sigiriya-test',
        'Sigiriya',
        'Sigiriya Rock Fortress',
        'Ancient palace and fortress complex built on top of a massive rock. One of the most visited historical sites in Sri Lanka.',
        '/home/recommended/sigiriya.webp',
        new Date(),
        new Date()
      ]
    );
    
    console.log('Test destination created:', result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating test destination:', error);
    return NextResponse.json(
      { error: 'Failed to create test destination' },
      { status: 500 }
    );
  }
}

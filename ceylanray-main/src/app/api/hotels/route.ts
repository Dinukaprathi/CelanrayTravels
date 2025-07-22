import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const hotels = await prisma.hotel.findMany();
  return NextResponse.json(hotels);
} 
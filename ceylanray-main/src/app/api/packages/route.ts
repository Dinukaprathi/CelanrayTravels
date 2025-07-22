import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  // Fetch both types of packages
  const packagesWithoutOffers = await prisma.packageWithoutOffers.findMany();
  const packagesWithOffers = await prisma.packageWithOffers.findMany();

  // Map imageURL to image for packagesWithOffers
  const mappedWithOffers = packagesWithOffers.map(pkg => ({
    ...pkg,
    image: pkg.imageURL,
  }));

  return NextResponse.json({
    packagesWithoutOffers,
    packagesWithOffers: mappedWithOffers,
  });
} 
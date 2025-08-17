// src/app/api/packages/route.ts

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
    const packagesWithoutOffers = await prisma.packageWithoutOffers.findMany();
    const packagesWithOffers = await prisma.packageWithOffers.findMany();

  // Normalize price and imageURL to image
  const normalizedWithoutOffers = packagesWithoutOffers.map(pkg => ({
    id: pkg.id,
    title: pkg.title,
    description: pkg.description,
    duration: pkg.duration,
    category: pkg.category,
    interests: pkg.interests,
    createdAt: pkg.createdAt,
    updatedAt: pkg.updatedAt,
    price: pkg.price,
    type: 'without-offer',
    offers: [],
    imageUrl: pkg.image,
    inclusions: pkg.inclusions,
  }));

  const normalizedWithOffers = packagesWithOffers.map(pkg => {
    const offer = {
      startDate: pkg.startDate,
      endDate: pkg.endDate,
      priceWithOffer: pkg.priceWithOffer,
      priceWithoutOffer: pkg.priceWithoutOffer,
    };
    return {
      id: pkg.id,
      title: pkg.title,
      description: pkg.description,
      duration: pkg.duration,
      category: pkg.category,
      interests: pkg.interests,
      createdAt: pkg.createdAt,
      updatedAt: pkg.updatedAt,
      price: pkg.priceWithOffer,
      type: 'with-offer',
      offers: [offer],
      imageUrl: pkg.imageURL,
      inclusions: pkg.inclutions,
    };
  });

    return NextResponse.json({
      packagesWithoutOffers: normalizedWithoutOffers,
      packagesWithOffers: normalizedWithOffers,
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}

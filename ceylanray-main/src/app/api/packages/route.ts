// src/app/api/packages/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
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
}

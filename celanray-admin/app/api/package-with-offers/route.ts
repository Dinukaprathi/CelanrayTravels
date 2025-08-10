import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const pkg = await prisma.packageWithOffers.create({
      data: {
        title: data.title,
        description: data.description,
        priceWithOffer: data.priceWithOffer,
        priceWithoutOffer: data.priceWithoutOffer,
        startDate: data.startDate ? new Date(data.startDate) : new Date(),
        endDate: data.endDate ? new Date(data.endDate) : new Date(),
        duration: data.duration,
        imageURL: data.imageURL,
        category: data.category,
        interests: data.interests,
        inclutions: data.inclutions,
      },
    });
    // Create AllPackages record
    await prisma.allPackages.create({
      data: {
        title: pkg.title,
        description: pkg.description,
        type: 'offer',
        packageWithOffersId: pkg.id,
      },
    });
    return NextResponse.json(pkg, { status: 201 });
  } catch (err) {
    console.error('API ERROR:', err); // Log the real error
    return NextResponse.json({ error: "Failed to create package with offer" }, { status: 500 });
  }
} 
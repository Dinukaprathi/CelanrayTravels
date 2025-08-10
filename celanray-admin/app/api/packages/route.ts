import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  // Fetch both types of packages
  const packagesWithoutOffers = await prisma.packageWithoutOffers.findMany();
  const packagesWithOffers = await prisma.packageWithOffers.findMany();
  return NextResponse.json({
    packagesWithoutOffers,
    packagesWithOffers,
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const pkg = await prisma.packageWithoutOffers.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        price: data.price,
        duration: data.duration,
        category: data.category,
        interests: data.interests,
        inclusions: data.inclusions,
      },
    });
    return NextResponse.json(pkg, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }
} 
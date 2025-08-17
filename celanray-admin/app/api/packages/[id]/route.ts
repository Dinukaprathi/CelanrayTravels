import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const id = params.id;
    const data = await req.json();
    let updated = null;
    // Try updating packageWithoutOffers
    try {
      updated = await prisma.packageWithoutOffers.update({
        where: { id },
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
      return NextResponse.json({ ...updated, type: 'without-offer' });
    } catch {}
    // Try updating packageWithOffers
    try {
      updated = await prisma.packageWithOffers.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          imageURL: data.imageURL || data.image,
          priceWithOffer: data.priceWithOffer,
          priceWithoutOffer: data.priceWithoutOffer,
          startDate: data.startDate,
          endDate: data.endDate,
          duration: data.duration,
          category: data.category,
          interests: data.interests,
          inclutions: data.inclutions || data.inclusions,
        },
      });
      return NextResponse.json({ ...updated, type: 'with-offer' });
    } catch {}
    return NextResponse.json({ error: 'Package not found' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const id = params.id;
    let deleted = false;
    // Try deleting from packageWithoutOffers
    try {
      await prisma.packageWithoutOffers.delete({ where: { id } });
      deleted = true;
    } catch {}
    // Try deleting from packageWithOffers
    try {
      await prisma.packageWithOffers.delete({ where: { id } });
      deleted = true;
    } catch {}
    if (deleted) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete package' }, { status: 500 });
  }
} 
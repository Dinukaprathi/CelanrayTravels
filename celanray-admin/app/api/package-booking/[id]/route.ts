import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const booking = await prisma.packageBooking.delete({
      where: { id },
    });
    
    return NextResponse.json({ 
      message: "Package booking deleted successfully", 
      booking 
    });
  } catch (error) {
    console.error('Error deleting package booking:', error);
    return NextResponse.json(
      { error: 'Failed to delete package booking' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { isCompleted } = await req.json();
    
    const booking = await prisma.packageBooking.update({
      where: { id },
      data: { isCompleted },
    });
    
    return NextResponse.json({ 
      message: "Package booking status updated successfully", 
      booking 
    });
  } catch (error) {
    console.error('Error updating package booking status:', error);
    return NextResponse.json(
      { error: 'Failed to update package booking status' },
      { status: 500 }
    );
  }
} 
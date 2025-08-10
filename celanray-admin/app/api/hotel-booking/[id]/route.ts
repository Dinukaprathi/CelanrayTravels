import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const booking = await prisma.hotelBooking.delete({
      where: { id },
    });
    
    return NextResponse.json({ 
      message: "Hotel booking deleted successfully", 
      booking 
    });
  } catch (error) {
    console.error('Error deleting hotel booking:', error);
    return NextResponse.json(
      { error: 'Failed to delete hotel booking' },
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
    
    const booking = await prisma.hotelBooking.update({
      where: { id },
      data: { isCompleted },
    });
    
    return NextResponse.json({ 
      message: "Hotel booking status updated successfully", 
      booking 
    });
  } catch (error) {
    console.error('Error updating hotel booking status:', error);
    return NextResponse.json(
      { error: 'Failed to update hotel booking status' },
      { status: 500 }
    );
  }
} 
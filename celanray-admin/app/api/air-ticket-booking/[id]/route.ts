import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const booking = await prisma.airTicketBooking.delete({
      where: { id },
    });
    
    return NextResponse.json({ 
      message: "Air ticket booking deleted successfully", 
      booking 
    });
  } catch (error) {
    console.error('Error deleting air ticket booking:', error);
    return NextResponse.json(
      { error: 'Failed to delete air ticket booking' },
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
    
    const booking = await prisma.airTicketBooking.update({
      where: { id },
      data: { isCompleted },
    });
    
    return NextResponse.json({ 
      message: "Air ticket booking status updated successfully", 
      booking 
    });
  } catch (error) {
    console.error('Error updating air ticket booking status:', error);
    return NextResponse.json(
      { error: 'Failed to update air ticket booking status' },
      { status: 500 }
    );
  }
} 
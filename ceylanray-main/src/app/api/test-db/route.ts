import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  try {
    // Test database connection
    const prisma = new PrismaClient();
    
    // Test basic connection
    await prisma.$connect();
    
    // Test a simple query
    const packageCount = await prisma.packageWithoutOffers.count();
    const hotelCount = await prisma.hotel.count();
    
    await prisma.$disconnect();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        packageCount,
        hotelCount,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Database connection test failed:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

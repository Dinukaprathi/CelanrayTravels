import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Return a mock success response
  return NextResponse.json({ success: true });
} 
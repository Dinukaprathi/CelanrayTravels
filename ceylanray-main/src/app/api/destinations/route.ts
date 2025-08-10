import { NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM "Destination" ORDER BY "createdAt" DESC'
    );
    
    console.log('Fetched destinations from database:', result.rows); // Debug log
    console.log('Number of destinations found:', result.rows.length); // Debug log
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    // Insert a test destination
    const result = await query(
      `INSERT INTO "Destination" ("id", "destination_id", "destination", "destination_name", "description", "image_url", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        crypto.randomUUID(),
        'sigiriya-test',
        'Sigiriya',
        'Sigiriya Rock Fortress',
        'Ancient palace and fortress complex built on top of a massive rock. One of the most visited historical sites in Sri Lanka.',
        '/home/recommended/sigiriya.webp',
        new Date(),
        new Date()
      ]
    );
    
    console.log('Test destination created:', result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating test destination:', error);
    return NextResponse.json(
      { error: 'Failed to create test destination' },
      { status: 500 }
    );
  }
}

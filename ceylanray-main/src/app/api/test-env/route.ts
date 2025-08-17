import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check what environment variables are available
    const databaseUrl = process.env.DATABASE_URL;
    const nodeEnv = process.env.NODE_ENV;
    
    return NextResponse.json({
      success: true,
      message: 'Environment variables check',
      data: {
        hasDatabaseUrl: !!databaseUrl,
        databaseUrlLength: databaseUrl ? databaseUrl.length : 0,
        databaseUrlPreview: databaseUrl ? databaseUrl.substring(0, 20) + '...' : 'NOT_SET',
        nodeEnv,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error checking environment variables',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

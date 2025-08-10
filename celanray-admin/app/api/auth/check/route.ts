import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const adminName = req.cookies.get('admin_name');
    const adminEmail = req.cookies.get('admin_email');

    if (adminName && adminEmail) {
      return NextResponse.json({
        isAuthenticated: true,
        admin: {
          name: adminName.value,
          email: adminEmail.value
        }
      });
    }

    return NextResponse.json({
      isAuthenticated: false,
      admin: null
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({
      isAuthenticated: false,
      admin: null
    }, { status: 500 });
  }
}

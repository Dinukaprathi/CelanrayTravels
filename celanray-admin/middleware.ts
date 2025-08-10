import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Get the admin_name cookie
    const adminName = request.cookies.get('admin_name');
    
    // If no admin cookie is found, redirect to login
    if (!adminName || !adminName.value) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Check if user is trying to access login page while already authenticated
  if (request.nextUrl.pathname === '/login') {
    const adminName = request.cookies.get('admin_name');
    
    // If admin cookie exists, redirect to dashboard
    if (adminName && adminName.value) {
      const dashboardUrl = new URL('/admin/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login']
};

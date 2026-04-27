import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from './lib/jwt';

// Define the routes that require authentication
const protectedRoutes = ['/dashboard', '/api/protected'];
const adminRoutes = ['/admin', '/api/admin'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Check if the current route is protected
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route)) || 
                      adminRoutes.some(route => pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  // Look for token in Authorization header
  let token = req.headers.get('authorization')?.split(' ')[1];

  // If not in header, check cookies (useful for Next.js app router frontend)
  if (!token) {
    token = req.cookies.get('token')?.value;
  }

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  // Verify the token
  const payload = await verifyJwt(token);

  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized: Invalid or expired token' }, { status: 401 });
  }

  // For admin routes, verify role
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  if (isAdminRoute && payload.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
  }

  // Token is valid, proceed
  const requestHeaders = new Headers(req.headers);
  
  // Pass user info via headers so API routes can read it easily
  requestHeaders.set('x-user-id', payload.sub as string);
  requestHeaders.set('x-user-role', payload.role as string);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Apply middleware to specific paths
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/protected/:path*',
    '/api/admin/:path*'
  ],
};

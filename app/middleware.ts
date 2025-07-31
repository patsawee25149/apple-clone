import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Protected routes that require authentication
const protectedRoutes = [
  '/profile',
  '/orders',
  '/wishlist',
  '/settings',
  '/admin'
];

// Auth routes that should redirect to home if user is already logged in
const authRoutes = [
  '/user/signin',
  '/user/signup'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the route is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // If it's a protected route
  if (isProtectedRoute) {
    if (!token) {
      // Redirect to signin if no token
      const url = request.nextUrl.clone();
      url.pathname = '/user/signin';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    try {
      // Verify token
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      // Invalid token, redirect to signin
      const url = request.nextUrl.clone();
      url.pathname = '/user/signin';
      url.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(url);
      
      // Clear invalid token
      response.cookies.set('auth-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0
      });
      
      return response;
    }
  }

  // If it's an auth route and user is already logged in
  if (isAuthRoute && token) {
    try {
      jwt.verify(token, JWT_SECRET);
      // User is logged in, redirect to home
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    } catch {
      // Invalid token, allow access to auth route
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/orders/:path*',
    '/wishlist/:path*',
    '/settings/:path*',
    '/admin/:path*',
    '/user/signin',
    '/user/signup'
  ]
};
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Protected routes that require authentication
const protectedRoutes = [
  '/profile',    // ⭐ เพิ่มแล้ว
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

  // ⭐ ตรวจสอบว่า route เป็น protected route หรือไม่
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // ⭐ ตรวจสอบว่า route เป็น auth route หรือไม่
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // ⭐ จัดการ Protected Routes
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
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      // ⭐ ตรวจสอบว่า token ใกล้หมดอายุหรือไม่ (สำหรับ rememberMe = false)
      const now = Math.floor(Date.now() / 1000);
      const tokenExp = decoded.exp;
      const timeUntilExpiry = tokenExp - now;
      
      // ถ้า token เหลือเวลาน้อยกว่า 1 วัน และไม่ได้เลือก rememberMe
      if (timeUntilExpiry < 86400 && !decoded.rememberMe) {
        // อาจจะแสดง warning หรือ auto-refresh token
        console.log('Token expiring soon for user:', decoded.userId);
      }
      
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

  // ⭐ จัดการ Auth Routes (signin, signup)
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

// ⭐ Config ต้องอยู่ท้ายไฟล์
export const config = {
  matcher: [
    '/profile/:path*',  // ⭐ เพิ่มแล้ว
    '/orders/:path*',
    '/wishlist/:path*',
    '/settings/:path*',
    '/admin/:path*',
    '/user/signin',
    '/user/signup'
  ]
};
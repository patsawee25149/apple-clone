import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { JWT_SECRET } from '@/app/lib/auth-config';

// jose ต้องการกุญแจเป็นชนิด Uint8Array ไม่ใช่ string
const secret = new TextEncoder().encode(JWT_SECRET);

const protectedRoutes = ['/profile', '/orders', '/wishlist', '/settings', '/admin'];
const authRoutes = ['/user/signin', '/user/signup'];

async function isValidToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secret, { algorithms: ['HS256'] });
    return true;
  } catch {
    return false; // หมดอายุ ถูกแก้ หรือเซ็นด้วยกุญแจอื่น
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    if (!token || !(await isValidToken(token))) {
      const url = request.nextUrl.clone();
      url.pathname = '/user/signin';
      url.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(url);

      if (token) {
        // มี token แต่ใช้ไม่ได้ → ล้างคุกกี้ทิ้ง
        response.cookies.set('auth-token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 0,
        });
      }
      return response;
    }
    return NextResponse.next();
  }

  if (isAuthRoute && token && (await isValidToken(token))) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
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
    '/user/signup',
  ],
};
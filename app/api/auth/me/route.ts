import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { findUserById, excludePassword } from '@/app/lib/user-utils'; // ⚠️ ต้องสร้างไฟล์นี้

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    // 🔍 STEP 1: Extract JWT token from cookies
    const token = request.cookies.get('auth-token')?.value;
    
    // 🔒 STEP 2: Check if token exists
    if (!token) {
      return NextResponse.json(
        { message: 'ไม่พบการยืนยันตัวตน' }, // "Authentication not found"
        { status: 401 } // Unauthorized
      );
    }

    // 🔐 STEP 3: Verify JWT token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
      // decoded จะมี: { userId, email, name, rememberMe, iat, exp }
    } catch (error) {
      return NextResponse.json(
        { message: 'Token ไม่ถูกต้อง' }, // "Invalid token"
        { status: 401 }
      );
    }

    // 🔍 STEP 4: Find user by ID from token
    const user = findUserById(decoded.userId); // ⚠️ Helper function ต้องสร้าง

    if (!user) {
      return NextResponse.json(
        { message: 'ไม่พบข้อมูลผู้ใช้' }, // "User not found"
        { status: 404 }
      );
    }

    // 🛡️ STEP 5: Remove password from response
    const userProfile = excludePassword(user); // ⚠️ Helper function ต้องสร้าง

    // ✅ STEP 6: Return user profile
    return NextResponse.json(
      { 
        user: userProfile,
        rememberMe: decoded.rememberMe || false
      },
      { status: 200 }
    );

  } catch (error) {
    // 🚨 STEP 7: Handle unexpected errors
    console.error('Get profile error:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, // "Internal server error"
      { status: 500 }
    );
  }
}
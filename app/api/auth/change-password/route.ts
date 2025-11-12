import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getUsers,saveUsers, User } from '@/app/lib/user-utils';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

export async function PUT(request: NextRequest) {
  try {
    // ⭐ ตรวจสอบ authentication
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: 'ไม่พบการยืนยันตัวตน' },
        { status: 401 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { message: 'Token ไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // ⭐ Validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: 'กรุณากรอกรหัสผ่านให้ครบถ้วน' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: 'รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร' },
        { status: 400 }
      );
    }

    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === decoded.userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { message: 'ไม่พบข้อมูลผู้ใช้' },
        { status: 404 }
      );
    }

    // ⭐ ตรวจสอบรหัสผ่านปัจจุบัน
    const isValidCurrentPassword = await bcrypt.compare(currentPassword, users[userIndex].password);
    if (!isValidCurrentPassword) {
      return NextResponse.json(
        { message: 'รหัสผ่านปัจจุบันไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    // ⭐ เข้ารหัสรหัสผ่านใหม่
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // ⭐ อัปเดตรหัสผ่าน
    users[userIndex].password = hashedNewPassword;

    // ⭐ บันทึกลงไฟล์
    saveUsers(users);

    return NextResponse.json(
      { message: 'เปลี่ยนรหัสผ่านสำเร็จ' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' },
      { status: 500 }
    );
  }
}
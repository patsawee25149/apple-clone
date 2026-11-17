import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { JWT_SECRET } from '@/app/lib/auth-config';


const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  country: string;
  password: string;
  createdAt: string;
}

function getUsers(): User[] {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveUsers(users: User[]): void {
  try {
    const dir = path.dirname(USERS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    throw new Error('Failed to save users data');
  }
}

export async function PUT(request: NextRequest) {
  try {
    // ⭐ ตรวจสอบ authentication จาก cookie
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
    const { name, lastname, email, phone, country } = body;

    // ⭐ Validation
    if (!name || !lastname || !email) {
      return NextResponse.json(
        { message: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' },
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

    // ⭐ ตรวจสอบ email ซ้ำ (ยกเว้นของตัวเอง)
    const existingEmailUser = users.find(u => u.email === email && u.id !== decoded.userId);
    if (existingEmailUser) {
      return NextResponse.json(
        { message: 'อีเมลนี้มีผู้ใช้แล้ว' },
        { status: 400 }
      );
    }

    // ⭐ อัปเดตข้อมูล user
    users[userIndex] = {
      ...users[userIndex],
      name: name.trim(),
      lastname: lastname.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      country: country || '',
    };

    // ⭐ บันทึกลงไฟล์
    saveUsers(users);

    // ⭐ ส่งข้อมูลที่อัปเดตกลับไป (ไม่รวม password)
    const updatedUser = {
      id: users[userIndex].id,
      name: users[userIndex].name,
      lastname: users[userIndex].lastname,
      email: users[userIndex].email,
      phone: users[userIndex].phone,
      country: users[userIndex].country,
    };

    return NextResponse.json(
      { 
        message: 'อัปเดตข้อมูลสำเร็จ',
        user: updatedUser
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' },
      { status: 500 }
    );
  }
}

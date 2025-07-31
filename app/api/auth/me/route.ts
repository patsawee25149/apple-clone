import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

function getUsers(): User[] {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'ไม่พบ token' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const users = getUsers();
    const user = users.find(u => u.id === decoded.userId);

    if (!user) {
      return NextResponse.json(
        { message: 'ไม่พบผู้ใช้' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        country: user.country,
        phone: user.phone
      }
    });

  } catch (error) {
    return NextResponse.json(
      { message: 'Token ไม่ถูกต้อง' },
      { status: 401 }
    );
  }
}
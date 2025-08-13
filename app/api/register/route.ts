// app/api/register/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    // 1. ตรวจสอบข้อมูลเบื้องต้น
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    // 2. ตรวจสอบว่า username หรือ email ซ้ำหรือไม่
    const [existingUsers]: any = await pool.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { message: 'ชื่อผู้ใช้หรืออีเมลนี้มีอยู่ในระบบแล้ว' },
        { status: 409 } // 409 Conflict
      );
    }

    // 3. เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4(); // สร้าง ID ที่ไม่ซ้ำกัน

    // 4. บันทึกผู้ใช้ใหม่ลงฐานข้อมูล
    await pool.execute(
      'INSERT INTO users (id, username, email, password, updatedAt) VALUES (?, ?, ?, ?, NOW())',
      [userId, username, email, hashedPassword]
    );

    return NextResponse.json(
      { message: 'สมัครสมาชิกสำเร็จ!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดที่ไม่คาดคิด' },
      { status: 500 }
    );
  }
}

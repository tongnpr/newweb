// app/api/user/change-password/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ message: 'ไม่ได้รับอนุญาต' }, { status: 401 });
    }

    try {
        const { oldPassword, newPassword } = await request.json();
        const userId = session.user.id;

        // 1. ดึงรหัสผ่านปัจจุบันของผู้ใช้จาก DB
        const [rows]: any = await pool.execute(
            'SELECT password FROM users WHERE id = ?',
            [userId]
        );

        if (rows.length === 0) {
            return NextResponse.json({ message: 'ไม่พบผู้ใช้งาน' }, { status: 404 });
        }

        const user = rows[0];
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        // 2. ตรวจสอบว่ารหัสผ่านปัจจุบันถูกต้องหรือไม่
        if (!isPasswordCorrect) {
            return NextResponse.json({ message: 'รหัสผ่านปัจจุบันไม่ถูกต้อง' }, { status: 400 });
        }

        // 3. เข้ารหัสรหัสผ่านใหม่และอัปเดตลง DB
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await pool.execute(
            'UPDATE users SET password = ?, updatedAt = NOW() WHERE id = ?',
            [hashedNewPassword, userId]
        );

        return NextResponse.json({ message: 'เปลี่ยนรหัสผ่านสำเร็จ' }, { status: 200 });

    } catch (error) {
        console.error('Change Password Error:', error);
        return NextResponse.json({ message: 'เกิดข้อผิดพลาดที่ไม่คาดคิด' }, { status: 500 });
    }
}

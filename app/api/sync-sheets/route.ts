// app/api/sync-sheets/route.ts
import { syncGoogleSheetsToMySQL } from '@/lib/sheets';
import { NextResponse } from 'next/server';

export async function GET() {
  // เพิ่มการป้องกัน เช่น เช็ค secret key เพื่อไม่ให้ใครก็ไดเรียก API นี้
  const result = await syncGoogleSheetsToMySQL();
  if (result.success) {
    return NextResponse.json(result);
  } else {
    return NextResponse.json(result, { status: 500 });
  }
}
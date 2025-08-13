// app/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * นี่คือหน้าแรกของเว็บไซต์ (/)
 * มันจะทำงานบน Server เพื่อตรวจสอบ Session ของผู้ใช้
 * และทำการ Redirect ไปยังหน้าที่เหมาะสมโดยอัตโนมัติ
 */
export default async function HomePage() {
  // ดึงข้อมูล session จากฝั่ง server
  const session = await getServerSession(authOptions);

  // ตรวจสอบว่ามี session (ล็อกอินอยู่) หรือไม่
  if (session) {
    // ถ้ามี, ให้ redirect ไปยังหน้า overview ของแดชบอร์ด
    redirect("/overview");
  } else {
    // ถ้าไม่มี, ให้ redirect ไปยังหน้า login
    redirect("/login");
  }

  // เนื่องจากมีการ redirect เกิดขึ้นเสมอ ส่วนนี้จึงอาจจะไม่เคยถูกแสดงผล
  // แต่ใส่ไว้เพื่อให้ Component คืนค่าอะไรบางอย่างกลับไป
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}

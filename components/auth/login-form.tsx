// components/auth/login-form.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // แก้ไข: import toast จาก sonner โดยตรง

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    setLoading(false);

    if (result?.ok) {
      toast.success("เข้าสู่ระบบสำเร็จ!");
      router.push('/overview');
    } else {
      // แก้ไข: เรียกใช้ toast.error ของ sonner
      toast.error("เกิดข้อผิดพลาด", {
        description: result?.error || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
      });
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">เข้าสู่ระบบ</CardTitle>
        <CardDescription>กรอกชื่อผู้ใช้และรหัสผ่านเพื่อเข้าสู่แดชบอร์ด</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">ชื่อผู้ใช้</Label>
            <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">รหัสผ่าน</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "กำลังโหลด..." : "เข้าสู่ระบบ"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

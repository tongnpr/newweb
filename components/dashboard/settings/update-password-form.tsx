// components/dashboard/settings/update-password-form.tsx
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function UpdatePasswordForm() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("รหัสผ่านใหม่ไม่ตรงกัน");
            return;
        }
        if (newPassword.length < 6) {
            toast.error("รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
            return;
        }
        setLoading(true);

        try {
            const response = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("เปลี่ยนรหัสผ่านสำเร็จ!");
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                toast.error("เกิดข้อผิดพลาด", { description: data.message });
            }
        } catch (error) {
            toast.error("เกิดข้อผิดพลาด", { description: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="grid gap-2 md:grid-cols-3 md:items-center md:gap-4">
                <Label htmlFor="oldPassword" className="md:text-right">
                    รหัสผ่านปัจจุบัน
                </Label>
                <Input
                    id="oldPassword"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    className="md:col-span-2"
                />
            </div>
            <div className="grid gap-2 md:grid-cols-3 md:items-center md:gap-4">
                <Label htmlFor="newPassword" className="md:text-right">
                    รหัสผ่านใหม่
                </Label>
                <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="md:col-span-2"
                />
            </div>
            <div className="grid gap-2 md:grid-cols-3 md:items-center md:gap-4">
                <Label htmlFor="confirmPassword" className="md:text-right">
                    ยืนยันรหัสผ่านใหม่
                </Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="md:col-span-2"
                />
            </div>
            <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                    {loading ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
                </Button>
            </div>
        </form>
    );
}

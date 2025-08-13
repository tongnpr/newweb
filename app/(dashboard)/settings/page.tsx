// app/(dashboard)/settings/page.tsx
import { UpdatePasswordForm } from "@/components/dashboard/settings/update-password-form";
import { ThemeSettings } from "@/components/dashboard/settings/theme-settings";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">ตั้งค่า</h1>
        <p className="text-muted-foreground">
          จัดการการตั้งค่าบัญชีและธีมของเว็บไซต์
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>เปลี่ยนรหัสผ่าน</CardTitle>
          <CardDescription>
            เพื่อความปลอดภัย ควรเปลี่ยนรหัสผ่านเป็นประจำ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UpdatePasswordForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ธีม</CardTitle>
          <CardDescription>
            ปรับแต่งหน้าตาของแดชบอร์ด
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeSettings />
        </CardContent>
      </Card>
    </div>
  );
}

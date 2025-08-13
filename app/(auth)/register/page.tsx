
// app/(auth)/register/page.tsx
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <RegisterForm />
    </div>
  );
}

// app/(dashboard)/layout.tsx
import { Sidebar } from '@/components/dashboard/sidebar';
import { UserNav } from '@/components/dashboard/user-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-muted/40">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
          {/* อาจจะใส่ Breadcrumbs หรือ Search bar ตรงนี้ */}
          <div className="ml-auto flex items-center gap-4">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
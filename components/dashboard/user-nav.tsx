// components/dashboard/user-nav.tsx
"use client"

import { useSession, signOut } from "next-auth/react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function UserNav() {
  // ดึงข้อมูล session ของผู้ใช้
  const { data: session } = useSession()

  if (!session) {
    // ถ้าไม่มี session (ยังโหลดไม่เสร็จ หรือไม่ได้ login) ให้แสดงปุ่ม Login แทน
    return (
      <Button asChild>
        <Link href="/login">เข้าสู่ระบบ</Link>
      </Button>
    )
  }

  const { user } = session
  const userInitial = user?.name?.charAt(0).toUpperCase() || 'U'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {/* สามารถใส่ AvatarImage ได้ถ้ามี URL รูปภาพ */}
            {/* <AvatarImage src={user?.image || ""} alt={user?.name || ""} /> */}
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            {/* เรายังไม่ได้เก็บ email ใน session แต่สามารถเพิ่มได้ในอนาคต */}
            {/* <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p> */}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/settings">
            <DropdownMenuItem>
              ตั้งค่า
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/login' })}>
          ออกจากระบบ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

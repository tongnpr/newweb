// app/(dashboard)/overview/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"

// กำหนด Type ของข้อมูลที่รับเข้ามา (ควรจะตรงกับข้อมูลที่ดึงจาก DB)
export type SaleData = {
  product_name: string
  category: string | null
  sales_date: string
  quantity: number
  total_price: number
}

export const columns: ColumnDef<SaleData>[] = [
  {
    accessorKey: "product_name",
    header: "ชื่อสินค้า",
  },
  {
    accessorKey: "category",
    header: "หมวดหมู่",
  },
  {
    accessorKey: "sales_date",
    header: "วันที่ขาย",
    cell: ({ row }) => {
      // จัดรูปแบบวันที่ให้อ่านง่าย
      const date = new Date(row.getValue("sales_date"))
      const formatted = date.toLocaleDateString("th-TH", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right">จำนวน</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("quantity"))
      return <div className="text-right font-medium">{amount}</div>
    },
  },
  {
    accessorKey: "total_price",
    header: () => <div className="text-right">ยอดรวม (฿)</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_price"))
      const formatted = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]

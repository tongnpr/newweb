// app/(dashboard)/overview/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from './data-table'; // เราจะสร้างคอมโพเนนต์นี้
import { columns } from './columns'; // และไฟล์นี้
import pool from "@/lib/db";

async function getData() {
  // ดึงข้อมูลโดยตรงจาก DB (ใน Server Component)
  try {
    const [rows] = await pool.execute('SELECT product_name, category, sales_date, quantity, total_price FROM dashboard_data ORDER BY sales_date DESC LIMIT 100;');
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export default async function OverviewPage() {
  const data: any = await getData();

  // คำนวณค่าสรุป
  const totalSales = data.reduce((acc: number, item: any) => acc + Number(item.total_price), 0);
  const totalQuantity = data.reduce((acc: number, item: any) => acc + item.quantity, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ยอดขายรวม</CardTitle>
          <span className="text-2xl">฿</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSales.toLocaleString('th-TH')}</div>
          <p className="text-xs text-muted-foreground">ยอดขายทั้งหมดจากข้อมูลที่แสดง</p>
        </CardContent>
      </Card>
      {/* สามารถเพิ่ม Card สรุปอื่นๆ ได้ตามต้องการ */}
      
      <div className="col-span-full">
        <Card>
          <CardHeader>
            <CardTitle>รายการล่าสุด</CardTitle>
          </CardHeader>
          <CardContent>
             <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
// lib/sheets.ts
import { google } from 'googleapis';
import pool from './db';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function syncGoogleSheetsToMySQL() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A2:E', // ปรับแก้ Range ให้ตรงกับชีตของคุณ
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log('No data found in Google Sheet.');
      return { success: true, message: 'No new data to sync.' };
    }

    // แปลงข้อมูลเป็น Object
    const dataToInsert = rows.map(row => ({
      product_name: row[0],
      category: row[1],
      sales_date: new Date(row[2]), // ควรตรวจสอบ Format วันที่ให้ถูกต้อง
      quantity: parseInt(row[3]),
      total_price: parseFloat(row[4]),
    }));

    // ล้างข้อมูลเก่าเพื่อใส่ข้อมูลใหม่ (หรือใช้วิธี UPSERT ที่ซับซ้อนกว่า)
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        await connection.execute('DELETE FROM dashboard_data');
        const query = 'INSERT INTO dashboard_data (product_name, category, sales_date, quantity, total_price) VALUES ?';
        const values = dataToInsert.map(item => [item.product_name, item.category, item.sales_date, item.quantity, item.total_price]);
        
        await connection.query(query, [values]);
        await connection.commit();
        
        return { success: true, message: `Synced ${dataToInsert.length} rows.` };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }

  } catch (error) {
    console.error('Error syncing Google Sheets:', error);
    return { success: false, message: 'Failed to sync data.' };
  }
}
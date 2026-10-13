# 📘 Hari 13: SQL Date, String & Missing Data Handling

Sebelum data dianalisis atau dimasukkan ke dashboard Business Intelligence, data mentah di database harus dibersihkan secara presisi menggunakan fungsi tanggal, manipulasi teks, dan penanganan nilai kosong.

---

## 🎯 Target Pembelajaran
1. Menguasai fungsi manipulasi waktu: `DATE_TRUNC`, `EXTRACT`, `DATEDIFF`, `AGE`.
2. Menguasai fungsi string: `CONCAT`, `SUBSTRING`, `SPLIT_PART`, `LOWER`, `REPLACE`, `TRIM`.
3. Menguasai penanganan nilai hilang: `COALESCE`, `NULLIF`, `ISNULL`.
4. Menguasai konversi tipe data (*Type Casting*).

---

## 🧠 Teori & Sintaks Kunci

### 1. Manipulasi Tanggal & Waktu
- **`DATE_TRUNC('month', order_date)`**: Membulatkan tanggal ke awal periode (contoh: `'2026-03-18'` ➔ `'2026-03-01'`). Sangat berguna untuk agregasi bulanan/mingguan.
- **`EXTRACT(DOW FROM order_date)`**: Mengambil hari dalam seminggu (Day of Week, 0=Minggu, 1=Senin, dst) untuk menganalisis pola belanja akhir pekan vs hari kerja.
- **`EXTRACT(HOUR FROM order_timestamp)`**: Mengetahui jam puncak (*peak hours*) transaksi.

---

### 2. Penanganan Nilai NULL: `COALESCE` & `NULLIF`
- **`COALESCE(val1, val2, val3, ...)`**: Mengambil nilai pertama yang tidak `NULL`.
  ```sql
  -- Jika kolom diskon NULL, ganti dengan angka 0
  SELECT order_id, COALESCE(discount_amount, 0) AS safe_discount FROM orders;
  ```
- **`NULLIF(val1, val2)`**: Mengembalikan `NULL` jika $val1 = val2$. Sangat krusial untuk mencegah error *Division by Zero*:
  ```sql
  -- Mencegah error pembagian dengan nol
  SELECT revenue / NULLIF(total_orders, 0) AS safe_aov FROM daily_summary;
  ```

---

### 3. Pembersihan Teks & Type Casting
```sql
SELECT 
    TRIM(LOWER(email)) AS clean_email,
    REPLACE(phone_number, '-', '') AS clean_phone,
    CAST(quantity AS FLOAT) AS qty_float,
    total_amount::NUMERIC(12, 2) AS formatted_amount
FROM customers;
```

---

## ✍️ Kuis Mandiri Hari 13

**Soal:**
Tulis query SQL untuk menghitung berapa lama rata-rata (dalam satuan hari) waktu pengiriman barang dari `order_date` sampai `shipped_date` untuk setiap kurir pengiriman!

**Jawaban:**
```sql
SELECT 
    shipping_courier,
    ROUND(AVG(DATE_PART('day', shipped_date - order_date)), 1) AS avg_delivery_days
FROM orders
WHERE order_status = 'COMPLETED' 
  AND shipped_date IS NOT NULL
GROUP BY shipping_courier
ORDER BY avg_delivery_days ASC;
```

---

## ✅ Checklist Hari 13
- [ ] Menguasai pembulatan tanggal dengan `DATE_TRUNC`.
- [ ] Mampu mencegah error *division by zero* dengan `NULLIF`.
- [ ] Menguasai penggantian nilai default dengan `COALESCE`.
- [ ] Siap melanjutkan ke [Hari 14: Mini Project 2 – SQL Retail & RFM Analytics](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_14_Mini_Project_2_SQL_Retail_RFM_Analytics.md).

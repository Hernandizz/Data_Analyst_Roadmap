# 📘 Hari 09: SQL Agregasi, Grouping & Having

Menghitung total, rata-rata, dan mengelompokkan data ke dalam kategori adalah tugas harian inti seorang Data Analyst saat membuat metrik ringkasan.

---

## 🎯 Target Pembelajaran
1. Menguasai fungsi agregasi: `COUNT()`, `COUNT(DISTINCT ...)`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.
2. Menguasai klausa `GROUP BY` untuk agregasi multi-dimensi.
3. Memahami perbedaan mendasar antara `WHERE` dan `HAVING`.
4. Menerapkan operator filtering teks dan rentang: `LIKE`, `IN`, `BETWEEN`.

---

## 🧠 Teori & Sintaks Kunci

### 1. Fungsi Agregasi
- `COUNT(*)`: Menghitung total seluruh baris (termasuk yang bernilai `NULL`).
- `COUNT(column)`: Menghitung total baris yang nilainya tidak `NULL`.
- `COUNT(DISTINCT customer_id)`: Menghitung jumlah unik pelanggan (menghilangkan duplikasi transaksi berulang).
- `SUM(sales_amount)`: Menjumlahkan total angka.
- `AVG(sales_amount)`: Menghitung rata-rata nilai.
- `MIN(price)` & `MAX(price)`: Mencari nilai terendah dan tertinggi.

---

### 2. Perbedaan Krusial `WHERE` vs `HAVING`

```
┌───────────────────────────────────┬───────────────────────────────────┐
│              WHERE                │              HAVING               │
├───────────────────────────────────┼───────────────────────────────────┤
│ Menyaring baris individual        │ Menyaring hasil kelompok          │
│ SEBELUM dilakukan agregasi/group. │ SETELAH dilakukan agregasi.       │
│ TIDAK BISA menggunakan fungsi     │ WAJIB/BISA menggunakan fungsi     │
│ agregasi (misal: WHERE SUM(x)>0 ❌)│ agregasi (misal: HAVING SUM(x)>0) │
└───────────────────────────────────┴───────────────────────────────────┘
```

**Urutan Lengkap Eksekusi Query:**
1. `FROM` & `JOIN` (Tentukan tabel sumber)
2. `WHERE` (Filter baris mentah)
3. `GROUP BY` (Kelompokkan data)
4. `HAVING` (Filter hasil kelompok)
5. `SELECT` (Pilih & hitung kolom agregasi)
6. `DISTINCT` (Hapus duplikasi tampilan)
7. `ORDER BY` (Urutkan hasil)
8. `LIMIT` (Batasi jumlah baris output)

---

## 💼 Latihan Praktik Terpandu

```sql
-- Analisis Omzet dan Rata-rata Belanja per Kategori Produk
-- Hanya untuk transaksi yang sudah selesai (COMPLETED)
-- Dan hanya tampilkan kategori yang total omzetnya > Rp 50.000.000
SELECT 
    category_name,
    COUNT(order_id) AS total_orders,
    COUNT(DISTINCT customer_id) AS unique_buyers,
    SUM(total_amount) AS total_revenue,
    ROUND(AVG(total_amount), 2) AS average_order_value
FROM orders
WHERE order_status = 'COMPLETED'
GROUP BY category_name
HAVING SUM(total_amount) > 50000000
ORDER BY total_revenue DESC;
```

---

## ✍️ Kuis Mandiri Hari 9

**Soal:**
Mengapa query berikut menghasilkan error di SQL?
```sql
SELECT city, AVG(total_amount)
FROM orders
WHERE AVG(total_amount) > 500000
GROUP BY city;
```
Bagaimana cara memperbaikinya?

**Jawaban:**
Error karena fungsi agregasi `AVG(total_amount)` tidak boleh ditaruh di dalam klausa `WHERE`.
Perbaikannya adalah memindahkan kondisi tersebut ke klausa `HAVING`:
```sql
SELECT city, AVG(total_amount) AS avg_sales
FROM orders
GROUP BY city
HAVING AVG(total_amount) > 500000;
```

---

## ✅ Checklist Hari 9
- [ ] Mampu menggunakan `COUNT(DISTINCT)` untuk menghitung entitas unik.
- [ ] Menguasai perbedaan fungsi `WHERE` dan `HAVING`.
- [ ] Menyelesaikan latihan Bagian 2 di [retail_analyst_practice.sql](file:///c:/Users/Asus/Documents/Project/Data-Analyst/SQL%20Learning/retail_analyst_practice.sql).
- [ ] Siap melanjutkan ke [Hari 10: SQL Multi-Table Joins](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_10_SQL_Multi_Table_Joins.md).

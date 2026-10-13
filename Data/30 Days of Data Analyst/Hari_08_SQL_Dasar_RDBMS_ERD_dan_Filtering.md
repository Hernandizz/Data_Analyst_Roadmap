# 📘 Hari 08: RDBMS, ERD & Query SQL Fundamental

Selamat datang di Minggu ke-2! Saat dataset perusahaan mencapai jutaan baris, Excel tidak lagi sanggup menampungnya. Di sinilah **SQL (Structured Query Language)** menjadi bahasa wajib nomor satu bagi setiap Data Analyst.

---

## 🎯 Target Pembelajaran
1. Memahami konsep *Relational Database Management System (RDBMS)*, Primary Key (PK), dan Foreign Key (FK).
2. Membaca dan memahami diagram relasi (*Entity Relationship Diagram - ERD*).
3. Menguasai sintaks dasar: `SELECT`, `FROM`, `WHERE`, `DISTINCT`, `ORDER BY`, `LIMIT` / `TOP`.
4. Menerapkan operator perbandingan (`=`, `!=`, `<>`, `>`, `<`, `>=`, `<=`) dan logika (`AND`, `OR`, `NOT`).

---

## 🧠 Teori & Konsep Kunci

### 1. Anatomi Relational Database (RDBMS)
- **Table:** Tempat penyimpanan data dalam baris (*records*) dan kolom (*attributes*).
- **Primary Key (PK):** Kolom dengan nilai unik yang membedakan setiap baris data (contoh: `customer_id`, `order_id`). Tidak boleh `NULL` dan tidak boleh duplikat.
- **Foreign Key (FK):** Kolom di suatu tabel yang merujuk ke Primary Key di tabel lain untuk membentuk hubungan relasi (contoh: `customer_id` di tabel `orders`).

```
┌──────────────────────┐         ┌────────────────────────┐
│     CUSTOMERS        │         │         ORDERS         │
├──────────────────────┤         ├────────────────────────┤
│ PK customer_id (1)   │◄────────┼── FK customer_id (N)   │
│    customer_name     │  1:N    │   PK order_id          │
│    city              │         │      order_date        │
└──────────────────────┘         │      total_amount      │
                                 └────────────────────────┘
```

---

### 2. Sintaks SQL Fundamental

Urutan penulisan query dasar:
```sql
SELECT DISTINCT
    column1,
    column2
FROM table_name
WHERE condition_1 AND (condition_2 OR condition_3)
ORDER BY column1 ASC, column2 DESC
LIMIT 10;
```

> **Urutan Eksekusi Query oleh Mesin Database:**
> `FROM` ➔ `WHERE` ➔ `SELECT` ➔ `DISTINCT` ➔ `ORDER BY` ➔ `LIMIT`

---

## 💼 Latihan Praktik Terpandu

Materi & script latihan di workspace:
- [SQL Learning/README.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/SQL%20Learning/README.md)
- [retail_analyst_practice.sql](file:///c:/Users/Asus/Documents/Project/Data-Analyst/SQL%20Learning/retail_analyst_practice.sql)

### Contoh Kasus 1: Mengambil Transaksi Tertinggi di Jakarta
```sql
-- Ambil 10 transaksi completed terbesar yang terjadi di kota Jakarta
SELECT 
    order_id,
    customer_id,
    order_date,
    total_amount,
    order_status
FROM orders
WHERE city = 'Jakarta' 
  AND order_status = 'COMPLETED'
ORDER BY total_amount DESC
LIMIT 10;
```

---

## ✍️ Kuis Mandiri Hari 8

**Soal:**
Tulis query SQL untuk menampilkan `customer_id`, `email`, dan `city` dari tabel `customers` yang berdomisili di `'Surabaya'` atau `'Bandung'`, di mana status akunnya adalah `'ACTIVE'`, diurutkan berdasarkan `created_at` dari yang paling baru!

**Jawaban:**
```sql
SELECT 
    customer_id, 
    email, 
    city 
FROM customers 
WHERE city IN ('Surabaya', 'Bandung') 
  AND account_status = 'ACTIVE' 
ORDER BY created_at DESC;
```

---

## ✅ Checklist Hari 8
- [ ] Memahami perbedaan Primary Key dan Foreign Key.
- [ ] Memahami urutan penulisan dan urutan eksekusi query SQL.
- [ ] Menyelesaikan latihan Bagian 1 di `retail_analyst_practice.sql`.
- [ ] Siap melanjutkan ke [Hari 09: SQL Agregasi, Grouping & Having](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_09_SQL_Agregasi_Grouping_dan_Having.md).

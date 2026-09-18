# 📘 Hari 10: SQL Multi-Table Joins

Di dalam arsitektur database relasional, data dinormalisasi ke dalam banyak tabel terpisah (pelanggan, pesanan, rincian pesanan, produk, cabang). `JOIN` adalah teknik untuk menyatukan kembali data tersebut.

---

## 🎯 Target Pembelajaran
1. Memahami perbedaan mendasar: `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN`, `CROSS JOIN`.
2. Mampu menghubungkan 3 atau lebih tabel sekaligus secara efisien.
3. Menggunakan *Left Join* untuk mendeteksi data yang hilang / tidak pernah bertransaksi (*Unmatched Records*).
4. Menghindari kesalahan fatal *Cartesian Product (Fan-out Duplication)*.

---

## 🧠 Diagram & Teori Jenis JOIN

```
      INNER JOIN                    LEFT JOIN                 FULL OUTER JOIN
   ┌───────┬───────┐            ┌───────┬───────┐            ┌───────┬───────┐
   │       │███████│            │███████│███████│            │███████│███████│
   │   A   │██ A∩B █│   B        │██ A ██│██ A∩B █│   B        │██ A ██│██ A∩B █│██ B ██│
   │       │███████│            │███████│███████│            │███████│███████│
   └───────┴───────┘            └───────┴───────┘            └───────┴───────┘
  Hanya data yang cocok        Semua data tabel A +         Semua data tabel A
  di kedua tabel.              data B yang cocok.           dan semua data B.
```

- **`INNER JOIN`**: Mengembalikan baris hanya jika ada kecocokan (*match*) di kedua tabel.
- **`LEFT JOIN`**: Mengembalikan semua baris dari tabel kiri (A), dan data yang cocok dari tabel kanan (B). Jika di B tidak ada kecocokan, kolom tabel B bernilai `NULL`.
- **`RIGHT JOIN`**: Mengembalikan semua data dari tabel kanan (B).
- **`FULL OUTER JOIN`**: Menggabungkan seluruh data dari kedua tabel tanpa terkecuali.
- **`CROSS JOIN`**: Menghasilkan kombinasi silang perkalian ($N \times M$ baris).

---

## 💼 Latihan Praktik Terpandu

### 1. Menghubungkan 4 Tabel Sekaligus
```sql
SELECT 
    c.customer_name,
    c.city,
    o.order_id,
    o.order_date,
    p.product_name,
    p.category,
    oi.quantity,
    oi.unit_price,
    (oi.quantity * oi.unit_price) AS line_total
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
WHERE o.order_status = 'COMPLETED'
ORDER BY o.order_date DESC;
```

---

### 2. Mencari Pelanggan yang "Tidak Pernah Belanja" (*Churn/Dormant*)
```sql
SELECT 
    c.customer_id,
    c.customer_name,
    c.email,
    c.registration_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;
```
*Penjelasan:* Ketika `LEFT JOIN` menghasilkan `o.order_id IS NULL`, itu membuktikan bahwa customer tersebut tidak memiliki relasi transaksi sama sekali di tabel `orders`.

---

## ✍️ Kuis Mandiri Hari 10

**Soal:**
Tabel `departments` memiliki 5 baris. Tabel `employees` memiliki 20 baris. 2 karyawan belum ditempatkan di departemen manapun (`dept_id IS NULL`). Berapa jumlah baris yang dihasilkan jika kita menjalankan:
1. `SELECT * FROM employees e INNER JOIN departments d ON e.dept_id = d.dept_id;`
2. `SELECT * FROM employees e LEFT JOIN departments d ON e.dept_id = d.dept_id;`

**Jawaban:**
1. **18 baris** (2 karyawan dengan `dept_id IS NULL` tereliminasi karena tidak match).
2. **20 baris** (seluruh karyawan ditampilkan, 2 orang sisanya kolom departemen bernilai `NULL`).

---

## ✅ Checklist Hari 10
- [ ] Mampu membaca dan menerapkan `INNER JOIN` dan `LEFT JOIN`.
- [ ] Mampu mencari data *unmatched* menggunakan `IS NULL`.
- [ ] Menyelesaikan latihan Bagian 3 di [retail_analyst_practice.sql](file:///c:/Users/Asus/Documents/Project/Data-Analyst/SQL%20Learning/retail_analyst_practice.sql).
- [ ] Siap melanjutkan ke [Hari 11: SQL CASE WHEN, Subqueries & CTE](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_11_SQL_Case_When_Subqueries_dan_CTE.md).

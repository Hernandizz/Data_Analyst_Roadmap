# 📘 Hari 12: SQL Window Functions (Tingkat Lanjut)

Window Functions adalah topik SQL paling sering ditanyakan dalam *Technical Interview* Data Analyst. Fitur ini memungkinkan Anda melakukan komputasi agregasi lintas baris tanpa menghilangkan detail baris aslinya.

---

## 🎯 Target Pembelajaran
1. Memahami klausa `OVER (PARTITION BY ... ORDER BY ...)`.
2. Menguasai fungsi ranking: `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `NTILE()`.
3. Menguasai fungsi navigasi nilai periode: `LAG()` dan `LEAD()`.
4. Menghitung akumulasi (*Running Total*) dan Rata-rata Bergerak (*Moving Average*).

---

## 🧠 Teori & Sintaks Kunci

### 1. Perbedaan Window Function vs GROUP BY Biasa
- **`GROUP BY`**: Menggabungkan (*collapse*) banyak baris menjadi satu baris tunggal.
- **Window Function**: Menghitung metrik kelompok namun tetap mempertahankan setiap baris transaksi utuh.

---

### 2. Perbedaan `ROW_NUMBER` vs `RANK` vs `DENSE_RANK`

Jika nilai penjualan adalah: `[100, 100, 80, 50]`
- **`ROW_NUMBER()`**: Menghasilkan urutan unik tanpa seri `[1, 2, 3, 4]`.
- **`RANK()`**: Nilai kembar mendapat ranking sama, namun melompati nomor berikutnya: `[1, 1, 3, 4]`.
- **`DENSE_RANK()`**: Nilai kembar mendapat ranking sama, nomor berikutnya tetap berurutan rapat: `[1, 1, 2, 3]`.

```sql
SELECT 
    product_name,
    category,
    total_sales,
    ROW_NUMBER() OVER(PARTITION BY category ORDER BY total_sales DESC) AS row_num,
    RANK() OVER(PARTITION BY category ORDER BY total_sales DESC) AS rnk,
    DENSE_RANK() OVER(PARTITION BY category ORDER BY total_sales DESC) AS dense_rnk
FROM product_performance;
```

---

### 3. Menghitung Pertumbuhan MoM dengan `LAG()`
```sql
WITH MonthlyRevenue AS (
    SELECT 
        DATE_TRUNC('month', order_date)::DATE AS sales_month,
        SUM(total_amount) AS revenue
    FROM orders
    WHERE order_status = 'COMPLETED'
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT 
    sales_month,
    revenue,
    LAG(revenue, 1) OVER(ORDER BY sales_month) AS previous_month_revenue,
    ROUND(
        (revenue - LAG(revenue, 1) OVER(ORDER BY sales_month)) 
        / LAG(revenue, 1) OVER(ORDER BY sales_month) * 100, 2
    ) AS mom_growth_pct
FROM MonthlyRevenue;
```

---

### 4. Running Total (Akumulasi Penjualan)
```sql
SELECT 
    order_date,
    total_amount,
    SUM(total_amount) OVER(ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_revenue
FROM orders;
```

---

## ✍️ Kuis Mandiri Hari 12

**Soal:**
Bagaimana cara mengambil **Top 3 Produk Terlaris di Setiap Kategori** menggunakan CTE dan Window Function?

**Jawaban:**
```sql
WITH RankedProducts AS (
    SELECT 
        category,
        product_name,
        SUM(quantity * unit_price) AS total_sales,
        DENSE_RANK() OVER(PARTITION BY category ORDER BY SUM(quantity * unit_price) DESC) AS rank_in_category
    FROM order_items oi
    JOIN products p ON oi.product_id = p.product_id
    GROUP BY category, product_name
)
SELECT *
FROM RankedProducts
WHERE rank_in_category <= 3
ORDER BY category, rank_in_category;
```

---

## ✅ Checklist Hari 12
- [ ] Memahami fungsi `PARTITION BY` vs `ORDER BY` di dalam klausa `OVER()`.
- [ ] Menguasai perhitungan `LAG()` untuk pertumbuhan MoM / YoY.
- [ ] Mampu menghitung Top N per grup dengan `DENSE_RANK()`.
- [ ] Menyelesaikan latihan Bagian 6 di [retail_analyst_practice.sql](file:///c:/Users/Asus/Documents/Project/Data-Analyst/SQL%20Learning/retail_analyst_practice.sql).
- [ ] Siap melanjutkan ke [Hari 13: SQL Date, String & Missing Data Handling](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_13_SQL_Date_String_dan_Missing_Data_Handling.md).

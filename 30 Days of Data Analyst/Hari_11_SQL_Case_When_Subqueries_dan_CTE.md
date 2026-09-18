# 📘 Hari 11: SQL CASE WHEN, Subqueries & CTE (Common Table Expressions)

Query yang ditulis oleh pemula seringkali panjang, sulit dibaca, dan penuh dengan kurung bersarang (*nested subqueries*). Hari ini Anda akan belajar cara menulis query modular dan elegan layaknya seorang profesional.

---

## 🎯 Target Pembelajaran
1. Menguasai logika percabangan di SQL: `CASE WHEN ... THEN ... ELSE ... END`.
2. Memahami Subquery di dalam klausa `WHERE`, `FROM`, dan `SELECT`.
3. Menguasai **CTE (Common Table Expressions)** menggunakan klausa `WITH`.
4. Mampu melakukan *pivoting* data manual menggunakan `CASE WHEN` teragregasi (*Conditional Aggregation*).

---

## 🧠 Teori & Sintaks Kunci

### 1. Sintaks `CASE WHEN`
```sql
SELECT 
    customer_id,
    total_spent,
    CASE 
        WHEN total_spent >= 10000000 THEN 'Platinum'
        WHEN total_spent >= 5000000  THEN 'Gold'
        WHEN total_spent >= 1000000  THEN 'Silver'
        ELSE 'Bronze'
    END AS customer_tier
FROM customers;
```

---

### 2. Common Table Expressions (CTE) vs Subqueries
Mengapa CTE (`WITH ... AS`) jauh lebih disukai daripada Subquery bersarang di dunia kerja?
- **Keterbacaan:** Mengalir dari atas ke bawah secara kronologis seperti paragraf kode.
- **Dapat Digunakan Berulang:** Satu CTE dapat dipanggil berkali-kali di query utama tanpa duplikasi kode.
- **Mudah di-Debug:** Anda bisa menguji CTE satu per satu secara terisolasi.

**Struktur CTE:**
```sql
WITH MonthlySales AS (
    SELECT 
        DATE_TRUNC('month', order_date) AS order_month,
        SUM(total_amount) AS monthly_revenue,
        COUNT(order_id) AS total_orders
    FROM orders
    WHERE order_status = 'COMPLETED'
    GROUP BY DATE_TRUNC('month', order_date)
),
AverageBenchmark AS (
    SELECT AVG(monthly_revenue) AS benchmark_revenue
    FROM MonthlySales
)
SELECT 
    m.order_month,
    m.monthly_revenue,
    b.benchmark_revenue,
    ROUND((m.monthly_revenue - b.benchmark_revenue) / b.benchmark_revenue * 100, 2) AS variance_pct
FROM MonthlySales m
CROSS JOIN AverageBenchmark b
ORDER BY m.order_month;
```

---

### 3. Conditional Aggregation (Pivoting Manual di SQL)
Mengubah baris menjadi kolom metrik ringkasan:
```sql
SELECT 
    city,
    SUM(CASE WHEN payment_method = 'Credit Card' THEN total_amount ELSE 0 END) AS credit_card_sales,
    SUM(CASE WHEN payment_method = 'E-Wallet' THEN total_amount ELSE 0 END) AS ewallet_sales,
    SUM(CASE WHEN payment_method = 'Bank Transfer' THEN total_amount ELSE 0 END) AS transfer_sales,
    SUM(total_amount) AS grand_total
FROM orders
GROUP BY city;
```

---

## ✍️ Kuis Mandiri Hari 11

**Soal:**
Tulis query menggunakan CTE untuk mencari pelanggan yang total belanjanya lebih tinggi daripada rata-rata belanja seluruh pelanggan!

**Jawaban:**
```sql
WITH CustomerSpending AS (
    SELECT 
        customer_id,
        SUM(total_amount) AS total_spent
    FROM orders
    WHERE order_status = 'COMPLETED'
    GROUP BY customer_id
),
OverallAverage AS (
    SELECT AVG(total_spent) AS avg_spent
    FROM CustomerSpending
)
SELECT 
    cs.customer_id,
    cs.total_spent,
    ROUND(oa.avg_spent, 2) AS average_spending
FROM CustomerSpending cs
CROSS JOIN OverallAverage oa
WHERE cs.total_spent > oa.avg_spent
ORDER BY cs.total_spent DESC;
```

---

## ✅ Checklist Hari 11
- [ ] Menguasai pembuatan segmentasi kolom dengan `CASE WHEN`.
- [ ] Mampu menulis query kompleks menggunakan CTE (`WITH`).
- [ ] Menyelesaikan latihan Bagian 4 & 5 di [retail_analyst_practice.sql](file:///c:/Users/Asus/Documents/Project/Data-Analyst/SQL%20Learning/retail_analyst_practice.sql).
- [ ] Siap melanjutkan ke [Hari 12: SQL Window Functions](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_12_SQL_Window_Functions_Advanced.md).

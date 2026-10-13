# 🏆 Hari 14: Mini Project 2 – SQL Retail & RFM Analytics

Selamat telah menyelesaikan Minggu ke-2! Hari ini Anda akan menyatukan seluruh kemampuan SQL (Joins, CTE, Window Functions, Date Functions) untuk menganalisis data bisnis ritel omnichannel dan melakukan **RFM Customer Segmentation**.

---

## 🎯 Objektif Proyek
1. Menganalisis metrik retensi dan pola belanja pelanggan.
2. Melakukan segmentasi pelanggan berbasis **RFM (Recency, Frequency, Monetary)** menggunakan SQL Window Function.
3. Menyelesaikan studi kasus lengkap pada file [retail_analyst_practice.sql](file:///c:/Users/Asus/Documents/Project/Data-Analyst/SQL%20Learning/retail_analyst_practice.sql).

---

## 🧠 Konsep Analisis RFM (Recency, Frequency, Monetary)
RFM adalah teknik segmentasi pelanggan paling populer di industri ritel & e-commerce:
- **Recency (R):** Berapa hari yang lalu pelanggan terakhir kali bertransaksi? (Semakin kecil semakin baik).
- **Frequency (F):** Berapa kali pelanggan bertransaksi dalam periode analisis? (Semakin besar semakin loyal).
- **Monetary (M):** Berapa total uang yang telah dibelanjakan pelanggan? (Semakin besar nilainya semakin berharga).

---

## 💻 Query Implementasi RFM di SQL

```sql
WITH CustomerMetrics AS (
    -- Langkah 1: Hitung nilai mentah R, F, M per pelanggan
    SELECT 
        c.customer_id,
        c.customer_name,
        DATE_PART('day', '2026-03-31'::DATE - MAX(o.order_date)) AS recency_days,
        COUNT(DISTINCT o.order_id) AS frequency_orders,
        SUM(o.total_amount) AS monetary_value
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    WHERE o.order_status = 'COMPLETED'
    GROUP BY c.customer_id, c.customer_name
),
RFM_Scores AS (
    -- Langkah 2: Bagi ke dalam skor 1-4 (Quartiles) menggunakan NTILE()
    SELECT 
        customer_id,
        customer_name,
        recency_days,
        frequency_orders,
        monetary_value,
        -- Recency: semakin kecil harinya, semakin tinggi skornya (DESC)
        NTILE(4) OVER(ORDER BY recency_days DESC) AS r_score,
        NTILE(4) OVER(ORDER BY frequency_orders ASC) AS f_score,
        NTILE(4) OVER(ORDER BY monetary_value ASC) AS m_score
    FROM CustomerMetrics
)
-- Langkah 3: Kategorisasi segmen pelanggan
SELECT 
    customer_id,
    customer_name,
    recency_days,
    frequency_orders,
    monetary_value,
    (r_score + f_score + m_score) AS total_rfm_score,
    CASE 
        WHEN (r_score >= 3 AND f_score >= 3 AND m_score >= 3) THEN 'Champions / VIP'
        WHEN (f_score >= 3 AND m_score >= 3) THEN 'Loyal Customers'
        WHEN (r_score >= 3 AND f_score = 1) THEN 'New Active Customers'
        WHEN (r_score = 1 AND f_score >= 3) THEN 'At-Risk (Can Lose Them)'
        WHEN (r_score = 1 AND f_score = 1) THEN 'Lost / Dormant Customers'
        ELSE 'Potential Loyalist'
    END AS customer_segment
FROM RFM_Scores
ORDER BY total_rfm_score DESC, monetary_value DESC;
```

---

## 📁 Referensi Kunci Jawaban
Bandingkan hasil query analisis Anda dengan file kunci jawaban di workspace:
- 👉 [retail_analyst_answers.sql](file:///c:/Users/Asus/Documents/Project/Data-Analyst/SQL%20Learning/retail_analyst_answers.sql)

---

## ✅ Milestone Minggu 2 Tuntas!
Anda kini telah menguasai SQL analitik tingkat menengah hingga lanjut! Besok kita masuk ke **Minggu ke-3: Power BI, Data Modeling & Business Intelligence**.

-- =========================================================
-- Jawaban Referensi SQL Practice Case
-- PT SariMart Digital
-- =========================================================

-- 1. Total revenue, total order, dan rata-rata order value untuk order Completed
SELECT
    COUNT(*) AS total_order,
    SUM(total_amount) AS total_revenue,
    AVG(total_amount) AS avg_order_value
FROM orders
WHERE status = 'Completed';

-- 2. 5 produk dengan total quantity terjual terbanyak
SELECT
    p.product_name,
    SUM(oi.qty) AS total_qty_sold,
    SUM(oi.qty * oi.unit_price) AS total_revenue_product
FROM order_items oi
JOIN products p ON p.product_id = oi.product_id
GROUP BY p.product_name
ORDER BY total_qty_sold DESC
LIMIT 5;

-- 3. Total pelanggan per segment dan total nilai pembelian mereka
SELECT
    c.segment,
    COUNT(DISTINCT c.customer_id) AS total_customers,
    SUM(o.total_amount) AS total_spend
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.customer_id
GROUP BY c.segment
ORDER BY total_spend DESC;

-- 4. Pelanggan dengan lebih dari 2 pesanan dan total spend mereka
SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    COUNT(o.order_id) AS total_orders,
    SUM(o.total_amount) AS total_spend
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
HAVING COUNT(o.order_id) > 2
ORDER BY total_spend DESC;

-- 5. Kota pengiriman dengan total revenue tertinggi
SELECT
    shipping_city,
    SUM(total_amount) AS total_revenue
FROM orders
WHERE status = 'Completed'
GROUP BY shipping_city
ORDER BY total_revenue DESC;

-- 6. Monthly sales trend berdasarkan bulan order_date
SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS month_period,
    COUNT(*) AS total_orders,
    SUM(total_amount) AS total_revenue,
    AVG(total_amount) AS avg_order_value
FROM orders
WHERE status = 'Completed'
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month_period;

-- Catatan: Jika Anda menggunakan PostgreSQL, ganti DATE_FORMAT dengan TO_CHAR(order_date, 'YYYY-MM').

-- 7. Total impressions, clicks, orders, dan revenue untuk setiap kampanye
SELECT
    c.campaign_id,
    c.campaign_name,
    SUM(cp.impressions) AS total_impressions,
    SUM(cp.clicks) AS total_clicks,
    SUM(cp.orders) AS total_orders,
    SUM(cp.revenue) AS total_revenue
FROM campaigns c
LEFT JOIN campaign_performance cp ON cp.campaign_id = c.campaign_id
GROUP BY c.campaign_id, c.campaign_name
ORDER BY total_revenue DESC;

-- 8. Produk dengan stok kurang dari 20 unit dan sudah terjual lebih dari 5 unit
SELECT
    p.product_id,
    p.product_name,
    p.stock_qty,
    SUM(oi.qty) AS total_qty_sold
FROM products p
JOIN order_items oi ON oi.product_id = p.product_id
WHERE p.stock_qty < 20
GROUP BY p.product_id, p.product_name, p.stock_qty
HAVING SUM(oi.qty) > 5
ORDER BY total_qty_sold DESC;

-- 9. Jumlah transaksi per metode pembayaran dan status pembayaran
SELECT
    o.payment_method,
    p.payment_status,
    COUNT(*) AS transaction_count,
    SUM(p.amount) AS total_amount
FROM orders o
JOIN payments p ON p.order_id = o.order_id
GROUP BY o.payment_method, p.payment_status
ORDER BY o.payment_method, p.payment_status;

-- 10. Top 3 pelanggan berdasarkan total pengeluaran dan kontribusi persentase terhadap total revenue perusahaan
WITH customer_spend AS (
    SELECT
        c.customer_id,
        CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
        SUM(o.total_amount) AS total_spend
    FROM customers c
    JOIN orders o ON o.customer_id = c.customer_id
    WHERE o.status = 'Completed'
    GROUP BY c.customer_id, c.first_name, c.last_name
),
company_total AS (
    SELECT SUM(total_amount) AS overall_revenue
    FROM orders
    WHERE status = 'Completed'
)
SELECT
    cs.customer_name,
    cs.total_spend,
    ROUND((cs.total_spend / ct.overall_revenue) * 100, 2) AS contribution_pct
FROM customer_spend cs
CROSS JOIN company_total ct
ORDER BY cs.total_spend DESC
LIMIT 3;

-- =========================================================
-- Latihan tambahan: JOIN orders + products + order_items
SELECT
    o.order_id,
    o.order_date,
    c.first_name,
    c.last_name,
    p.product_name,
    oi.qty,
    oi.unit_price,
    (oi.qty * oi.unit_price) AS line_revenue
FROM orders o
JOIN customers c ON c.customer_id = o.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
ORDER BY o.order_id, p.product_name;

-- =========================================================
-- Latihan tambahan: Menggunakan CASE WHEN
SELECT
    c.segment,
    SUM(CASE WHEN o.status = 'Completed' THEN 1 ELSE 0 END) AS completed_orders,
    SUM(CASE WHEN o.status = 'Shipped' THEN 1 ELSE 0 END) AS shipped_orders,
    SUM(CASE WHEN o.status = 'Cancelled' THEN 1 ELSE 0 END) AS cancelled_orders
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.customer_id
GROUP BY c.segment;

-- =========================================================
-- Latihan tambahan: Hitung conversion rate kampanye
SELECT
    c.campaign_name,
    SUM(cp.impressions) AS total_impressions,
    SUM(cp.clicks) AS total_clicks,
    SUM(cp.orders) AS total_orders,
    ROUND((SUM(cp.clicks) * 100.0) / NULLIF(SUM(cp.impressions), 0), 2) AS ctr_pct,
    ROUND((SUM(cp.orders) * 100.0) / NULLIF(SUM(cp.clicks), 0), 2) AS conversion_rate_pct
FROM campaigns c
JOIN campaign_performance cp ON cp.campaign_id = c.campaign_id
GROUP BY c.campaign_name;

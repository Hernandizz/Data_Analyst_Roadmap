-- =========================================================
-- Data Analyst SQL Practice Case
-- PT SariMart Digital
-- =========================================================

DROP TABLE IF EXISTS campaign_performance;
DROP TABLE IF EXISTS campaigns;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    city VARCHAR(50),
    region VARCHAR(50),
    segment VARCHAR(20),
    join_date DATE,
    is_active BOOLEAN
);

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    category VARCHAR(50),
    subcategory VARCHAR(50),
    unit_price DECIMAL(10,2),
    stock_qty INT,
    supplier VARCHAR(50)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    status VARCHAR(20),
    payment_method VARCHAR(20),
    shipping_city VARCHAR(50),
    shipping_cost DECIMAL(10,2),
    total_amount DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    qty INT,
    unit_price DECIMAL(10,2),
    discount_pct DECIMAL(5,2),
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE payments (
    payment_id INT PRIMARY KEY,
    order_id INT,
    payment_date DATE,
    amount DECIMAL(10,2),
    payment_status VARCHAR(20),
    method VARCHAR(20),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE campaigns (
    campaign_id INT PRIMARY KEY,
    campaign_name VARCHAR(100),
    channel VARCHAR(30),
    start_date DATE,
    end_date DATE,
    budget DECIMAL(12,2)
);

CREATE TABLE campaign_performance (
    campaign_id INT,
    campaign_date DATE,
    impressions INT,
    clicks INT,
    orders INT,
    revenue DECIMAL(12,2),
    PRIMARY KEY (campaign_id, campaign_date),
    FOREIGN KEY (campaign_id) REFERENCES campaigns(campaign_id)
);

-- =========================================================
-- INSERT DATA: CUSTOMERS
-- =========================================================
INSERT INTO customers (customer_id, first_name, last_name, city, region, segment, join_date, is_active) VALUES
(1, 'Andi', 'Wijaya', 'Jakarta', 'Jawa', 'Corporate', '2022-01-15', TRUE),
(2, 'Siti', 'Aisyah', 'Bandung', 'Jawa', 'Retail', '2021-06-10', TRUE),
(3, 'Dewi', 'Lestari', 'Surabaya', 'Jawa', 'SME', '2023-02-20', TRUE),
(4, 'Budi', 'Santoso', 'Medan', 'Sumatra', 'Retail', '2020-11-04', TRUE),
(5, 'Rina', 'Pratiwi', 'Yogyakarta', 'Jawa', 'Corporate', '2022-08-12', FALSE),
(6, 'Fajar', 'Hidayat', 'Semarang', 'Jawa', 'SME', '2021-09-25', TRUE),
(7, 'Maya', 'Putri', 'Bali', 'Nusantara', 'Retail', '2023-04-18', TRUE),
(8, 'Arif', 'Rahman', 'Makassar', 'Sulawesi', 'SME', '2022-03-09', TRUE),
(9, 'Nadia', 'Kusuma', 'Palembang', 'Sumatra', 'Retail', '2021-12-01', TRUE),
(10, 'Rizky', 'Permana', 'Bekasi', 'Jawa', 'Corporate', '2023-07-15', TRUE),
(11, 'Lina', 'Sari', 'Depok', 'Jawa', 'Retail', '2020-05-22', TRUE),
(12, 'Hendra', 'Gunawan', 'Bogor', 'Jawa', 'SME', '2022-11-11', TRUE);

-- =========================================================
-- INSERT DATA: PRODUCTS
-- =========================================================
INSERT INTO products (product_id, product_name, category, subcategory, unit_price, stock_qty, supplier) VALUES
(101, 'Smart Lamp 10W', 'Elektronik', 'Lighting', 180000.00, 42, 'TechSource'),
(102, 'Mug Keramik Set', 'Rumah Tangga', 'Kitchenware', 95000.00, 67, 'HomeCraft'),
(103, 'Laptop Stand Ergonomis', 'Office', 'Accessories', 260000.00, 18, 'OfficePrime'),
(104, 'Air Fryer 5L', 'Elektronik', 'Kitchen', 650000.00, 12, 'TechSource'),
(105, 'Tote Bag Premium', 'Fashion', 'Bag', 120000.00, 85, 'StyleLab'),
(106, 'Kipas Angin Mini', 'Elektronik', 'Cooling', 240000.00, 25, 'TechSource'),
(107, 'Botol Minum Stainless', 'Rumah Tangga', 'Lifestyle', 110000.00, 90, 'HomeCraft'),
(108, 'Keyboard Wireless', 'Office', 'Accessories', 310000.00, 20, 'OfficePrime'),
(109, 'Sprei Queen 160x200', 'Rumah Tangga', 'Bedroom', 220000.00, 34, 'HomeCraft'),
(110, 'Headset Gaming', 'Elektronik', 'Audio', 420000.00, 14, 'TechSource');

-- =========================================================
-- INSERT DATA: ORDERS
-- =========================================================
INSERT INTO orders (order_id, customer_id, order_date, status, payment_method, shipping_city, shipping_cost, total_amount) VALUES
(1001, 1, '2024-01-08', 'Completed', 'Credit Card', 'Jakarta', 30000, 690000),
(1002, 2, '2024-01-15', 'Completed', 'Bank Transfer', 'Bandung', 25000, 435000),
(1003, 3, '2024-01-22', 'Completed', 'E-Wallet', 'Surabaya', 30000, 520000),
(1004, 4, '2024-02-02', 'Completed', 'Credit Card', 'Medan', 35000, 560000),
(1005, 5, '2024-02-12', 'Shipped', 'Bank Transfer', 'Yogyakarta', 27000, 470000),
(1006, 6, '2024-02-18', 'Completed', 'E-Wallet', 'Semarang', 22000, 610000),
(1007, 7, '2024-03-01', 'Completed', 'Credit Card', 'Bali', 40000, 730000),
(1008, 8, '2024-03-10', 'Completed', 'Bank Transfer', 'Makassar', 28000, 480000),
(1009, 9, '2024-03-15', 'Completed', 'E-Wallet', 'Palembang', 26000, 545000),
(1010, 10, '2024-03-22', 'Completed', 'Credit Card', 'Bekasi', 32000, 680000),
(1011, 11, '2024-04-03', 'Completed', 'Bank Transfer', 'Depok', 23000, 495000),
(1012, 12, '2024-04-11', 'Cancelled', 'E-Wallet', 'Bogor', 0, 0),
(1013, 2, '2024-04-18', 'Completed', 'Credit Card', 'Bandung', 25000, 620000),
(1014, 3, '2024-05-05', 'Completed', 'Bank Transfer', 'Surabaya', 27000, 578000),
(1015, 1, '2024-05-12', 'Completed', 'E-Wallet', 'Jakarta', 30000, 715000),
(1016, 8, '2024-05-20', 'Completed', 'Credit Card', 'Makassar', 29000, 660000),
(1017, 9, '2024-06-03', 'Completed', 'Bank Transfer', 'Palembang', 31000, 600000),
(1018, 10, '2024-06-14', 'Completed', 'E-Wallet', 'Bekasi', 25000, 555000),
(1019, 4, '2024-06-16', 'Shipped', 'Credit Card', 'Medan', 36000, 590000),
(1020, 11, '2024-07-01', 'Completed', 'Bank Transfer', 'Depok', 24000, 635000);

-- =========================================================
-- INSERT DATA: ORDER ITEMS
-- =========================================================
INSERT INTO order_items (order_id, product_id, qty, unit_price, discount_pct) VALUES
(1001, 101, 2, 180000, 0),
(1001, 103, 1, 260000, 5),
(1002, 102, 2, 95000, 0),
(1002, 107, 1, 110000, 10),
(1003, 104, 1, 650000, 5),
(1003, 102, 1, 95000, 0),
(1004, 106, 2, 240000, 5),
(1004, 108, 1, 310000, 0),
(1005, 105, 3, 120000, 0),
(1005, 107, 2, 110000, 5),
(1006, 104, 1, 650000, 0),
(1006, 109, 1, 220000, 10),
(1007, 110, 1, 420000, 5),
(1007, 101, 2, 180000, 5),
(1008, 106, 1, 240000, 0),
(1008, 103, 1, 260000, 0),
(1009, 109, 2, 220000, 0),
(1009, 107, 1, 110000, 10),
(1010, 104, 1, 650000, 0),
(1010, 108, 1, 310000, 5),
(1011, 102, 3, 95000, 0),
(1011, 105, 2, 120000, 5),
(1012, 101, 1, 180000, 0),
(1012, 102, 1, 95000, 0),
(1013, 108, 2, 310000, 0),
(1013, 110, 1, 420000, 10),
(1014, 103, 2, 260000, 0),
(1014, 107, 2, 110000, 0),
(1015, 104, 1, 650000, 5),
(1015, 109, 1, 220000, 0),
(1016, 101, 3, 180000, 5),
(1016, 106, 1, 240000, 0),
(1017, 105, 2, 120000, 0),
(1017, 108, 1, 310000, 5),
(1018, 102, 2, 95000, 0),
(1018, 103, 1, 260000, 5),
(1019, 104, 1, 650000, 0),
(1019, 110, 1, 420000, 0),
(1020, 107, 2, 110000, 10),
(1020, 109, 1, 220000, 5);

-- =========================================================
-- INSERT DATA: PAYMENTS
-- =========================================================
INSERT INTO payments (payment_id, order_id, payment_date, amount, payment_status, method) VALUES
(2001, 1001, '2024-01-08', 690000, 'Paid', 'Credit Card'),
(2002, 1002, '2024-01-15', 435000, 'Paid', 'Bank Transfer'),
(2003, 1003, '2024-01-22', 520000, 'Paid', 'E-Wallet'),
(2004, 1004, '2024-02-02', 560000, 'Paid', 'Credit Card'),
(2005, 1005, '2024-02-12', 470000, 'Pending', 'Bank Transfer'),
(2006, 1006, '2024-02-18', 610000, 'Paid', 'E-Wallet'),
(2007, 1007, '2024-03-01', 730000, 'Paid', 'Credit Card'),
(2008, 1008, '2024-03-10', 480000, 'Paid', 'Bank Transfer'),
(2009, 1009, '2024-03-15', 545000, 'Paid', 'E-Wallet'),
(2010, 1010, '2024-03-22', 680000, 'Paid', 'Credit Card'),
(2011, 1011, '2024-04-03', 495000, 'Paid', 'Bank Transfer'),
(2012, 1012, '2024-04-11', 0, 'Cancelled', 'E-Wallet'),
(2013, 1013, '2024-04-18', 620000, 'Paid', 'Credit Card'),
(2014, 1014, '2024-05-05', 578000, 'Paid', 'Bank Transfer'),
(2015, 1015, '2024-05-12', 715000, 'Paid', 'E-Wallet'),
(2016, 1016, '2024-05-20', 660000, 'Paid', 'Credit Card'),
(2017, 1017, '2024-06-03', 600000, 'Paid', 'Bank Transfer'),
(2018, 1018, '2024-06-14', 555000, 'Paid', 'E-Wallet'),
(2019, 1019, '2024-06-16', 590000, 'Pending', 'Credit Card'),
(2020, 1020, '2024-07-01', 635000, 'Paid', 'Bank Transfer');

-- =========================================================
-- INSERT DATA: CAMPAIGNS
-- =========================================================
INSERT INTO campaigns (campaign_id, campaign_name, channel, start_date, end_date, budget) VALUES
(1, 'Flash Sale Januari', 'Instagram', '2024-01-01', '2024-01-31', 15000000),
(2, 'Brand Awareness April', 'Google Ads', '2024-04-01', '2024-04-30', 20000000),
(3, 'Mid Year Promo', 'TikTok', '2024-06-01', '2024-06-30', 18000000);

-- =========================================================
-- INSERT DATA: CAMPAIGN PERFORMANCE
-- =========================================================
INSERT INTO campaign_performance (campaign_id, campaign_date, impressions, clicks, orders, revenue) VALUES
(1, '2024-01-05', 150000, 21000, 55, 8200000),
(1, '2024-01-12', 180000, 24000, 62, 9100000),
(1, '2024-01-19', 170000, 22500, 58, 8700000),
(1, '2024-01-26', 190000, 26000, 70, 9800000),
(2, '2024-04-02', 250000, 32000, 48, 7600000),
(2, '2024-04-10', 270000, 35000, 54, 8400000),
(2, '2024-04-17', 260000, 34000, 51, 7900000),
(3, '2024-06-05', 300000, 42000, 63, 10400000),
(3, '2024-06-18', 310000, 45000, 67, 11200000);

-- =========================================================
-- SOAL LATIHAN
-- =========================================================
-- 1. Hitung total revenue, total order, dan rata-rata order value untuk semua order dengan status 'Completed'.
-- 2. Tampilkan 5 produk dengan total quantity terjual terbanyak.
-- 3. Hitung total pelanggan per segment dan total nilai pembelian mereka.
-- 4. Tampilkan pelanggan yang memiliki lebih dari 2 pesanan dan total spend mereka.
-- 5. Tampilkan kota pengiriman dengan total revenue tertinggi.
-- 6. Buat laporan monthly sales trend berdasarkan bulan order_date.
-- 7. Hitung total impressions, clicks, orders, dan revenue untuk setiap kampanye.
-- 8. Tampilkan produk yang stok kurang dari 20 unit dan sudah terjual lebih dari 5 unit.
-- 9. Hitung jumlah transaksi per metode pembayaran dan status pembayaran.
-- 10. Tampilkan top 3 pelanggan berdasarkan total pengeluaran, lalu hitung persentase kontribusi masing-masing terhadap total revenue perusahaan.

-- =========================================================
-- CATATAN
-- =========================================================
-- Gunakan query SQL Anda sendiri untuk menjawab soal di atas.
-- Setelah selesai, buka file retail_analyst_answers.sql untuk melihat jawaban referensi.

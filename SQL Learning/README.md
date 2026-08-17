# Latihan SQL untuk Persiapan Masuk Kerja

## Konteks bisnis
Anda adalah Data Analyst di perusahaan retail digital bernama PT SariMart Digital. Perusahaan menjual produk kebutuhan rumah tangga, elektronik kecil, dan peralatan kantor secara online. Tugas utama Anda adalah menganalisis performa penjualan, pelanggan, produk, dan kampanye marketing untuk membantu tim bisnis mengambil keputusan.

Data yang akan Anda kelola meliputi:
- Pelanggan
- Produk
- Pesanan dan item pesanan
- Pembayaran
- Kampanye marketing
- Performa kampanye

## Tujuan latihan
Tujuan dari latihan ini adalah melatih kemampuan SQL yang sering dipakai saat kerja sebagai Data Analyst, seperti:
- SELECT, WHERE, ORDER BY
- JOIN antar tabel
- GROUP BY dan aggregate
- CASE WHEN
- Subquery
- Window function
- Kondisi logika bisnis

## Struktur file
- `retail_analyst_practice.sql` → script pembuatan tabel, insert data, dan soal latihan
- `retail_analyst_answers.sql` → jawaban dan query SQL yang bisa dibandingkan

## Soal latihan
Berikut beberapa soal yang bisa dikerjakan berdasarkan dataset yang sudah dibuat.

### Soal 1 — Ringkasan penjualan
Hitung total revenue, total order, dan rata-rata order value untuk semua transaksi yang sudah dibayar.

### Soal 2 — Produk terlaris
Tampilkan 5 produk dengan total quantity terjual terbanyak.

### Soal 3 — Segment pelanggan
Hitung total pelanggan per segment dan total nilai pembelian mereka.

### Soal 4 — Loyal customer
Tampilkan pelanggan yang memiliki lebih dari 2 pesanan dan total spend mereka.

### Soal 5 — Kota dengan penjualan terbaik
Tuliskan kota pengiriman dengan total revenue tertinggi.

### Soal 6 — Penjualan per bulan
Buat laporan monthly sales trend berdasarkan bulan order_date.

### Soal 7 — Kampanye marketing
Hitung total impressions, clicks, orders, dan revenue untuk setiap kampanye.

### Soal 8 — Produk dengan performa rendah
Tampilkan produk yang memiliki stok di bawah 20 unit tapi sudah pernah terjual lebih dari 5 unit.

### Soal 9 — Pembayaran
Hitung jumlah transaksi per metode pembayaran dan status pembayaran.

### Soal 10 — Analisis bisnis lanjutan
Tampilkan top 3 pelanggan berdasarkan total pengeluaran, lalu hitung persentase kontribusi masing-masing terhadap total revenue perusahaan.

## Tips belajar
- Kerjakan soal secara berurutan dari yang paling mudah ke yang lebih kompleks.
- Coba tulis query sendiri terlebih dahulu sebelum melihat jawaban.
- Fokus pada logic bisnis, bukan hanya syntax SQL.
- Latih kemampuan membaca tabel dan hubungan antar data.

## Catatan
Dataset ini dibuat agar menyerupai kondisi kerja nyata di bidang e-commerce dan retail. Gunakan script ini sebagai latihan mandiri, lalu lanjutkan dengan studi kasus yang lebih kompleks seperti churn analysis, cohort analysis, atau KPI dashboard.

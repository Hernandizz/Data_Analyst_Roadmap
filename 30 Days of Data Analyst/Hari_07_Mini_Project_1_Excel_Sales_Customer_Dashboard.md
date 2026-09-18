# 🏆 Hari 07: Mini Project 1 – Excel Sales & Customer Dashboard

Selamat! Anda telah menyelesaikan minggu pertama. Hari ini adalah waktu untuk membuktikan seluruh penguasaan rumus, pembersihan, lookup, dan Pivot Table dalam **1 Proyek Nyata Berstandar Profesional**.

---

## 🎯 Objektif Proyek
Membangun sebuah file spreadsheet pelaporan interaktif (*Executive Dashboard*) yang menyajikan performa penjualan, margin profit, dan segmentasi pelanggan untuk jajaran pimpinan bisnis.

---

## 🏗️ Struktur Arsitektur File Excel
Buat file Excel baru dengan 4 sheet terpisah dan rapi:
```
[1_Raw_Data] ──► [2_Clean_Data] ──► [3_Calculations_Pivot] ──► [4_Executive_Dashboard]
```

1. **`1_Raw_Data`**: Berisi data mentah transaksi tanpa modifikasi langsung.
2. **`2_Clean_Data`**: Tabel data yang sudah distandarisasi menggunakan formula:
   - `TRIM` + `PROPER` untuk nama pelanggan dan kota.
   - `XLOOKUP` untuk menarik harga modal (*COGS*) dan kategori dari master produk.
   - Kolom kalkulasi: `Gross Revenue`, `Total Cost`, `Gross Profit`, `Profit Margin %`.
3. **`3_Calculations_Pivot`**: Berisi 3-4 Pivot Table pendukung metrik:
   - Summary Monthly Trend (Revenue vs Profit).
   - Top 5 Kategori Produk terlaris.
   - Matriks Penjualan per Wilayah / Cabang Toko.
4. **`4_Executive_Dashboard`**: Tampilan visual final (bersih dari gridline, menggunakan palet warna profesional).

---

## 🎨 Komponen Dashboard yang Wajib Ada

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       EXECUTIVE SALES DASHBOARD                             │
├─────────────────┬─────────────────┬─────────────────┬───────────────────────┤
│ [TOTAL REVENUE] │ [GROSS PROFIT]  │ [PROFIT MARGIN] │ [TOTAL TRANSAKSI]     │
│ Rp 1.450.000.000│ Rp 435.000.000  │ 30.0%           │ 3.420 Pesanan         │
├─────────────────┴─────────────────┴─────────────────┴───────────────────────┤
│  [SLICERS: Kategori Produk | Cabang Kota | Filter Tahun & Kuartal]          │
├───────────────────────────────────┬─────────────────────────────────────────┤
│ 📈 Tren Penjualan & Profit Bulanan │ 📊 Top 5 Kategori Terlaris              │
│    (Combo Chart: Clustered Column │    (Horizontal Bar Chart)               │
│     + Line on Secondary Axis)     │                                         │
├───────────────────────────────────┴─────────────────────────────────────────┤
│ 🗺️ Matriks Performa Wilayah (Pivot Table rapi dengan Data Bars & Heatmap)    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Panduan Desain Profesional
1. Matikan garis sel: Buka tab **View ➔ uncheck Gridlines**.
2. Batasi warna: Gunakan maksimal 2-3 warna utama (misal: Navy Blue `#1B365D`, Slate Gray `#5C768D`, dan Aksen Emas/Cyan).
3. Format Angka: Selalu gunakan format Rupiah/Ribuan yang konsisten (`Rp #,##0` atau `Rp #,##0.00 K`).
4. Pastikan semua chart terhubung dinamis ke Slicer.

---

## 🚀 Langkah Penyelesaian & Milestone Minggu 1 Selesai!
Simpan file hasil pengerjaan Anda, buat screenshot dasbornya, dan selamat: **Fondasi Spreadsheet & Data Analytics Anda telah tuntas!**

Besok kita melangkah ke **Minggu ke-2: Database & SQL Mastery**.

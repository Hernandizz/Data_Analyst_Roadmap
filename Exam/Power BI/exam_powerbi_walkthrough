# 🚀 Walkthrough: Penambahan Modul Ujian Teknis Power BI

## 📌 Ringkasan Pekerjaan
Telah ditambahkan modul pengujian teknis (*technical assessment*) komprehensif untuk posisi **Data Analyst / BI Analyst** dengan fokus pada **Power BI** di dalam direktori `Exam/Power BI/`.

---

## 📂 Struktur Berkas yang Telah Dibuat

```text
Exam/
├── Excel/
│   ├── advanced_assessment_project/
│   └── assessment_project/
└── Power BI/
    ├── README_INSTRUKSI.md                # Panduan instruksi soal, skenario bisnis, 5 modul ujian, & rubrik
    ├── KUNCI_JAWABAN_DAN_DAX_SOLUTIONS.md # Solusi langkah demi langkah Power Query, formula DAX, & analisis
    └── dataset_csv/                       # Dataset CSV realistis siap pakai untuk Power BI Desktop
        ├── Fact_Sales.csv                 # 1.600 baris transaksi ritel omnichannel (2023 - 2024)
        ├── Dim_Product.csv                # 30 master produk dengan 5 kategori
        ├── Dim_Customer.csv               # 100 master pelanggan dari 20 kota/kabupaten
        ├── Dim_Store.csv                  # 15 cabang toko fisik & hub pemenuhan e-commerce
        ├── Dim_Date.csv                   # Tabel kalender referensi lengkap 2 tahun (731 hari)
        └── Monthly_Sales_Targets_Raw.csv  # Target bulanan 2024 berformat wide untuk tes Unpivot
```

---

## 🎯 Cakupan Materi Pengujian (22 Soal Berjenjang)

| Modul | Topik Utama | Rincian Keterampilan yang Diuji |
|---|---|---|
| **Modul 1** | **Data Ingestion & Power Query (ETL)** | Standarisasi tipe data, pembersihan spasi (*Trim*) & teks (*Capitalize Each Word*), Custom Conditional Column (`Channel_Group`), durasi pemrosesan (`Dispatch_Duration_Days`), dan **Unpivoting** tabel target penjualan. |
| **Modul 2** | **Data Modeling & Star Schema** | Desain Star Schema (`1:*` Single), relasi ganda tanggal (*Active* `Order_Date` vs *Inactive* `Ship_Date`), DAX Date Dimension dinamis (`Dim_Date_DAX`), *Sort by Column*, dan tata kelola tabel `_AllMeasures`. |
| **Modul 3** | **DAX Measures & Advanced Analytics** | Base measures (`Total Sales`, `COGS`, `Gross Profit`, `Margin %`, `AOV`), filter context kanal penjualan, relasi sekunder via `USERELATIONSHIP`, Time Intelligence (`YoY Sales Growth %`, `Sales SPLY`, `Sales YTD`), variansi target, ranking dinamis (`RANKX`), dan metrik SLA logistik. |
| **Modul 4** | **Dashboard Canvas & UI/UX Design** | Perancangan 3 halaman laporan (*Executive Overview*, *Customer & Channel Deep Dive*, *Logistics & Operational Efficiency*), kartu KPI dengan indikator dinamis, grafik tren bulanan vs target, *Conditional Formatting (Data Bars)*, dan pembuatan *Custom Tooltip Page*. |
| **Modul 5** | **Row-Level Security (RLS) & Insights** | Implementasi keamanan baris data per wilayah (`Regional_Manager_Jawa` vs `Regional_Manager_Luar_Jawa`), pengujian via *View as Roles*, serta 3 pertanyaan interpretasi bisnis strategis berbasis data riil. |

---

## 🔍 Verifikasi Data & Ground-Truth Benchmarks

Dataset yang dibuat telah divalidasi menggunakan skrip evaluasi dengan hasil metrik acuan sebagai berikut:
- **Total Pesanan Unik:** 1.600 pesanan (650 pesanan di 2023; 950 pesanan di 2024).
- **Total Penjualan Kotor (Gross Sales):** Rp 877.515.000
- **Total Penjualan Bersih (Net Sales):** Rp 841.488.250
  - *Tahun 2023:* Rp 343.403.750
  - *Tahun 2024:* Rp 498.084.500
- **Pertumbuhan Penjualan (YoY Growth %):** **+45,04%**
- **Margin Laba Kotor (Gross Profit Margin %):** **45,35%** (Total Profit: Rp 381.623.250)
- **Rata-rata Nilai Transaksi (AOV):** Rp 525.930
- **Performa SLA Pengiriman:** 93,62% *On-Time* (1.498 pesanan) vs 6,38% *Late Delivery* (102 pesanan).

---

## 🔗 Tautan Dokumen Langsung
- [README_INSTRUKSI.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Exam/Power%20BI/README_INSTRUKSI.md) — Panduan soal lengkap, diagram ERD, skenario, dan rubrik penilaian.
- [KUNCI_JAWABAN_DAN_DAX_SOLUTIONS.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Exam/Power%20BI/KUNCI_JAWABAN_DAN_DAX_SOLUTIONS.md) — Solusi M-code, formula DAX, konfigurasi visual, dan analisis bisnis.
- [Folder dataset_csv](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Exam/Power%20BI/dataset_csv) — Seluruh file CSV siap muat ke Power BI Desktop.

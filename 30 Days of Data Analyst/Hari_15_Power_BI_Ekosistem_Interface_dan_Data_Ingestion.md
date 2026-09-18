# 📘 Hari 15: Power BI Ekosistem, Interface & Data Ingestion

Selamat datang di Minggu ke-3! Power BI adalah salah satu platform Business Intelligence (BI) paling dominan di dunia korporat saat ini. Di minggu ini, Anda akan belajar membangun enterprise dashboard interaktif dari nol.

---

## 🎯 Target Pembelajaran
1. Memahami arsitektur Power BI (Desktop, Service, Mobile, Gateway).
2. Menguasai antarmuka Power BI Desktop (Report View, Table View, Model View, DAX Query View).
3. Memahami mode koneksi data: *Import Mode* vs *DirectQuery* vs *Dual / Composite*.
4. Mengimpor data dari file lokal (Excel, CSV) dan database SQL.

---

## 🧠 Teori & Konsep Kunci

### 1. Arsitektur Komponen Power BI
```
┌───────────────────────────┐         ┌───────────────────────────┐
│     POWER BI DESKTOP      │ ──────► │     POWER BI SERVICE      │
│  (Authoring / Pembuatan   │ Publish │ (Cloud Sharing, Security, │
│   Model, DAX, Visual)     │         │  Dashboard & Apps)        │
└───────────────────────────┘         └─────────────┬─────────────┘
                                                    │
                                                    ▼
                                      ┌───────────────────────────┐
                                      │   MOBILE APP & END-USER   │
                                      │    (Konsumsi Laporan)     │
                                      └───────────────────────────┘
```

---

### 2. Mode Penyimpanan Data (Storage Mode)

| Mode | Cara Kerja | Kelebihan | Kekurangan |
|---|---|---|---|
| **Import Mode (Default & Direkomendasikan)** | Data dikompres dan disimpan di RAM Power BI (VertiPaq Engine). | Sangat cepat, mendukung seluruh fitur DAX & Power Query. | Ukuran model dibatasi (1 GB di lisensi Pro), perlu refresh terjadwal. |
| **DirectQuery** | Data tidak disimpan di Power BI; query dikirim ke database secara *real-time* setiap visual diklik. | Menangani data miliaran baris (*Big Data*), data selalu *live*. | Lebih lambat tergantung performa database server, fungsi DAX terbatas. |
| **Composite / Dual** | Gabungan Import (tabel dimensi kecil) dan DirectQuery (tabel fakta masif). | Efisiensi hybrid terbaik. | Kompleksitas pemodelan lebih tinggi. |

---

### 3. Empat Tampilan Kerja Power BI Desktop
1. **Report View (Ikon Kanvas/Grafik):** Tempat mendesain visualisasi, kartu KPI, dan layout dashboard.
2. **Table View (Ikon Tabel Data):** Melihat isi data baris per baris dan memeriksa hasil calculated column.
3. **Model View (Ikon Diagram Relasi):** Menghubungkan tabel fakta dan dimensi (Star Schema) dan mengatur kardinalitas relasi.
4. **DAX Query View (Ikon DAX):** Menulis, menguji, dan mengukur performa query DAX secara langsung.

- *Materi Lengkap:* [01_Pengenalan_dan_Interface.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/01_Pengenalan_dan_Interface.md)

---

## ✍️ Kuis Mandiri Hari 15

**Soal:**
Perusahaan retail memiliki 200.000 transaksi penjualan per tahun dan ingin membuat dashboard eksekutif yang responsif dengan kalkulasi DAX Time Intelligence yang kompleks. Mode penyimpanan mana yang paling tepat dipilih: **Import Mode** atau **DirectQuery**?

**Jawaban:**
**Import Mode**. Dataset 200.000 transaksi tergolong sangat ringan bagi VertiPaq engine Power BI (dapat dimuat dalam hitungan megabyte saja), dan Import Mode memberikan kecepatan visual interaktif maksimal serta dukungan penuh fungsi DAX Time Intelligence.

---

## ✅ Checklist Hari 15
- [ ] Mengetahui perbedaan Power BI Desktop vs Power BI Service.
- [ ] Memahami perbedaan Import Mode vs DirectQuery.
- [ ] Membaca [01_Pengenalan_dan_Interface.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/01_Pengenalan_dan_Interface.md).
- [ ] Siap melanjutkan ke [Hari 16: Power Query ETL & Bahasa M](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_16_Power_Query_ETL_dan_Bahasa_M.md).

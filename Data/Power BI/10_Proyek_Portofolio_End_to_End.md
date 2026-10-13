# 📘 Modul 10: Proyek Portofolio End-to-End & Persiapan Karier

---

## 🎯 Tujuan Pembelajaran
Setelah menyelesaikan modul ini, Anda diharapkan mampu:
1. Memahami kriteria portofolio Power BI yang dinilai tinggi oleh *Hiring Manager* dan *Lead Data Analyst*.
2. Menyusun dokumentasi proyek end-to-end dengan pendekatan **Business Problem $\rightarrow$ Solution $\rightarrow$ Business Impact**.
3. Membangun portofolio komprehensif menggunakan dataset yang tersedia di repositori ini.
4. Mengemas proyek ke dalam format presentasi GitHub, LinkedIn, dan CV yang profesional.
5. Menguasai jawaban atas **Pertanyaan Wawancara Kerja Teknis Power BI** yang paling sering ditanyakan.

---

## 1. Anatomi Portofolio BI yang Menang

Banyak kandidat gagal dalam wawancara kerja karena portofolio mereka hanya menampilkan screenshot grafik tanpa penjelasan bisnis. Perekrut tidak hanya mencari pembuat grafik, mereka mencari **problem solver** yang mampu berbicara dalam bahasa bisnis!

```
┌────────────────────────────────────────────────────────────────────────┐
│               FRAMEWORK DOKUMENTASI PORTOFOLIO PROFESIONAL             │
│                                                                        │
│  1. 🏢 Latar Belakang Bisnis & Problem Statement                       │
│     (Apa masalah operasional/finansial yang dihadapi perusahaan?)      │
│  2. ⚙️ Alur Kerja ETL (Power Query & Pembersihan Data)                 │
│     (Tantangan data kotor apa yang berhasil Anda selesaikan?)          │
│  3. 🗺️ Arsitektur Model Data (Star Schema)                             │
│     (Visualisasi diagram relasi tabel fakta dan dimensi)               │
│  4. ⚡ Metrik Utama DAX (Kalkulasi Kunci)                               │
│     (Formula Time Intelligence, Margin, dan Pencapaian Target)         │
│  5. 📊 Tampilan Dashboard Interaktif                                   │
│     (Screenshot resolusi tinggi atau rekaman animasi GIF navigasi)     │
│  6. 💡 Temuan Utama & Rekomendasi Aksi Nyata (Actionable Insights)     │
│     (Apa yang harus dilakukan direksi berdasarkan data dashboard?)     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Tiga Studi Kasus Industri Siap Dikerjakan

### Skenario 1: Omnichannel Retail & E-Commerce Executive Dashboard (Rekomendasi Utama)
- **Sumber Dataset:** Gunakan dataset yang telah disediakan di folder repositori ini:  
  📁 [`Exam/Power BI/dataset_csv/`](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Exam/Power%20BI/dataset_csv/)
- **Tantangan Bisnis:**  
  PT Nusantara Retail Analytics mengelola penjualan di 5 kanal (Tokopedia, Shopee, TikTok Shop, Website, dan Toko Fisik). Manajemen tidak memiliki visibilitas terpadu mengenai margin keuntungan riil, pencapaian target bulanan, dan ketepatan kurir logistik.
- **Deliverables:**
  - Star Schema dengan 1 Tabel Fakta dan 4 Tabel Dimensi.
  - Tab 1: Financial & Sales Executive Overview (Revenue, COGS, Gross Profit %, Target Achv %).
  - Tab 2: Customer & Regional Deep Dive (Pareto 80/20 customer contribution, Jawa vs Luar Jawa).
  - Tab 3: Logistics & SLA Performance (On-time delivery rate per ekspedisi kurir).
  - Implementasi RLS untuk Regional Manager Jawa vs Luar Jawa.
- **Panduan Ujian Lengkap:** Anda dapat langsung membaca panduan instruksi teknis proyek ini di [`Exam/Power BI/README_INSTRUKSI.md`](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Exam/Power%20BI/README_INSTRUKSI.md).

---

### Skenario 2: Analisis Kohort Retensi Pelanggan (Customer Retention & Churn)
- **Fokus Analisis:** Menghitung churn rate, repeat purchase interval, dan Customer Lifetime Value (CLV).
- **Fitur DAX yang Ditonjolkan:** Penggunaan `CALCULATETABLE`, `DATEDIFF`, dan visualisasi heat map matriks retensi bulanan.

---

### Skenario 3: Supply Chain & Inventory Optimization
- **Fokus Analisis:** Menghitung *Days Sales of Inventory (DSI)*, *Stockout Rate*, dan rasio perputaran stok (*Inventory Turnover*).
- **Fitur DAX yang Ditonjolkan:** Semi-additive measures (`LASTDATE`, `LASTNONBLANK`).

---

## 3. Menulis Temuan Bisnis & Rekomendasi (Actionable Insights)

Contoh cara menyajikan kesimpulan analisis di akhir laporan portofolio Anda:

> ### 📌 Temuan Utama (Findings):
> 1. **Kategori Fashion memimpin margin keuntungan (48.5%)**, namun pencapaian terhadap target bulanan terendah di Q3 (hanya 82% dari target), dipicu oleh keterlambatan pasokan di wilayah Luar Jawa.
> 2. **Kanal TikTok Shop mencatat pertumbuhan YoY tertinggi (+34.2%)**, mengungguli kanal Tokopedia dan Shopee.
> 3. **Kurir SiCepat memiliki tingkat On-Time Delivery tertinggi (94.2%)**, sementara Kurir JNE Trucking memiliki tingkat keterlambatan 18.4% untuk rute antar pulau.
>
> ### 🚀 Rekomendasi Strategis (Prescriptive Recommendations):
> 1. **Efisiensi Logistik:** Negosiasi ulang SLA dengan pihak JNE Trucking untuk rute Luar Jawa atau alihkan kuota pengiriman kargo ke kurir alternatif.
> 2. **Alokasi Anggaran Promosi:** Gandakan alokasi anggaran iklan berbayar (*ads budget*) pada kanal TikTok Shop untuk memaksimalkan momentum konversi kuartal berikutnya.

---

## 4. Persiapan Wawancara Kerja Teknis (Top Interview Questions)

Berikut adalah 6 pertanyaan teknis yang paling sering diajukan saat wawancara posisi *Power BI / BI Analyst*:

### Q1: Apa perbedaan antara Calculated Column dan Measure? Kapan menggunakan salah satunya?
> **Jawaban Ideal:**  
> *Calculated Column dihitung saat refresh data dan disimpan di RAM per baris dalam Row Context, sehingga memperbesar ukuran file. Sebaliknya, Measure dihitung secara real-time pada Filter Context saat visual dirender dan tidak memakan kapasitas penyimpanan disk. Saya selalu menggunakan Measure untuk semua metrik kuantitatif dan hanya menggunakan Calculated Column jika nilainya diperlukan sebagai slicer filter atau sumbu kategori.*

### Q2: Jelaskan bagaimana fungsi `CALCULATE()` bekerja!
> **Jawaban Ideal:**  
> *`CALCULATE()` adalah satu-satunya fungsi di DAX yang dapat memodifikasi Filter Context yang sedang aktif. Fungsi ini mengevaluasi ekspresi pada konteks filter baru yang ditentukan oleh argumen filternya, dan dapat menimpa filter visual menggunakan modifier seperti `ALL()`, `REMOVEFILTERS()`, atau `KEEPFILTERS()`.*

### Q3: Mengapa Star Schema lebih disukai daripada Snowflake Schema atau Flat Table di Power BI?
> **Jawaban Ideal:**  
> *Star Schema dirancang optimal untuk mesin VertiPaq in-memory. Dengan memisahkan tabel fakta transaksi dan tabel dimensi atribut, jumlah relasi menjadi satu tingkat (single-hop), meminimalkan duplikasi data teks, menghasilkan kompresi memori terbaik, dan membuat formula DAX jauh lebih sederhana serta cepat dieksekusi dibandingkan denormalized flat table.*

### Q4: Mengapa Auto Date/Time bawaan sebaiknya dimatikan?
> **Jawaban Ideal:**  
> *Karena secara default Power BI akan membuat tabel tanggal tersembunyi untuk setiap kolom yang bertipe Date di dalam model, yang menyebabkan konsumsi RAM membengkak dan ukuran berkas .pbix menjadi sangat besar tanpa kita sadari. Standar industri adalah membuat satu tabel `Dim_Date` eksplisit dan menandainya dengan 'Mark as Date Table'.*

### Q5: Bagaimana Anda menangani hubungan Many-to-Many (`*:*`) antar tabel?
> **Jawaban Ideal:**  
> *Relasi Many-to-Many langsung dapat menimbulkan ambiguitas dan performa lambat. Cara terbaik adalah membuat 'Bridge Table' yang berisi nilai unik dari kunci relasi di Power Query atau DAX, lalu menghubungkan kedua tabel tersebut melalui Bridge Table dengan dua relasi One-to-Many (`1:*`).*

### Q6: Bagaimana cara mengoptimalkan laporan Power BI yang lambat saat dimuat?
> **Jawaban Ideal:**  
> *Saya menggunakan alat Performance Analyzer untuk mengidentifikasi apakah bottleneck berasal dari visual display, query DAX, atau antrean. Untuk optimasi, saya menghapus kolom yang tidak digunakan di Power Query, memisahkan kolom DateTime menjadi Date dan Time terpisah, mengganti fungsi DAX yang memindai seluruh tabel dengan KEEPFILTERS atau VALUES, serta menggunakan alat DAX Studio untuk memeriksa rasio SE (Storage Engine) vs FE (Formula Engine).*

---

## 🏆 Langkah Pamungkas: Uji Kompetensi Anda!
Selamat! Anda telah menyelesaikan seluruh rangkaian materi dari Modul 1 hingga Modul 10.  
Sekarang, buktikan keahlian Anda dengan menyelesaikan **Technical Assessment Case Study** yang sesungguhnya di:  
👉 **[Technical Assessment & Exam Power BI](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Exam/Power%20BI/README_INSTRUKSI.md)**

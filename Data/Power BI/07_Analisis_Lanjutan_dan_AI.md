# 📘 Modul 07: Analisis Lanjutan & Fitur Cerdas (AI & Analytics)

---

## 🎯 Tujuan Pembelajaran
Setelah menyelesaikan modul ini, Anda diharapkan mampu:
1. Memanfaatkan **Analytics Pane** untuk menambahkan garis tren, batas rata-rata, dan **Forecasting**.
2. Menggunakan visual bertenaga kecerdasan buatan (**Key Influencers**, **Decomposition Tree**, **Smart Narrative**).
3. Membangun simulasi skenario bisnis menggunakan **What-If Parameters (Numeric Range)**.
4. Mengimplementasikan **Field Parameters** untuk memungkinkan pengguna mengganti sumbu chart dan metrik secara dinamis.
5. Melakukan segmentasi data otomatis dengan **Clustering** dan **Data Binning**.

---

## 1. Analytics Pane & Peramalan Tren (Forecasting)

Pada visual garis (*Line Chart*), Power BI menyediakan panel khusus bernama **Analytics Pane** (ikon kaca pembesar di atas grafik).

### Fitur Utama Analytics Pane:
1. **Trend Line:** Menarik garis regresi linear otomatis untuk memperlihatkan arah tren (apakah performa cenderung naik atau melandai).
2. **Min / Max / Average Lines:** Membantu stakeholder melihat batas toleransi performa operasional.
3. **Forecasting (Peramalan Time-Series):**
   - Power BI menggunakan algoritma *exponential smoothing* bawaan untuk memprediksi metrik hingga beberapa periode ke depan.
   - Anda dapat menentukan horizon peramalan (misal: 6 bulan ke depan), interval kepercayaan (*confidence interval* 95%), dan mendeteksi siklus musiman (*seasonality* misal siklus 12 bulanan).

---

## 2. Visual Berbasis Kecerdasan Buatan (AI Visuals)

Power BI dilengkapi dengan visual canggih berbasis Machine Learning yang dapat langsung digunakan tanpa perlu menulis kode Python/R:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        VISUAL AI POWER BI                              │
│                                                                        │
│  [ 🌳 Decomposition Tree ] -> Memecah metrik ke akar penyebabnya       │
│  [ 🔍 Key Influencers ]    -> Menemukan faktor pemicu kenaikan/turun   │
│  [ 📝 Smart Narrative ]   -> Ringkasan teks insight otomatis          │
│  [ 💬 Q&A Visual ]         -> Tanya jawab dengan bahasa manusia        │
└────────────────────────────────────────────────────────────────────────┘
```

### A. Key Influencers Visual
Membantu menjawab pertanyaan: *"Faktor apa yang paling mendorong suatu hasil terjadi?"*

- **Kasus Penggunaan:** Mengetahui faktor penyebab keterlambatan pengiriman (*Delivery_Status = "Delayed"*).
- **Konfigurasi:**
  - *Analyze:* Tarik kolom `Delivery_Status`.
  - *Explain by:* Tarik `Courier`, `Region`, `Channel`, `Store_Type`.
- **Hasil AI:** Algoritma regresi logistik akan menyajikan insight seperti:  
  *"Ketika Kurir adalah JNE Trucking, kemungkinan pengiriman terlambat meningkat 2.8x lipat dibandingkan kurir lainnya."*

### B. Decomposition Tree (Pohon Dekomposisi)
Sangat ideal untuk *Root-Cause Analysis* (Analisis Akar Masalah) secara eksploratif:
- Pengguna dapat memilih untuk memecah total keuntungan (*Gross Profit*) berdasarkan cabang toko mana yang performanya anjlok.
- **Fitur AI Split:** Klik ikon lampu ($\💡$) pada cabang pohon untuk membiarkan AI otomatis memilih dimensi mana yang memiliki nilai tertinggi (*High Value*) atau terendah (*Low Value*).

### C. Smart Narrative (Narasi Cerdas)
- Mengubah grafik rumit menjadi paragraf kesimpulan teks bahasa alami secara otomatis.
- Teks bersifat dinamis: saat pengguna memfilter slicer, angka di dalam teks narasi otomatis berubah mengikuti data terbaru.

---

## 3. Simulasi Bisnis: What-If Parameter (Numeric Range)

Manajemen sering kali meminta analis data membuat model proyeksi skenario:  
*"Bagaimana jika kita menaikkan diskon sebesar 5%? Berapa proyeksi penurunan gross profit margin kita?"*

### Langkah Membuat What-If Parameter:
1. Buka tab **Modeling** > klik **New Parameter** > pilih **Numeric range**.
2. Beri nama: `Diskon Tambahan %`.
3. Atur parameter:
   - Minimum: `0`
   - Maximum: `0.20` (20%)
   - Increment: `0.01` (1%)
   - Default: `0`
4. Power BI akan otomatis membuat tabel kalkulasi dengan slicer slider di kanvas dan measure `[Diskon Tambahan % Value]`.
5. Buat measure proyeksi baru yang merespons slider tersebut:

```dax
Simulasi Net Revenue = 
VAR DiskonTambahan = [Diskon Tambahan % Value]
RETURN
SUMX(
    Fact_Sales,
    Fact_Sales[Qty] * Fact_Sales[Unit_Price] * (1 - (Fact_Sales[Discount_Rate] + DiskonTambahan))
)
```

---

## 4. Field Parameters: Mengubah Dimensi & Measure Dinamis

Fitur **Field Parameters** memungkinkan pengguna dashboard mengganti metrik atau dimensi grafik hanya dengan mengklik tombol slicer, tanpa perlu membuat banyak bookmark!

### Skenario 1: Slicer Pemilih Metrik (Dynamic Measure)
Membuat satu chart yang bisa berganti menampilkan: `Total Revenue`, `Gross Profit`, atau `Total Orders`.

1. Buka tab **Modeling** > **New Parameter** > pilih **Fields**.
2. Beri nama: `Pilih Metrik`.
3. Centang ketiga measure: `[Total Net Revenue]`, `[Gross Profit]`, `[Total Orders]`.
4. Power BI membuat slicer baru di halaman Anda. Tarik field `Pilih Metrik` ke sumbu Y pada chart. Pengguna kini dapat memilih metrik yang ingin mereka lihat secara interaktif!

### Skenario 2: Slicer Pemilih Sumbu Kategori (Dynamic Dimension)
Memungkinkan pengguna mengganti sumbu X pada grafik antara: `Store_Name`, `Product_Category`, atau `Courier`.

---

## 5. Pengelompokan & Segmentasi (Binning & Clustering)

### A. Data Binning (Membuat Histogram)
Untuk melihat distribusi usia pelanggan atau frekuensi nilai transaksi:
- Klik kanan pada kolom numerik (misal `Unit_Price`) di panel Data > pilih **New group**.
- Ubah **Group type** menjadi **Bin**.
- Tentukan ukuran interval (*Bin size*, misal kelipatan Rp 100.000).
- Tarik kolom hasil binning ke bar chart untuk menghasilkan visual histogram distribusi.

### B. Otomatis Clustering (K-Means)
Pada visual **Scatter Plot** (misal sumbu X = Total Transaksi, sumbu Y = Total Belanja per Customer):
- Klik tanda titik tiga ($\dots$) di sudut kanan atas visual > pilih **Automatically find clusters**.
- Power BI menggunakan algoritma K-Means untuk mengelompokkan pelanggan ke dalam klaster perilaku (misal: *Pelanggan VIP*, *Pelanggan Pemburu Diskon*, *Pelanggan Musiman*).

---

## 🧪 Latihan Mandiri 07: Membangun Analisis Pohon Dekomposisi

1. Sisipkan visual **Decomposition Tree** pada halaman laporan baru.
2. Tarik `[Total Net Revenue]` ke bagian **Analyze**.
3. Tarik field berikut ke bagian **Explain by**:
   - `Dim_Product[Category]`
   - `Dim_Store[Region]`
   - `Fact_Sales[Channel]`
4. Klik tanda plus ($+$) di sebelah Total Net Revenue > pilih **High Value** untuk melihat cabang bisnis mana yang menjadi pendorong omzet terbesar.

---

## ⏭️ Langkah Selanjutnya
Setelah laporan memiliki analisis yang tajam, bagaimana jika laporan terasa lambat saat dibuka? Pelajari teknik optimasi mendalam di:  
👉 **[Modul 08: Optimasi Performa & VertiPaq Engine](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/08_Optimasi_Performa.md)**

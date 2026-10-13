# 📘 Hari 02: Siklus Hidup Data & Strategi Pembersihan Data

*"Garbage In, Garbage Out"* adalah prinsip nomor satu dalam dunia data. Secanggih apapun model atau dashboard yang dibuat, jika data awalnya kotor atau bias, kesimpulan yang dihasilkan akan menyesatkan.

---

## 🎯 Target Pembelajaran
1. Memahami 6 tahapan dalam Siklus Hidup Data (*Data Lifecycle*).
2. Mengenali berbagai bentuk data kotor (*Missing Values, Duplicates, Outliers, Structural Errors*).
3. Menguasai strategi pemilihan metode pembersihan data yang aman bagi integritas analisis.

---

## 🧠 Teori & Konsep Kunci

### 1. Enam Tahapan Data Lifecycle

```
[1. Collection] ──► [2. Cleanup] ──► [3. Exploration] ──► [4. Visualisation] ──► [5. Statistical Analysis] ──► [6. Machine Learning / Insights]
```

1. **Collection (Pengumpulan Data):** Mengambil data dari berbagai sumber (Database SQL, Excel spreadsheet, API web, CRM).
   - *Referensi:* [Collection.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Key%20Concepts%20of%20Data/Collection.md)
2. **Cleanup (Pembersihan Data):** Menghapus duplikasi, mengisi atau membuang data kosong, standarisasi teks dan format tanggal.
   - *Referensi:* [Cleanup.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Key%20Concepts%20of%20Data/Cleanup.md)
3. **Exploration (Eksplorasi Data / EDA):** Memahami distribusi data, ringkasan statistik (mean, median, min, max), mendeteksi pola awal.
   - *Referensi:* [Exploration.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Key%20Concepts%20of%20Data/Exploration.md)
4. **Visualisation (Visualisasi Data):** Memilih visual yang tepat (bar, line, scatter) untuk mengomunikasikan tren kepada pemangku kepentingan.
   - *Referensi:* [Visualisation.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Key%20Concepts%20of%20Data/Visualisation.md)
5. **Statistical Analysis (Analisis Statistik):** Pengujian hipotesis, uji korelasi, signifikansi perubahan metrik.
   - *Referensi:* [Statistical Analysis.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Key%20Concepts%20of%20Data/Statistical%20Analysis.md)
6. **Machine Learning / Insights (Penerapan Model):** Segmentasi kluster, regresi prediksi churn/penjualan.
   - *Referensi:* [Machine Learning.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Key%20Concepts%20of%20Data/Machine%20Learning.md)

---

### 2. Tipe-Tipe Anomali & Data Kotor

| Jenis Masalah Data | Contoh Kasus | Strategi Penanganan |
|---|---|---|
| **Missing Values (Nilai Kosong)** | Kolom `Umur` bernilai `NULL` pada 5% pelanggan | - Hapus baris jika data kosong adalah primary key/kritis.<br>- Imputasi dengan Median jika berdistribusi miring (*skewed*).<br>- Isi nilai default (misal: `"Unknown"` atau `0`). |
| **Duplicate Data** | 1 transaksi tercatat 2x karena kendala refresh browser | Hapus duplikat berdasarkan kombinasi `OrderID` + `Timestamp`. |
| **Inconsistent Text** | `"JAKARTA"`, `"jkt"`, `"Dki Jakarta"`, `"Jakarta "` | Standarisasi dengan huruf kapital/Title Case dan trim spasi liar. |
| **Invalid Data Types** | Kolom tanggal tercatat sebagai string `"2026/13/45"` | Parse dan ubah ke format standar ISO `YYYY-MM-DD`. |
| **Outliers (Pencilan Ekstrem)** | Usia pelanggan tercatat `250 tahun` atau Pembelian `-Rp 5.000.000` | Selidiki apakah kesalahan input (*typo*) atau transaksi retur/refund. |

---

## 💼 Studi Kasus: "Audit Dataset Penjualan Ritel"

**Data Mentah yang Ditemukan:**
```csv
OrderID,CustomerName,City,SalesAmount,OrderDate
1001,  Budi Santoso ,Jakarta,150000,2026-03-01
1002,SITI AMINAH,JKT,250000,2026-03-01
1003,Andi Wijaya,Bandung,,2026-03-02
1001,  Budi Santoso ,Jakarta,150000,2026-03-01
1004,Joko Widodo,Surabaya,-50000,2026-03-03
1005,Rina Marlina,Semarang,999999999,2026-03-04
```

**Langkah Pembersihan Data:**
1. **Deduplikasi:** Baris ke-4 merupakan duplikasi identik dari `OrderID: 1001` ➔ Hapus baris 4.
2. **Standarisasi String:**
   - `CustomerName`: Hapus spasi depan/belakang (`TRIM`) dan ubah ke `PROPER` ("Budi Santoso", "Siti Aminah").
   - `City`: Ganti `"JKT"` menjadi `"Jakarta"`.
3. **Penanganan Missing Values:** `OrderID: 1003` memiliki `SalesAmount` kosong. Cari data rincian item atau imputasi berdasarkan rata-rata kategori item yang dibeli.
4. **Penanganan Nilai Negatif:** `OrderID: 1004` bernilai `-50000`. Tandai kolom `TransactionType` sebagai `"REFUND"` agar tidak merusak perhitungan omzet penjualan normal.
5. **Penanganan Outlier:** `OrderID: 1005` bernilai `999999999` (kemungkinan kesalahan ketik sistem). Verifikasi invoice asli atau ganti dengan nilai transaksi riil.

---

## ✍️ Latihan Mandiri & Kuis Hari 2

### Soal Latihan:
1. Mengapa kita tidak boleh sembarangan langsung menghapus semua baris yang memiliki nilai kosong (*missing values*)?
2. Jika sebuah dataset gaji karyawan memiliki 99 orang bergaji Rp 5.000.000 dan 1 orang CEO bergaji Rp 1.000.000.000, manakah ukuran pemusatan data yang lebih merepresentasikan kondisi umum: **Mean (Rata-rata)** atau **Median (Nilai Tengah)**? Jelaskan alasannya!

---

### 🔑 Kunci Jawaban
1. Menghapus baris secara serampangan dapat memicu **Sampling Bias** dan kehilangan informasi penting, terutama jika data yang hilang terjadi secara sistematis (*Not Missing At Random*).
2. **Median (Nilai Tengah)**. Karena Mean sangat sensitif terhadap outlier ekstrem (gaji CEO Rp 1 M akan menarik rata-rata menjadi puluhan juta, padahal mayoritas karyawan hanya bergaji 5 juta). Median tetap stabil di angka 5 juta.

---

## ✅ Checklist Hari 2
- [ ] Memahami 6 tahap siklus data dan peran masing-masing tahapan.
- [ ] Mampu mengenali jenis-jenis kotoran data dalam tabel.
- [ ] Siap melanjutkan ke [Hari 03: Excel Data Cleaning & Manipulasi Teks](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_03_Excel_Data_Cleaning_dan_Text_Manipulation.md).

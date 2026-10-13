# 📘 Modul 08: Optimasi Performa & Best Practices

---

## 🎯 Tujuan Pembelajaran
Setelah menyelesaikan modul ini, Anda diharapkan mampu:
1. Mengidentifikasi 4 lapisan penyebab lambatnya laporan Power BI (*Bottleneck Analysis*).
2. Memahami cara kerja mesin kompresi **VertiPaq Engine** dan dampak **Kardinalitas Kolom** terhadap konsumsi RAM.
3. Menerapkan teknik reduksi ukuran berkas `.pbix` hingga lebih dari 60%.
4. Menggunakan alat bawaan **Performance Analyzer** untuk mendiagnosis visual dan rumus yang lambat.
5. Mengoptimalkan formula DAX untuk eksekusi kilat.
6. Mengenal ekosistem alat eksternal profesional (**DAX Studio**, **Tabular Editor**, **Bravo**).

---

## 1. Anatomi Kinerja: Di Mana Terjadinya Bottleneck?

Saat seorang pengguna mengklik sebuah filter dan visual berputar lama (*loading spinning wheel*), waktu jeda tersebut terbagi ke dalam 3 komponen:

```mermaid
flowchart LR
    A["1. DAX Query\nWaktu mesin VertiPaq memproses kalkulasi"] --> B["2. Visual Display\nWaktu browser/aplikasi menggambar chart"]
    B --> C["3. Other / Queuing\nWaktu antrean eksekusi visual paralel"]
```

Jika waktu total visual melebihi **1.5 hingga 2 detik**, pengguna akan merasa dashboard lambat dan tidak nyaman digunakan.

---

## 2. Mengenal Mesin VertiPaq & Kardinalitas Kolom

Power BI menggunakan basis data berbasis kolom dalam memori (*in-memory columnar database*) bernama **VertiPaq**.

### Bagaimana VertiPaq Mengompresi Data?
VertiPaq mengompresi data berdasarkan kolom, bukan baris. Mesin ini sangat menyukai kolom yang memiliki **sedikit nilai unik (Low Cardinality)**:

```
Kolom 'Gender' (2 Nilai Unik: Pria, Wanita)      --> Ukuran Memori: SANGAT KECIL (Kilobytes)
Kolom 'Status' (3 Nilai Unik: Lunas, Pending)    --> Ukuran Memori: SANGAT KECIL
Kolom 'Order_Timestamp' (1.000.000 Nilai Unik)   --> Ukuran Memori: SANGAT BESAR (Megabytes/Gigabytes)
```

> [!WARNING]
> **Musuh Nomor Satu Performa: Kardinalitas Tinggi (*High Cardinality*)**
> Menyimpan kolom tanggal beserta jam, menit, dan detik (`2024-05-18 14:32:05`) menghasilkan jutaan nilai unik yang merusak kompresi VertiPaq.
> **Solusi:** Selalu pisahkan kolom tersebut di Power Query menjadi:
> - Kolom `Date` (tipe Date): Hanya menyimpan tanggal.
> - Kolom `Time` (tipe Time): Hanya jika bisnis benar-benar membutuhkan analisis jam. Jika tidak, hapus komponen waktunya!

---

## 3. Checklist Reduksi Ukuran File & Memori (PBIX Diet)

Sebelum mempublikasikan laporan, lakukan audit efisiensi berikut:

- [ ] **Hapus Kolom yang Tidak Digunakan (*Remove Unused Columns*):**  
  Apakah Anda benar-benar membutuhkan alamat jalan lengkap, nomor telepon pelanggan, atau ID internal sistem di dashboard? Jika tidak divisualisasikan, hapus di Power Query!
- [ ] **Hindari Calculated Column jika Bisa Menjadi Measure:**  
  Calculated Column memakan memori RAM permanen. Measure hanya memakan CPU sementara saat diklik.
- [ ] **Matikan Fitur Auto Date/Time:**  
  Pastikan opsi *Auto date/time* dimatikan di setelan file untuk menghapus tabel kalender tersembunyi yang dibuat otomatis oleh Power BI.
- [ ] **Gunakan Tipe Data yang Tepat:**  
  Ubah angka desimal yang panjang (*Floating Point*) menjadi *Fixed Decimal Number* (Mata Uang dengan 4 digit di belakang koma) untuk meningkatkan efisiensi kompresi.

---

## 4. Menggunakan Performance Analyzer

Power BI Desktop menyediakan alat diagnostik bawaan untuk mengukur durasi setiap visual:

### Cara Menggunakan:
1. Buka tab **View** > centang panel **Performance Analyzer**.
2. Klik tombol **Start recording**.
3. Klik tombol **Refresh visuals** di panel tersebut.
4. Anda akan melihat daftar visual diurutkan berdasarkan visual yang paling lama dimuat.
5. Buka rincian salah satu visual lambat:
   - **DAX query:** Durasi waktu kalkulasi formula (dalam milidetik / ms).
   - **Visual display:** Durasi waktu merender grafik.
   - **Other:** Waktu tunggu antrean.
6. Klik **Copy query** untuk menyalin kueri DAX tersebut dan mengujinya di DAX Studio.

---

## 5. Kaidah Emas Optimasi Formula DAX

### 1. Hindari `FILTER()` pada Seluruh Tabel Fakta
```dax
// ❌ BURUK: Memindai seluruh jutaan baris tabel fakta Fact_Sales
Bad Measure = 
CALCULATE(
    [Total Net Revenue],
    FILTER(Fact_Sales, Fact_Sales[Discount_Rate] > 0.1)
)

// ✅ BAIK: Hanya memindai nilai unik dari kolom yang bersangkutan
Optimized Measure = 
CALCULATE(
    [Total Net Revenue],
    KEEPFILTERS(Fact_Sales[Discount_Rate] > 0.1)
)
```

### 2. Gunakan `COUNTROWS(Table)` daripada `COUNT(Table[Column])`
Fungsi `COUNTROWS` secara langsung membaca metadata tabel internal VertiPaq tanpa perlu memeriksa apakah ada nilai *null* di kolom tertentu.

### 3. Selalu Simpan Perhitungan Berulang ke dalam Variabel (`VAR`)
```dax
// ❌ BURUK: [Total Net Revenue] dievaluasi dua kali
Ratio Bad = 
IF([Total Net Revenue] > 1000000, [Total Net Revenue] * 0.9, 0)

// ✅ BAIK: [Total Net Revenue] hanya dihitung SATU KALI
Ratio Optimized = 
VAR Rev = [Total Net Revenue]
RETURN
IF(Rev > 1000000, Rev * 0.9, 0)
```

---

## 6. Alat Eksternal Profesional (External Tools)

Komunitas Power BI global menyediakan alat gratis kelas profesional yang sangat disukai para arsitek BI:

1. **DAX Studio ([daxstudio.org](https://daxstudio.org/)):**
   - Alat terbaik untuk menganalisis performa DAX secara mendalam.
   - Fitur *Server Timings* memperlihatkan pembagian kerja antara **Storage Engine (SE - VertiPaq)** yang sangat cepat dan **Formula Engine (FE)** yang berjalan di single thread CPU.
2. **Tabular Editor ([tabulareditor.com](https://tabulareditor.com/)):**
   - Mengedit model data secara kilat tanpa harus menunggu loading GUI Power BI.
   - Memiliki fitur **Best Practice Analyzer (BPA)** yang secara otomatis memindai ratusan aturan kesalahan arsitektur model data Anda.
3. **Bravo for Power BI:**
   - Memformat seluruh sintaks DAX secara otomatis, membuat tabel kalender instan, dan menganalisis ukuran memori kolom dataset secara visual.

---

## ⏭️ Langkah Selanjutnya
Setelah dashboard Anda cepat, ramping, dan siap pakai, saatnya mendistribusikan laporan dan mengamankan hak akses data di:  
👉 **[Modul 09: Power BI Service, Kolaborasi, & Keamanan Data (RLS)](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/09_Power_BI_Service_dan_Keamanan.md)**

# 📊 Technical Assessment: Junior Data Analyst
**Perusahaan:** PT Nusantara Retail Makmur  
**Posisi:** Junior Data Analyst / Data Analyst Intern  
**Domain:** Omnichannel E-Commerce & Retail Transaction Analytics  

---

## 🎯 Ringkasan & Tujuan Proyek
Proyek ini dirancang sebagai tes teknis (*technical test*) berbasis studi kasus nyata yang menguji penguasaan 11 kompetensi spreadsheet utama untuk seorang Data Analyst:
1. **Logika & Kondisi:** `IF` (Nested IF / Multi-tier Logic)
2. **Kalkulasi Tanggal & Durasi:** `DATEDIF` (Masa Retensi/Tenure)
3. **Pencarian Relasi Data:** `VLOOKUP` (Vertical Lookup) & `HLOOKUP` (Horizontal Lookup)
4. **Pembersihan & Manipulasi Teks:** `REPLACE` / `SUBSTITUTE`, `UPPER` / `LOWER` / `PROPER`, `CONCAT` / `CONCATENATE`, `TRIM`
5. **Agregasi & Summary Statistik:** `SUM`, `AVERAGE`, `COUNT` / `COUNTA`, `MIN`, `MAX`

---

## 📁 Struktur Berkas dalam ZIP
- 📄 `Data_Analyst_Technical_Assessment_Template.xlsx` : Workbook lembar kerja kandidat (soal & data mentah yang harus diisi formula).
- 📄 `Data_Analyst_Technical_Assessment_Solutions.xlsx` : Workbook kunci jawaban lengkap beserta seluruh formula siap pakai.
- 📄 `PETUNJUK_DAN_SOAL_TES.pdf` : Dokumen soal dan instruksi resmi format PDF.
- 📁 `dataset_csv/` :
  - `Raw_Transactions.csv` : Raw data transaksi penjualan.
  - `Master_Product.csv` : Tabel referensi produk, kategori, dan harga satuan.
  - `Master_Tier_Discount.csv` : Tabel referensi diskon kategori (format horizontal).

---

## 📋 Detail Lembar Kerja (Sheets)
1. **`Instructions & Info`** : Panduan pengerjaan dan daftar materi teruji.
2. **`Raw_Transactions`** : Sheet utama pengolahan data transaksi (Kolom A s/d V).
3. **`Master_Product`** : Master data produk (`SKU`, `Product_Name`, `Category`, `Unit_Price`).
4. **`Master_Tier_Discount`** : Master diskon dasar kategori per kategori produk.
5. **`KPI_Summary`** : Dashboard ringkasan eksekutif untuk metrik bisnis utama.

---

## 📝 Daftar Instruksi Pengerjaan (Soal 1 - 13)

### Bagian A: Data Cleaning & Text Manipulation
* **Soal 1 (`Clean_Cust_Name` - Kolom I):** Bersihkan spasi berlebih di awal/akhir nama dan ubah menjadi format huruf kapital setiap awal kata (*Proper Case*).  
  *Formula:* `=PROPER(TRIM(B2))`
* **Soal 2 (`Clean_Email` - Kolom J):** Bersihkan spasi dan ubah seluruh karakter email menjadi huruf kecil (*Lowercase*).  
  *Formula:* `=LOWER(TRIM(C2))`
* **Soal 3 (`Standard_SKU` - Kolom K):** Hapus prefix non-standar seperti `OLD-` atau `NEW-` sehingga menyisakan format baku SKU (`PRD-xxx`).  
  *Formula:* `=SUBSTITUTE(SUBSTITUTE(F2, "OLD-", ""), "NEW-", "")`
* **Soal 4 (`Delivery_Code` - Kolom L):** Gabungkan `Trx_ID`, teks `"-SHP-"`, dan `Standard_SKU`.  
  *Formula:* `=CONCAT(A2, CONCAT("-SHP-", K2))` atau `=A2&"-SHP-"&K2`

### Bagian B: Lookup & Date Calculations
* **Soal 5 (`Product_Name`, `Category`, `Unit_Price` - Kolom M, N, O):** Ambil informasi detail produk dari sheet `Master_Product` berdasarkan `Standard_SKU`.  
  *Formula Unit_Price:* `=VLOOKUP(K2, Master_Product!$A$2:$D$6, 4, FALSE)`
* **Soal 6 (`Base_Discount` - Kolom P):** Cari persentase diskon dasar kategori dari sheet `Master_Tier_Discount` berdasarkan `Category`.  
  *Formula:* `=HLOOKUP(N2, Master_Tier_Discount!$B$1:$E$2, 2, FALSE)`
* **Soal 7 (`Tenure_Months` - Kolom Q):** Hitung lama masa keanggotaan pelanggan (dalam satuan bulan penuh) dari `Join_Date` hingga `Order_Date`.  
  *Formula:* `=DATEDIF(D2, E2, "M")`

### Bagian C: Business Logic & Rule Engine
* **Soal 8 (`Final_Discount_Rate` - Kolom R):** Terapkan aturan promo:
  - Jika `Voucher_Code` = `"DISC10"`, diskon `10%` (0.10).
  - Jika `Voucher_Code` = `"CASHBACK"`, diskon `5%` (0.05).
  - Jika tidak ada voucher (`"-"`), gunakan nilai dari `Base_Discount` (Kolom P).  
  *Formula:* `=IF(H2="DISC10", 0.1, IF(H2="CASHBACK", 0.05, P2))`
* **Soal 9 (`Customer_Segment` - Kolom S):** Segmentasi loyalitas pelanggan:
  - `> 24 Bulan` : `"VIP Tier"`
  - `12 - 24 Bulan` : `"Gold Tier"`
  - `< 12 Bulan` : `"Silver Tier"`  
  *Formula:* `=IF(Q2>24, "VIP Tier", IF(Q2>=12, "Gold Tier", "Silver Tier"))`

### Bagian D: Revenue Calculation & KPI Dashboard
* **Kalkulasi Pendapatan (Kolom T, U, V):**
  - `Gross_Revenue` = `=Qty * Unit_Price` (`=G2*O2`)
  - `Discount_Amount` = `=Gross_Revenue * Final_Discount_Rate` (`=T2*R2`)
  - `Net_Revenue` = `=Gross_Revenue - Discount_Amount` (`=T2-U2`)
* **Sheet `KPI_Summary`:**
  - **Total Gross Revenue:** `=SUM(Raw_Transactions!T2:T16)`
  - **Total Net Revenue:** `=SUM(Raw_Transactions!V2:V16)`
  - **Total Orders (Count):** `=COUNTA(Raw_Transactions!A2:A16)`
  - **Average Order Value (AOV):** `=AVERAGE(Raw_Transactions!T2:T16)`
  - **Highest / Lowest Order Value:** `=MAX(...)` dan `=MIN(...)`
  - **Average Customer Tenure:** `=AVERAGE(Raw_Transactions!Q2:Q16)`

---
*Semoga sukses dalam proses pengerjaan dan simulasi tes data analyst!*

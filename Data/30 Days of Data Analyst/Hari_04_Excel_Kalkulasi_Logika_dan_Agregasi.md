# 📘 Hari 04: Excel Kalkulasi Logika & Agregasi Bersyarat

Seorang Data Analyst sering kali harus mengelompokkan data ke dalam kategori tertentu, menghitung bonus performa, atau menjumlahkan transaksi berdasarkan kriteria spesifik.

---

## 🎯 Target Pembelajaran
1. Menguasai fungsi logika percabangan: `IF`, *Nested* `IF`, `IFS`, `AND`, `OR`, `IFERROR`.
2. Menguasai fungsi agregasi bersyarat multi-kriteria: `SUMIFS`, `COUNTIFS`, `AVERAGEIFS`.
3. Menguasai kalkulasi tanggal dan usia menggunakan `DATEDIF`.

---

## 🧠 Teori & Formula Penting

### 1. Fungsi Logika Percabangan

- **`IF` Standar:**
  ```excel
  =IF(logical_test, value_if_true, value_if_false)
  =IF(C2 >= 75, "Lulus", "Remedial")
  ```
- **Kombinasi `AND` & `OR`:**
  ```excel
  =IF(AND(Sales >= 100000000, Rating >= 4.5), "Bonus Platinum", "Reguler")
  =IF(OR(City = "Jakarta", City = "Surabaya"), "Tier 1", "Tier 2")
  ```
- **`IFS` (Modern multi-kondisi tanpa kurung bersarang):**
  ```excel
  =IFS(Sales >= 100000000, "Tier A", Sales >= 50000000, "Tier B", Sales >= 20000000, "Tier C", TRUE, "Tier D")
  ```
- **`IFERROR` (Mencegah tampilan error `#N/A` atau `#DIV/0!`):**
  ```excel
  =IFERROR(A2 / B2, 0)
  ```
  - *Latihan:* [Latihan_IF_Function.xlsx](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Analysist%20or%20Reporting%20With%20Excel/Latihan_IF_Function.xlsx)

---

### 2. Fungsi Agregasi Bersyarat (Multi-Criteria Aggregation)

*Aturan Emas:* Selalu gunakan versi jamak (`SUMIFS`, `COUNTIFS`, `AVERAGEIFS`) karena lebih fleksibel dan bisa menangani 1 hingga puluhan kriteria sekaligus.

- **`SUMIFS`:**
  ```excel
  =SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
  =SUMIFS(D:D, B:B, "Elektronik", C:C, "Jakarta")
  ```
- **`COUNTIFS`:**
  ```excel
  =COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2)
  =COUNTIFS(B:B, "Elektronik", D:D, ">1000000")
  ```
- **`AVERAGEIFS`:**
  ```excel
  =AVERAGEIFS(average_range, criteria_range1, criteria1)
  ```
  - *Latihan:* [Latihan_Sum_Average_Min_Max.xlsx](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Analysist%20or%20Reporting%20With%20Excel/Latihan_Sum_Average_Min_Max.xlsx)

---

### 3. Operasi Tanggal & `DATEDIF`

Fungsi rahasia Excel yang sangat ampuh untuk menghitung selisih hari, bulan, atau tahun:
```excel
=DATEDIF(start_date, end_date, unit)
```
- `"Y"`: Selisih tahun penuh (contoh: menghitung umur pelanggan).
- `"M"`: Selisih bulan penuh (contoh: menghitung durasi berlangganan / *tenure*).
- `"D"`: Selisih jumlah hari (contoh: menghitung lama proses pengiriman barang / *lead time*).
- `"YM"`: Sisa selisih bulan setelah dikurangi tahun penuh.
- *Latihan:* [Latihan_DATEDIF_Function.xlsx](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Analysist%20or%20Reporting%20With%20Excel/Latihan_DATEDIF_Function.xlsx)

```excel
=DATEDIF(B2, TODAY(), "Y") & " Tahun " & DATEDIF(B2, TODAY(), "YM") & " Bulan"
```

---

## 💼 Latihan Praktik Terpandu

1. Buka [Latihan_IF_Function.xlsx](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Analysist%20or%20Reporting%20With%20Excel/Latihan_IF_Function.xlsx) dan buat formula penentuan komisi sales berdasarkan target.
2. Buka [Latihan_Sum_Average_Min_Max.xlsx](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Analysist%20or%20Reporting%20With%20Excel/Latihan_Sum_Average_Min_Max.xlsx) dan hitung metrik per kategori produk.
3. Buka [Latihan_DATEDIF_Function.xlsx](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Analysist%20or%20Reporting%20With%20Excel/Latihan_DATEDIF_Function.xlsx) dan hitung masa kerja pegawai.

---

## ✍️ Kuis Mandiri Hari 4

**Soal:**
Tulis formula Excel untuk menjumlahkan nilai transaksi di kolom `E:E` jika kolom `B:B` bernilai `"Fashion"`, kolom `C:C` bernilai `"Bandung"`, dan tanggal di kolom `A:A` terjadi setelah `31 Desember 2025`!

**Jawaban:**
```excel
=SUMIFS(E:E, B:B, "Fashion", C:C, "Bandung", A:A, ">2025-12-31")
```

---

## ✅ Checklist Hari 4
- [ ] Menyelesaikan latihan formula logika dan agregasi bersyarat di folder workspace.
- [ ] Mampu menghitung selisih waktu/umur dinamis menggunakan `DATEDIF`.
- [ ] Siap melanjutkan ke [Hari 05: Excel Lookup Mastery (VLOOKUP, INDEX MATCH, XLOOKUP)](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_05_Excel_Lookup_Mastery_VLOOKUP_INDEX_XLOOKUP.md).

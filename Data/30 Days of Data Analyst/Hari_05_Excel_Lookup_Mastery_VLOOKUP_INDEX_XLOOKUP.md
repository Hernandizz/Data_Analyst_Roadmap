# 📘 Hari 05: Excel Lookup Mastery (VLOOKUP, INDEX MATCH, XLOOKUP)

Di dunia nyata, data jarang berada di satu tabel tunggal. Menguasai fungsi *Lookup* adalah gerbang awal memahami konsep *Relational Database* dan *Joins*.

---

## 🎯 Target Pembelajaran
1. Menguasai `VLOOKUP` dan `HLOOKUP` beserta kelemahan & batasannya.
2. Menguasai formula kombinasi `INDEX & MATCH` (solusi klasik anti-geser kolom).
3. Menguasai `XLOOKUP` (fungsi pencarian modern tercanggih di Excel).
4. Memahami penanganan error `#N/A` saat data referensi tidak ditemukan.

---

## 🧠 Teori & Formula Penting

### 1. `VLOOKUP` (Vertical Lookup)
```excel
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
=VLOOKUP(A2, Products!$A$2:$D$100, 3, FALSE)
```
- **Kelemahan VLOOKUP:**
  - Kunci pencarian (*lookup_value*) **wajib** berada di kolom paling kiri (`Kolom 1`) dari tabel referensi. Tidak bisa mencari ke arah kiri (*left lookup*).
  - Jika seseorang menyisipkan kolom baru di tengah tabel, nomor indeks kolom (`col_index_num`) akan bergeser dan menghasilkan data salah.

---

### 2. `INDEX` & `MATCH` (Pencarian Fleksibel Dua Arah)
- `=INDEX(array, row_num, [col_num])`: Mengambil nilai dari rentang sel pada nomor baris dan kolom tertentu.
- `=MATCH(lookup_value, lookup_array, [match_type])`: Mengembalikan nomor posisi baris atau kolom dari nilai yang dicari.

**Kombinasi Rumus:**
```excel
=INDEX(Products!$C$2:$C$100, MATCH(A2, Products!$A$2:$A$100, 0))
```
- **Keunggulan:** Bebas mencari ke kiri maupun ke kanan, aman dari risiko pergeseran kolom, dan lebih hemat memori komputasi pada dataset besar.

---

### 3. `XLOOKUP` (Modern, Aman & Cepat)
Fungsi generasi baru yang menggantikan VLOOKUP, HLOOKUP, dan INDEX MATCH secara sekaligus.

```excel
=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])
```

```excel
=XLOOKUP(A2, Products!$A$2:$A$100, Products!$D$2:$D$100, "Tidak Ditemukan")
```
- **Fitur Unggulan XLOOKUP:**
  - Default pencarian adalah *Exact Match* (tidak perlu lagi mengetik `FALSE` atau `0`).
  - Fitur bawaan `[if_not_found]` menggantikan kebutuhan `IFERROR`.
  - Mampu mencari ke kiri, horizontal, vertikal, dan dari bawah ke atas (*bottom-up search*).

---

## 💼 Latihan Praktik Terpandu

Buka file latihan di workspace:
- [Latihan_Vlookup_Hlookup_Xlookup.xlsx](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Analysist%20or%20Reporting%20With%20Excel/Latihan_Vlookup_Hlookup_Xlookup.xlsx)

**Instruksi Praktik:**
1. Di Sheet 1: Hubungkan `ProductID` pada tabel transaksi ke tabel master harga menggunakan `VLOOKUP`.
2. Di Sheet 2: Ambil nama cabang dari tabel referensi horizontal menggunakan `HLOOKUP`.
3. Di Sheet 3: Lakukan pencarian nama pelanggan berdasarkan nomor transaksi yang berada di sebelah kanan kolom menggunakan `INDEX & MATCH` dan `XLOOKUP`.

---

## ✍️ Kuis Mandiri Hari 5

**Soal:**
Tulis formula `XLOOKUP` untuk mencari harga produk berdasarkan `ProductID` di sel `B2` dari rentang master `Products!$B$2:$B$500` dan mengembalikan nilai harga di kolom `Products!$A$2:$A$500` (posisi di sebelah kiri). Jika kode produk tidak ada, tampilkan teks `"SKU Tidak Terdaftar"`!

**Jawaban:**
```excel
=XLOOKUP(B2, Products!$B$2:$B$500, Products!$A$2:$A$500, "SKU Tidak Terdaftar")
```

---

## ✅ Checklist Hari 5
- [ ] Menyelesaikan latihan spreadsheet di [Latihan_Vlookup_Hlookup_Xlookup.xlsx](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Analysist%20or%20Reporting%20With%20Excel/Latihan_Vlookup_Hlookup_Xlookup.xlsx).
- [ ] Memahami perbedaan dan keunggulan `XLOOKUP` vs `VLOOKUP`.
- [ ] Siap melanjutkan ke [Hari 06: Excel Pivot Table, Slicers & Dynamic Reporting](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_06_Excel_Pivot_Table_Slicers_dan_Reporting.md).

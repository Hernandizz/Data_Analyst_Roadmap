# 📘 Hari 03: Excel Data Cleaning & Manipulasi Teks

Excel adalah alat kerja harian tercepat untuk inspeksi, pembersihan awal, dan persiapan data sebelum dianalisis lebih jauh.

---

## 🎯 Target Pembelajaran
1. Menguasai formula pembersihan spasi dan standarisasi kapitalisasi teks (`TRIM`, `UPPER`, `LOWER`, `PROPER`, `CLEAN`).
2. Menguasai penggabungan teks dinamis (`CONCAT`, `TEXTJOIN`, operator `&`).
3. Memecah string dengan fungsi teks (`LEFT`, `RIGHT`, `MID`, `LEN`, `FIND`) dan fitur *Text to Columns*.
4. Mampu mendeteksi dan menghapus duplikasi data (*Remove Duplicates*).

---

## 🧠 Teori & Formula Penting

### 1. Fungsi Pembersihan & Kapitalisasi Teks
- `=TRIM(text)`: Menghapus spasi berlebih di awal, akhir, dan spasi ganda di tengah kata.
  - *Latihan:* [Latihan_TRIM.xlsx](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Analysist%20or%20Reporting%20With%20Excel/Latihan_TRIM.xlsx)
- `=PROPER(text)`: Mengubah huruf pertama setiap kata menjadi huruf kapital (Title Case), contoh: `"budi santoso"` ➔ `"Budi Santoso"`.
  - *Latihan:* [Latihan_Upper_Lower_Proper.xlsx](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Analysist%20or%20Reporting%20With%20Excel/Latihan_Upper_Lower_Proper.xlsx)
- `=UPPER(text)`: Mengubah seluruh teks menjadi huruf besar (`"jakarta"` ➔ `"JAKARTA"`).
- `=LOWER(text)`: Mengubah seluruh teks menjadi huruf kecil (`"BUDI@GMAIL.COM"` ➔ `"budi@gmail.com"`).
- `=CLEAN(text)`: Menghapus karakter non-printable (karakter ASCII 0-31 yang sering muncul dari hasil ekspor web/PDF).

```excel
=PROPER(TRIM(A2))
```

---

### 2. Fungsi Penggabungan Teks
- **Operator `&`**: `=A2 & " - " & B2`
- **`CONCAT`**: `=CONCAT(A2, " ", B2)`
- **`TEXTJOIN` (Modern & Sangat Kuat):**
  ```excel
  =TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...)
  =TEXTJOIN(", ", TRUE, A2:A10)
  ```
  *Keunggulan `TEXTJOIN`:* Dapat menggabungkan satu rentang/range secara otomatis dan mengabaikan sel yang kosong.
  - *Latihan:* [Latihan_CONCAT.xlsx](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Analysist%20or%20Reporting%20With%20Excel/Latihan_CONCAT.xlsx)

---

### 3. Fungsi Ekstraksi & Pemotongan String
- `=LEFT(text, num_chars)`: Mengambil $N$ karakter dari kiri.
- `=RIGHT(text, num_chars)`: Mengambil $N$ karakter dari kanan.
- `=MID(text, start_num, num_chars)`: Mengambil teks mulai dari posisi tertentu.
- `=FIND(find_text, within_text)`: Mencari posisi nomor indeks karakter tertentu (Case Sensitive).
- `=SEARCH(find_text, within_text)`: Mencari posisi karakter (Not Case Sensitive).
- `=LEN(text)`: Menghitung total panjang karakter.

**Contoh Rumus Pemisahan Nama Depan & Nama Belakang:**
- *Nama Depan:*
  ```excel
  =LEFT(A2, FIND(" ", A2) - 1)
  ```
- *Nama Belakang:*
  ```excel
  =RIGHT(A2, LEN(A2) - FIND(" ", A2))
  ```

---

## 💼 Latihan Praktik Terpandu

Buka file latihan di folder Excel workspace Anda:
1. Buka [Latihan_TRIM.xlsx](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Analysist%20or%20Reporting%20With%20Excel/Latihan_TRIM.xlsx) dan rapikan kolom nama yang memiliki spasi liar.
2. Buka [Latihan_Upper_Lower_Proper.xlsx](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Analysist%20or%20Reporting%20With%20Excel/Latihan_Upper_Lower_Proper.xlsx) dan standarisasi kolom kota dan nama produk.
3. Buka [Latihan_CONCAT.xlsx](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Analysist%20or%20Reporting%20With%20Excel/Latihan_CONCAT.xlsx) dan buat kode unik gabungan dari `Kode Wilayah + ID Pelanggan`.

---

## ✍️ Kuis Mandiri Hari 3

**Soal:**
Jika sel `A2` berisi string `"  INV/2026/03-JKT  "`, tulis satu formula Excel yang menghasilkan output `"JKT"` bersih tanpa spasi!

**Jawaban:**
```excel
=RIGHT(TRIM(A2), 3)
```
*Atau menggunakan MID & FIND:*
```excel
=MID(TRIM(A2), FIND("-", TRIM(A2)) + 1, LEN(TRIM(A2)))
```

---

## ✅ Checklist Hari 3
- [ ] Menyelesaikan latihan formula teks pada 3 file latihan Excel di folder workspace.
- [ ] Menguasai cara memecah dan menggabungkan string secara dinamis.
- [ ] Siap melanjutkan ke [Hari 04: Excel Logika Percabangan & Agregasi](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_04_Excel_Kalkulasi_Logika_dan_Agregasi.md).

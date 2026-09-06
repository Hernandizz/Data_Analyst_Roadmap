# 📑 Power Query (Bahasa M) Cheatsheet

Kumpulan sintaks, struktur logika, dan fungsi manipulasi data terpenting dalam **Bahasa M (Power Query Formula Language)** di Power BI.

---

## 🧱 1. Struktur Blok Dasar Bahasa M

Bahasa M dieksekusi secara deklaratif dan fungsional di dalam blok `let ... in`:

```powerquery
let
    // Langkah-langkah transformasi (dipisahkan koma)
    Langkah1 = SumberData,
    Langkah2 = TransformasiA(Langkah1),
    Langkah3 = TransformasiB(Langkah2)
in
    // Langkah terakhir yang menjadi output akhir tabel
    Langkah3
```

> [!NOTE]
> **Aturan Nama Variabel di Bahasa M:**
> Jika nama langkah memiliki spasi atau karakter khusus, nama wajib diawali tanda pagar dan tanda kutip ganda, contoh: `#"Changed Type"`, `#"Promoted Headers"`.

---

## 🔤 2. Manipulasi Teks (Text Functions)

| Fungsi Bahasa M | Deskripsi | Contoh Hasil |
|---|---|---|
| `Text.Trim(teks)` | Menghapus spasi di awal & akhir teks. | `Text.Trim("  Laptop  ")` $\rightarrow$ `"Laptop"` |
| `Text.Clean(teks)` | Menghapus karakter kontrol / line-break tak terlihat (`\n`, `\t`). | Membersihkan hasil copy-paste web. |
| `Text.Upper(teks)` | Mengubah teks menjadi huruf kapital semua. | `"JAKARTA"` |
| `Text.Lower(teks)` | Mengubah teks menjadi huruf kecil semua. | `"jakarta"` |
| `Text.Proper(teks)` | Huruf kapital di setiap awal kata (*Title Case*). | `"Jakarta Selatan"` |
| `Text.Start(teks, n)` | Mengambil `n` karakter pertama dari kiri (mirip `LEFT`). | `Text.Start("INV-2024", 3)` $\rightarrow$ `"INV"` |
| `Text.End(teks, n)` | Mengambil `n` karakter terakhir dari kanan (mirip `RIGHT`). | `Text.End("INV-2024", 4)` $\rightarrow$ `"2024"` |
| `Text.BetweenDelimiters(t, d1, d2)` | Mengambil teks di antara dua pembatas tertentu. | `"2024"` dari `"INV/2024/001"` |
| `Text.Contains(teks, kata, [Comparer])` | Mengecek apakah teks memuat kata tertentu (case-sensitive default). | `Text.Contains("Supermarket", "market")` $\rightarrow$ `true` |

---

## 📅 3. Manipulasi Tanggal & Waktu (Date/Time Functions)

| Fungsi Bahasa M | Deskripsi | Contoh |
|---|---|---|
| `DateTime.LocalNow()` | Mengambil tanggal & jam sistem komputer saat ini. | Waktu refresh data |
| `DateTime.Date(datetime)` | Mengekstrak komponen tanggal saja dari tipe DateTime. | `2024-05-18 10:30` $\rightarrow$ `2024-05-18` |
| `Date.Year(date)` | Mengambil angka tahun. | `2024` |
| `Date.Month(date)` | Mengambil angka bulan (1 - 12). | `5` |
| `Date.MonthName(date)` | Mengambil nama bulan (misal: "May" atau "Mei"). | `"Mei"` |
| `Date.StartOfMonth(date)` | Mengembalikan tanggal 1 di bulan yang sama. | `2024-05-01` |
| `Date.EndOfMonth(date)` | Mengembalikan hari terakhir di bulan yang sama. | `2024-05-31` |
| `Date.DayOfWeek(date, Day.Monday)` | Angka hari dalam seminggu (Senin = 0). | `0` untuk Senin |
| `Duration.Days(date1 - date2)` | Menghitung selisih hari antara dua tanggal. | `Duration.Days(#date(2024,5,5) - #date(2024,5,1))` $\rightarrow$ `4` |

---

## 📊 4. Operasi Tabel Utama (Table Transformations)

### A. Unpivot Columns (Mengubah Matriks Menjadi Tabular)
```powerquery
#"Unpivoted Other Columns" = Table.UnpivotOtherColumns(
    #"Previous Step", 
    {"Category"}, 
    "Month_Period", 
    "Target_Amount"
)
```

### B. Filter Baris (Filtering)
```powerquery
#"Filtered Rows" = Table.SelectRows(
    #"Previous Step", 
    each [Qty] > 0 and [Delivery_Status] <> "Cancelled"
)
```

### C. Menggabungkan Tabel Secara Horizontal (Merge / Join)
```powerquery
// Melakukan Left Outer Join dengan tabel Dim_Product
#"Merged Queries" = Table.NestedJoin(
    #"Previous Step", {"Product_ID"}, 
    Dim_Product, {"Product_ID"}, 
    "Dim_Product", 
    JoinKind.LeftOuter
)
```

### D. Menggabungkan Tabel Secara Vertikal (Append / Union)
```powerquery
// Menggabungkan 3 tabel bulanan menjadi 1 tabel master
#"Appended Queries" = Table.Combine({Table_Jan, Table_Feb, Table_Mar})
```

### E. Mengganti Nilai Tertentu (Replace Values)
```powerquery
#"Replaced Value" = Table.ReplaceValue(
    #"Previous Step", 
    null, 
    0, 
    Replacer.ReplaceValue, 
    {"Discount_Rate"}
)
```

---

## 🛡️ 5. Penanganan Error & Nilai Kosong (`try ... otherwise`)

Jika sebuah ekspresi rawan menghasilkan error (misal format teks tidak valid), gunakan pengaman `try ... otherwise`:

```powerquery
let
    // Mengubah string angka menjadi number, jika gagal default ke 0
    SafeConversion = try Number.FromText([Raw_Input]) otherwise 0
in
    SafeConversion
```

---

## ⚡ 6. Tips Performa & Query Folding

1. **Letakkan Langkah Filtering di Urutan Paling Awal:** Saring baris yang tidak dibutuhkan sesegera mungkin agar langkah berikutnya memproses data yang jauh lebih sedikit.
2. **Periksa Indikator Query Folding:**
   - Klik kanan pada langkah di Applied Steps. Jika opsi **View Native Query** dapat diklik, artinya langkah tersebut berhasil diubah menjadi kueri SQL oleh server.
   - Hindari langkah-langkah yang mematikan query folding di awal (seperti penambahan index column atau fungsi teks M kustom).

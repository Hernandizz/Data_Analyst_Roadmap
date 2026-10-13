# 📘 Hari 16: Power Query ETL & Bahasa M

Power Query adalah mesin ETL (*Extract, Transform, Load*) bawaan Power BI. Semua langkah pembersihan yang Anda lakukan di Power Query terekam sebagai pipeline otomatis yang dapat dijalankan kembali setiap data diperbarui (*Refresh*).

---

## 🎯 Target Pembelajaran
1. Menguasai transformasi data penting: *Unpivot Columns*, *Split Column*, *Merge Queries*, *Append Queries*.
2. Memahami perbedaan *Merge* (ala SQL JOIN) vs *Append* (ala SQL UNION).
3. Memahami konsep bahasa **M (Power Query Formula Language)** di *Advanced Editor*.
4. Memahami konsep **Query Folding** untuk kecepatan ETL.

---

## 🧠 Teori & Transformasi Kunci

### 1. Unpivot Columns (Mengubah Data Matriks ke Tabular)
Sering kali data Excel bulanan disajikan dalam kolom menyamping (`Jan`, `Feb`, `Mar`, ...). Power BI **membutuhkan data vertikal**.
- *Cara Unpivot:* Pilih kolom identitas (misal: `Product_ID`, `Product_Name`) ➔ Klik kanan ➔ Pilih **Unpivot Other Columns**.
- *Hasil:* Kolom bulan menjadi `Attribute` (Bulan) dan angka menjadi `Value` (Nilai Penjualan).

---

### 2. Merge Queries vs Append Queries
- **Merge Queries:** Menggabungkan dua tabel secara horizontal berdasarkan kolom kunci yang sama (mirip `JOIN` di SQL atau `XLOOKUP` di Excel).
- **Append Queries:** Menumpuk dua tabel secara vertikal yang memiliki struktur kolom yang sama (mirip `UNION ALL` di SQL).

---

### 3. Membaca Kode M di Advanced Editor
Bahasa M adalah bahasa pemrograman fungsional case-sensitive dengan blok `let ... in`:
```powerquery
let
    Source = Csv.Document(File.Contents("C:\Data\Sales.csv"), [Delimiter=",", Encoding=65001]),
    PromotedHeaders = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    ChangedType = Table.TransformColumnTypes(PromotedHeaders, {{"OrderID", Int64.Type}, {"Sales", type number}, {"OrderDate", type date}}),
    FilteredRows = Table.SelectRows(ChangedType, each [Sales] > 0)
in
    FilteredRows
```

- *Materi Lengkap:* [02_Data_Preparation_Power_Query.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/02_Data_Preparation_Power_Query.md)
- *Cheatsheet Formula M:* [Power_Query_M_Cheatsheet.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/Power_Query_M_Cheatsheet.md)

---

## ✅ Checklist Hari 16
- [ ] Menguasai fitur *Unpivot Other Columns*.
- [ ] Memahami perbedaan *Merge Queries* vs *Append Queries*.
- [ ] Membaca [02_Data_Preparation_Power_Query.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/02_Data_Preparation_Power_Query.md).
- [ ] Siap melanjutkan ke [Hari 17: Data Modeling & Star Schema](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_17_Data_Modeling_Star_Schema_dan_Relasi.md).

# 📘 Modul 02: Data Preparation & Power Query (ETL Engine)

---

## 🎯 Tujuan Pembelajaran
Setelah menyelesaikan modul ini, Anda diharapkan mampu:
1. Memahami peran mesin **Power Query** sebagai fondasi proses **ETL** (*Extract, Transform, Load*).
2. Memperbaiki tipe data, menangani *missing values*, teks kotor (*whitespace*), dan duplikasi.
3. Menguasai transformasi restrukturisasi data: **Unpivot Columns** vs **Pivot Columns**.
4. Menggabungkan data secara horizontal (**Merge Queries / JOIN**) dan vertikal (**Append Queries / UNION**).
5. Memahami konsep **Applied Steps**, **Query Folding**, dan dasar-dasar **Bahasa M**.

---

## 1. Konsep ETL & Peran Power Query

Data di dunia nyata jarang sekali dalam kondisi rapi dan siap dianalisis. Data sering kali mengandung header ganda, baris kosong, format tanggal bercampur, atau struktur kolom melebar (*wide matrix*).

Di Power BI, pembersihan data dilakukan di **Power Query Editor** (akses via Ribbon **Home** > **Transform Data**).

```
   [ Sumber Data Mentah ]
    (Excel, CSV, SQL, Web)
             │
             ▼  [ EXTRACT ]
┌──────────────────────────────┐
│     POWER QUERY EDITOR       │
│  - Hapus baris kosong        │
│  - Set tipe data yang benar  │  [ TRANSFORM ]
│  - Unpivot tabel melebar     │
│  - Gabungkan tabel           │
└──────────────────────────────┘
             │
             ▼  [ LOAD ]
    [ Data Model VertiPaq ]
(Siap untuk DAX & Visualisasi)
```

---

## 2. Pemeriksaan & Perbaikan Tipe Data (Data Types)

Setiap kolom wajib memiliki tipe data yang eksplisit. Jika tipe data salah (misal angka terbaca sebagai teks), Anda tidak akan bisa melakukan operasi matematika seperti penjumlahan (`SUM`).

| Ikon Tipe Data | Nama Tipe | Contoh Nilai | Catatan Penting |
|:---:|---|---|---|
| `123` | **Whole Number** | `10`, `500`, `14500` | Untuk kuantitas (Qty), ID numerik. |
| `1.2` | **Decimal Number** | `15.75`, `1200.50` | Untuk nilai moneter, harga, profit. |
| `📅` | **Date** | `2024-05-18` | Wajib untuk kolom tanggal analisis (*Date dimension*). |
| `📅🕒` | **Date/Time** | `2024-05-18 14:30:00` | Pisahkan menjadi Date dan Time jika tidak butuh presisi detik untuk efisiensi memori. |
| `ABC` | **Text** | `"Electronics"`, `"INV-001"` | Kode SKU, nama kota, kategori. |
| `T/F` | **True/False (Boolean)** | `TRUE`, `FALSE` | Flag status (misal: `Is_Active`). |
| `%` | **Percentage** | `0.15` (ditampilkan `15%`) | Diskon, rasio margin. |

---

## 3. Teknik Pembersihan Data Esensial

### A. Memperbaiki Header Baris Pertama
Sering kali baris judul kolom berada di baris pertama data.
- **Solusi:** Klik tab **Home** > **Use First Row as Headers**.

### B. Menghilangkan Whitespace Kotor
Data teks yang diketik manual sering menyimpan spasi ekstra di awal atau akhir kata (misal `" Laptop "` bukan `"Laptop"`), yang menyebabkan kegagalan pencocokan saat filter.
- **Solusi:** Klik kanan kolom > **Transform** > **Trim** (menghapus spasi awal & akhir).
- Tambahkan **Clean** (menghapus karakter tersembunyi/non-printable seperti line break `\n`).

### C. Menghapus Duplikasi & Baris Kosong
- **Hapus Duplikat:** Pilih kolom kunci unik (misal `Customer_ID`) > Klik kanan > **Remove Duplicates**.
- **Hapus Baris Kosong:** Klik dropdown filter pada header kolom > hilangkan centang `(blank)` atau klik **Remove Rows** > **Remove Blank Rows**.

### D. Memecah Kolom (Split Column)
Jika data Anda berisi `"JKT-INV-2024-001"` dan Anda hanya butuh kode kota `"JKT"`:
- Klik kanan kolom > **Split Column** > **By Delimiter** > pilih pemisah tanda strip (`-`).

---

## 4. Transformasi Kunci: Unpivot Columns

Salah satu kendala terbesar data analis pemula adalah menerima laporan dalam bentuk **Wide Table** (Format Presentasi Excel), di mana nama-nama bulan diletakkan sebagai header kolom:

### Contoh Data Mentah (Format Melebar / Wide):
| Kategori | Jan_2024 | Feb_2024 | Mar_2024 |
|---|---|---|---|
| Elektronik | 100.000.000 | 120.000.000 | 110.000.000 |
| Fashion | 40.000.000 | 45.000.000 | 50.000.000 |

> [!WARNING]
> Format ini **TIDAK BISA** dihubungkan ke tabel kalender (*Dim_Date*) dan membuat rumus DAX menjadi sangat rumit karena Anda harus membuat measure terpisah untuk setiap bulan!

### Solusi: Lakukan Unpivot Columns!
1. Di Power Query, pilih kolom yang **TETAP** (misal kolom `Kategori`).
2. Klik tab **Transform** > klik tanda panah pada **Unpivot Columns** > pilih **Unpivot Other Columns**.
3. Hasilnya akan menjadi **Format Panjang (Long / Tabular Format)** yang dicintai Power BI:

| Kategori | Attribute (Bulan) | Value (Target Sales) |
|---|---|---|
| Elektronik | Jan_2024 | 100.000.000 |
| Elektronik | Feb_2024 | 120.000.000 |
| Elektronik | Mar_2024 | 110.000.000 |
| Fashion | Jan_2024 | 40.000.000 |
| Fashion | Feb_2024 | 45.000.000 |
| Fashion | Mar_2024 | 50.000.000 |

4. Ubah nama kolom `Attribute` menjadi `Target_Month` dan ubah formatnya menjadi `Date`.

---

## 5. Menggabungkan Tabel: Merge vs Append

```
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│         MERGE QUERIES                │     │         APPEND QUERIES               │
│      (Penggabungan Horizontal)       │     │       (Penggabungan Vertikal)        │
│                                      │     │                                      │
│  Tabel A       Tabel B               │     │  Tabel Jan 2024                      │
│  ┌───┬───┐     ┌───┬───┐             │     │  ┌────────┬──────┐                   │
│  │ID │Val│  +  │ID │Desc             │     │  │Order_ID│Sales │                   │
│  └───┴───┘     └───┴───┘             │     │  └────────┴──────┘                   │
│      ▼                               │     │         +                            │
│  ┌───┬───┬────┐                      │     │  Tabel Feb 2024                      │
│  │ID │Val│Desc│ (Seperti VLOOKUP/JOIN)│     │  ┌────────┬──────┐                   │
│  └───┴───┴────┘                      │     │  │Order_ID│Sales │                   │
│                                      │     │  └────────┴──────┘                   │
│                                      │     │         ▼                            │
│                                      │     │  ┌────────┬──────┐                   │
│                                      │     │  │Order_ID│Sales │ (Seperti UNION ALL│
│                                      │     │  ├────────┼──────┤  menumpuk baris)  │
│                                      │     │  │Order_ID│Sales │                   │
│                                      │     │  └────────┴──────┘                   │
└──────────────────────────────────────┘     └──────────────────────────────────────┘
```

### A. Merge Queries (Mirip VLOOKUP / SQL JOIN)
- Menggabungkan dua tabel berdampingan secara horizontal berdasarkan kolom kunci (*matching key*).
- **Jenis Join Utama:**
  - **Left Outer (semua dari tabel 1, yang cocok dari tabel 2):** Paling umum digunakan.
  - **Inner (hanya baris yang cocok di kedua tabel).**
  - **Left Anti (hanya baris di tabel 1 yang TIDAK ADA di tabel 2):** Sangat berguna untuk mendeteksi data anomali atau pelanggan yang belum pernah bertransaksi.

### B. Append Queries (Mirip SQL UNION ALL)
- Menggabungkan dua atau lebih tabel secara vertikal dengan menumpuk baris ke bawah.
- **Syarat Utama:** Kolom-kolom di kedua tabel sebaiknya memiliki nama header dan tipe data yang persis sama.

---

## 6. Applied Steps & Pengenalan Bahasa M

Setiap klik dan aksi pembersihan yang Anda lakukan di Power Query direkam di panel sebelah kanan bernama **Applied Steps**.

- Anda dapat mengklik tanda silang ($❌$) pada langkah tertentu untuk membatalkan transformasi.
- Anda dapat mengklik ikon roda gigi ($\⚙️$) untuk mengubah konfigurasi langkah sebelumnya.
- Di balik antarmuka grafis tersebut, Power Query mengeksekusi kode fungsional yang disebut **Bahasa M**.

Untuk melihat kode M di balik sebuah kueri:
- Klik tab **Home** > **Advanced Editor**.

### Contoh Struktur Sederhana Kode M:
```powerquery
let
    // Langkah 1: Membaca file CSV
    Source = Csv.Document(File.Contents("C:\Data\Fact_Sales.csv"), [Delimiter=",", Columns=13, Encoding=65001]),
    
    // Langkah 2: Menggunakan baris pertama sebagai header
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    
    // Langkah 3: Mengubah tipe data kolom
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",{
        {"Order_ID", type text},
        {"Order_Date", type date},
        {"Qty", Int64.Type},
        {"Unit_Price", type number}
    })
in
    #"Changed Type"
```

---

## 7. Best Practices di Power Query

1. **Beri Nama yang Jelas pada Applied Steps:** Ganti nama default seperti `Changed Type1` menjadi `Ubah Format Tanggal` agar rekan setim dapat membaca alur kerja Anda dengan mudah.
2. **Matikan "Enable Load" pada Tabel Staging/Perantara:**
   - Jika Anda memiliki 3 tabel bulanan yang di-*Append* menjadi 1 tabel master tahunan, klik kanan pada 3 tabel sumber tersebut dan hilangkan centang **Enable Load**. Tabel tersebut tetap diproses oleh Power Query, namun tidak akan memakan RAM model data di laporan visual Anda.
3. **Pahami Query Folding:**
   - Jika sumber data Anda adalah Database SQL Server, Power Query secara otomatis menerjemahkan langkah transformasi Anda menjadi kueri SQL (`WHERE`, `GROUP BY`, dll.) yang dieksekusi di server database. Hal ini membuat proses refresh jauh lebih cepat.

---

## 🧪 Latihan Mandiri 02: Praktik Unpivot Data Target

### Skenario:
Buka file target penjualan di:  
[`Exam/Power BI/dataset_csv/Monthly_Sales_Targets_Raw.csv`](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Exam/Power%20BI/dataset_csv/Monthly_Sales_Targets_Raw.csv)

File ini memiliki kolom: `Category`, `Jan_2024`, `Feb_2024`, `Mar_2024`, ..., `Dec_2024`.

### Tugas Anda:
1. Impor file tersebut ke Power Query Editor.
2. Pilih kolom `Category`.
3. Klik **Transform** > **Unpivot Columns** > **Unpivot Other Columns**.
4. Ubah nama kolom:
   - `Attribute` $\rightarrow$ `Target_Period`
   - `Value` $\rightarrow$ `Target_Sales`
5. Ubah tipe data `Target_Sales` menjadi `Decimal Number` (atau *Fixed Decimal*).
6. Klik **Close & Apply**. Data Anda kini siap dimodelkan!

---

## ⏭️ Langkah Selanjutnya
Setelah data bersih dan terstruktur rapi, saatnya membangun hubungan antar tabel di:  
👉 **[Modul 03: Data Modeling & Hubungan Antar Tabel (Star Schema)](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/03_Data_Modeling_Star_Schema.md)**

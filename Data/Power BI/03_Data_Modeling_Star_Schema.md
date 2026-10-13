# 📘 Modul 03: Data Modeling & Hubungan Antar Tabel (Star Schema)

---

## 🎯 Tujuan Pembelajaran
Setelah menyelesaikan modul ini, Anda diharapkan mampu:
1. Memahami mengapa **Data Modeling** adalah fondasi terpenting dalam Power BI.
2. Membedakan secara akurat antara **Fact Table** (Tabel Fakta) dan **Dimension Table** (Tabel Dimensi).
3. Membangun arsitektur **Star Schema** sesuai standar industri (*Kimball Methodology*).
4. Menguasai konsep **Kardinalitas** (`1:*`, `1:1`, `*:*`) dan **Cross-Filter Direction** (*Single* vs *Both*).
5. Mengelola **Relasi Aktif vs Tidak Aktif** (*Role-playing dimensions*).
6. Membangun tabel kalender standar (**Date Dimension**) menggunakan DAX dan menandainya dengan *Mark as Date Table*.

---

## 1. Mengapa Data Modeling Adalah Jantung Power BI?

> *"80% permasalahan lambatnya dashboard dan rumus DAX yang berbelit-belit bersumber dari Model Data yang buruk."*

Banyak pengguna Excel yang terbiasa menggabungkan semua data menjadi satu lembar kerja raksasa (*single wide table* dengan ribuan kolom menggunakan formula `XLOOKUP`). Di Power BI, pendekatan ini sangat tidak efisien karena:
1. Memboroskan memori RAM secara masif.
2. Menghasilkan perhitungan yang rawan duplikasi (*cartesian product* / *double counting*).
3. Rumus DAX menjadi rumit dan sulit dirawat.

Di Power BI, data dipecah ke dalam entitas-entitas logis yang saling terhubung membentuk **Skema Bintang (Star Schema)**.

---

## 2. Fact Table vs Dimension Table

```
           ┌──────────────────────┐
           │     Dim_Customer     │
           │  (Siapa pembelinya?) │
           └──────────┬───────────┘
                      │
                      │ 1:*
                      ▼
┌──────────────────┐     ┌──────────────────────┐     ┌──────────────────┐
│   Dim_Product    │     │      Fact_Sales      │     │     Dim_Store    │
│ (Apa produknya?) │────▶│  (Transaksi: Berapa  │◀────│ (Di mana tokonya)│
└──────────────────┘ 1:* │  rupiah & kuantitas) │ 1:* └──────────────────┘
                         └──────────▲───────────┘
                                    │
                                    │ 1:*
                      ┌─────────────┴────────────┐
                      │         Dim_Date         │
                      │   (Kapan transaksinya?)  │
                      └──────────────────────────┘
```

| Kriteria | Fact Table (Tabel Fakta) | Dimension Table (Tabel Dimensi / Lookup) |
|---|---|---|
| **Definisi** | Berisi rekaman peristiwa bisnis, transaksi, atau pengukuran numerik. | Berisi informasi kontekstual untuk memfilter, mengelompokkan, dan mendeskripsikan fakta. |
| **Pertanyaan Bisnis** | *"Berapa banyak?", "Berapa rupiah?", "Berapa durasinya?"* | *"Siapa?", "Kapan?", "Di mana?", "Produk apa?", "Kategori apa?"* |
| **Tipe Data Dominan** | Kolom numerik (Qty, Price, Discount) dan Foreign Keys. | Teks deskriptif, hierarki kategori, tanggal, Primary Key unik. |
| **Ukuran & Pertumbuhan** | Sangat besar (jutaan baris) dan bertambah cepat setiap hari. | Cenderung ramping (puluhan hingga ribuan baris unik) dan jarang berubah. |
| **Contoh Tabel** | `Fact_Sales`, `Fact_Orders`, `Fact_InventorySnapshot`. | `Dim_Customer`, `Dim_Product`, `Dim_Store`, `Dim_Date`. |

---

## 3. Arsitektur Relasi: Star Schema vs Snowflake Schema

```
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│             STAR SCHEMA              │     │           SNOWFLAKE SCHEMA           │
│        (Standar Emas BI)             │     │      (Tabel Dimensi Dinormalisasi)   │
│                                      │     │                                      │
│           [Dim_Customer]             │     │      [Dim_SubCategory]               │
│                 │                    │     │             │ 1:*                    │
│                 │ 1:*                │     │             ▼                        │
│   [Dim_Product] │  [Dim_Store]       │     │       [Dim_Category]                 │
│         \       │      /             │     │             │ 1:*                    │
│          \      │     /              │     │             ▼                        │
│         [ FACT_SALES ]               │     │       [Dim_Product]   [Dim_Customer] │
│                 │                    │     │             \              /         │
│                 │ 1:*                │     │              ▼            ▼          │
│            [Dim_Date]                │     │               [ FACT_SALES ]         │
└──────────────────────────────────────┘     └──────────────────────────────────────┘
```

### Mengapa Microsoft Merekomendasikan Star Schema?
1. **Performa VertiPaq Maksimal:** Mesin analitik Power BI dioptimalkan secara khusus untuk mencari data dari tabel dimensi ke tabel fakta dalam 1 lompatan relasi (*single hop*).
2. **Keterbacaan bagi Bisnis:** Stakeholder dan analis awam dapat dengan mudah memahami hubungan antar tabel.
3. **Penyederhanaan DAX:** Rumus DAX menjadi jauh lebih ringkas dan cepat dieksekusi.

---

## 4. Kardinalitas Relasi (Cardinality)

Kardinalitas menentukan proporsi keunikan nilai antar dua tabel yang dihubungkan:

### 1. One-to-Many (`1:*`) — STANDAR UTAMA
- Sisi **1** berada pada tabel Dimensi (memiliki baris unik / Primary Key).
- Sisi **\*** berada pada tabel Fakta (Foreign Key yang dapat muncul berulang kali).
- *Contoh:* 1 `Customer_ID` di `Dim_Customer` dapat melakukan banyak transaksi di `Fact_Sales`.

### 2. One-to-One (`1:1`)
- Kedua tabel hanya memiliki 1 baris unik untuk kunci yang sama.
- *Best practice:* Pertimbangkan untuk menggabungkan kedua tabel tersebut di Power Query menjadi satu tabel saja.

### 3. Many-to-Many (`*:*`) — ⚠️ HINDARI JIKA MEMUNGKINKAN
- Nilai kunci di kedua tabel memiliki duplikasi.
- Menimbulkan ambiguitas data dan penurunan performa drastis.
- **Solusi Industri:** Buat **Bridge Table** (Tabel Jembatan) yang berisi nilai unik dari kunci tersebut, sehingga relasi berubah menjadi dua buah relasi `1:*`.

---

## 5. Arah Filter Bersilang (Cross-Filter Direction)

```
[ Dim_Product ] ───( Single: ──▶ )───▶ [ Fact_Sales ]
Filter hanya mengalir satu arah dari Dimensi menuju Fakta.
```

- **Single Direction (Default & Disarankan):**
  Filter pada tabel dimensi (misal memilih Kategori "Elektronik") otomatis memfilter tabel fakta `Fact_Sales`. Namun filter pada `Fact_Sales` tidak akan memfilter tabel `Dim_Product`.
- **Both Direction (Dua Arah / Bi-directional):**
  Filter mengalir bolak-balik.
  > [!CAUTION]
  > Jangan mengaktifkan *Both Direction* sembarangan! Penggunaan filter dua arah dapat menyebabkan:
  > 1. Terbentuknya **circular dependency** (jalur relasi ambigu).
  > 2. Hasil perhitungan DAX yang tidak terduga dan salah (*incorrect totals*).
  > 3. Performa laporan menjadi lambat. Gunakan fungsi DAX seperti `CROSSFILTER()` jika hanya butuh filter dua arah untuk kasus spesifik.

---

## 6. Relasi Aktif vs Tidak Aktif (Role-Playing Dimensions)

Di tabel fakta, sering kali terdapat lebih dari satu kolom tanggal:
- `Order_Date` (Tanggal Pemesanan)
- `Ship_Date` (Tanggal Pengiriman)

Power BI **hanya mengizinkan satu relasi aktif** antara dua tabel yang sama:
- Relasi `Dim_Date[Date]` ke `Fact_Sales[Order_Date]` dijadikan **Active** (garis solid).
- Relasi `Dim_Date[Date]` ke `Fact_Sales[Ship_Date]` otomatis menjadi **Inactive** (garis putus-putus).

### Cara Menggunakan Relasi Tidak Aktif di DAX:
Gunakan fungsi `USERELATIONSHIP()` di dalam `CALCULATE()`:

```dax
Total Revenue by Ship Date = 
CALCULATE(
    [Total Revenue],
    USERELATIONSHIP(Fact_Sales[Ship_Date], Dim_Date[Date])
)
```

---

## 7. Membangun Tabel Kalender Dinamis (Date Dimension)

> [!IMPORTANT]
> **Matikan Fitur Auto Date/Time Bawaan Power BI:**
> Masuk ke menu **File** > **Options and settings** > **Options** > **Current File** > **Data Load** > **Hilangkan centang "Auto date/time"**. Fitur bawaan ini diam-diam membuat tabel tanggal tersembunyi di balik setiap kolom tanggal, yang membuat ukuran file `.pbix` membengkak!

### Membuat Tabel Kalender Menggunakan DAX:
Pada Ribbon **Modeling**, klik **New Table**, lalu ketikkan:

```dax
Dim_Date = 
VAR MinYear = YEAR(MIN(Fact_Sales[Order_Date]))
VAR MaxYear = YEAR(MAX(Fact_Sales[Order_Date]))
RETURN
ADDCOLUMNS(
    CALENDAR(DATE(MinYear, 1, 1), DATE(MaxYear, 12, 31)),
    "Year", YEAR([Date]),
    "Year_Quarter", "Q" & FORMAT([Date], "Q") & " " & YEAR([Date]),
    "Quarter", "Q" & FORMAT([Date], "Q"),
    "Month_Number", MONTH([Date]),
    "Month_Name", FORMAT([Date], "MMMM"),
    "Month_Short", FORMAT([Date], "MMM"),
    "Year_Month", FORMAT([Date], "YYYY-MM"),
    "Day_of_Week", FORMAT([Date], "dddd"),
    "Day_Number", DAY([Date]),
    "Is_Weekend", IF(WEEKDAY([Date], 2) >= 6, "Weekend", "Weekday")
)
```

### 🏷️ Menandai Sebagai Date Table (Mark as Date Table):
1. Klik kanan pada tabel `Dim_Date` di panel Data.
2. Pilih **Mark as date table** > **Mark as date table**.
3. Pilih kolom `Date` sebagai Date Column, lalu klik **OK**.
4. Langkah ini memastikan fungsi-fungsi *Time Intelligence* DAX bekerja dengan akurasi 100%.

---

## 8. Checklist Best Practices di Model View

- [ ] Pastikan semua relasi mengalir dari tabel Dimensi (`1`) ke tabel Fakta (`*`).
- [ ] Atur arah *Cross-filter* ke **Single**.
- [ ] Klik kanan pada seluruh kolom Foreign Key di tabel fakta (misal `Product_ID`, `Customer_ID`, `Store_ID`), lalu pilih **Hide in report view**. Hal ini mencegah pengguna salah memilih kolom filter dari tabel fakta.
- [ ] Atur kolom kode/ID (seperti `Order_ID` atau `Store_ID`) agar propertinya **Summarize by: None / Do not summarize**.

---

## ⏭️ Langkah Selanjutnya
Setelah model data kokoh dengan skema bintang, saatnya mempelajari bahasa logika analitik Power BI di:  
👉 **[Modul 04: Fondasi DAX (Data Analysis Expressions)](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/04_Fondasi_DAX.md)**

# 🔑 Kunci Jawaban & Solusi Lengkap: Power BI Technical Assessment
**Perusahaan:** PT Nusantara Retail Analytics  
**Posisi:** Data Analyst / BI Analyst / Power BI Developer  
**Tujuan Dokumen:** Panduan evaluator / kunci jawaban referensi teknis Power Query, DAX Measures, Data Modeling, Visualisasi, RLS, serta analisis studi kasus.

---

## 🛠️ Modul 1: Power Query Transformation (ETL Solutions)

### 1. Standarisasi Tipe Data (`Fact_Sales`)
Pada Power Query Editor, ubah tipe data setiap kolom berikut:
- `Order_Date` -> **Date**
- `Ship_Date` -> **Date**
- `Unit_Price` -> **Fixed Decimal Number (Currency)** atau **Decimal Number**
- `Discount_Rate` -> **Decimal Number** / **Percentage**
- `Qty` -> **Whole Number**

### 2. Pembersihan Teks (`Dim_Customer` & `Dim_Store`)
- Klik kanan kolom `Customer_Name`, `City`, `Store_Name` -> **Transform** -> **Trim**.
- Klik kanan kolom `Customer_Name`, `Store_Name` -> **Transform** -> **Capitalize Each Word**.

### 3. Custom Column: `Channel_Group` (`Fact_Sales`)
Pilih menu **Add Column** -> **Conditional Column**:
- *Column Name:* `Channel_Group`
- *If* `Channel` *equals* `"Offline Store"` *then* `"Physical Retail"`
- *Else* `"E-Commerce / Online"`

*Formula Power Query M-Code:*
```powerquery
= Table.AddColumn(#"Previous_Step", "Channel_Group", each if [Channel] = "Offline Store" then "Physical Retail" else "E-Commerce / Online", type text)
```

### 4. Custom Column: `Dispatch_Duration_Days` (`Fact_Sales`)
Pilih menu **Add Column** -> **Custom Column**:
- *Column Name:* `Dispatch_Duration_Days`
- *Formula:* `Duration.Days([Ship_Date] - [Order_Date])`
- *Ubah tipe data menjadi:* **Whole Number**

*Formula Power Query M-Code:*
```powerquery
= Table.AddColumn(#"Previous_Step", "Dispatch_Duration_Days", each Duration.Days([Ship_Date] - [Order_Date]), Int64.Type)
```

### 5. Unpivot Tabel Target (`Monthly_Sales_Targets_Raw` -> `Fact_Targets`)
1. Pilih kolom **`Category`**.
2. Klik tab **Transform** -> klik panah bawah di **Unpivot Columns** -> pilih **Unpivot Other Columns**.
3. Ganti nama kolom:
   - `Attribute` diubah menjadi **`Target_Month_Code`** (contoh: `Target_2024_01`).
   - `Value` diubah menjadi **`Target_Amount`** (tipe data Currency / Decimal Number).
4. Tambahkan kolom tanggal pertama bulan (**`Target_Date`**):
   - Klik **Add Column** -> **Custom Column**:
     ```powerquery
     #date(
         Number.FromText(Text.Range([Target_Month_Code], 7, 4)), 
         Number.FromText(Text.Range([Target_Month_Code], 12, 2)), 
         1
     )
     ```
   - Ubah tipe data `Target_Date` menjadi **Date**.
5. Ganti nama query dari `Monthly_Sales_Targets_Raw` menjadi **`Fact_Targets`**.

---

## 📐 Modul 2: Data Modeling & Star Schema Setup

### 6. Tabel Kalender DAX Dinamis (`Dim_Date_DAX`)
Masuk ke tab **Modeling** -> klik **New Table**:
```dax
Dim_Date_DAX = 
VAR MinDate = DATE(2023, 1, 1)
VAR MaxDate = DATE(2024, 12, 31)
RETURN
ADDCOLUMNS(
    CALENDAR(MinDate, MaxDate),
    "Year", YEAR([Date]),
    "Quarter", "Q" & FORMAT([Date], "Q"),
    "Month_Number", MONTH([Date]),
    "Month_Name", FORMAT([Date], "MMM"),
    "Year_Month", FORMAT([Date], "YYYY-MM"),
    "Day_Number", DAY([Date]),
    "Day_Name", FORMAT([Date], "DDDD"),
    "Day_Of_Week", WEEKDAY([Date], 2), -- 1 = Senin, 7 = Minggu
    "Is_Weekend", IF(WEEKDAY([Date], 2) >= 6, "Yes", "No")
)
```
- Klik kanan tabel `Dim_Date_DAX` -> pilih **Mark as Date Table** -> pilih kolom `[Date]`.

### 7. Sort by Column
- Pilih kolom `Month_Name` -> pada tab **Column Tools** -> klik **Sort by Column** -> pilih **`Month_Number`**.
- Pilih kolom `Day_Name` -> pada tab **Column Tools** -> klik **Sort by Column** -> pilih **`Day_Of_Week`**.

### 8. Konfigurasi Relasi Model (Model View)
| Dari Tabel (Dimension) | Ke Tabel (Fact) | Kardinalitas | Cross Filter | Keterangan Relasi |
|---|---|---|---|---|
| `Dim_Product[Product_ID]` | `Fact_Sales[Product_ID]` | 1 to Many (`1:*`) | Single | Primary Dimension |
| `Dim_Customer[Customer_ID]` | `Fact_Sales[Customer_ID]` | 1 to Many (`1:*`) | Single | Primary Dimension |
| `Dim_Store[Store_ID]` | `Fact_Sales[Store_ID]` | 1 to Many (`1:*`) | Single | Primary Dimension |
| `Dim_Date[Date]` | `Fact_Sales[Order_Date]` | 1 to Many (`1:*`) | Single | **Active Relationship** |
| `Dim_Date[Date]` | `Fact_Sales[Ship_Date]` | 1 to Many (`1:*`) | Single | **Inactive Relationship** (Garis putus-putus) |
| `Dim_Product[Category]` | `Fact_Targets[Category]` | 1 to Many (`1:*`) | Single | Target Dimension |
| `Dim_Date[Date]` | `Fact_Targets[Target_Date]` | 1 to Many (`1:*`) | Single | Target Dimension |

### 9. Membuat Tabel Khusus Measure (`_AllMeasures`)
1. Pada tab Home -> klik **Enter Data**.
2. Beri nama tabel **`_AllMeasures`** -> klik **Load**.
3. Sembunyikan kolom dummy `Column1` setelah measure pertama dibuat sehingga ikon tabel berubah menjadi ikon kalkulator.
4. Sembunyikan seluruh Foreign Key di `Fact_Sales` (`Product_ID`, `Customer_ID`, `Store_ID`, `Order_Date`, `Ship_Date`) dengan mengklik ikon mata di Model View.

---

## ⚡ Modul 3: DAX Formulas & Ground-Truth Calculations

Berikut formula DAX lengkap beserta nilai kalkulasi sebenarnya (*ground-truth benchmark*) pada dataset:

### A. Base Financial & Operational Measures (Soal 10 – 11)

```dax
Total Gross Sales = 
SUMX(
    Fact_Sales, 
    Fact_Sales[Qty] * Fact_Sales[Unit_Price]
)
```
> **Benchmark Total (2023-2024):** Rp 877.515.000

```dax
Total Net Sales = 
SUMX(
    Fact_Sales, 
    Fact_Sales[Qty] * Fact_Sales[Unit_Price] * (1 - Fact_Sales[Discount_Rate])
)
```
> **Benchmark Total (2023-2024):** Rp 841.488.250  
> - *2023:* Rp 343.403.750  
> - *2024:* Rp 498.084.500

```dax
Total COGS = 
SUMX(
    Fact_Sales, 
    Fact_Sales[Qty] * RELATED(Dim_Product[Unit_Cost])
)
```
> **Benchmark Total:** Rp 459.865.000

```dax
Total Gross Profit = 
[Total Net Sales] - [Total COGS]
```
> **Benchmark Total:** Rp 381.623.250

```dax
Gross Profit Margin % = 
DIVIDE([Total Gross Profit], [Total Net Sales], 0)
```
> **Benchmark Total:** 45,35% (Konsisten di kisaran 45,26% - 45,41%)

```dax
Total Orders = 
DISTINCTCOUNT(Fact_Sales[Order_ID])
```
> **Benchmark Total:** 1.600 Orders (2023: 650 Orders, 2024: 950 Orders)

```dax
Total Quantity Sold = 
SUM(Fact_Sales[Qty])
```

```dax
Average Order Value (AOV) = 
DIVIDE([Total Net Sales], [Total Orders], 0)
```
> **Benchmark Overall AOV:** Rp 525.930 per transaksi

---

### B. Inactive Relationship & Logical Filtering (Soal 12 – 13)

```dax
Sales by Ship Date = 
CALCULATE(
    [Total Net Sales], 
    USERELATIONSHIP(Fact_Sales[Ship_Date], Dim_Date[Date])
)
```
*Penjelasan:* Fungsi `USERELATIONSHIP` secara dinamis mengaktifkan jalur relasi sekunder `Ship_Date` hanya selama evaluasi kalkulasi measure ini berlangsung.

```dax
Online Sales Revenue = 
CALCULATE(
    [Total Net Sales], 
    Fact_Sales[Channel] <> "Offline Store"
)
```

```dax
Offline Store Sales Revenue = 
CALCULATE(
    [Total Net Sales], 
    Fact_Sales[Channel] = "Offline Store"
)
```

```dax
Online Sales Contribution % = 
DIVIDE([Online Sales Revenue], [Total Net Sales], 0)
```

---

### C. Time Intelligence Calculations (Soal 14)

```dax
Sales SPLY = 
CALCULATE(
    [Total Net Sales], 
    SAMEPERIODLASTYEAR(Dim_Date[Date])
)
```
> **Benchmark (Tahun 2024):** Rp 343.403.750

```dax
YoY Sales Growth (IDR) = 
VAR PriorSales = [Sales SPLY]
RETURN
IF(
    ISBLANK(PriorSales), 
    BLANK(), 
    [Total Net Sales] - PriorSales
)
```
> **Benchmark Pertumbuhan Nominal 2024:** +Rp 154.680.750

```dax
YoY Sales Growth % = 
VAR PriorSales = [Sales SPLY]
RETURN
IF(
    ISBLANK(PriorSales), 
    BLANK(), 
    DIVIDE([Total Net Sales] - PriorSales, PriorSales, 0)
)
```
> **Benchmark Pertumbuhan % 2024:** **+45,04%**

```dax
Sales YTD = 
TOTALYTD([Total Net Sales], Dim_Date[Date])
```

```dax
Sales MTD = 
TOTALMTD([Total Net Sales], Dim_Date[Date])
```

---

### D. Target vs Actual Variance Analysis (Soal 15)

```dax
Total Target Sales = 
SUM(Fact_Targets[Target_Amount])
```

```dax
Sales vs Target Variance = 
[Total Net Sales] - [Total Target Sales]
```

```dax
Target Achievement % = 
DIVIDE([Total Net Sales], [Total Target Sales], 0)
```

---

### E. Advanced DAX (Ranking & Logistics SLA) (Soal 16 – 17)

```dax
Customer Sales Rank = 
IF(
    ISBLANK([Total Net Sales]),
    BLANK(),
    RANKX(
        ALLSELECTED(Dim_Customer[Customer_Name]),
        [Total Net Sales],
        ,
        DESC,
        Dense
    )
)
```

```dax
On-Time Orders Count = 
CALCULATE(
    [Total Orders], 
    Fact_Sales[Delivery_Status] = "On-Time"
)
```
> **Benchmark:** 1.498 Orders

```dax
SLA On-Time Rate % = 
DIVIDE([On-Time Orders Count], [Total Orders], 0)
```
> **Benchmark Keseluruhan:** **93,62%** (Late: 6,38% / 102 orders)

---

## 📊 Modul 4: Panduan Visualisasi & Desain UI/UX

### Halaman 1: Executive Business Overview
1. **KPI Cards (Top Bar Layout):**
   - Card 1: `Total Net Sales` + Sub-label `YoY Sales Growth %` (Beri warna hijau jika > 0).
   - Card 2: `Total Gross Profit` + `Gross Profit Margin %`.
   - Card 3: `Total Orders` + `Average Order Value (AOV)`.
   - Card 4: `Target Achievement %` (Gauge atau KPI Visual).
2. **Visual Utama (Tengah Kiri):**
   - *Tipe:* **Line and Clustered Column Chart**
   - *Shared Axis:* `Dim_Date[Month_Name]`
   - *Column Values:* `[Total Net Sales]`
   - *Line Values:* `[Total Target Sales]`
3. **Visual Kategori (Tengah Kanan):**
   - *Tipe:* **Clustered Bar Chart**
   - *Axis:* `Dim_Product[Category]`
   - *Values:* `[Total Net Sales]`
   - *Tooltips:* `[Gross Profit Margin %]`
4. **Slicers (Panel Filter Atas/Kiri):**
   - Slicer Dropdown: `Dim_Date[Year]`
   - Slicer Tile: `Dim_Date[Quarter]`
   - Slicer Radio: `Dim_Customer[Region]` (`Jawa` / `Luar Jawa`)

### Halaman 2: Customer & Channel Deep-Dive
1. **Matrix Visual (Tabel Performa Pelanggan):**
   - *Rows:* `Dim_Customer[Customer_Segment]` -> `Dim_Customer[Customer_Name]` (Dapat di-*drill down*).
   - *Values:* `[Total Orders]`, `[Total Net Sales]`, `[Gross Profit Margin %]`, `[Customer Sales Rank]`.
   - *Formatting:* Data Bars (warna Teal/Biru) pada `[Total Net Sales]`.
2. **Top 10 Customers Visual:**
   - *Tipe:* **Horizontal Bar Chart**
   - *Y-Axis:* `Dim_Customer[Customer_Name]`
   - *X-Axis:* `[Total Net Sales]`
   - *Filter Visual:* Top N = 10 berdasarkan `[Total Net Sales]`.
3. **Channel Contribution:**
   - *Tipe:* **Donut Chart**
   - *Legend:* `Fact_Sales[Channel]`
   - *Values:* `[Total Net Sales]`

### Halaman 3: Logistics & Operational Efficiency
1. **Courier SLA Table:**
   - *Rows:* `Fact_Sales[Courier]`
   - *Values:* `[Total Orders]`, `[On-Time Orders Count]`, `[SLA On-Time Rate %]`, Rata-rata `Fact_Sales[Dispatch_Duration_Days]`.
   - *Conditional Formatting Icons:* Ikon tanda centang hijau jika `SLA >= 0.92`, tanda seru kuning jika `0.88 - 0.919`, silang merah jika `< 0.88`.
2. **Delivery by Ship Date:**
   - *Tipe:* **Area Chart**
   - *X-Axis:* `Dim_Date[Date]`
   - *Y-Axis:* `[Sales by Ship Date]`
3. **Tooltip Page Setup (`Product_Tooltip`):**
   - Buat page baru -> pada *Page Settings* -> ubah *Page Information* -> aktifkan **Allow use as tooltip**.
   - Pada *Canvas Settings* -> ubah *Type* menjadi **Tooltip**.
   - Masukkan visual Table sederhana: `Dim_Product[Product_Name]`, `[Total Net Sales]`, `[Gross Profit Margin %]` difilter Top 3.
   - Pada Halaman 1, klik grafik Kategori -> ubah opsi *Tooltips* ke `Product_Tooltip`.

---

## 🔒 Modul 5: Row-Level Security & Analisis Studi Kasus

### Solusi RLS (Soal 21)
Pada tab **Modeling** -> klik **Manage Roles**:
1. **Role 1: `Regional_Manager_Jawa`**
   - Pilih tabel `Dim_Customer`
   - DAX Filter:
     ```dax
     [Region] = "Jawa"
     ```
   *(Opsional: tambahkan juga filter yang sama pada tabel `Dim_Store`: `[Region] = "Jawa"`).*
2. **Role 2: `Regional_Manager_Luar_Jawa`**
   - Pilih tabel `Dim_Customer`
   - DAX Filter:
     ```dax
     [Region] = "Luar Jawa"
     ```
3. **Verifikasi:** Klik **View as Roles** -> centang `Regional_Manager_Jawa` -> pastikan total omzet dan grafik hanya menyajikan data wilayah Jawa.

---

### Jawaban Lengkap Analisis Studi Kasus (Soal 22)

#### 1. Pertumbuhan Omzet & Pendorong Utama (Growth Drivers)
* **Persentase Pertumbuhan:** Penjualan bersih tumbuh impresif sebesar **+45,04%** (dari Rp 343,40 juta di 2023 menjadi Rp 498,08 juta di 2024).
* **Faktor Pendorong (Growth Drivers):**
  - Kategori **Electronics** menjadi kontributor terbesar dengan total penjualan mencapai **Rp 217,54 juta** di tahun 2024 (~43,7% dari total omzet). Produk terlaris didorong oleh *Smartwatch Pro* dan *Headphones*.
  - Kategori **Home & Living** (Rp 100,12 juta) dan **Fashion** (Rp 99,03 juta) mencatatkan stabilitas volume transaksi yang tinggi dari segmen *Consumer*.

#### 2. Evaluasi Pencapaian Target 2024 & Rekomendasi Taktis
* **Underperformance Analysis:**
  - Kategori **Beauty & Care** dan **Food & Beverages** memiliki deviasi negatif paling sering terhadap target bulanan (pencapaian hanya sekitar 70% - 85% dari target bulanan). Nilai realisasi 2024 masing-masing adalah Rp 38,08 juta dan Rp 43,31 juta, jauh di bawah potensi pasar FMCG/personal care.
* **Rekomendasi Taktis Tim Komersial:**
  1. *Product Bundling:* Gandengkan produk Beauty atau F&B sebagai *add-on bundle* berdiskon pada pembelian kategori Electronics/Fashion.
  2. *Channel Strategy:* Alihkan alokasi promosi produk Beauty & F&B lebih masif ke **TikTok Shop** yang memiliki *traffic live-shopping* tinggi untuk produk kosmetik & cemilan.
  3. *Penyesuaian Target:* Evaluasi apakah baseline target penjualan awal tahun terlalu optimis tanpa mempertimbangkan persaingan harga di marketplace.

#### 3. Evaluasi Keterlambatan Pengiriman (SLA Logistik)
* **Analisis SLA Ekspedisi:**
  - Rata-rata On-Time SLA keseluruhan berada di angka sehat **93,62%**.
  - Ekspedisi non-instant seperti kurir kargo/ekonomi pada pesanan dengan jarak jauh (pengiriman Jawa ke Luar Jawa) menjadi kontributor utama 102 pesanan terlambat (*Late Delivery*).
* **Kanal yang Terdampak:**
  - Kanal **Marketplace (Shopee & Tokopedia)** paling rentan karena memiliki penalti reputasi toko (*SLA badge*) dan risiko pembatalan pesanan dari pembeli jika terjadi keterlambatan pengiriman.
* **Rekomendasi Operasional:**
  - Terapkan alokasi kurir otomatis (*Smart Courier Routing*) berdasarkan histori kecepatan kurir di rute tertentu, dan prioritaskan *Fulfillment Central* terdekat untuk pengiriman ke luar pulau.

---

## 📋 Checklist Evaluasi Penilaian (Scoring Sheet)

| Kriteria | Sub-Kriteria yang Dinilai | Skor Maks |
|---|---|---|
| **ETL & Data Prep** | Tipe data benar, teks rapi, custom column duration & channel group dibuat, unpivot tabel target berhasil. | 20 |
| **Data Modeling** | Model Star Schema rapi, 1:* single direction, date dimension lengkap, relasi inactive `Ship_Date` terpasang. | 15 |
| **DAX Measures** | Base financial measures benar, measure `USERELATIONSHIP` berjalan, Time Intelligence YoY akurat, Top N ranking valid. | 30 |
| **Visualisasi Dashboard** | 3 halaman terstruktur rapi, desain visual modern, KPI cards interaktif, conditional formatting aktif, tooltip page berfungsi. | 20 |
| **RLS & Business Insights** | Role RLS Jawa & Luar Jawa berfungsi, jawaban analisis bisnis tajam dan didukung data riil. | 15 |
| **TOTAL** | | **100** |

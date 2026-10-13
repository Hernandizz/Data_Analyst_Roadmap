# 📑 DAX Cheatsheet (Kamus Cepat & Formula Siap Pakai)

Kumpulan sintaks, fungsi esensial, dan formula bisnis siap pakai dalam **Data Analysis Expressions (DAX)** untuk Microsoft Power BI.

---

## 🧮 1. Fungsi Agregasi Standar (Basic Aggregations)

| Formula DAX | Deskripsi |
|---|---|
| `SUM(Table[Column])` | Menjumlahkan seluruh angka dalam satu kolom. |
| `AVERAGE(Table[Column])` | Menghitung rata-rata aritmatika kolom numerik. |
| `MIN(Table[Column])` / `MAX(Table[Column])` | Mengembalikan nilai terkecil / terbesar dalam kolom. |
| `COUNT(Table[Column])` | Menghitung jumlah sel yang berisi angka atau tanggal. |
| `DISTINCTCOUNT(Table[Column])` | Menghitung jumlah nilai unik (tidak menghitung duplikat). |
| `COUNTROWS(Table)` | Menghitung jumlah total baris pada sebuah tabel (sangat cepat). |
| `DIVIDE(Num, Denom, [Alt])` | Pembagian aman dengan proteksi otomatis terhadap pembagian nol (`#DIV/0!`). |

---

## 🔄 2. Fungsi Iterator (Row-by-Row X-Functions)

| Formula DAX | Deskripsi & Contoh Kasus |
|---|---|
| `SUMX(Table, Expression)` | Mengevaluasi ekspresi per baris lalu menjumlahkannya: `SUMX(Fact_Sales, Fact_Sales[Qty] * Fact_Sales[Price])` |
| `AVERAGEX(Table, Expression)` | Menghitung rata-rata dari hasil kalkulasi tingkat baris: `AVERAGEX(VALUES(Dim_Date[Date]), [Total Revenue])` |
| `RANKX(Table, Expression, [Val], [Order], [Ties])` | Membuat peringkat numerik: `RANKX(ALL(Dim_Customer[Customer_Name]), [Total Revenue], , DESC, Dense)` |
| `CONCATENATEX(Table, Expression, [Delimiter])` | Menggabungkan teks dari banyak baris menjadi satu string dipisahkan koma. |

---

## ⚡ 3. Jantung Filter Context (`CALCULATE` & Modifiers)

```dax
// Format Dasar:
CALCULATE(<Measure/Ekspresi>, <Filter1>, <Filter2>, ...)
```

| Filter Modifier | Cara Kerja | Contoh Penggunaan |
|---|---|---|
| `ALL(Table)` atau `ALL(Col)` | Menghapus semua filter pada tabel/kolom tersebut. | Grand Total: `CALCULATE([Sales], ALL(Fact_Sales))` |
| `ALLSELECTED(Table/Col)` | Menghapus filter baris/kolom visual, tetapi mempertahankan filter Slicer. | Kontribusi %: `DIVIDE([Sales], CALCULATE([Sales], ALLSELECTED(Fact_Sales)))` |
| `ALLEXCEPT(Table, Col)` | Menghapus semua filter KECUALI pada kolom yang ditentukan. | Subtotal Grup: `CALCULATE([Sales], ALLEXCEPT(Fact_Sales, Dim_Store[Region]))` |
| `KEEPFILTERS(Condition)` | Menambahkan filter baru tanpa menimpa filter konteks yang sudah ada. | Filter spesifik: `CALCULATE([Sales], KEEPFILTERS(Dim_Product[Category] = "Electronics"))` |
| `REMOVEFILTERS(Table/Col)` | Menghapus filter secara eksplisit (sinonim modern dari `ALL`). | `CALCULATE([Sales], REMOVEFILTERS(Dim_Product[Sub_Category]))` |
| `USERELATIONSHIP(FK, PK)` | Mengaktifkan relasi tidak aktif (*inactive relationship*) untuk satu kalkulasi. | Tanggal Kirim: `CALCULATE([Sales], USERELATIONSHIP(Fact_Sales[Ship_Date], Dim_Date[Date]))` |

---

## 📅 4. Fungsi Time Intelligence

> *Catatan: Wajib menggunakan tabel kalender `Dim_Date` yang kontinu dan ditandai sebagai Date Table.*

```dax
// 1. Year-to-Date (Kumulatif Tahunan)
Sales YTD = TOTALYTD([Total Revenue], Dim_Date[Date])

// 2. Month-to-Date (Kumulatif Bulanan)
Sales MTD = TOTALMTD([Total Revenue], Dim_Date[Date])

// 3. Periode yang Sama Tahun Lalu (Same Period Last Year)
Sales SPLY = 
CALCULATE(
    [Total Revenue],
    SAMEPERIODLASTYEAR(Dim_Date[Date])
)

// 4. Mundur 1 Bulan ke Belakang (Prior Month)
Sales Prior Month = 
CALCULATE(
    [Total Revenue],
    DATEADD(Dim_Date[Date], -1, MONTH)
)

// 5. Rolling 30 Days (Rata-Rata Bergerak 30 Hari)
Sales Rolling 30D = 
VAR MaxDate = MAX(Dim_Date[Date])
RETURN
CALCULATE(
    AVERAGEX(VALUES(Dim_Date[Date]), [Total Revenue]),
    DATESINPERIOD(Dim_Date[Date], MaxDate, -30, DAY)
)
```

---

## 💼 5. Kumpulan Formula Metrik Bisnis Siap Pakai

```dax
// --- METRIK PENJUALAN & PROFITABILITAS ---

// 1. Gross Revenue
Gross Revenue = 
SUMX(Fact_Sales, Fact_Sales[Qty] * Fact_Sales[Unit_Price])

// 2. Net Revenue (Setelah Diskon)
Net Revenue = 
SUMX(
    Fact_Sales, 
    Fact_Sales[Qty] * Fact_Sales[Unit_Price] * (1 - Fact_Sales[Discount_Rate])
)

// 3. Cost of Goods Sold (COGS)
Total COGS = 
SUMX(
    Fact_Sales,
    Fact_Sales[Qty] * RELATED(Dim_Product[Unit_Cost])
)

// 4. Gross Profit
Gross Profit = [Net Revenue] - [Total COGS]

// 5. Gross Profit Margin %
Gross Profit Margin % = 
DIVIDE([Gross Profit], [Net Revenue], 0)

// 6. Average Order Value (AOV)
Average Order Value = 
DIVIDE([Net Revenue], DISTINCTCOUNT(Fact_Sales[Order_ID]), 0)


// --- METRIK PERTUMBUHAN (GROWTH) ---

// 7. YoY Growth Nominal
Sales YoY Growth = [Net Revenue] - [Sales SPLY]

// 8. YoY Growth %
Sales YoY Growth % = 
DIVIDE([Net Revenue] - [Sales SPLY], [Sales SPLY], BLANK())

// 9. MoM Growth %
Sales MoM Growth % = 
VAR Prior = [Sales Prior Month]
RETURN
DIVIDE([Net Revenue] - Prior, Prior, BLANK())


// --- PENCAPAIAN TARGET & OPERASIONAL ---

// 10. Target Achievement %
Target Achievement % = 
DIVIDE([Net Revenue], SUM(Fact_Targets[Target_Sales]), 0)

// 11. On-Time Delivery Rate % (Logistik)
On-Time Delivery Rate % = 
VAR TotalDelivered = CALCULATE(COUNTROWS(Fact_Sales), Fact_Sales[Delivery_Status] <> BLANK())
VAR OnTimeOrders = CALCULATE(COUNTROWS(Fact_Sales), Fact_Sales[Delivery_Status] = "Delivered On Time")
RETURN
DIVIDE(OnTimeOrders, TotalDelivered, 0)
```

---

## 💡 6. Logika Kondisional `SWITCH(TRUE(), ...)`

Format penulisan percabangan multi-kondisi yang paling bersih:

```dax
Profit Health Status = 
SWITCH(
    TRUE(),
    [Gross Profit Margin %] >= 0.40, "🟢 Sangat Sehat (Margin >= 40%)",
    [Gross Profit Margin %] >= 0.25, "🟡 Moderat (Margin 25-39%)",
    [Gross Profit Margin %] > 0,      "🟠 Rawan (Margin < 25%)",
    "🔴 Merugi (Negative Margin)"
)
```

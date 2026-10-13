# 🚀 Hari 27: Capstone Part 2 – Data Modeling & DAX Formulation

Hari ini Anda akan membangun fondasi analitik di Power BI Desktop: menghubungkan skema bintang (*Star Schema*) dan menulis seluruh formula kalkulasi bisnis menggunakan DAX.

---

## 🎯 Objektif Hari 27
1. Membangun model data **Star Schema** (1 Fact + 4 Dimensions: `DimDate`, `DimCustomer`, `DimProduct`, `DimStore`).
2. Menghindari relasi *Many-to-Many* dan menetapkan arah filter *Single (1 ➔ \*)*.
3. Menyusun 20+ ukuran bisnis (*Measures*) terstruktur di dalam folder `_Measures`.

---

## 🧠 Model Data & Daftar Rumus DAX Capstone

### 1. Struktur Relasi (Model View)
- `DimDate[DateKey]` $\xrightarrow{1:*}$ `FactSales[OrderDateKey]`
- `DimCustomer[CustomerID]` $\xrightarrow{1:*}$ `FactSales[CustomerID]`
- `DimProduct[ProductID]` $\xrightarrow{1:*}$ `FactSales[ProductID]`
- `DimStore[StoreID]` $\xrightarrow{1:*}$ `FactSales[StoreID]`

---

### 2. Rumus DAX Inti Proyek (Tulis di tabel `_Measures`):

```dax
-- 1. BASE MEASURES
Total Sales = SUM(FactSales[NetSales])
Total Cost = SUM(FactSales[TotalCost])
Total Profit = [Total Sales] - [Total Cost]
Profit Margin % = DIVIDE([Total Profit], [Total Sales], 0)
Total Transactions = DISTINCTCOUNT(FactSales[OrderID])
Total Quantity Sold = SUM(FactSales[Quantity])
Average Order Value (AOV) = DIVIDE([Total Sales], [Total Transactions], 0)

-- 2. TIME INTELLIGENCE MEASURES
Sales YTD = TOTALYTD([Total Sales], DimDate[Date])
Sales PY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date]))
YoY Sales Growth = [Total Sales] - [Sales PY]
YoY Sales Growth % = DIVIDE([YoY Sales Growth], [Sales PY], 0)

Sales Prior Month = CALCULATE([Total Sales], DATEADD(DimDate[Date], -1, MONTH))
MoM Sales Growth % = DIVIDE([Total Sales] - [Sales Prior Month], [Sales Prior Month], 0)

-- 3. CUSTOMER & TARGET MEASURES
Active Customers = DISTINCTCOUNT(FactSales[CustomerID])
Revenue per Customer = DIVIDE([Total Sales], [Active Customers], 0)
Sales Target = SUM(FactTarget[TargetAmount])
Target Achievement % = DIVIDE([Total Sales], [Sales Target], 0)
```

- *Materi Terkait:* [10_Proyek_Portofolio_End_to_End.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/10_Proyek_Portofolio_End_to_End.md) & [03_Data_Modeling_Star_Schema.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/03_Data_Modeling_Star_Schema.md)

---

## ✅ Checklist Hari 27
- [ ] Skema Bintang telah terhubung sempurna di Model View.
- [ ] Seluruh formula DAX telah diuji pada visual tabel dan tidak menghasilkan angka salah / error.
- [ ] Siap melanjutkan ke [Hari 28: Capstone Part 3 – Executive Dashboard Construction](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_28_Capstone_Tahap_3_Interactive_Dashboard_Development.md).

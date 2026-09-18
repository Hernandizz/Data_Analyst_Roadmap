# 📘 Hari 17: Data Modeling & Star Schema

Data Modeling adalah jantung dari Business Intelligence. Sebanyak 80% error atau lambatnya laporan Power BI berakar dari model data yang buruk (seperti tabel raksasa *flat table* atau relasi sirkular).

---

## 🎯 Target Pembelajaran
1. Memahami perbedaan **Fact Table (Tabel Fakta)** vs **Dimension Table (Tabel Dimensi)**.
2. Membangun arsitektur **Star Schema** yang bersih dan terstandarisasi.
3. Memahami kardinalitas relasi: *One-to-Many (1:*)*, *Many-to-Many (*:*)*, dan *Cross Filter Direction*.
4. Membangun **Date Table (DimDate)** dinamis menggunakan DAX atau Power Query M.

---

## 🧠 Teori & Arsitektur Star Schema

```
                    ┌────────────────────────┐
                    │      DimCustomer       │
                    │  PK CustomerKey        │
                    │     CustomerName, City │
                    └───────────┬────────────┘
                                │ 1
                                │
                                │ *
┌──────────────────────┐        ▼        ┌──────────────────────┐
│       DimDate        │ 1            *  │      DimProduct      │
│  PK DateKey          ├────► FactSales ◄┤  PK ProductKey       │
│     Year, Month, Qtr │                 │     ProductName, Cat │
└──────────────────────┘                 └──────────────────────┘
                                ▲
                                │ *
                                │
                                │ 1
                    ┌───────────┴────────────┐
                    │        DimStore        │
                    │  PK StoreKey           │
                    │     StoreName, Region  │
                    └────────────────────────┘
```

- **Fact Table (Tabel Fakta):** Berisi data transaksi numerik kuantitatif (Sales Amount, Qty, Discount, Margin) dan deretan Foreign Key.
- **Dimension Table (Tabel Dimensi):** Berisi atribut deskriptif filter/label (Customer Name, Category, Region, Year).

---

### Pembuatan Date Dimension Wajib (DAX)
```dax
DimDate = 
VAR MinYear = 2024
VAR MaxYear = 2026
RETURN
ADDCOLUMNS(
    CALENDAR(DATE(MinYear, 1, 1), DATE(MaxYear, 12, 31)),
    "DateKey", INT(FORMAT([Date], "YYYYMMDD")),
    "Year", YEAR([Date]),
    "MonthNumber", MONTH([Date]),
    "MonthName", FORMAT([Date], "MMMM"),
    "MonthShort", FORMAT([Date], "MMM"),
    "Quarter", "Q" & FORMAT([Date], "Q"),
    "YearMonth", FORMAT([Date], "YYYY-MM"),
    "DayOfWeek", FORMAT([Date], "dddd")
)
```

- *Materi Lengkap:* [03_Data_Modeling_Star_Schema.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/03_Data_Modeling_Star_Schema.md)

---

## ✅ Checklist Hari 17
- [ ] Memahami perbedaan Fact vs Dimension table.
- [ ] Mampu menghubungkan relasi $1:*$ dengan arah filter *Single*.
- [ ] Membaca [03_Data_Modeling_Star_Schema.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/03_Data_Modeling_Star_Schema.md).
- [ ] Siap melanjutkan ke [Hari 18: Fondasi DAX: Calculated Columns vs Measures](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_18_Fondasi_DAX_Calculated_Column_vs_Measures.md).

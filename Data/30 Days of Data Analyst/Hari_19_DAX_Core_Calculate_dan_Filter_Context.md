# 📘 Hari 19: DAX Core: CALCULATE & Filter Context

`CALCULATE` adalah fungsi paling kuat dan paling penting di seluruh bahasa DAX. Tanpa memahami `CALCULATE`, Anda tidak akan bisa menguasai Power BI secara profesional.

---

## 🎯 Target Pembelajaran
1. Memahami cara kerja fungsi `CALCULATE(<expression>, <filter1>, <filter2>, ...)`.
2. Menguasai fungsi pengubah filter (*Filter Modifiers*): `ALL()`, `ALLEXCEPT()`, `ALLSELECTED()`, `FILTER()`, `VALUES()`.
3. Mengaktifkan relasi inaktif menggunakan `USERELATIONSHIP()`.
4. Menghitung persentase kontribusi (% of Total).

---

## 🧠 Teori & Cara Kerja `CALCULATE`

`CALCULATE` adalah satu-satunya fungsi di DAX yang memiliki kemampuan super untuk **memodifikasi, menimpa, menambah, atau menghapus Filter Context** yang sedang aktif pada visual.

```dax
CALCULATE (
    <Expression: Measure yang mau dihitung>,
    <Filter 1: Kondisi filter baru / modifikasi>,
    <Filter 2: ...>
)
```

---

### Contoh Formula DAX Esensial:

#### 1. Filter Kategori Spesifik
```dax
Revenue Elektronik = 
CALCULATE(
    [Total Revenue],
    DimProduct[Category] = "Elektronik"
)
```

#### 2. Menghitung Persentase Kontribusi (% of Grand Total)
```dax
-- Mengabaikan seluruh filter pada tabel produk agar didapat omzet total
Total Revenue All Products = 
CALCULATE(
    [Total Revenue],
    ALL(DimProduct)
)

-- Persentase kontribusi per kategori
% Revenue Share = 
DIVIDE(
    [Total Revenue],
    [Total Revenue All Products],
    0
)
```

#### 3. Mengaktifkan Relasi Inaktif (Misal: Tanggal Pengiriman / ShipDate)
```dax
Revenue by Shipped Date = 
CALCULATE(
    [Total Revenue],
    USERELATIONSHIP(FactSales[ShipDateKey], DimDate[DateKey])
)
```

- *Materi Lengkap:* [04_Fondasi_DAX.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/04_Fondasi_DAX.md) & [DAX_Cheatsheet.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/DAX_Cheatsheet.md)

---

## ✅ Checklist Hari 19
- [ ] Memahami konsep modifikasi *Filter Context* oleh `CALCULATE`.
- [ ] Mampu menghitung rasio `% of Total` menggunakan fungsi `ALL()`.
- [ ] Menguasai penggunaan `USERELATIONSHIP()`.
- [ ] Siap melanjutkan ke [Hari 20: Advanced DAX & Time Intelligence](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_20_Advanced_DAX_Time_Intelligence_dan_Growth.md).

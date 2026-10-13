# 📘 Hari 20: Advanced DAX & Time Intelligence

Analisis perbandingan waktu (Tahun ke Tahun / *Year-over-Year*, Bulan ke Bulan / *Month-over-Month*, *Year-to-Date*) adalah kebutuhan wajib di hampir setiap dashboard bisnis.

---

## 🎯 Target Pembelajaran
1. Memahami 4 syarat wajib penerapan Time Intelligence di Power BI.
2. Menguasai fungsi kumulatif: `TOTALYTD`, `TOTALMTD`, `TOTALQTD`.
3. Menguasai perbandingan periode lampau: `SAMEPERIODLASTYEAR`, `DATEADD`, `PARALLELPERIOD`.
4. Menghitung formula pertumbuhan: `YoY Revenue Growth %`, `MoM Revenue Growth %`, `Rolling 12M Sales`.

---

## 🧠 4 Syarat Wajib Time Intelligence
Sebelum menggunakan rumus Time Intelligence, pastikan:
1. Memiliki tabel kalender terpisah (`DimDate`).
2. Kolom tanggal harus bertipe data `Date` atau `DateTime`.
3. Rentang tanggal harus berkesinambungan tanpa ada hari yang bolong.
4. Tabel ditandai sebagai Date Table (*Mark as Date Table*).

---

## 💻 Formula DAX Time Intelligence Wajib

### 1. Perhitungan Year-to-Date (YTD) & Periode Tahun Lalu (PY)
```dax
-- Akumulasi penjualan dari 1 Januari sampai tanggal berjalan
Revenue YTD = 
TOTALYTD([Total Revenue], DimDate[Date])

-- Penjualan pada periode yang sama di tahun sebelumnya (Prior Year)
Revenue PY = 
CALCULATE(
    [Total Revenue],
    SAMEPERIODLASTYEAR(DimDate[Date])
)
```

---

### 2. Perhitungan Pertumbuhan Tahun ke Tahun (YoY Growth %)
```dax
-- Selisih omzet tahun ini vs tahun lalu (dalam Rupiah)
YoY Revenue Growth = [Total Revenue] - [Revenue PY]

-- Persentase pertumbuhan YoY
YoY Revenue Growth % = 
DIVIDE(
    [YoY Revenue Growth],
    [Revenue PY],
    0
)
```

---

### 3. Perhitungan Month-over-Month (MoM Growth %)
```dax
-- Penjualan 1 bulan sebelumnya
Revenue Previous Month = 
CALCULATE(
    [Total Revenue],
    DATEADD(DimDate[Date], -1, MONTH)
)

-- Persentase pertumbuhan MoM
MoM Revenue Growth % = 
DIVIDE(
    [Total Revenue] - [Revenue Previous Month],
    [Revenue Previous Month],
    0
)
```

- *Materi Lengkap:* [05_Advanced_DAX_Time_Intelligence.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/05_Advanced_DAX_Time_Intelligence.md)

---

## ✅ Checklist Hari 20
- [ ] Memahami 4 syarat tabel kalender untuk Time Intelligence.
- [ ] Mampu menulis formula `SAMEPERIODLASTYEAR` dan `DATEADD`.
- [ ] Membaca [05_Advanced_DAX_Time_Intelligence.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/05_Advanced_DAX_Time_Intelligence.md).
- [ ] Siap melanjutkan ke [Hari 21: UI/UX Dashboard Design & Storytelling](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_21_UI_UX_Dashboard_Design_dan_Data_Storytelling.md).

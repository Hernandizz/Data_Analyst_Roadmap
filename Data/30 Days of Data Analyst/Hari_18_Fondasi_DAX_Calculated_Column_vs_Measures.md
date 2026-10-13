# 📘 Hari 18: Fondasi DAX: Calculated Columns vs Measures

DAX (*Data Analysis Expressions*) adalah bahasa formula analitik di Power BI. Memahami kapan harus membuat *Calculated Column* vs *Measures* adalah perbedaan antara model data yang lambat dan model data yang super kencang.

---

## 🎯 Target Pembelajaran
1. Memahami perbedaan mendasar: **Calculated Column** vs **Measures**.
2. Memahami konsep **Row Context** vs **Filter Context**.
3. Menguasai fungsi matematika aman `DIVIDE()` vs operator `/`.
4. Menguasai fungsi agregasi sederhana (`SUM`, `AVERAGE`, `COUNTROWS`, `DISTINCTCOUNT`) dan fungsi iterator (`SUMX`, `AVERAGEX`).

---

## 🧠 Teori & Perbandingan Kunci

| Aspek | Calculated Column | Explicit Measure |
|---|---|---|
| **Waktu Perhitungan** | Saat data di-refresh / diimpor. | Secara dinamis *on-the-fly* saat user mengklik filter/visual. |
| **Penyimpanan (RAM)** | Disimpan permanen di memori (memperbesar ukuran file `.pbix`). | Tidak memakan memori penyimpanan disk sama sekali. |
| **Konteks Evaluasi** | Dievaluasi per baris (*Row Context*). | Dievaluasi berdasarkan irisan filter aktif (*Filter Context*). |
| **Kapan Dipakai?** | Hanya saat kolom tersebut akan dijadikan Slicer, Filter baris, atau Kunci relasi. | Digunakan untuk SEMUA nilai numerik, persentase, KPI, dan agregasi. |

---

### Formula Dasar Wajib DAX:
```dax
-- Measure Total Revenue (Omzet)
Total Revenue = SUM(FactSales[SalesAmount])

-- Measure Total Cost (Modal)
Total Cost = SUM(FactSales[CostAmount])

-- Measure Total Profit (Laba Kotor)
Total Profit = [Total Revenue] - [Total Cost]

-- Measure Profit Margin % (Gunakan DIVIDE agar aman dari divide by zero)
Profit Margin % = DIVIDE([Total Profit], [Total Revenue], 0)

-- Measure Total Pelanggan Aktif Unik
Total Unique Customers = DISTINCTCOUNT(FactSales[CustomerID])
```

- *Materi Lengkap:* [04_Fondasi_DAX.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/04_Fondasi_DAX.md)
- *DAX Cheatsheet:* [DAX_Cheatsheet.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/DAX_Cheatsheet.md)

---

## ✅ Checklist Hari 18
- [ ] Memahami mengapa *Explicit Measures* selalu lebih disukai daripada *Calculated Columns*.
- [ ] Mampu membuat tabel khusus `_Measures` untuk mengelompokkan semua ukuran DAX.
- [ ] Membaca [04_Fondasi_DAX.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/04_Fondasi_DAX.md).
- [ ] Siap melanjutkan ke [Hari 19: DAX Core: CALCULATE & Filter Context](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_19_DAX_Core_Calculate_dan_Filter_Context.md).

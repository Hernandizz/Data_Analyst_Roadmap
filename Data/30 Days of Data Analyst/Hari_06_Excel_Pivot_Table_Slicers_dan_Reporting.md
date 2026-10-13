# 📘 Hari 06: Excel Pivot Table, Slicers & Dynamic Reporting

Pivot Table adalah senjata nomor satu di Excel untuk merangkum puluhan ribu baris data transaksi menjadi ringkasan analitik interaktif dalam hitungan detik.

---

## 🎯 Target Pembelajaran
1. Memahami 4 kuadran Pivot Table: *Filters, Columns, Rows, Values*.
2. Menguasai *Show Values As* (% of Grand Total, % of Parent Row, Difference From / Growth).
3. Membuat *Calculated Field* kustom di dalam Pivot Table.
4. Menghubungkan *Slicers* dan *Timeline* ke beberapa Pivot Table sekaligus untuk membuat dasbor dinamis.
5. Menerapkan *Conditional Formatting* berbasis aturan data.

---

## 🧠 Teori & Fitur Kunci

### 1. Anatomi Pivot Table
```
┌──────────────────────────────┬──────────────────────────────┐
│           FILTERS            │           COLUMNS            │
│  (Filter global seluruh lap) │  (Dimensi horizontal waktu/  │
│                              │   kategori)                  │
├──────────────────────────────┼──────────────────────────────┤
│            ROWS              │            VALUES            │
│  (Dimensi vertikal produk,   │  (Metrik teragregasi SUM,    │
│   wilayah, segmen)           │   COUNT, AVERAGE)            │
└──────────────────────────────┴──────────────────────────────┘
```

---

### 2. Fitur Analitik "Show Values As"
Jangan batasi Pivot Table hanya pada fungsi `SUM` biasa. Gunakan menu **Value Field Settings ➔ Show Values As**:
- **`% of Grand Total`**: Menghitung porsi kontribusi kategori terhadap seluruh omzet.
- **`% of Column / Row Total`**: Mengetahui proporsi kontribusi dalam subgrup tertentu.
- **`Difference From` / `% Difference From`**: Menghitung pertumbuhan bulan ke bulan (MoM Growth) secara instan.
- **`Running Total In`**: Menghitung akumulasi penjualan dari awal tahun sampai akhir tahun.

---

### 3. Calculated Fields
Membuat metrik turunan tanpa perlu menambah kolom baru pada data mentah:
- Buka tab **PivotTable Analyze ➔ Fields, Items, & Sets ➔ Calculated Field**.
- Contoh membuat Margin Keuntungan:
  $$\text{Field Name: } \text{Gross Margin \%}$$
  $$\text{Formula: } =('Sales Amount' - 'Cost Amount') / 'Sales Amount'$$

---

### 4. Slicers & Interkoneksi Laporan (Report Connections)
- Slicer berfungsi sebagai filter visual tombol yang estetik.
- Agar 1 Slicer bisa menyaring 3 Pivot Table sekaligus:
  - Klik kanan pada Slicer ➔ pilih **Report Connections...** ➔ centang seluruh Pivot Table yang ingin dikendalikan.

---

## 💼 Latihan Praktik Terpandu

1. Siapkan dataset penjualan ritel (misal 500 baris transaksi).
2. Buat **Pivot Table 1**: Baris = Kategori Produk, Values = SUM of Sales, SUM of Profit, dan Calculated Field `Margin %`.
3. Buat **Pivot Table 2**: Baris = Bulan (Order Date), Columns = Nama Wilayah/Kota, Values = SUM of Sales. Ubah *Show Values As* menjadi `% Difference From (Previous Month)` untuk melihat tren pertumbuhan.
4. Masukkan **Slicer**: `Kategori Produk`, `Metode Pembayaran`, dan **Timeline**: `Order Date`.
5. Hubungkan Slicer ke kedua Pivot Table melalui menu *Report Connections*.

---

## ✅ Checklist Hari 6
- [ ] Menguasai konfigurasi 4 kuadran Pivot Table.
- [ ] Mampu menghitung persentase kontribusi dan pertumbuhan MoM dengan *Show Values As*.
- [ ] Mampu menghubungkan 1 Slicer ke multi-Pivot Table.
- [ ] Siap melanjutkan ke [Hari 07: Mini Project 1 – Excel Sales & Customer Dashboard](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_07_Mini_Project_1_Excel_Sales_Customer_Dashboard.md).

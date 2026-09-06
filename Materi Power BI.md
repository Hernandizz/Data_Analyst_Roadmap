# Rencana Pembelajaran Lengkap Bertahap Power BI (Power BI Learning Path)

Dokumen ini berisi rancangan kurikulum terstruktur, modul pembelajaran komprehensif, dan materi bertahap untuk mempelajari **Microsoft Power BI** mulai dari fondasi pemula hingga tingkat mahir (*advanced/enterprise*) di dalam repositori `Data-Analyst`.

---

## 🎯 Tujuan Pembelajaran
Menyediakan materi pembelajaran Power BI yang lengkap, bertahap, mudah dipahami, aplikatif, dan berbasis standar industri bagi seorang calon **Data Analyst**, **Business Intelligence (BI) Analyst**, maupun **Power BI Developer**.

---

## 📁 Struktur Folder & Berkas yang Diusulkan

Folder baru: `Power BI/` di root repositori `c:\Users\Asus\Documents\Project\Data-Analyst\Power BI\`

```text
Data-Analyst/
├── Power BI/
│   ├── README.md                                # Silabus lengkap, roadmap belajar, dan panduan penggunaan
│   ├── 01_Pengenalan_dan_Interface.md           # Modul 1: Konsep BI, arsitektur, interface Power BI Desktop
│   ├── 02_Data_Preparation_Power_Query.md       # Modul 2: ETL, pembersihan data, unpivot, merge & append, M basics
│   ├── 03_Data_Modeling_Star_Schema.md          # Modul 3: Star Schema, relasi 1:*, kardinalitas, filter direction, Dim_Date
│   ├── 04_Fondasi_DAX.md                        # Modul 4: Calculated Columns vs Measures, Row/Filter Context, agregasi, X-iterator
│   ├── 05_Advanced_DAX_Time_Intelligence.md     # Modul 5: CALCULATE, ALL/FILTER, Time Intelligence (YoY, MoM, YTD, MTD), Moving Avg
│   ├── 06_Visualisasi_dan_Desain_Dashboard.md   # Modul 6: Pemilihan chart, UI/UX, color palette, slicers, drill-through, bookmarks
│   ├── 07_Analisis_Lanjutan_dan_AI.md           # Modul 7: AI Visuals (Key Influencers, Decomp Tree, Smart Narrative), What-If parameter
│   ├── 08_Optimasi_Performa.md                  # Modul 8: Performance Analyzer, VertiPaq engine, optimasi DAX & data model
│   ├── 09_Power_BI_Service_dan_Keamanan.md      # Modul 9: Cloud Service, Workspaces, Gateways, RLS (Row-Level Security), refresh
│   ├── 10_Proyek_Portofolio_End_to_End.md       # Modul 10: Panduan proyek portofolio, business storytelling, interview prep
│   ├── DAX_Cheatsheet.md                        # Kamus cepat sintaks & fungsi DAX populer
│   └── Power_Query_M_Cheatsheet.md              # Kamus cepat tips & formula Power Query M
└── README.md                                    # (Pembaruan) Menambahkan tautan modul Power BI ke daftar utama
```

---

## 📚 Rincian Kurikulum Bertahap (10 Modul)

### 🟢 Level 1: Fondasi & Data Ingestion (Pemula)
- **Modul 01: Pengenalan & Antarmuka Power BI Desktop**
  - Mengapa Power BI unggul (vs Excel & SQL).
  - 4 Tampilan Utama: *Report View*, *Table View*, *Model View*, *DAX Query View*.
  - Anatomi Panel: *Visualizations*, *Data/Fields*, *Filters*, *Format*, *Selection*, *Bookmarks*.
  - End-to-End Workflow: Connect -> Clean -> Model -> DAX -> Visualize -> Share.

- **Modul 02: Data Preparation & ETL dengan Power Query**
  - Konsep ETL (Extract, Transform, Load).
  - Tipe data, menangani missing values, duplikasi, trim & text clean.
  - Transformasi penting: *Pivot vs Unpivot* (mengapa unpivot wajib untuk tabular analysis).
  - Menggabungkan data: *Merge Queries* (JOIN) vs *Append Queries* (UNION).
  - *Query Folding* dan best practices efisiensi data loading.

---

### 🟡 Level 2: Data Modeling & Fondasi DAX (Menengah)
- **Modul 03: Data Modeling & Star Schema Architecture**
  - Mengapa Data Modeling adalah kunci 80% keberhasilan analisis.
  - Perbedaan mendasar *Fact Table* (tabel transaksi) dan *Dimension Table* (tabel referensi/lookup).
  - Skema Relasi: *Star Schema* vs *Snowflake Schema* vs *Flat Table*.
  - Kardinalitas: `1:*` (One-to-Many), `*:1`, `1:1`, dan bahaya `*:*` (Many-to-Many).
  - *Cross-Filter Direction*: Kapan menggunakan *Single* vs *Both* (dan risikonya).
  - Membangun *Dim_Date* (Tabel Kalender) dinamis.

- **Modul 04: Fondasi DAX (Data Analysis Expressions)**
  - Perbedaan fundamental *Calculated Column* vs *Measure* (RAM vs CPU runtime).
  - Memahami *Row Context*, *Filter Context*, dan *Context Transition*.
  - Agregasi standar: `SUM`, `AVERAGE`, `COUNT`, `DISTINCTCOUNT`, `MIN`, `MAX`.
  - Fungsi Iterator: `SUMX`, `AVERAGEX`, `RANKX`, `COUNTX`.
  - Logika kondisional: `IF`, `SWITCH(TRUE(), ...)`, `COALESCE`.
  - Best practice: Penggunaan `VAR ... RETURN` dan folder khusus `_Measures`.

---

### 🟠 Level 3: Advanced Analytics, Desain, & Optimasi (Mahir)
- **Modul 05: Advanced DAX & Time Intelligence**
  - Menguasai `CALCULATE()` dan `CALCULATETABLE()`.
  - Modifikasi Filter Context: `ALL()`, `ALLEXCEPT()`, `ALLSELECTED()`, `FILTER()`, `REMOVEFILTERS()`.
  - Time Intelligence: `TOTALYTD`, `TOTALMTD`, `SAMEPERIODLASTYEAR`, `DATEADD`.
  - Formula Pertumbuhan Bisnis: YoY Growth, MoM Growth, Moving Average (Rolling 30 days).
  - Penanganan pembagian nol dengan aman: `DIVIDE()`.

- **Modul 06: Visualisasi Data & Desain Dashboard Interaktif**
  - Memilih visual yang tepat untuk tujuan bisnis (tren, komparasi, komposisi, korelasi).
  - Fitur interaktif: *Slicers*, *Cross-filtering*, *Drill-down*, *Drill-through*, *Custom Tooltips*.
  - Navigasi dinamis dengan *Bookmarks & Selection Pane*.
  - Prinsip UI/UX: Grid layout, visual hierarchy, palet warna profesional, mengurangi *chart junk*.

- **Modul 07: Analisis Lanjutan & Fitur AI**
  - Visual berbasis AI: *Key Influencers*, *Decomposition Tree*, *Smart Narrative*, *Q&A Visual*.
  - Skenario simulasi *What-If Parameters* (Field parameters untuk dynamic measure/dimension switching).
  - Analytics Lines: Trend line, min/max, average, forecasting.

- **Modul 08: Optimasi Performa & Best Practices**
  - Memahami mesin kompresi *VertiPaq Engine*.
  - Menggunakan *Performance Analyzer* untuk mendeteksi visual/DAX yang lambat.
  - Strategi mereduksi ukuran file `.pbix` (menghapus kolom kardinalitas tinggi, memecah DateTime).
  - Pengenalan tools eksternal: *DAX Studio*, *Tabular Editor*.

---

### 🔴 Level 4: Deployment, Keamanan, & Portofolio (Siap Kerja)
- **Modul 09: Power BI Service, Kolaborasi, & Keamanan Data**
  - Konsep Workspace, App, Report, dan Semantic Model di cloud.
  - Scheduled Refresh & On-Premises Data Gateway.
  - Implementasi *Row-Level Security (RLS)*: Statis vs Dinamis (`USERPRINCIPALNAME()`).
  - Best practice sharing: Apps vs Direct Share.

- **Modul 10: Proyek Portofolio End-to-End & Persiapan Karier**
  - Panduan membangun portofolio berbobot industri (dari problem statement hingga rekomendasi bisnis).
  - 3 Rekomendasi studi kasus (termasuk integrasi dengan dataset ritel yang sudah ada di folder `Exam/Power BI`).
  - Struktur presentasi insight eksekutif.
  - Daftar pertanyaan teknis umum dalam wawancara kerja Power BI.

- **Bonus Dokumen Pendukung:**
  - `DAX_Cheatsheet.md`: Rumus siap pakai untuk transaksi ritel, finansial, dan tren waktu.
  - `Power_Query_M_Cheatsheet.md`: Kumpulan fungsi transformasi data yang sering dipakai.

---

## 🔄 Pembaruan pada Berkas Terkait
- **`README.md` (Root)**: Menambahkan entri folder `Power BI` pada daftar materi dan panduan alur belajar repositori `Data-Analyst`.

---

## 🔍 Rencana Verifikasi (Verification Plan)
1. **Pengecekan Struktur File & Direktori**: Memastikan seluruh berkas markdown berhasil dibuat di path `c:\Users\Asus\Documents\Project\Data-Analyst\Power BI\`.
2. **Validasi Tautan & Format Markdown**: Memverifikasi link antar berkas markdown berfungsi dengan baik, tidak ada broken link, format tabel, callout alert GitHub, dan syntax highlighting DAX/M valid.
3. **Pengecekan Koherensi Materi**: Memastikan materi mengalir secara logis dari dasar hingga mahir dan selaras dengan studi kasus yang ada di `Exam/Power BI`.

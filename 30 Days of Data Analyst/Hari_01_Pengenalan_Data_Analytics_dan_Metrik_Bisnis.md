# 📘 Hari 01: Pengenalan Data Analytics & Metrik Bisnis

Selamat datang di hari pertama! Fondasi paling penting dari seorang Data Analyst yang hebat bukanlah seberapa cepat ia mengetik kode, melainkan **seberapa dalam ia memahami masalah bisnis dan metrik yang dianalisis**.

---

## 🎯 Target Pembelajaran
1. Memahami peran Data Analyst vs Data Engineer vs Data Scientist.
2. Menguasai 4 tingkatan analisis data (*Descriptive, Diagnostic, Predictive, Prescriptive*).
3. Memahami metrik bisnis utama (*North Star Metric, Revenue, Margin, Churn, CAC, LTV*).
4. Mampu membedakan pertanyaan bisnis yang tepat untuk dijawab dengan data.

---

## 🧠 Teori & Konsep Kunci

### 1. Data Analyst vs Data Engineer vs Data Scientist
| Peran | Fokus Utama | Pertanyaan Kunci | Tool Utama |
|---|---|---|---|
| **Data Engineer** | Infrastruktur & Pipeline Data | *"Bagaimana data dari berbagai sumber bisa tersimpan aman, cepat, dan teratur?"* | SQL, Spark, Airflow, Python, Cloud (GCP/AWS/Azure) |
| **Data Analyst** | Ekstraksi Insight & Business Intelligence | *"Apa yang terjadi pada bisnis kita, mengapa itu terjadi, dan apa yang harus dilakukan?"* | Excel, SQL, Power BI, Tableau, Python/R, Statistics |
| **Data Scientist** | Predictive Modeling & Machine Learning | *"Berdasarkan pola data historis, pola apa yang akan terjadi di masa depan dan bagaimana otomatisasinya?"* | Python, R, Scikit-Learn, TensorFlow, PyTorch |

---

### 2. Empat Tingkatan Analisis Data (The Analytics Value Escalator)

```
NILAI
BISNIS  ▲
        │                                           [PRESKRIPTIF]
        │                                       "Apa tindakan terbaik?"
        │                                         (Optimization & AI)
        │
        │                                 [PREDIKTIF]
        │                             "Apa yang akan terjadi?"
        │                              (Forecasting & ML)
        │
        │                       [DIAGNOSTIK]
        │                   "Mengapa hal itu terjadi?"
        │                    (Drill-down & Root Cause)
        │
        │             [DESKRIPTIF]
        │        "Apa yang telah terjadi?"
        │         (KPI Reports & Dashboard)
        └────────────────────────────────────────────────────────► KESULITAN
```

1. **Descriptive Analytics (Apa yang terjadi?)**
   - Ringkasan data historis.
   - Contoh: Total penjualan bulan lalu sebesar Rp 500 juta, naik 5% dari bulan sebelumnya.
   - Referensi: [Descriptive Analytics.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/00_Fondasi_Data_Analytics/Descriptive%20Analytics.md)
2. **Diagnostic Analytics (Mengapa itu terjadi?)**
   - Mencari akar masalah (*root cause*) dan korelasi.
   - Contoh: Penjualan kategori Fashion anjlok 30% karena keterlambatan pengiriman dari vendor logistik utama.
   - Referensi: [Diagostic Analytics.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/00_Fondasi_Data_Analytics/Diagostic%20Analytics.md)
3. **Predictive Analytics (Apa yang mungkin terjadi?)**
   - Proyeksi tren masa depan berdasarkan pola historis.
   - Contoh: Estimasi kenaikan permintaan produk elektronik sebesar 45% menjelang promo tanggal kembar (11.11).
   - Referensi: [Analytics Predictive.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/00_Fondasi_Data_Analytics/Analytics%20Predictive.md)
4. **Prescriptive Analytics (Apa yang harus kita lakukan?)**
   - Rekomendasi tindakan optimal berbasis simulasi data.
   - Contoh: Menambah stok produk SKU-104 sebanyak 500 unit di gudang Surabaya untuk meminimalisir *stockout*.
   - Referensi: [Prescriptive Analytics.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/00_Fondasi_Data_Analytics/Prescriptive%20Analytics.md)

---

### 3. Kamus Metrik Bisnis Wajib Data Analyst
- **Revenue (Omzet):** Total uang masuk dari penjualan ($Total Unit \times Harga Jual$).
- **Gross Profit & Margin:** Laba kotor ($Revenue - HPP$) dan persentasenya ($\frac{Gross Profit}{Revenue} \times 100\%$).
- **AOV (Average Order Value):** Rata-rata nilai belanja per transaksi ($\frac{Total Revenue}{Total Orders}$).
- **CAC (Customer Acquisition Cost):** Biaya yang dikeluarkan untuk mendapatkan 1 pelanggan baru ($\frac{Total Marketing Cost}{New Customers}$).
- **LTV (Customer Lifetime Value):** Total nilai ekonomi yang dihasilkan pelanggan selama berlangganan.
- **Churn Rate:** Persentase pelanggan yang berhenti berlangganan atau tidak bertransaksi lagi dalam periode tertentu ($\frac{Customer Lost}{Total Customer Awal} \times 100\%$).
- **Conversion Rate (CVR):** Persentase pengunjung yang melakukan pembelian ($\frac{Total Orders}{Total Visitors} \times 100\%$).

---

## 💼 Studi Kasus Dunia Nyata: "Penurunan Omzet Q3 Toko Baju XYZ"

**Situasi:**
Manajemen Toko Baju XYZ melihat laba bersih kuartal 3 turun 20% meskipun jumlah pengunjung toko online naik 15%.

**Alur Pikir Data Analyst:**
1. **Descriptive:** Berapa nilai AOV, CVR, dan Return Rate di Q3 vs Q2?
   - *Temuan:* CVR stabil di 3.2%, namun AOV turun dari Rp 350.000 menjadi Rp 210.000. Return rate naik dari 2% menjadi 9%.
2. **Diagnostic:** Mengapa AOV turun dan Return rate melonjak?
   - *Temuan:* Tim promosi memberikan diskon besar pada produk kategori *clearance* murah, sedangkan produk baju premium mengalami keluhan ukuran tidak sesuai tabel panduan (*size chart error*).
3. **Predictive:** Jika tabel panduan ukuran tidak diperbaiki, estimasi kerugian biaya retur barang di Q4 akan mencapai Rp 120.000.000.
4. **Prescriptive:** Perbaiki segera foto & tabel panduan ukuran pada 12 SKU baju premium teratas dan terapkan skema bundling (*Buy 2 Get Discount*) untuk menaikkan AOV kembali ke Rp 300.000+.

---

## ✍️ Latihan Mandiri & Kuis Hari 1

### Soal Latihan:
Sebuah perusahaan aplikasi berlangganan Gym memiliki 1.000 anggota di awal bulan. Selama bulan tersebut:
- 80 anggota berhenti berlangganan (*churn*).
- Biaya iklan yang dikeluarkan tim marketing sebesar Rp 20.000.000.
- Berhasil mendatangkan 100 anggota baru.
- Harga langganan adalah Rp 300.000 / bulan / orang.

**Hitung:**
1. Berapa **Churn Rate** bulan tersebut?
2. Berapa **CAC** (Customer Acquisition Cost) untuk setiap anggota baru?
3. Tentukan tipe analisis (Descriptive / Diagnostic / Predictive / Prescriptive) untuk pernyataan: *"Anggota yang tidak hadir gym lebih dari 14 hari berturut-turut memiliki probabilitas churn 75%"*.

---

### 🔑 Kunci Jawaban
1. $\text{Churn Rate} = \frac{80}{1000} \times 100\% = \mathbf{8.0\%}$.
2. $\text{CAC} = \frac{\text{Rp } 20.000.000}{100} = \mathbf{\text{Rp } 200.000 \text{ per pelanggan baru}}$.
3. **Predictive Analytics** (karena mengidentifikasi peluang probabilitas perilaku di masa mendatang).

---

## ✅ Checklist Hari 1
- [ ] Mampu menjelaskan perbedaan 4 tingkatan analitik kepada orang non-teknis.
- [ ] Memahami arti dan formula dari AOV, CAC, LTV, dan Churn Rate.
- [ ] Siap melanjutkan ke [Hari 02: Siklus Hidup Data & Data Cleaning Strategy](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_02_Siklus_Hidup_Data_dan_Data_Cleaning_Strategy.md).

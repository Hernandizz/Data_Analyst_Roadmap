# 📘 Hari 22: Power BI AI Visuals & Optimasi Performa

Seorang Senior Data Analyst tahu cara memanfaatkan kecerdasan buatan (*AI Visuals*) untuk mempercepat penemuan insight, serta memastikan dashboard merender visual dalam waktu kurang dari 1 detik.

---

## 🎯 Target Pembelajaran
1. Memanfaatkan visual AI Power BI: *Key Influencers*, *Decomposition Tree*, *Smart Narrative*.
2. Melakukan diagnosis performa rendering menggunakan **Performance Analyzer**.
3. Memahami faktor-faktor yang membuat laporan lambat (*High Cardinality, Inefficient DAX, Bi-directional filters*).
4. Melakukan optimasi memori VertiPaq.

---

## 🧠 Fitur AI & Optimasi Performa

### 1. Tiga AI Visuals Unggulan Power BI
- **Key Influencers:** Menemukan faktor utama yang mendorong kenaikan/penurunan suatu metrik (misal: *"Apa faktor yang paling memicu pelanggan melakukan komplain atau churn?"*).
- **Decomposition Tree (Pohon Dekomposisi):** Memecah metrik agregat ke berbagai dimensi secara berjenjang (*ad-hoc root-cause exploration*).
- **Smart Narrative:** Menghasilkan ringkasan narasi teks otomatis berbasis angka-angka terbaru di dashboard.

---

### 2. Diagnosis dengan Performance Analyzer
Buka tab **Optimize ➔ Performance Analyzer ➔ Start Recording ➔ Refresh Visuals**.
Setiap visual akan menampilkan 3 durasi waktu:
- **DAX Query Time:** Waktu kalkulasi formula oleh VertiPaq engine.
- **Visual Display Time:** Waktu browser/Power BI merender grafik di layar.
- **Other:** Waktu tunggu antrean eksekusi.

> **Standar Industri:** Total durasi render seluruh visual per halaman dashboard harus berada di bawah **1.000 ms (1 detik)**.

---

### 3. Checklist Optimasi Kecepatan Laporan:
1. Hapus kolom yang tidak pernah dipakai di visual/analisis (terutama kolom teks ID unik panjang / *High Cardinality*).
2. Hindari penggunaan relasi *Many-to-Many (*:*)* atau *Bi-directional filtering* kecuali mutlak diperlukan.
3. Ganti rumus DAX `FILTER(AllTable, ...)` menjadi `FILTER(Values(Column), ...)`.
4. Pecah kolom DateTime menjadi 2 kolom terpisah: `Date` dan `Time` (ini menghemat 80%+ RAM VertiPaq!).

- *Materi Lengkap:* [07_Analisis_Lanjutan_dan_AI.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/07_Analisis_Lanjutan_dan_AI.md) & [08_Optimasi_Performa.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/08_Optimasi_Performa.md)

---

## ✅ Milestone Minggu 3 Tuntas!
Anda telah menguasai seluruh spektrum Power BI & Business Intelligence! Besok kita melangkah ke **Minggu ke-4: Statistika Terapan, Capstone End-to-End & Portofolio Ready**.

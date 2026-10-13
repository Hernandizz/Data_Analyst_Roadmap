# 📘 Hari 23: Statistika Terapan untuk Analisis Data

Data Analyst tidak perlu menjadi ahli matematika murni, namun **wajib menguasai statistika terapan** agar tidak menarik kesimpulan palsu (*false insights*) atau terjebak dalam korelasi semu.

---

## 🎯 Target Pembelajaran
1. Memahami Ukuran Pemusatan Data (*Mean, Median, Mode*) dan kapan menggunakan masing-masing.
2. Memahami Ukuran Penyebaran Data (*Variance, Standard Deviation, Interquartile Range - IQR*).
3. Mendeteksi Outlier menggunakan metode IQR Box Plot dan Z-Score.
4. Membedakan Korelasi (*Correlation*) vs Kausalitas (*Causation*).

---

## 🧠 Teori & Konsep Kunci

### 1. Skewness Data & Pemilihan Ukuran Tengah
```
  Left-Skewed (Negative)        Normal (Symmetric)        Right-Skewed (Positive)
       ▲                             ▲                             ▲
      /│\                           / \                           /│\
     / │ \                         /   \                         / │ \
    /  │  \                       /  │  \                       /  │  \
   /   │   \                     /   │   \                     /   │   \
  /    │    \                   /    │    \                   /    │    \
───────┼─────►                 ──────┼─────►                 ──────┼─────►
 Mean < Median                  Mean = Median                 Median < Mean
 (Mayoritas tinggi)             (Distribusi Lonceng)          (Mayoritas rendah,
                                                               ada outlier super besar)
```
- **Jika distribusi normal / simetris:** Gunakan **Mean (Rata-rata)** dan **Standard Deviation**.
- **Jika distribusi miring (*skewed*) / banyak outlier:** Gunakan **Median (Nilai Tengah)** dan **IQR**.

---

### 2. Metode Deteksi Outlier dengan IQR
$$\text{IQR} = Q_3 - Q_1$$
- **Batas Bawah (Lower Fence):** $Q_1 - 1.5 \times \text{IQR}$
- **Batas Atas (Upper Fence):** $Q_3 + 1.5 \times \text{IQR}$
- Nilai yang berada di luar batas ini secara statistik dianggap sebagai **Outlier**.

---

### 3. Korelasi vs Kausalitas
- **Korelasi:** Derajat hubungan linier antara dua variabel (nilai Pearson $r$ antara $-1$ s.d. $+1$).
- *Prinsip Penting:* **Correlation $\neq$ Causation**. Dua hal yang bergerak bersamaan belum tentu saling menyebabkan. (Contoh: Penjualan es krim naik bersamaan dengan kasus tenggelam di pantai—bukan karena es krim menyebabkan tenggelam, tetapi karena variabel tersembunyi yaitu *musim panas*).

- *Materi Lengkap:* [Statistical Analysis.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Key%20Concepts%20of%20Data/Statistical%20Analysis.md)

---

## ✅ Checklist Hari 23
- [ ] Memahami kapan memakai Mean vs Median.
- [ ] Mampu menghitung rumus batas outlier IQR.
- [ ] Membaca [Statistical Analysis.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Key%20Concepts%20of%20Data/Statistical%20Analysis.md).
- [ ] Siap melanjutkan ke [Hari 24: A/B Testing & Problem Solving Frameworks](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_24_AB_Testing_dan_Problem_Solving_Frameworks.md).

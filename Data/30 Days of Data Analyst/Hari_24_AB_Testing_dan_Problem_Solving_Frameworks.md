# 📘 Hari 24: A/B Testing & Problem Solving Frameworks

Perusahaan berbasis data tidak mengambil keputusan berdasarkan intuisi (*gut feeling*), melainkan melalui eksperimen terukur (*A/B Testing*) dan kerangka berpikir pemecahan masalah (*Problem Solving Frameworks*).

---

## 🎯 Target Pembelajaran
1. Memahami alur kerja A/B Testing: Hipotesis, Control vs Variant, Signifikansi Statistik, $p$-value.
2. Menguasai prinsip **MECE (Mutually Exclusive, Collectively Exhaustive)**.
3. Membangun **Issue Tree** & Hipotesis Bisnis untuk membedah masalah kompleks.
4. Menerapkan metodologi **5 Whys Root Cause Analysis**.

---

## 🧠 Teori & Kerangka Analisis Bisnis

### 1. Konsep Dasar A/B Testing
```
                     ┌──► [Grup Kontrol A (50% User)] ──► Konversi: 3.1%
[Semua Pengunjung] ──┤                                                     Uji Statistik (p < 0.05?)
                     └──► [Grup Varian B (50% User)]  ──► Konversi: 4.2%  ──► Varian B Menang!
```
- **Null Hypothesis ($H_0$):** Tidak ada perbedaan performa antara Varian A dan Varian B.
- **Alternative Hypothesis ($H_1$):** Varian B menghasilkan peningkatan metrik secara signifikan.
- **$p$-value:** Probabilitas bahwa hasil yang kita amati terjadi semata-mata karena faktor kebetulan (*random chance*). Standar industri menetapkan batas **$\alpha = 0.05$ (5%)**. Jika $p < 0.05$, hasil dianggap **Statistically Significant**.

---

### 2. Prinsip MECE (Mutually Exclusive, Collectively Exhaustive)
- **Mutually Exclusive:** Setiap kategori tidak boleh saling tumpang tindih (*no overlaps*).
- **Collectively Exhaustive:** Seluruh kategori mencakup 100% kemungkinan tanpa ada yang terlewat (*no gaps*).

*Contoh Dekomposisi Revenue (MECE):*
$$\text{Revenue} = \text{Jumlah Pelanggan Bertransaksi} \times \text{Average Order Value (AOV)}$$
$$\text{Jumlah Pelanggan} = \text{Pengunjung Baru (New)} + \text{Pengunjung Berulang (Returning)}$$

---

### 3. Metode 5 Whys (Mencari Akar Masalah)
- *Masalah:* Omzet toko online turun 15% minggu lalu.
  - *Why 1:* Mengapa turun? Jumlah transaksi checkout menurun drastis.
  - *Why 2:* Mengapa checkout turun? Pengunjung gagal menyelesaikan pembayaran.
  - *Why 3:* Mengapa gagal? Gateway pembayaran metode E-Wallet sering mengalami *timeout error*.
  - *Why 4:* Mengapa timeout? Server API vendor pembayaran kelebihan beban saat promo flash sale.
  - *Why 5 (Root Cause):* Tidak ada mekanisme *auto-failover* ke gateway pembayaran cadangan.
  - *Action Plan:* Implementasikan multi-gateway failover otomatis.

---

## ✅ Checklist Hari 24
- [ ] Memahami konsep $p$-value dan signifikansi statistik A/B Test.
- [ ] Mampu memecah masalah bisnis dengan prinsip MECE.
- [ ] Siap melanjutkan ke [Hari 25: Power BI Service, RLS & Kolaborasi](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_25_Power_BI_Service_RLS_dan_Scheduled_Refresh.md).

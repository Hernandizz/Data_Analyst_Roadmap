# 🚀 Hari 26: Capstone Part 1 – Problem Scoping & SQL Extraction

Hari 26 menandai dimulainya **Proyek Portofolio Utama (Capstone Project End-to-End)** yang akan menjadi bukti konkret kemampuan Anda saat melamar pekerjaan.

---

## 🎯 Objektif Hari 26
1. Mendefinisikan **Business Problem Statement** dan **Project Objectives**.
2. Menentukan metrik keberhasilan (*Key Success Metrics*).
3. Mengekstrak dan menyatukan seluruh dataset mentah menggunakan SQL ke dalam bentuk tabel analitik bersih.

---

## 🏢 Studi Kasus: "Mega Retail Omnichannel Performance & Churn Analysis"

**Konteks Bisnis:**
PT Retail Nusantara mengalami stagnasi pertumbuhan laba di tahun 2025 meskipun volume transaksi meningkat. Manajemen membutuhkan visibilitas menyeluruh terhadap performa produk, margin keuntungan wilayah, serta efektivitas retensi pelanggan.

---

### 1. Project Scoping Document
- **Pertanyaan Bisnis Kunci:**
  1. Wilayah dan kategori produk mana yang menjadi pendorong profit terbesar dan mana yang mengalami kerugian (*margin bleeders*)?
  2. Bagaimana tren pertumbuhan Year-over-Year (YoY) dan Month-over-Month (MoM)?
  3. Bagaimana profil segmentasi loyalitas pelanggan (RFM) dan berapa rasio retensinya?
- **Deliverables:**
  - Database views / dataset bersih terstruktur.
  - Model Data Star Schema di Power BI.
  - Dashboard Eksekutif Interaktif 3 Halaman.
  - Slide Rekomendasi Bisnis untuk Direksi.

---

### 2. Script Ekstraksi Data SQL (Data Extraction Pipeline)
```sql
-- Ekstraksi Transaksi Bersih untuk Tabel Fakta (FactSales)
SELECT 
    o.order_id,
    o.order_date,
    o.customer_id,
    oi.product_id,
    o.store_id,
    o.payment_method,
    oi.quantity,
    oi.unit_price,
    oi.unit_cost,
    (oi.quantity * oi.unit_price) AS gross_sales,
    COALESCE(oi.discount_amount, 0) AS discount_amount,
    ((oi.quantity * oi.unit_price) - COALESCE(oi.discount_amount, 0)) AS net_sales,
    (oi.quantity * oi.unit_cost) AS total_cost,
    (((oi.quantity * oi.unit_price) - COALESCE(oi.discount_amount, 0)) - (oi.quantity * oi.unit_cost)) AS gross_profit
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.order_status = 'COMPLETED'
  AND o.order_date BETWEEN '2024-01-01' AND '2026-03-31';
```

- *Materi Terkait:* [10_Proyek_Portofolio_End_to_End.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/10_Proyek_Portofolio_End_to_End.md) & [Exam/Power BI/README_INSTRUKSI.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Exam/Power%20BI/README_INSTRUKSI.md)

---

## ✅ Checklist Hari 26
- [ ] Dokumen *Problem Scoping* selesai ditulis.
- [ ] Query SQL ekstraksi tabel fakta dan dimensi dieksekusi tanpa error.
- [ ] File dataset diekspor ke format staging (CSV / SQL View).
- [ ] Siap melanjutkan ke [Hari 27: Capstone Part 2 – Data Modeling & DAX Formulation](file:///c:/Users/Asus/Documents/Project/Data-Analyst/30%20Days%20of%20Data%20Analyst/Hari_27_Capstone_Tahap_2_Data_Modeling_dan_DAX_Formulation.md).

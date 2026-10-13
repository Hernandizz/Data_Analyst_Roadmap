# 📘 Hari 25: Power BI Service, RLS & Kolaborasi

Membangun dashboard di komputer lokal hanyalah separuh perjalanan. Di dunia nyata, laporan harus dibagikan secara aman kepada ratusan pemangku kepentingan dengan pembatasan hak akses (*Data Security*).

---

## 🎯 Target Pembelajaran
1. Memahami alur kerja Power BI Service: Workspaces, Reports, Dashboards, dan Apps.
2. Mengonfigurasi **Row-Level Security (RLS)** statis dan dinamis (`USERPRINCIPALNAME()`).
3. Mengonfigurasi **On-Premises Data Gateway** & **Scheduled Refresh** (Pembaruan Data Terjadwal).
4. Menerapkan tata kelola (*Data Governance*) dan ekspor laporan.

---

## 🧠 Teori & Keamanan Data (RLS)

### 1. Apa itu Row-Level Security (RLS)?
RLS memastikan setiap pengguna hanya dapat melihat baris data yang relevan dengan tanggung jawabnya.
*(Contoh: Manajer Regional Jawa Barat hanya bisa melihat data transaksi di Jawa Barat, meskipun membuka file dashboard yang sama dengan Manajer Jawa Timur).*

---

### 2. Implementasi RLS Statis vs Dinamis

- **RLS Statis (Dibuat per Role):**
  - Buat Role `Manager_Jabar`:
    ```dax
    DimStore[Region] = "Jawa Barat"
    ```
- **RLS Dinamis (Berbasis Email Akun User Login):**
  - Hubungkan tabel master user security ke tabel transaksi:
    ```dax
    DimSecurity[UserEmail] = USERPRINCIPALNAME()
    ```

---

### 3. Scheduled Refresh & Gateway
- Jika database berada di server lokal kantor / cloud privat, pasang **Power BI Gateway**.
- Atur frekuensi pembaruan otomatis (misal: setiap hari jam 06:00 pagi sebelum jam kantor dimulai).

- *Materi Lengkap:* [09_Power_BI_Service_dan_Keamanan.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/09_Power_BI_Service_dan_Keamanan.md)

---

## ✅ Checklist Hari 25
- [ ] Memahami perbedaan Report vs App di Power BI Service.
- [ ] Mampu merancang aturan RLS statis dan dinamis.
- [ ] Membaca [09_Power_BI_Service_dan_Keamanan.md](file:///c:/Users/Asus/Documents/Project/Data-Analyst/Power%20BI/09_Power_BI_Service_dan_Keamanan.md).
- [ ] Siap melanjutkan ke **Tahapan Capstone Project (Hari 26 - 29)**!

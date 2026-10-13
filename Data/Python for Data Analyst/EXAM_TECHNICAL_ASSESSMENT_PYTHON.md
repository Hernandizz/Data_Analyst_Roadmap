# 📝 Technical Assessment & Ujian Evaluasi: Python for Data Analyst

---

## 🎯 Petunjuk & Ketentuan Ujian
Ujian evaluasi ini dirancang untuk menguji tingkat penguasaan Anda terhadap seluruh materi dari **Modul 01 hingga Modul 12** dalam kurikulum *Python for Data Analyst*.

- **Total Waktu Pengerjaan:** 120 - 180 Menit
- **Target Skor Kelulusan:** $\ge 75\%$
- **Struktur Ujian:**
  - **Bagian A:** Pilihan Ganda & Konseptual (20 Soal @ 2.5 Poin = 50 Poin)
  - **Bagian B:** Code Debugging & Output Analysis (5 Soal @ 4 Poin = 20 Poin)
  - **Bagian C:** Hands-on Coding & Analytical Challenge (Studi Kasus End-to-End = 30 Poin)

> [!TIP]
> Kerjakan Bagian A & B terlebih dahulu untuk menguji pemahaman teori, kemudian lanjutkan ke Bagian C menggunakan Jupyter Notebook atau editor Python Anda. kunci jawaban lengkap tersedia di [KUNCI_JAWABAN_DAN_SOLUSI_TEST.md](KUNCI_JAWABAN_DAN_SOLUSI_TEST.md).

---

## 📌 BAGIAN A: Pilihan Ganda & Konseptual (50 Poin)

**Pilihlah satu jawaban yang paling tepat!**

### 1. (Level 1 - Fondasi Python)
Manakah dari pernyataan berikut yang **BENAR** mengenai perbedaan antara `List` dan `Tuple` pada Python?
A. List bersifat *immutable* (tidak bisa diubah), sedangkan Tuple bersifat *mutable*.  
B. Tuple menggunakan tanda kurung siku `[]`, sedangkan List menggunakan kurung biasa `()`.  
C. List bersifat *mutable* (elemen bisa diubah/ditambah), sedangkan Tuple bersifat *immutable*.  
D. Tuple tidak mendukung indexing dan slicing.  

### 2. (Level 1 - Control Flow)
Potongan kode berikut akan menghasilkan output:
```python
x = [1, 2, 3]
y = [val * 2 for val in x if val % 2 != 0]
print(y)
```
A. `[2, 4, 6]`  
B. `[2, 6]`  
C. `[4]`  
D. `[1, 3]`  

### 3. (Level 1 - Scope & Fungsi)
Apa hasil keluaran dari kode berikut?
```python
count = 10
def update_count():
    count = 5
update_count()
print(count)
```
A. `5`  
B. `10`  
C. `UnboundLocalError`  
D. `None`  

### 4. (Level 2 - NumPy Broadcasting)
Jika array `A` memiliki shape `(3, 1)` dan array `B` memiliki shape `(3,)`, berapakah shape dari hasil operasi `A + B`?
A. `(3, 1)`  
B. `(3, 3)`  
C. `(1, 3)`  
D. Error `ValueError: operands could not be broadcast together`  

### 5. (Level 2 - NumPy Reshape)
Fungsi `np.reshape(arr, (4, -1))` pada array 1D berisi 12 elemen akan menghasilkan array berdimensi:
A. `(4, 2)`  
B. `(4, 3)`  
C. `(4, 4)`  
D. `(4, 12)`  

### 6. (Level 2 - Pandas Loc vs Iloc)
Manakah pernyataan yang paling tepat mengenai perbedaan `df.loc` dan `df.iloc`?
A. `df.loc` berbasis indeks posisi numerik, sedangkan `df.iloc` berbasis label baris/kolom.  
B. `df.loc` menggunakan inclusive range pada label end (`0:2` mengambil indeks 0, 1, dan 2), sedangkan `df.iloc` exclusive range (`0:2` mengambil indeks 0 dan 1).  
C. `df.iloc` hanya bisa digunakan pada Series, bukan DataFrame.  
D. `df.loc` tidak bisa menerima kondisi boolean filtering.  

### 7. (Level 2 - Pandas Filtering)
Untuk mentarikan baris di mana `gaji > 10000000` **DAN** `departemen` adalah 'Data' atau 'IT', sintaks Pandas yang benar adalah:
A. `df[(df['gaji'] > 10000000) & (df['departemen'].isin(['Data', 'IT']))]`  
B. `df[df['gaji'] > 10000000 and df['departemen'] in ['Data', 'IT']]`  
C. `df[(df['gaji'] > 10000000) | (df['departemen'] == 'Data' | 'IT')]`  
D. `df.query("gaji > 10000000 and departemen == Data or IT")`  

### 8. (Level 2 - Pandas Handling Nulls)
Metode Pandas untuk mengisi nilai missing value pada kolom numerik berdasarkan nilai baris sebelumnya (*forward fill*) adalah:
A. `df['col'].fillna(method='bfill')`  
B. `df['col'].ffill()`  
C. `df['col'].dropna(how='all')`  
D. `df['col'].replace(np.nan, 0)`  

### 9. (Level 2 - GroupBy & Aggregation)
Jika Anda ingin menghitung jumlah unik pelanggan (`customer_id`) dan rata-rata pembelian (`amount`) per wilayah (`region`), sintaks mana yang tepat?
A. `df.groupby('region').sum()`  
B. `df.groupby('region').agg({'customer_id': 'nunique', 'amount': 'mean'})`  
C. `df.groupby(['customer_id', 'amount'])['region'].count()`  
D. `df.pivot_table(index='region', values='amount', aggfunc='unique')`  

### 10. (Level 3 - Data Preprocessing)
Kapan teknik **IQR (Interquartile Range) Capping / Trimming** disarankan untuk digunakan daripada menghapus baris secara langsung?
A. Saat data berukuran kecil dan jumlah outlier sangat banyak (misal > 30% dari total data).  
B. Saat outlier merupakan nilai ekstrem yang sah (bukan kesalahan input) dan kita tidak ingin kehilangan ukuran sampel data secara drastis.  
C. Saat variabel berbentuk teks atau kategorikal.  
D. Saat data memiliki nilai missing lebih dari 50%.  

### 11. (Level 3 - Data Cleaning Regex)
Pola Regular Expression (Regex) `r'\d+'` berguna untuk mencocokkan:
A. Satu atau lebih karakter huruf (alphabet).  
B. Satu atau lebih karakter angka (digits).  
C. Karakter whitespace atau spasi.  
D. Hanya angka desimal/float.  

### 12. (Level 3 - Visualisasi Data)
Jenis grafik manakah yang paling ideal untuk melihat **distribusi frekuensi serta kemiringan (skewness)** dari satu variabel numerik kontinu?
A. Bar Chart  
B. Histogram dengan KDE (Kernel Density Estimation)  
C. Pie Chart  
D. Line Chart  

### 13. (Level 3 - Visualisasi Seaborn)
Fungsi Seaborn yang digunakan untuk menampilkan matriks scatter plot antarpasangan kolom numerik beserta distribusi univariatnya adalah:
A. `sns.heatmap()`  
B. `sns.boxplot()`  
C. `sns.pairplot()`  
D. `sns.barplot()`  

### 14. (Level 4 - Exploratory Data Analysis)
Apa kriteria utama dari kondisi data yang mengalami **Right-Skewed (Positive Skewness)**?
A. $\text{Mean} < \text{Median} < \text{Modus}$ (Ekor grafik memanjang ke kiri)  
B. $\text{Mean} = \text{Median} = \text{Modus}$ (Simetris berbentuk lonceng)  
C. $\text{Mean} > \text{Median} > \text{Modus}$ (Ekor grafik memanjang ke kanan)  
D. Nilai Standar Deviasi sama dengan nol.  

### 15. (Level 4 - Correlation Matrix)
Nilai korelasi Pearson antara Variabel X dan Variabel Y sebesar **$-0.85$** menunjukkan:
A. Hubungan linier positif yang sangat lemah.  
B. Hubungan linier negatif yang sangat kuat (saat X naik, Y cenderung turun signifikan).  
C. Tidak ada hubungan linier sama sekali.  
D. Variabel X menyebabkan terjadinya Variabel Y (kausalitas mutlak).  

### 16. (Level 4 - Statistik Inferensial)
Dalam Uji Hipotesis, jika nilai **$p$-value yang diperoleh adalah $0.012$** dan tingkat signifikansi $\alpha = 0.05$, apa keputusan statistiknya?
A. Gagal Menolak $H_0$ (Perbedaan tidak signifikan secara statistik).  
B. Menolak $H_0$ (Terdapat perbedaan/pengaruh yang signifikan secara statistik pada tingkat kepercayaan 95%).  
C. Mengubah nilai $\alpha$ menjadi 0.01 agar $H_0$ diterima.  
D. Menambah sampel data 2x lipat.  

### 17. (Level 4 - Uji Beda Statistik)
Uji statistik manakah yang paling tepat untuk membandingkan rata-rata nilai kepuasan pelanggan dari **3 cabang restoran yang berbeda (Cabang Jakarta, Bandung, Surabaya)**?
A. Independent Two-Sample t-Test  
B. Paired Sample t-Test  
C. One-Way ANOVA  
D. Chi-Square Test of Independence  

### 18. (Level 4 - Uji Asosiasi Kategorikal)
Untuk menguji apakah terdapat hubungan antara **Metode Pembayaran (E-Wallet, Credit Card, Cash)** dengan **Kategori Pelanggan (Member vs Non-Member)**, uji statistik yang digunakan adalah:
A. Pearson Correlation  
B. Chi-Square ($\chi^2$) Test of Independence  
C. Z-Test  
D. One-Sample t-Test  

### 19. (Level 5 - Best Practices Python)
Menurut panduan standar penulisan kode Python (**PEP 8**), bagaimanakah aturan penamaan variabel dan fungsi yang benar?
A. `CamelCase` (contoh: `TotalRevenuePerMonth`)  
B. `snake_case` huruf kecil (contoh: `total_revenue_per_month`)  
C. `UPPERCASE` (contoh: `TOTAL_REVENUE_PER_MONTH`)  
D. `kebab-case` (contoh: `total-revenue-per-month`)  

### 20. (Level 5 - Git & Portfolio)
Perintah Git untuk membuat branch baru bernama `feature-analysis` dan langsung berpindah ke branch tersebut adalah:
A. `git branch feature-analysis`  
B. `git checkout -b feature-analysis`  
C. `git commit -m "feature-analysis"`  
D. `git push origin feature-analysis`  

---

## 🛠️ BAGIAN B: Code Debugging & Output Analysis (20 Poin)

### Soal 1 (Pandas SettingWithCopyWarning)
Analisa potongan kode Pandas di bawah ini:
```python
import pandas as pd
df = pd.DataFrame({'city': ['Jakarta', 'Bandung', 'Surabaya'], 'sales': [100, 150, 120]})

jkt_df = df[df['city'] == 'Jakarta']
jkt_df['sales'] = 200
```
**Pertanyaan:**
1. Mengapa kode di atas memicu peringatan `SettingWithCopyWarning`?
2. Tuliskan kode perbaikan yang tepat agar tidak menimbulkan peringatan tersebut!

---

### Soal 2 (NumPy Type Error & Broadcasting)
Perhatikan kode berikut:
```python
import numpy as np
arr = np.array([1, 2, 3, '4', 5])
result = arr * 2
print(result)
```
**Pertanyaan:**
1. Apakah kode di atas menghasilkan error atau output tertentu? Jelaskan tipe data `arr` hasil pembuatan awal!
2. Bagaimana cara memperbaiki kode di atas agar operasi perkalian element-wise berhasil secara numerik?

---

### Soal 3 (Pandas Merge Data Loss)
Seorang analis melakukan merge dua DataFrame sebagai berikut:
```python
# df_orders (1000 baris) memuat transaksi
# df_customers (200 baris) memuat data profil pelanggan

df_merged = pd.merge(df_orders, df_customers, on='customer_id', how='inner')
print(len(df_merged)) # Hasilnya ternyata 850 baris!
```
**Pertanyaan:**
1. Mengapa jumlah baris `df_merged` berkurang menjadi 850 (kehilangan 150 baris transaksi)?
2. Jenis `how` merge apakah yang harus digunakan jika analis ingin **mempertahankan seluruh 1000 transaksi** meskipun ada `customer_id` yang tidak ditemukan di `df_customers`?

---

### Soal 4 (Groupby Aggregation Mistake)
Perhatikan kode agregasi berikut:
```python
df.groupby('category')['sales'].sum().reset_index().sort_values(by='sales', ascending=False)
```
Tiba-tiba muncul pesan error: `KeyError: 'sales'` atau hasil urutan tidak sesuai karena kolom `sales` menjadi indeks.  
**Pertanyaan:**
Tuliskan 2 cara sintaks lain yang lebih robust dan bersih untuk melakukan agregasi total `sales` per `category` lalu diurutkan dari terbesar ke terkecil!

---

### Soal 5 (Statistik SciPy Syntax)
Seorang analis ingin melakukan uji hipotesis beda dua sampel independen antara Group A dan Group B. Dia menulis kode:
```python
from scipy import stats
t_stat, p_val = stats.ttest_ind(group_a, group_b)
```
Namun data `group_a` memiliki ** missing value (`NaN`)**. Apa akibatnya terhadap nilai `t_stat` dan `p_val`, serta bagaimana parameter penanganan `nan_policy` yang tepat di `scipy.stats`?

---

## 📊 BAGIAN C: Hands-on Practical Data Analysis Challenge (30 Poin)

### 📌 Skenario Bisnis
Anda bekerja sebagai **Lead Data Analyst** di perusahaan Retail Omnichannel *"NusaMarket"*. Manajemen memberikan dataset transaksi mentah berisi 1.000 sampel transaksi pelanggan dan meminta Anda menyelesaikan 5 instruksi analisis di Jupyter Notebook.

### 💾 Pembuatan Dataset Simulasi (Jalankan Kode Ini Terlebih Dahulu!)
```python
import pandas as pd
import numpy as np

np.random.seed(42)
n = 1000

data_dict = {
    'TransactionID': [f"TRX-{10000+i}" for i in range(n)],
    'Date': pd.date_range(start='2024-01-01', periods=n, freq='h'),
    'CustomerID': np.random.choice([f"CUST-{np.random.randint(100, 250)}" for _ in range(300)], size=n),
    'Age': np.random.choice([18, 25, 30, 35, 42, 50, 65, np.nan], size=n, p=[0.1, 0.2, 0.2, 0.2, 0.15, 0.08, 0.05, 0.02]),
    'Gender': np.random.choice(['Male', 'Female', None], size=n, p=[0.48, 0.48, 0.04]),
    'Category': np.random.choice(['Electronics', 'Clothing', 'Groceries', 'Home & Living'], size=n),
    'Quantity': np.random.randint(1, 10, size=n),
    'UnitPrice': np.random.choice([50000, 150000, 300000, 750000, 1500000, 5000000], size=n),
    'DiscountPercent': np.random.choice([0, 5, 10, 15, 20, 50], size=n, p=[0.4, 0.2, 0.2, 0.1, 0.08, 0.02]),
    'PaymentMethod': np.random.choice(['E-Wallet', 'Credit Card', 'Cash', 'Bank Transfer'], size=n)
}

df_raw = pd.DataFrame(data_dict)
# Menambahkan 10 baris duplikat acak
df_raw = pd.concat([df_raw, df_raw.sample(10, random_state=42)], ignore_index=True)
```

---

### 📋 Instruksi Tugas Praktis:

#### **Tugas 1: Data Cleaning & Feature Engineering (7 Poin)**
1. Cek dan hapus baris duplikasi.
2. Tangani missing values pada kolom `Age` (imputasi dengan median) dan `Gender` (imputasi dengan modus).
3. Buat kolom baru bernama `TotalRevenue` dengan formula:
   $$\text{TotalRevenue} = (\text{Quantity} \times \text{UnitPrice}) \times \left(1 - \frac{\text{DiscountPercent}}{100}\right)$$
4. Extract kolom `Month` dan `DayName` dari kolom `Date`.

#### **Tugas 2: Exploratory Data Analysis & Aggregation (8 Poin)**
1. Tampilkan 5 Kategori produk dengan **Total Revenue tertinggi** beserta persentase kontribusinya terhadap total omset.
2. Buat Pivot Table yang menampilkan **Rata-rata TotalRevenue** berdasarkan `Category` (sebagai Row) dan `PaymentMethod` (sebagai Column).

#### **Tugas 3: Data Visualization Dashboard (7 Poin)**
Buatlah tampilan 2 grafik berdekatan (*Subplots 1x2*):
- **Grafik 1 (Line Chart):** Tren Total Revenue bulanan dari waktu ke waktu.
- **Grafik 2 (Bar Chart):** Distribusi jumlah transaksi berdasarkan `PaymentMethod` dengan annotation jumlah angka di atas bar.

#### **Tugas 4: Hypothesis Testing / A/B Test (5 Poin)**
Manajemen ingin tahu: *"Apakah transaksi yang diberikan Diskon ($\text{DiscountPercent} > 0$) menghasilkan rata-rata nilai transaksi ($\text{TotalRevenue}$) yang berbeda signifikan dibanding transaksi Tanpa Diskon ($\text{DiscountPercent} = 0$)?"*
- Tentukan $H_0$ dan $H_1$.
- Lakukan **Independent Two-Sample t-Test** (`scipy.stats.ttest_ind`).
- Berikan keputusan statistik berdasarkan nilai $p$-value ($\alpha = 0.05$).

#### **Tugas 5: Executive Business Summary (3 Poin)**
Tuliskan 3 poin ringkasan rekomendasi bisnis secara singkat untuk jajaran Direksi NusaMarket berdasarkan temuan dari Tugas 1-4!

---

- ➡️ **Lihat Kunci Jawaban & Pembahasan Lengkap:** [KUNCI_JAWABAN_DAN_SOLUSI_TEST.md](KUNCI_JAWABAN_DAN_SOLUSI_TEST.md)

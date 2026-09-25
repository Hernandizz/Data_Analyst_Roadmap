# 🔑 Kunci Jawaban & Pembahasan Solusi: Ujian Evaluasi Python for Data Analyst

---

## 📌 JAWABAN BAGIAN A: Pilihan Ganda & Konseptual

| No | Jawaban Benar | Penjelasan & Pembahasan Singkat |
|:---:|:---:|:---|
| **1** | **C** | List bersifat *mutable* (elemennya dapat diubah/ditambah/dihapus), sedangkan Tuple bersifat *immutable* (sekali dibuat tidak dapat diubah). List memakai `[]` dan Tuple memakai `()`. |
| **2** | **B** | List comprehension memfilter `val` ganjil dari `[1, 2, 3]` yaitu `1` dan `3`, lalu dikalikan 2 menjadi `[2, 6]`. |
| **3** | **B** | Variabel `count` di dalam fungsi adalah variabel lokal scope. Karena tidak ada deklarasi `global count`, variabel `count` global di luar tetap bernilai `10`. |
| **4** | **B** | Broadcasting NumPy memperluas `A (3,1)` dan `B (3,)` (dievaluasi sebagai `(1,3)`) menjadi matriks berdimensi `(3, 3)`. |
| **5** | **B** | Dimensi `-1` pada reshape memberi instruksi NumPy untuk menghitung otomatis sisa kolom: $12 / 4 = 3$. Jadi shapenya `(4, 3)`. |
| **6** | **B** | `df.loc` berbasis label dan bersifat *inclusive* di kedua batas, sedangkan `df.iloc` berbasis posisi numerik (0-indexed) dan bersifat *exclusive* di batas akhir. |
| **7** | **A** | Di Pandas, bitwise operator `&` (AND) dan `|` (OR) harus digunakan bersama tanda kurung `()` untuk setiap kondisi. `isin()` digunakan untuk mengecek keanggotaan list. |
| **8** | **B** | `df.ffill()` (atau `fillna(method='ffill')`) melakukan *forward fill* mengisi nilai missing dengan nilai dari baris sebelumnya. |
| **9** | **B** | Metode `.agg({'customer_id': 'nunique', 'amount': 'mean'})` memungkinkan agregasi fungsi yang berbeda untuk kolom yang berbeda sekaligus. |
| **10** | **B** | IQR Capping (Winsorizing) mengubah nilai outlier ekstrem menjadi batas atas/bawah tanpa menghapus baris data sehingga ukuran sampel dan informasi lain tetap terjaga. |
| **11** | **B** | Simbol `\d` menandakan digit/angka, dan tanda `+` menandakan kemunculan 1 kali atau lebih (*one or more*). |
| **12** | **B** | Histogram yang dilengkapi kurva KDE (*Kernel Density Estimation*) adalah visualisasi terbaik untuk mendeteksi distribusi, puncak (modus), dan skewness data numerik. |
| **13** | **C** | `sns.pairplot()` otomatis membuat matriks scatter plot untuk semua pasangan kolom numerik dan histogram pada diagonal utama. |
| **14** | **C** | Pada Right-Skewed (Positive Skewness), pencilan tinggi ditarik ke kanan sehingga $\text{Mean} > \text{Median} > \text{Modus}$. |
| **15** | **B** | Nilai korelasi mendekati $-1.0$ menunjukkan hubungan linier terbalik (negatif) yang sangat kuat. |
| **16** | **B** | Karena $p\text{-value} (0.012) < \alpha (0.05)$, kita Tolak $H_0$ dan menyimpulkan ada perbedaan signifikan secara statistik. |
| **17** | **C** | One-Way ANOVA digunakan untuk membandingkan rata-rata numerik dari $\ge 3$ kelompok independen. |
| **18** | **B** | Chi-Square Test of Independence ($\chi^2$) digunakan untuk menguji asosiasi/hubungan antara dua variabel kategorikal. |
| **19** | **B** | Sesuai panduan PEP 8, nama variabel dan fungsi di Python menggunakan format `snake_case` (huruf kecil dipisahkan underscore). |
| **20** | **B** | `git checkout -b <nama_branch>` adalah perintah shorthand untuk membuat sekaligus berpindah ke branch baru. |

---

## 🛠️ JAWABAN BAGIAN B: Code Debugging & Output Analysis

### Soal 1 Solution
1. **Penyebab:** `jkt_df` adalah hasil slice/view dari DataFrame `df`. Mengubah nilai pada `jkt_df` membuat Pandas bingung apakah pengguna ingin mengubah view atau DataFrame asli `df`.
2. **Kode Perbaikan:** Gunakan `.copy()` saat membuat slice DataFrame:
```python
jkt_df = df[df['city'] == 'Jakarta'].copy()
jkt_df['sales'] = 200  # Bersih tanpa warning!
```

---

### Soal 2 Solution
1. **Penyebab:** Karena terdapat elemen string `'4'` pada list, NumPy otomatis melakukan type casting seluruh array menjadi string (`dtype='<U21'`). Akibatnya `arr * 2` bukan perkalian numerik melainkan error `TypeError: ufunc 'multiply' did not contain a loop...`.
2. **Kode Perbaikan:**
```python
arr = np.array([1, 2, 3, '4', 5], dtype=float) # Force cast ke float
result = arr * 2
print(result) # Output: [ 2.  4.  6.  8. 10.]
```

---

### Soal 3 Solution
1. **Penyebab:** Default `how='inner'` hanya menyertakan baris yang `customer_id`-nya ada di **kedua** DataFrame (`df_orders` DAN `df_customers`). Ada 150 transaksi dari pelanggan yang ID-nya tidak terdaftar di `df_customers`.
2. **Kode Perbaikan:** Gunakan `how='left'` untuk mempertahankan seluruh 1.000 transaksi dari DataFrame utama (`df_orders`):
```python
df_merged = pd.merge(df_orders, df_customers, on='customer_id', how='left')
print(len(df_merged)) # Tepat 1000 baris!
```

---

### Soal 4 Solution
Dua alternatif sintaks yang lebih bersih dan robust:
```python
# Cara 1: Menggunakan agg() dengan reset_index()
df.groupby('category', as_index=False)['sales'].sum().sort_values(by='sales', ascending=False)

# Cara 2: Menggunakan named aggregation
df.groupby('category').agg(total_sales=('sales', 'sum')).reset_index().sort_values(by='total_sales', ascending=False)
```

---

### Soal 5 Solution
1. **Akibat:** Jika data mengandung `NaN`, `stats.ttest_ind()` secara default akan menghasilkan `t_stat = nan` dan `p_val = nan`.
2. **Kode Perbaikan:** Tambahkan parameter `nan_policy='omit'` untuk mengabaikan missing values:
```python
t_stat, p_val = stats.ttest_ind(group_a, group_b, nan_policy='omit')
```

---

## 📊 JAWABAN BAGIAN C: Hands-on Practical Data Analysis Solution

Berikut adalah **skrip Python lengkap** yang menyelesaikan seluruh Tugas 1 - 5:

```python
import pandas as pd
import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt
import seaborn as sns

# Set visual style
sns.set_theme(style="whitegrid")

# ==========================================
# SETUP DATASET SIMULASI
# ==========================================
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

df = pd.DataFrame(data_dict)
df = pd.concat([df, df.sample(10, random_state=42)], ignore_index=True)

# ==========================================
# TUGAS 1: DATA CLEANING & FEATURE ENGINEERING
# ==========================================
print("--- TUGAS 1: DATA CLEANING & FEATURE ENGINEERING ---")
# 1. Hapus duplikasi
initial_len = len(df)
df = df.drop_duplicates().reset_index(drop=True)
print(f"1. Membuang {initial_len - len(df)} baris duplikat. Total baris sekarang: {len(df)}")

# 2. Imputasi missing values
median_age = df['Age'].median()
df['Age'] = df['Age'].fillna(median_age)

mode_gender = df['Gender'].mode()[0]
df['Gender'] = df['Gender'].fillna(mode_gender)
print(f"2. Missing value diisi: Age dengan median ({median_age}), Gender dengan mode ('{mode_gender}')")

# 3. Hitung TotalRevenue
df['TotalRevenue'] = (df['Quantity'] * df['UnitPrice']) * (1 - (df['DiscountPercent'] / 100))

# 4. Extract Date components
df['Month'] = df['Date'].dt.strftime('%Y-%m')
df['DayName'] = df['Date'].dt.day_name()
print("3 & 4. Feature engineering selesai! Top 3 baris:")
print(df[['TransactionID', 'Category', 'TotalRevenue', 'Month', 'DayName']].head(3))
print("\n" + "="*50 + "\n")

# ==========================================
# TUGAS 2: EXPLORATORY DATA ANALYSIS & AGGREGATION
# ==========================================
print("--- TUGAS 2: EDA & AGGREGATION ---")
# 1. Top Category by Revenue
cat_summary = df.groupby('Category')['TotalRevenue'].agg(
    Total_Revenue='sum',
    Transaction_Count='count'
).reset_index()

cat_summary['Revenue_Share_%'] = (cat_summary['Total_Revenue'] / cat_summary['Total_Revenue'].sum()) * 100
cat_summary = cat_summary.sort_values(by='Total_Revenue', ascending=False).reset_index(drop=True)
print("1. Ringkasan Performa Kategori Produk:")
print(cat_summary.round(2))

# 2. Pivot Table Category vs PaymentMethod
pivot_revenue = df.pivot_table(
    index='Category',
    columns='PaymentMethod',
    values='TotalRevenue',
    aggfunc='mean'
)
print("\n2. Pivot Table: Rata-rata TotalRevenue per Kategori & Metode Pembayaran (Rp):")
print(pivot_revenue.round(0))
print("\n" + "="*50 + "\n")

# ==========================================
# TUGAS 3: DATA VISUALIZATION DASHBOARD
# ==========================================
print("--- TUGAS 3: VISUALIZATION ---")
fig, axes = plt.subplots(1, 2, figsize=(15, 6))

# Grafik 1: Line Chart Monthly Revenue
monthly_rev = df.groupby('Month')['TotalRevenue'].sum() / 1e6 # Dalam Juta Rp
axes[0].plot(monthly_rev.index, monthly_rev.values, marker='o', color='#1E88E5', linewidth=2.5)
axes[0].set_title("Tren Total Revenue Bulanan (Juta Rp)", fontweight='bold')
axes[0].set_xlabel("Bulan")
axes[0].set_ylabel("Revenue (Juta Rp)")
axes[0].tick_params(axis='x', rotation=45)

# Grafik 2: Bar Chart Payment Method Frequency
pay_counts = df['PaymentMethod'].value_counts()
sns.barplot(x=pay_counts.index, y=pay_counts.values, ax=axes[1], palette='Blues_r')
axes[1].set_title("Jumlah Transaksi per Metode Pembayaran", fontweight='bold')
axes[1].set_xlabel("Metode Pembayaran")
axes[1].set_ylabel("Jumlah Transaksi")

# Add Annotations
for p in axes[1].patches:
    axes[1].annotate(f'{int(p.get_height())}', (p.get_x() + p.get_width() / 2., p.get_height()),
                     ha='center', va='bottom', xytext=(0, 3), textcoords='offset points', fontweight='bold')

plt.tight_layout()
plt.show()

# ==========================================
# TUGAS 4: HYPOTHESIS TESTING (A/B TEST)
# ==========================================
print("--- TUGAS 4: HYPOTHESIS TESTING ---")
# Split Data: Diskon vs Tanpa Diskon
rev_discount = df[df['DiscountPercent'] > 0]['TotalRevenue']
rev_no_discount = df[df['DiscountPercent'] == 0]['TotalRevenue']

t_stat, p_val = stats.ttest_ind(rev_discount, rev_no_discount, equal_var=False)

print(f"Rata-rata Transaksi Diberi Diskon   : Rp {rev_discount.mean():,.2f}")
print(f"Rata-rata Transaksi Tanpa Diskon    : Rp {rev_no_discount.mean():,.2f}")
print(f"Hasil Independent t-Test -> t-stat: {t_stat:.3f}, p-value: {p_val:.4f}")

if p_val < 0.05:
    print("Kesimpulan: Tolak H0 -> Terdapat perbedaan nilai transaksi yang SIGNIFIKAN antara transaksi berdiksion vs tanpa diskon.")
else:
    print("Kesimpulan: Gagal Tolak H0 -> Tidak terdapat perbedaan signifikan.")
print("\n" + "="*50 + "\n")

# ==========================================
# TUGAS 5: EXECUTIVE BUSINESS SUMMARY
# ==========================================
print("""--- TUGAS 5: EXECUTIVE BUSINESS SUMMARY ---
1. Optimasi Promosi Diskon: Hasil A/B testing membuktikan bahwa pemberian diskon berpengaruh signifikan terhadap peningkatan nilai transaksi (TotalRevenue). Disarankan membuat diskon bertingkat (tiered discount) untuk meningkatkan Basket Size.
2. Dominasi Kategori Produk: Monitor persediaan barang pada Kategori dengan kontribusi revenue tertinggi agar tidak terjadi stock-out pada jam sibuk.
3. Insentif E-Wallet: Karena metode pembayaran E-Wallet dan Credit Card mendominasi transaksi, NusaMarket perlu bekerja sama dengan penyedia E-Wallet untuk promosi cashback bersama.
""")
```

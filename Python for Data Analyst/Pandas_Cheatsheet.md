# 📄 Pandas Quick Reference Cheatsheet for Data Analyst

---

## 🚀 1. Inisialisasi & Import
```python
import pandas as pd
import numpy as np

# Cek Versi
print(pd.__version__)
```

---

## 📥 2. Loading & Exporting Data
```python
# Read Data
df = pd.read_csv('file.csv')
df = pd.read_excel('file.xlsx', sheet_name='Sheet1')
df = pd.read_sql('SELECT * FROM table', connection)

# Export Data
df.to_csv('output.csv', index=False)
df.to_excel('output.xlsx', index=False)
```

---

## 🔍 3. Inspeksi Awal Data
```python
df.head(5)                # 5 Baris Pertama
df.tail(5)                # 5 Baris Terakhir
df.sample(5)              # 5 Baris Acak
df.info()                 # Struktur & Memory Info
df.shape                  # (Jumlah Baris, Jumlah Kolom)
df.dtypes                 # Tipe Data per Kolom
df.describe()             # Ringkasan Statistik Numerik
df.describe(include='O')  # Ringkasan Statistik Kategorikal
df.nunique()              # Jumlah Nilai Unik per Kolom
```

---

## 🎯 4. Seleksi, Filtering & Indexing
```python
# Seleksi Kolom
df['nama_kolom']          # Series
df[['col1', 'col2']]      # DataFrame

# Subsetting dengan loc (Label-based) & iloc (Position-based)
df.loc[0:10, ['col1', 'col2']]
df.iloc[0:10, 0:3]

# Filtering Data (Boolean Indexing)
df[df['age'] > 25]
df[(df['age'] > 25) & (df['gender'] == 'Female')]
df[df['city'].isin(['Jakarta', 'Surabaya', 'Bandung'])]
df[df['name'].str.contains('Andi', case=False, na=False)]
```

---

## 🧹 5. Data Cleaning & Transformation
```python
# Missing Values
df.isnull().sum()                   # Hitung null per kolom
df.dropna(subset=['col1'])           # Hapus baris jika null di col1
df['col1'] = df['col1'].fillna(0)   # Imputasi dengan nilai konstan
df['age'] = df['age'].fillna(df['age'].median())

# Duplikasi
df.duplicated().sum()               # Hitung duplikasi
df = df.drop_duplicates()           # Hapus duplikasi

# Casting Tipe Data & Renaming
df['date'] = pd.to_datetime(df['date'])
df['price'] = df['price'].astype(float)
df = df.rename(columns={'old_name': 'new_name'})

# String Operations
df['name'] = df['name'].str.strip().str.title()
```

---

## 📊 6. GroupBy, Aggregation & Reshaping
```python
# GroupBy Single & Multiple Aggregation
df.groupby('category')['sales'].mean()
df.groupby(['category', 'region']).agg(
    total_sales=('sales', 'sum'),
    avg_sales=('sales', 'mean'),
    customer_count=('customer_id', 'nunique')
).reset_index()

# Pivot Table & Melt
pivot = df.pivot_table(index='category', columns='region', values='sales', aggfunc='sum')
melted = pd.melt(df, id_vars=['id'], value_vars=['jan', 'feb'], var_name='month', value_name='sales')

# Joining & Concatenation
merged = pd.merge(df1, df2, on='customer_id', how='left') # inner, left, right, outer
concatenated = pd.concat([df1, df2], axis=0, ignore_index=True)
```

---

## ⏱️ 7. Date & Time Operations
```python
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day_name'] = df['date'].dt.day_name()
df['quarter'] = df['date'].dt.quarter

# Date Difference
df['days_diff'] = (pd.to_datetime('today') - df['date']).dt.days
```

---

## ⚡ 8. Apply, Map & Conditional Columns
```python
# np.where & np.select
df['status'] = np.where(df['score'] >= 75, 'Pass', 'Fail')

# Apply dengan Lambda
df['sales_with_tax'] = df['sales'].apply(lambda x: x * 1.11)

# Map untuk Kategorikal Re-mapping
mapping = {'M': 'Male', 'F': 'Female'}
df['gender_label'] = df['gender'].map(mapping)
```

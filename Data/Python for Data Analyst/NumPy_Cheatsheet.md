# 📄 NumPy Quick Reference Cheatsheet for Data Analyst

---

## 🚀 1. Inisialisasi & Import
```python
import numpy as np

print(np.__version__)
```

---

## 🏗️ 2. Array Creation (Membuat Array)
```python
# 1D & 2D Array dari List
arr1d = np.array([1, 2, 3, 4, 5])
arr2d = np.array([[1, 2, 3], [4, 5, 6]])

# Built-in Generators
zeros = np.zeros((3, 3))                 # Array isi 0
ones = np.ones((2, 4))                   # Array isi 1
full = np.full((2, 2), 7)                # Array isi angka konstan (7)
identity = np.eye(3)                     # Matriks Identitas 3x3

# Sequences & Ranges
seq = np.arange(0, 10, 2)               # [0, 2, 4, 6, 8]
linspace = np.linspace(0, 1, 5)          # 5 angka dengan interval sama [0. , 0.25, 0.5, 0.75, 1.]

# Random Number Generators
rand = np.random.rand(3, 3)              # Uniform distribution [0, 1)
randn = np.random.randn(100)             # Standard Normal distribution (Mean=0, Std=1)
randint = np.random.randint(1, 100, 10)  # 10 Integer acak antara 1 dan 100
```

---

## 📐 3. Inspeksi Atribut Array
```python
arr = np.array([[1, 2, 3], [4, 5, 6]])

print(arr.shape)   # (2, 3) -> 2 Baris, 3 Kolom
print(arr.ndim)    # 2 -> Dimensi Array
print(arr.size)    # 6 -> Total Jumlah Elemen
print(arr.dtype)   # int64 -> Tipe Data Elemen
```

---

## ✂️ 4. Indexing & Slicing
```python
arr = np.array([10, 20, 30, 40, 50])
print(arr[0])      # 10
print(arr[1:4])    # [20, 30, 40]

matrix = np.array([[10, 20, 30], 
                   [40, 50, 60], 
                   [70, 80, 90]])

print(matrix[0, 1])      # 20 (Baris 0, Kolom 1)
print(matrix[:, 0])      # [10, 40, 70] (Semua Baris, Kolom 0)
print(matrix[0:2, 1:3])  # Sub-matriks 2x2

# Fancy / Boolean Indexing
mask = arr > 25
print(arr[mask])         # [30, 40, 50]
```

---

## 🔄 5. Reshaping & Manipulasi Shape
```python
arr = np.arange(12)      # [0, 1, ..., 11]

# Reshape
mat = arr.reshape(3, 4)   # 3 Baris, 4 Kolom
flat = mat.flatten()     # Meratakan kembali ke 1D Array
transposed = mat.T       # Transpose Matriks (4x3)

# Stacking (Menggabungkan Array)
arr_a = np.array([1, 2])
arr_b = np.array([3, 4])

v_stacked = np.vstack((arr_a, arr_b))  # Vertikal Stack
h_stacked = np.hstack((arr_a, arr_b))  # Horisontal Stack
```

---

## ⚡ 6. Vectorization & Mathematical Operations
```python
a = np.array([10, 20, 30])
b = np.array([1, 2, 3])

# Element-wise Operations
print(a + b)     # [11, 22, 33]
print(a * b)     # [10, 40, 90]
print(a ** 2)    # [100, 400, 900]

# Universal Functions (ufuncs)
print(np.sqrt(a))
print(np.exp(b))
print(np.log(a))
```

---

## 📊 7. Statistical & Aggregation Functions
```python
data = np.array([[10, 20, 30], 
                 [40, 50, 60]])

print(np.sum(data))           # 210 (Total Keseluruhan)
print(np.mean(data, axis=0))  # Rata-rata per Kolom [25., 35., 45.]
print(np.mean(data, axis=1))  # Rata-rata per Baris [20., 50.]
print(np.median(data))        # 35.0
print(np.std(data))           # Standard Deviasi
print(np.var(data))           # Variansi
print(np.min(data), np.max(data))
print(np.argmin(data), np.argmax(data)) # Index Nilai Min & Max
```

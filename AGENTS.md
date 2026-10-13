<!-- ... existing code ... -->
*   **Minggu 13-14: CI/CD Setup & Production Deployment.**
    Menggunakan GitHub Actions untuk *deploy* otomatis ke server (misal: AWS EC2 atau DigitalOcean Droplet) dengan arsitektur Nginx.

---

## 6. Detail Skema Database (ERD)
Berikut adalah rincian kolom untuk tabel-tabel utama di MySQL yang akan dikelola melalui fitur *Migration* bawaan Laravel:

*   **Tabel `users`**
    *   `id` (PK), `name`, `email` (Unique), `password`, `role` (Enum: 'admin', 'instructor', 'student'), `created_at`, `updated_at`.
*   **Tabel `courses`**
    *   `id` (PK), `instructor_id` (FK -> users.id), `title`, `slug` (Unique), `description`, `price` (Decimal), `status` (Enum: 'draft', 'published'), `thumbnail_path`, `created_at`, `updated_at`.
*   **Tabel `modules`** (Grup materi / Bab)
    *   `id` (PK), `course_id` (FK -> courses.id), `title`, `sequence_order` (Integer - urutan bab).
*   **Tabel `lessons`** (Materi spesifik)
    *   `id` (PK), `module_id` (FK -> modules.id), `title`, `type` (Enum: 'video', 'quiz', 'assignment', 'text'), `video_url` (Path/Key S3), `content_text` (LongText), `duration_seconds` (Integer), `is_free_preview` (Boolean), `sequence_order`.
*   **Tabel `enrollments`** (Akses siswa ke kursus yang telah dibeli)
    *   `id` (PK), `user_id` (FK -> users.id), `course_id` (FK -> courses.id), `status` (Enum: 'active', 'completed', 'revoked'), `enrolled_at`.
*   **Tabel `lesson_progresses`** (Pelacakan durasi tontonan video)
    *   `id` (PK), `user_id` (FK), `lesson_id` (FK), `watched_seconds` (Integer), `is_completed` (Boolean), `last_accessed_at` (Timestamp).

---

## 7. Arsitektur Keamanan Video (Anti-Pembajakan)
Salah satu risiko terbesar bisnis *E-Learning* adalah video materi yang diunduh (didownload) dan dibagikan gratis menggunakan IDM atau ekstensi *browser*. Ini cara kita memproteksinya agar setara platform premium:

1.  **Transcoding HLS (HTTP Live Streaming):**
    Kita tidak akan memutar file MP4 tunggal di website. Video yang diunggah instruktur akan dikonversi (menggunakan AWS MediaConvert atau FFmpeg) menjadi format HLS. Video dipecah menjadi ratusan file kecil `.ts` dan disatukan oleh *playlist* `.m3u8`. Ini membuat video sangat sulit diunduh secara utuh oleh alat *downloader* standar.
2.  **Private Storage (AWS S3) & CDN (CloudFront):**
    File video disimpan di *bucket* AWS S3 yang bersifat *Private* (tidak bisa diakses publik secara langsung). Distribusi ke pengguna dilakukan lewat AWS CloudFront agar *streaming* lancar tanpa *buffering*.
3.  **Signed URLs (URL Sementara):**
    Saat *student* membuka halaman video, *backend* Laravel akan memvalidasi status pembelian mereka (`enrollments`). Jika valid, Laravel akan men-*generate* "Signed URL" khusus untuk *user* tersebut yang hanya berlaku (expired) dalam waktu singkat, misalnya 3 jam. Setelah lewat batas waktu, tautan video akan hangus otomatis.
4.  **CORS & Domain Restriction:**
    Kita akan mengunci konfigurasi jaringan *storage* agar *request* pemutaran video hanya diizinkan jika *header request* berasal dari nama domain website resmi kita (misal: `datamastery.id`).

---

## 8. Spesifikasi Server & Infrastruktur Deployment
Untuk menangani aktivitas pengguna, *streaming*, dan lalu lintas *database*, kita memerlukan spesifikasi server level *production*:

*   **Tipe Server Utama:** Cloud VPS (DigitalOcean, AWS EC2, atau Linode).
*   **Spesifikasi Minimum Awal:** 4 vCPU, 8 GB RAM, 100 GB NVMe SSD.
*   **Web Server:** NGINX.
*   **Manajemen Latar Belakang (Asynchronous):** Supervisor (untuk memastikan Laravel Horizon/Queue Worker tetap berjalan memproses *caching* Redis, pengiriman email, dan kompresi video tanpa membuat website lambat).
<!-- ... existing code ... -->
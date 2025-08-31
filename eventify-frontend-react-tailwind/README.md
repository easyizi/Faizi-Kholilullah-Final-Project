# Eventify Frontend (React + Tailwind)

Frontend sederhana untuk aplikasi Event Ticketing.

## Fitur
- Beranda: daftar event + pencarian + kategori
- Detail event: beli tiket (POST /tickets/purchase)
- Login & Register (JWT disimpan di localStorage)
- Admin: CRUD event (POST/PUT/DELETE /events) — akses untuk role ADMIN/ORGANIZER
- Galeri: gambar placeholder (SVG) yang bisa kamu ganti

## Setup
1. Pastikan Node.js >= 18.
2. Install dependensi:
   ```bash
   npm install
   ```
3. Buat file `.env` (opsional) dan isi:
   ```env
   VITE_API_BASE=http://localhost:3000
   ```
   Jika tidak ada, default tetap `http://localhost:3000`.
4. Jalankan dev server:
   ```bash
   npm run dev
   ```

## Struktur
- `src/pages/*` : Halaman utama
- `src/components/*` : Komponen UI
- `src/assets/images/*` : Banner SVG contoh (bebas pakai)

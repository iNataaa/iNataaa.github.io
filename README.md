# Portofolio Haikal Wiranata

Versi Next.js App Router dengan ekspor statis. Beranda dan CV menggunakan `data.json` sebagai sumber isi. Untuk memilih kutipan unggulan, atur `pullQuoteSentence` pada satu proyek. Nomor urutan kalimat dimulai dari 0.

## Pratinjau

Gunakan Node.js yang kompatibel dengan versi Next.js di `package.json`.

```sh
npm ci
npm run build
python -m http.server 8018 --directory out
```

Buka `http://localhost:8018/` untuk beranda atau `http://localhost:8018/cv.html` untuk CV. Untuk mencetak, pilih **Cetak / simpan PDF**, ukuran A4, dan matikan header serta footer bawaan browser.

## Publikasi GitHub Pages

Build menghasilkan berkas statis di `out/`, termasuk `index.html`, `cv.html`, `_next/`, dan `.nojekyll`. Publikasikan isi `out/` di akar cabang dan folder yang digunakan GitHub Pages. Sertakan berkas tersembunyi `.nojekyll` agar aset dalam `_next/` ikut terbit.

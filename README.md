# Portofolio Haikal Wiranata

Situs statis dengan dua halaman. `index.html` menampilkan portofolio. `cv.html` memuat riwayat dan tombol **Cetak / simpan PDF**. Kedua halaman membaca `data.json`.

## Mengubah isi

Edit `data.json` untuk mengubah profil, proyek, pengalaman, pendidikan, sertifikasi, dan keahlian. Pada proyek, `pullQuoteSentence` memilih kalimat sorotan berdasarkan urutan mulai dari 0. Gunakan properti ini pada satu proyek.

Gunakan `[]` untuk koleksi yang kosong agar halamannya melewati seksi tersebut. Simpan sebagai UTF-8.

## Pratinjau lokal

Jalankan perintah ini dari direktori situs.

```sh
python -m http.server 8000
```

Buka [portofolio](http://localhost:8000/) atau [CV](http://localhost:8000/cv.html). Kedua halaman memerlukan JavaScript dan akses melalui HTTP.

Untuk membuat PDF, buka CV, pilih **Cetak / simpan PDF**, pilih kertas A4, lalu gunakan **Save as PDF** di dialog cetak. Matikan header dan footer bawaan browser untuk hasil yang lebih rapi.

## GitHub Pages

Salin isi direktori situs, termasuk `.nojekyll`, ke akar repositori situs pengguna `inataaa.github.io`. Bila membuat repo baru, gunakan nama tersebut dalam huruf kecil sesuai ketentuan GitHub Pages. Di **Settings → Pages**, pilih **Deploy from a branch**, cabang `main`, dan folder `/ (root)`.

Situs ditujukan untuk [inataaa.github.io](https://inataaa.github.io/). Lihat [panduan resmi GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

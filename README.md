link deploy: test-rimba-ananta-vikasa.vercel.app

Deskripsi Singkat Proyek:

Proyek ini adalah RESTful API berbasis Node.js dan Express.js yang menyediakan layanan untuk memproses data pengguna. Salah satu fitur utama proyek ini adalah middleware validasi input, yang memastikan bahwa data yang dikirim oleh klien memenuhi kriteria tertentu sebelum diproses lebih lanjut.

Fitur utama mencakup:

Middleware Validasi Input Pengguna: Memeriksa apakah nama, email, dan usia yang dikirimkan oleh klien valid, dengan spesifikasi berikut:

Nama harus berupa string non-kosong.
Email harus memiliki format yang valid.
Usia harus berupa bilangan bulat positif.
Endpoint CRUD Pengguna: Mendukung operasi seperti membuat, membaca, memperbarui, dan menghapus data pengguna.

Modular dan Terstruktur:

Middleware, logika koneksi database, dan rute terorganisir dengan baik dalam file terpisah untuk memudahkan pengelolaan dan pengembangan lebih lanjut.
Logging: Implementasi logger untuk mencatat aktivitas permintaan ke dalam file, membantu dalam pelacakan dan debugging.

Proyek ini dirancang sebagai bagian dari pengembangan aplikasi backend, cocok untuk digunakan sebagai kerangka awal dalam membangun aplikasi yang membutuhkan validasi data dan pengelolaan pengguna.

---

Instruksi instalasi dan cara menjalankan aplikasi secara lokal.

1. Persyaratan
   Pastikan Anda memiliki Node.js dan npm (Node Package Manager) terinstal di sistem Anda.
   Node.js: Versi minimal 14.x atau lebih baru.
   npm: Biasanya sudah termasuk saat Anda menginstal Node.js.
   Pastikan Anda memiliki Git jika ingin mengklon repositori proyek.
2. Clone Repositori
   Jika proyek ini berada di repositori Git, salin repositori ke lokal Anda:
3. Instal Dependensi
   npm install
4. Jalankan aplikasi
   npm rundev
5. Jalankan test
   npm test
6. Akses endpoint:
   -POST users
   http://localhost:3000/api/users
   {
   "name": "umur",
   "email": "umur@gmail.com",
   "age": 17
   }

-GET all users
http://localhost:3000/api/users

-GET users by ID
http://localhost:3000/api/users/6785d991ab0f5a05a62b2699

-PUT users by ID
http://localhost:3000/api/users/6785d991ab0f5a05a62b2699
{
"name": "coba gaksih",
"email": "cobagak@gmail.com",
"age": 30

}

-DELETE users by ID
http://localhost:3000/api/users/6785d991ab0f5a05a62b2699

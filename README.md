# DiagnoAkses
DiagnoAkses adalah fitur pra-diagnosa yang memberikan informasi menuju fasilitas kesehatan sesuai dengan kebutuhan kamu.

Aplikasi diagnoakses dapat dicoba melalui **Expo** untuk mobile dan **Browser Web** melalui link berikut: 
- [**Expo** : https://expo.dev/accounts/ayusudi/projects/DiagnoAkses](https://expo.dev/accounts/ayusudi/projects/DiagnoAkses)  
  Terdapat opsi lain dengan melalukan scan ke QR berikut, mohon disesuaikan dengan Operation System di hp itu sendiri yaa.. 
  ![scan qr](./expo.png)
- [**Web** : https://web-diagnoakses.web.app ](https://web-diagnoakses.web.app)

For development please checkout [➡️ API Documentation](https://documenter.getpostman.com/view/20472929/2s9YC1Vtv8) 


## Cara menjalankannya di local 
1. Pastikan telah memiliki expo pada root PC
2. Pastikan telah memiliki simulator iPhone atau emulator Android terlebih dahulu
3. Buka simulator / emulatornya 
4. Buka folder ini pada terminal dan run `npm install`
5. Lengkapi enviorment crediential Google untuk Firebase Database dan Geolocation yang kami manfaatkan untuk fitur chat dan peta.
6. Jalankan : 
  - `npm run ios` untuk menjalakan via simulator iPhone 
  - `npm run android` untuk menjalan via emulator Android 
  - `npm run web` untuk menjalankan aplikasi pada browser localhost.  
    untuk web sebenarnya kami mengoptimalkan dan memanfaatkan kemampuan react native yang bisa berbagai platform. 
    tapi fokus kami sendiri pada mobile di Android dan iPhone, melihat peluang ini memberikan tantangan baru untuk bisa diakses semudah mungkin.
7. Jika pertama kali running maka expo akan diinstall dulu oleh simulator/emulator itu sendiri 
8. Jika tidak, pada simulator/emulator akan langsung load aplikasi dimulai dari splash image berikut [splash](./assets/splash.png)
9. Selamat mencoba fitur. 

> Untuk pengumpulan aplikasi via zip kami akan mensertakan enviorment langsung pada kodingan.  
> Namun setelah lomba ini berakhir akan kami matikan hal ini karena budget yang dikeluarkan. 


User Interface pada Prototype sebelumnya 
![UI](./planUI.png)

Namun setelah aplikasi ini jadi kami berhasil menyelsaikan 7 page yang kami peruntukkan untuk : 
1. Daftar Kategori (Category Page) sebagai main page
2. Daftar Gejala (Symptom Page)
3. Pradiagnosa (Pradiagnose Page)
4. Hasil Pradianosa (Pradiagnosed Page)
5. Chat (Chat Page)
6. Daftar Faskes (MedFacility Page) yang disertakan peta
7. Daftar Filter Lokasi (Search Location Page)


## Source Data 
Kami menggunakan API orisinil yang kami ciptakan sendiri melalui data entry, dataset kaggle, data cleaning, normalization dan lain-lain.   
Hingga menciptakan API berikut ["REST API DiagnoAkses"](https://github.com/SimpliLife/server).

Disertakan proses data kaggle yang merupakan list faskes 2019 pada repository berikut [click](https://github.com/SimpliLife/data-cleaning-kaggle).  
Hingga data proses dari data entry dari sumber buku utama kami yang di olah menjadi JSON dan diolah kembali dengan python [click](https://github.com/SimpliLife/dataset-version-1). 

API Doc bisa diakses melalui Postman yang telah disertakan juga dengan contoh pemakaian.  
[API DOC REST API DIAGNOAKSES](https://documenter.getpostman.com/view/20472929/2s9YC1Vtv8)

Server kami public dapat diakes melalui URL Berikut: [https://simplilife-d59aa106cc03.herokuapp.com/api](https://simplilife-d59aa106cc03.herokuapp.com/api)

![APIDOC](./APIDOC.png)
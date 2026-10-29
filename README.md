# MathPortal • Lisans Matematik & Fen Portalı

Galatasaray Üniversitesi matematik ve temel bilimler lisans programları için hazırlanmış interaktif ders kitabı, adım adım TD çözümleri ve sınav çalışma platformu.

---

### Müfredat ve Ders Modülleri

- **MAT204 — Grup Teorisi**  
  6 Modül, 68 İnteraktif TD Sorusu (TD-1 ila TD-6 tam hizalama), Kapsamlı Ders Kitabı Teorisi, Kritik Teorem İspatları, Fransızca Akademik Yazım & İspat Kılavuzu (Rédaction) ve 90 Dakikalık Deneme Sınavı.
- **MAT201 — Seriler & Analiz**  
  Diziler, Seriler, Yakınsaklık Kriterleri (Riemann, D'Alembert, Cauchy, Leibniz), Fonksiyon Serileri ve 38 TD Sorusu.
- **FIZ101 — Fizik 1 (Genel Mekanik)**  
  3B Vektörel Analiz, Kinematik, Frenet Tabanı, Dönen Referans Sistemleri, DM-1 ve DM-2 Ayrıntılı Çözümleri.
- **MAT206 — Olasılık & İstatistik**  
  Kombinatorik, Kolmogorov Aksiyomları, Koşullu Olasılık ve Bayes Teoremi Hesaplayıcısı.

---

### Mimari & Teknik Özellikler

- **Vektörel İkonografi**: İşletim sistemi emojilerinden tamamen arındırılmış, temaya duyarlı SVG ikon ve akademik glif sistemi (`js/icons.js`).
- **Modüler JSON Mimarisi**: Ders bazlı dinamik modüler veri yükleme (`data/courses/*.json`); tekil ve hızlı açılış süresi.
- **PWA & Offline Desteği**: Service Worker (`sw.js`) ve web manifest desteği sayesinde KaTeX kütüphanesi, matematiksel fontlar ve ders verileri çevrimdışı önbelleklenir.
- **İnteraktif Soru Bankası**: Sınav odaklı adım adım çözüm akışı, taktik ipuçları ve Fransızca akademik çözüm & ispat notasyonu.
- **Spotlight Arama**: `Cmd + K` (veya `Ctrl + K`) ile tüm teorem, kavram ve sorular arasında anlık tam metin arama.
- **Çapraz Cihaz Senkronizasyonu**: Yıldızlı sorular, çözülen alıştırmalar ve vize ilerlemesi mobil ve masaüstü arasında otomatik eşitlenir.

---

### Canlı Erişim

Portal doğrudan Vercel üzerinde barındırılmaktadır:  
**https://gsu-akademik-portal.vercel.app**

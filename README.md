# BoredGap

BoredGap, çeşitli web tabanlı eğlence platformlarını bir araya getiren interaktif bir web sitesidir. Her platform, kendine özgü eğlence deneyimi sunar ve kullanıcılar ana sayfadan bu platformlara kolayca erişebilir.

## 🎮 Platformlar

### 🤔 This or That
İki seçenek arasında seçim yapmanızı sağlayan, eğlenceli bir karar verme platformu.

### 📍 Locato
Coğrafi bilginizi test eden, harita üzerinde yer tahmin etme oyunu.

### ⭐ Shiny Notes
Yıldızlara notlar yazıp uzaya gönderebileceğiniz ve diğer kullanıcıların yıldızlarındaki notları okuyabileceğiniz bir platform.

## 🚀 Özellikler

### 🔐 Kullanıcı Yönetimi
- **Kayıt ve Giriş Sistemi**
  - Email veya kullanıcı adı ile giriş yapabilme
  - JWT tabanlı kimlik doğrulama
  - Güvenli şifre saklama
  - Oturum yönetimi

- **Profil Sistemi**
  - 12 farklı özelleştirilebilir profil görseli
  - Her profil görseli için özel renk teması
  - Profil bilgilerini görüntüleme
  - Kolay profil resmi değiştirme

### 🎨 Arayüz Özellikleri
- **Modern Tasarım**
  - Koyu tema
  - Responsive tasarım
  - Animasyonlu geçişler
  - Cam efektli (glassmorphism) arayüz öğeleri

- **Header ve Navigasyon**
  - Dinamik kullanıcı menüsü
  - Özelleştirilmiş profil görseli gösterimi
  - Platform seçim menüsü
  - Animasyonlu hover efektleri

### 🛠️ Teknik Özellikler
- **Frontend**
  - React.js
  - TypeScript
  - Material-UI
  - Framer Motion (animasyonlar için)
  - React Router
  - Axios

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication
  - RESTful API

## 📦 Proje Yapısı

```
boredgap/
├── frontend/
│   ├── public/
│   │   ├── images/ # Platform logoları
│   │   │   └── profile-icons/    # Profil görselleri (12 adet)
│   │   └── index.html
│   └── src/
│       ├── components/           # UI bileşenleri
│       │   ├── HeaderLogo.tsx    # Logo bileşeni
│       │   ├── NavigationButton.tsx  # Platform butonları
│       │   ├── PageTransition.tsx    # Sayfa geçiş animasyonları
│       │   └── UserMenu.tsx      # Kullanıcı menüsü
│       ├── pages/               # Platform sayfaları
│       │   ├── ThisOrThat.tsx   # This or That platformu
│       │   ├── Locato.tsx      # Locato platformu
│       │   ├── ShinyNotes.tsx  # Shiny Notes platformu
│       │   ├── Profile.tsx     # Profil sayfası
│       │   ├── Login.tsx       # Giriş sayfası
│       │   └── Register.tsx    # Kayıt sayfası
│       ├── services/            # API servisleri
│       │   └── authService.ts   # Kimlik doğrulama servisi
│       └── styles/              # CSS dosyaları
│           └── Auth.css         # Kimlik doğrulama stilleri
│
└── backend/
    ├── src/
    │   ├── controllers/         # İş mantığı
    │   │   └── userController.ts  # Kullanıcı işlemleri
    │   ├── models/             # Veritabanı modelleri
    │   │   └── User.ts         # Kullanıcı modeli
    │   ├── routes/             # API rotaları
    │   │   └── userRoutes.ts   # Kullanıcı rotaları
    │   └── middleware/         # Ara yazılımlar
    │       └── auth.ts         # Kimlik doğrulama
    └── config/                 # Yapılandırma dosyaları
        └── .env               # Ortam değişkenleri
```

## 🎯 Tamamlanan Özellikler

### Platform Özellikleri
- [x] Ana sayfa tasarımı
- [x] Platform yönlendirmeleri
- [x] Platform butonları ve animasyonları
- [x] Platform logoları

### Kullanıcı Arayüzü
- [x] Koyu tema tasarımı
- [x] Responsive header tasarımı
- [x] Kullanıcı menüsü animasyonları
- [x] Profil sayfası tasarımı
- [x] 12 farklı profil ikonu
- [x] Özel renk temalı profil görselleri
- [x] Animasyonlu buton efektleri

### Kimlik Doğrulama
- [x] Kayıt olma sistemi
- [x] Giriş yapma sistemi (email/kullanıcı adı)
- [x] JWT token yönetimi
- [x] Oturum kontrolü
- [x] Güvenli çıkış yapma

### Profil Yönetimi
- [x] Profil resmi seçme ve değiştirme
- [x] Profil bilgilerini görüntüleme
- [x] Özel renk temalı profil görselleri
- [x] Profil resmi güncelleme

## 🎨 Renk Teması

### Profil Görselleri Renk Şeması
- **Default (Mor)**: `#733d8b`
- **İkon 1 (Bej)**: `#ebd4bd`
- **İkon 2 (Kırmızı)**: `#ee181c`
- **İkon 3 (Mavi)**: `#00cdf7`
- **İkon 4 (Yeşil)**: `#65d046`
- **İkon 5 (Turuncu)**: `#f79e51`
- **İkon 6 (Gri)**: `#c3c4c4`
- **İkon 7 (Kahve)**: `#996b4d`
- **İkon 8 (Pembe)**: `#f3a9b9`
- **İkon 9 (Fuşya)**: `#d31b6c`
- **İkon 10 (Sarı)**: `#fbda3f`
- **İkon 11 (Beyaz)**: `#ffffff`

### Arayüz Renkleri
- **Arka Plan**: Koyu tema (`#121212`)
- **Kart Arka Planı**: Yarı saydam siyah (`rgba(30, 30, 30, 0.95)`)
- **Vurgu Rengi**: Profil görseline göre dinamik
- **Metin Rengi**: Beyaz ve gri tonları

## 🔜 Gelecek Özellikler
- [ ] This or That için arayüz
- [ ] Locato için arayüz
- [ ] Shiny Notes için yıldızlı uzay sistemi ve arayüz
- [ ] Kullanıcı skorları ve sıralamaları
- [ ] Platform başarı rozetleri
- [ ] Arkadaş, takip, beğeni sistemi
- [ ] Çoklu dil desteği

## 🛠️ Kurulum

1. Repoyu klonlayın
```bash
git clone [repo-url]
```

2. Backend bağımlılıklarını yükleyin
```bash
cd backend
npm install
```

3. Frontend bağımlılıklarını yükleyin
```bash
cd frontend
npm install
```

4. Backend'i başlatın
```bash
cd backend
npm run dev
```

5. Frontend'i başlatın
```bash
cd frontend
npm run dev
```

## 🤝 Katkıda Bulunma
1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans
Bu proje MIT lisansı altında lisanslanmıştır. 
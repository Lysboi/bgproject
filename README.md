# BoredGap

BoredGap, çeşitli web tabanlı eğlence platformlarını bir araya getiren interaktif bir web sitesidir. Her platform, kendine özgü eğlence deneyimi sunar ve kullanıcılar ana sayfadan bu platformlara kolayca erişebilir.

## 🎮 Platformlar

### 🤔 This or That
İki seçenek arasında seçim yapmanızı sağlayan, eğlenceli bir karar verme platformu.

### 📍 Locato
Coğrafi bilginizi test eden, harita üzerinde yer tahmin etme oyunu.

### 📝 Shiny Notes
Yıldızlara notlar yazıp uzaya gönderebileceğiniz ve diğer kullanıcıların yıldızlarındaki notları okuyabileceğiniz bir platform.

## 🚀 Özellikler

### 🔐 Kullanıcı Yönetimi
- **Kayıt ve Giriş Sistemi**
  - Email veya kullanıcı adı ile giriş yapabilme
  - JWT tabanlı kimlik doğrulama
  - Güvenli şifre saklama
  - Oturum yönetimi

- **Profil Sistemi**
  - Özelleştirilebilir profil görselleri
  - Her profil görseli için özel renk teması
  - Profil bilgilerini düzenleme
  - Profil resmi seçim dialogu

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
  - Kolay erişilebilir menü öğeleri

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
│   │   └── images/
│   │       └── profile-icons/    # Profil görselleri
│   └── src/
│       ├── components/           # UI bileşenleri
│       ├── pages/               # Platform sayfaları
│       │   ├── ThisOrThat.tsx   # This or That platformu
│       │   ├── Locato.tsx      # Locato platformu
│       │   └── ShinyNotes.tsx  # Shiny Notes platformu
│       ├── services/            # API servisleri
│       └── styles/              # CSS dosyaları
│
└── backend/
    ├── src/
    │   ├── controllers/         # İş mantığı
    │   ├── models/             # Veritabanı modelleri
    │   ├── routes/             # API rotaları
    │   └── middleware/         # Ara yazılımlar
    └── config/                 # Yapılandırma dosyaları
```

## 🎯 Tamamlanan Özellikler

### Platform Özellikleri
- [x] Ana sayfa tasarımı
- [x] Platform yönlendirmeleri
- [x] This or That temel yapısı
- [x] Locato temel yapısı
- [x] Shiny Notes temel yapısı

### Kullanıcı Arayüzü
- [x] Koyu tema tasarımı
- [x] Responsive header tasarımı
- [x] Kullanıcı menüsü animasyonları
- [x] Profil sayfası tasarımı
- [x] Profil resmi seçim dialogu
- [x] Özel renk temalı profil görselleri

### Kimlik Doğrulama
- [x] Kayıt olma sistemi
- [x] Giriş yapma sistemi (email/kullanıcı adı)
- [x] JWT token yönetimi
- [x] Oturum kontrolü
- [x] Güvenli çıkış yapma

### Profil Yönetimi
- [x] Profil resmi seçme
- [x] Profil bilgilerini görüntüleme
- [x] Özel renk temalı profil görselleri
- [x] Profil resmi güncelleme

## 🎨 Renk Teması

### Profil Görselleri Renk Şeması
- **Default (Mor)**: `#733d8b`
- **İkon 1 (Mavi)**: `#6da3c2`
- **İkon 2 (Kırmızı)**: `#b41e22`
- **İkon 3 (Sarı)**: `#f1cb33`
- **İkon 4 (Yeşil)**: `#65d046`

### Arayüz Renkleri
- **Arka Plan**: Koyu tema
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
npm start
```

## 🤝 Katkıda Bulunma
1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans
Bu proje MIT lisansı altında lisanslanmıştır. 
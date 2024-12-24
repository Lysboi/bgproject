import dotenv from 'dotenv';
// Ortam değişkenlerini en başta yükle
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import battleRoutes from './routes/battleRoutes';

// Express uygulamasını oluştur
const app = express();

// Middleware'leri ayarla
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosyaları sunmak için public klasörünü ayarla
app.use('/api/uploads', express.static('public/uploads'));

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Rotaları ayarla
app.use('/api/users', userRoutes);
app.use('/api/battles', battleRoutes);

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
  console.log('Cloudinary yapılandırması:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: '***'
  });
}); 
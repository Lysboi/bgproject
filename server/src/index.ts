import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';

// Çevre değişkenlerini yükle
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('MongoDB\'ye başarıyla bağlanıldı');
  })
  .catch((error) => {
    console.error('MongoDB bağlantı hatası:', error);
  });

// Route'ları ekle
app.use('/api/users', userRoutes);

// Ana route
app.get('/', (req, res) => {
  res.json({ message: 'BoredGap API çalışıyor' });
});

// Hata yakalama middleware'i
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Sunucu hatası',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Bir hata oluştu'
  });
});

// 404 yakalama
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Sayfa bulunamadı' });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
}); 
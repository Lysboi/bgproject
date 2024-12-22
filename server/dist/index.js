"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// Çevre değişkenlerini yükle
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MongoDB bağlantısı
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => {
    console.log('MongoDB\'ye başarıyla bağlanıldı');
})
    .catch((error) => {
    console.error('MongoDB bağlantı hatası:', error);
});
// Route'ları ekle
app.use('/api/users', userRoutes_1.default);
// Ana route
app.get('/', (req, res) => {
    res.json({ message: 'BoredGap API çalışıyor' });
});
// Hata yakalama middleware'i
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Sunucu hatası',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Bir hata oluştu'
    });
});
// 404 yakalama
app.use((req, res) => {
    res.status(404).json({ message: 'Sayfa bulunamadı' });
});
// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});

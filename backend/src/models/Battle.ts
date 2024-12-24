import mongoose, { Document } from 'mongoose';

export interface IBattle extends Document {
  title: string;
  category: string;
  creator: mongoose.Types.ObjectId;
  coverImage: string;
  playCount: number;
  options: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const battleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Başlık zorunludur'],
    trim: true,
    maxlength: [100, 'Başlık 100 karakterden uzun olamaz']
  },
  category: {
    type: String,
    required: [true, 'Kategori zorunludur'],
    enum: [
      'Yemek', 'Anime', 'Spor', 'Oyun', 'Eğlence',
      'Müzik', 'Film', 'Hayvan', 'Bilim', 'Yaşam',
      'Moda', 'Doğa', 'Teknoloji', 'Alışveriş', 'İş',
      'Para', 'Tarih', 'Siyaset', 'Diğer'
    ]
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Oluşturucu kullanıcı zorunludur']
  },
  coverImage: {
    type: String,
    required: [true, 'Kapak görseli zorunludur']
  },
  playCount: {
    type: Number,
    default: 0
  },
  options: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BattleOption'
  }]
}, {
  timestamps: true
});

// Kapışma silindiğinde ilgili seçenekleri de sil
battleSchema.pre('deleteOne', { document: true, query: false }, async function() {
  await this.model('BattleOption').deleteMany({ battle: this._id });
});

export default mongoose.model<IBattle>('Battle', battleSchema); 
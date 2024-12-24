import mongoose, { Document } from 'mongoose';

export interface IBattleOption extends Document {
  battle: mongoose.Types.ObjectId;
  title: string;
  image: string;
  selectCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const battleOptionSchema = new mongoose.Schema({
  battle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Battle',
    required: [true, 'Kapışma ID\'si zorunludur']
  },
  title: {
    type: String,
    required: [true, 'Başlık zorunludur'],
    trim: true,
    maxlength: [50, 'Başlık 50 karakterden uzun olamaz']
  },
  image: {
    type: String,
    required: [true, 'Görsel zorunludur']
  },
  selectCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Seçilme oranını hesaplama
battleOptionSchema.methods.getSelectionRate = async function(): Promise<number> {
  const battle = await this.model('Battle').findById(this.battle);
  if (!battle || battle.playCount === 0) return 0;
  
  return (this.selectCount / battle.playCount) * 100;
};

export default mongoose.model<IBattleOption>('BattleOption', battleOptionSchema); 
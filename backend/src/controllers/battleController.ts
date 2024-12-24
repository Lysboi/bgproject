import { Request, Response } from 'express';
import Battle from '../models/Battle';
import BattleOption from '../models/BattleOption';
import { uploadImage, deleteImage } from '../config/cloudinary';

// Yeni kapışma oluşturma
export const createBattle = async (req: Request, res: Response) => {
  try {
    console.log('Create battle request:', {
      body: req.body,
      files: req.files,
      user: req.user
    });

    const { title, category } = req.body;
    let options;
    
    try {
      options = typeof req.body.options === 'string' 
        ? JSON.parse(req.body.options) 
        : req.body.options;
    } catch (error) {
      console.error('Options parsing error:', error);
      return res.status(400).json({
        success: false,
        message: 'Seçenekler geçerli bir JSON formatında değil'
      });
    }

    if (!req.files) {
      console.error('No files uploaded');
      return res.status(400).json({
        success: false,
        message: 'Görseller yüklenemedi'
      });
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    console.log('Uploaded files:', files);

    try {
      // Kapak görseli yükleme
      console.log('Uploading cover image...');
      const coverImageUrl = await uploadImage(files.coverImage[0], 'covers');
      console.log('Cover image uploaded:', coverImageUrl);

      // Kapışmayı oluştur
      console.log('Creating battle...');
      const battle = await Battle.create({
        title,
        category,
        coverImage: coverImageUrl,
        creator: req.user?.id
      });
      console.log('Battle created:', battle);

      // Seçenekleri oluştur
      console.log('Creating options...');
      const optionPromises = options.map(async (option: { title: string }, index: number) => {
        const imageUrl = await uploadImage(files.optionImages[index], 'options');
        return BattleOption.create({
          battle: battle._id,
          title: option.title,
          image: imageUrl
        });
      });

      const createdOptions = await Promise.all(optionPromises);
      console.log('Options created:', createdOptions);
      
      // Kapışmaya seçenek ID'lerini ekle
      battle.options = createdOptions.map(option => option._id);
      await battle.save();
      console.log('Battle updated with options');

      res.status(201).json({
        success: true,
        data: battle
      });
    } catch (error: any) {
      console.error('Battle creation error:', error);
      // Hata durumunda yüklenen görselleri temizle
      if (files.coverImage?.[0]) {
        try {
          const coverImagePublicId = files.coverImage[0].filename;
          await deleteImage(coverImagePublicId);
        } catch (err) {
          console.error('Kapak görseli silinirken hata:', err);
        }
      }

      if (files.optionImages) {
        for (const file of files.optionImages) {
          try {
            const imagePublicId = file.filename;
            await deleteImage(imagePublicId);
          } catch (err) {
            console.error('Seçenek görseli silinirken hata:', err);
          }
        }
      }

      throw error;
    }
  } catch (error: any) {
    console.error('Create battle error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Tüm kapışmaları getirme (filtreleme ve sıralama ile)
export const getBattles = async (req: Request, res: Response) => {
  try {
    const { category, sort = '-createdAt' } = req.query;
    const query: any = {};

    // Kategori filtresi
    if (category) {
      query.category = category;
    }

    const battles = await Battle.find(query)
      .sort(sort as string)
      .populate('creator', 'username profileImage')
      .populate('options');

    res.status(200).json({
      success: true,
      count: battles.length,
      data: battles
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Tek bir kapışmayı getirme
export const getBattle = async (req: Request, res: Response) => {
  try {
    const battle = await Battle.findById(req.params.id)
      .populate('creator', 'username profileImage')
      .populate('options');

    if (!battle) {
      return res.status(404).json({
        success: false,
        message: 'Kapışma bulunamadı'
      });
    }

    res.status(200).json({
      success: true,
      data: battle
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Kapışmaya oy verme
export const voteBattle = async (req: Request, res: Response) => {
  try {
    const { optionId } = req.body;
    const battleId = req.params.id;

    // Seçeneği ve kapışmayı bul
    const option = await BattleOption.findById(optionId);
    const battle = await Battle.findById(battleId);

    if (!option || !battle) {
      return res.status(404).json({
        success: false,
        message: 'Kapışma veya seçenek bulunamadı'
      });
    }

    // Oyları güncelle
    option.selectCount += 1;
    battle.playCount += 1;

    await Promise.all([option.save(), battle.save()]);

    res.status(200).json({
      success: true,
      message: 'Oyunuz başarıyla kaydedildi'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Kapışmayı silme
export const deleteBattle = async (req: Request, res: Response) => {
  try {
    const battle = await Battle.findById(req.params.id)
      .populate('options');

    if (!battle) {
      return res.status(404).json({
        success: false,
        message: 'Kapışma bulunamadı'
      });
    }

    // Sadece oluşturan kullanıcı silebilir
    if (battle.creator.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    // Cloudinary'den görselleri sil
    try {
      // Kapak görselini sil
      const coverImagePublicId = battle.coverImage.split('/').slice(-2)[0];
      if (coverImagePublicId) {
        await deleteImage(`thisorthat/covers/${coverImagePublicId}`);
      }

      // Seçenek görsellerini sil
      for (const option of battle.options) {
        const optionImagePublicId = (option as any).image.split('/').slice(-2)[0];
        if (optionImagePublicId) {
          await deleteImage(`thisorthat/options/${optionImagePublicId}`);
        }
      }
    } catch (error) {
      console.error('Görsel silme hatası:', error);
    }

    // İlgili seçenekleri ve kapışmayı sil
    await BattleOption.deleteMany({ battle: battle._id });
    await battle.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Kapışma başarıyla silindi'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}; 
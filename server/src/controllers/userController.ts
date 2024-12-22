import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { generateToken } from '../middleware/auth';

// Kullanıcı kaydı
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Kullanıcı adı veya email kontrolü
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Bu kullanıcı adı veya email zaten kullanılıyor'
      });
    }

    // Yeni kullanıcı oluştur
    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    // Token oluştur
    const token = generateToken(user._id.toString());

    res.status(201).json({
      message: 'Kayıt başarılı',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Kayıt sırasında bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
};

// Kullanıcı girişi
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Geçersiz email veya şifre'
      });
    }

    // Şifreyi kontrol et
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Geçersiz email veya şifre'
      });
    }

    // Token oluştur
    const token = generateToken(user._id.toString());

    res.json({
      message: 'Giriş başarılı',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Giriş sırasında bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
}; 
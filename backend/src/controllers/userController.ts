import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// JWT gizli anahtarını al
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('JWT_SECRET is not defined in environment variables!');
  process.exit(1);
}

// Token oluşturma fonksiyonu
const generateToken = (id: string) => {
  console.log('Generating token for user:', id);
  console.log('Using JWT_SECRET:', JWT_SECRET);
  
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d'
  });
  
  console.log('Generated token:', token);
  return token;
};

// Kayıt olma
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Kullanıcı adı veya email kontrolü
    const userExists = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Bu kullanıcı adı veya email zaten kullanılıyor'
      });
    }

    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Kullanıcıyı oluştur
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Token oluştur
    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Giriş yapma
export const login = async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({
      $or: [
        { email: emailOrUsername },
        { username: emailOrUsername }
      ]
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Kullanıcı adı/email veya şifre hatalı'
      });
    }

    // Şifreyi kontrol et
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Kullanıcı adı/email veya şifre hatalı'
      });
    }

    // Token oluştur
    const token = generateToken(user._id.toString());

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Kullanıcı bilgilerini getirme
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı',
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Bir hata oluştu',
    });
  }
};

// Profil resmini güncelleme
export const updateProfileImage = async (req: Request, res: Response) => {
  try {
    const { profileImage } = req.body;
    const userId = req.user?.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı',
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Bir hata oluştu',
    });
  }
}; 
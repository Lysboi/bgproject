import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// JWT token oluşturma
const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Kayıt olma
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Kullanıcı kontrolü
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Bu email veya kullanıcı adı zaten kullanılıyor',
      });
    }

    // Yeni kullanıcı oluşturma
    const user: IUser = await User.create({
      username,
      email,
      password,
    });

    // Token oluşturma
    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Bir hata oluştu',
    });
  }
};

// Giriş yapma
export const login = async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Kullanıcı kontrolü (email veya username ile)
    const user: IUser | null = await User.findOne({
      $or: [
        { email: emailOrUsername },
        { username: emailOrUsername }
      ]
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz kullanıcı adı/email veya şifre',
      });
    }

    // Şifre kontrolü
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz kullanıcı adı/email veya şifre',
      });
    }

    // Token oluşturma
    const token = generateToken(user._id.toString());

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Bir hata oluştu',
    });
  }
};

// Kullanıcı bilgilerini getirme
export const getMe = async (req: Request, res: Response) => {
  try {
    const user: IUser | null = await User.findById(req.user?.id).select('-password');
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
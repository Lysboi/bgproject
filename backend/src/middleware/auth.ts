import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// JWT gizli anahtarını al
const JWT_SECRET = process.env.JWT_SECRET;

console.log('JWT_SECRET:', JWT_SECRET); // Gizli anahtarı kontrol et

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    console.log('Authorization header:', req.headers.authorization);

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('Extracted token:', token);
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Yetkilendirme token\'ı bulunamadı',
      });
    }

    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not defined!');
      return res.status(500).json({
        success: false,
        message: 'Sunucu yapılandırma hatası',
      });
    }

    try {
      // Token doğrulama
      console.log('Verifying token with JWT_SECRET:', JWT_SECRET);
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      console.log('Decoded token:', decoded);

      // Kullanıcı kontrolü
      const user = await User.findById(decoded.id).select('-password');
      console.log('Found user:', user);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Geçersiz token - Kullanıcı bulunamadı',
        });
      }

      req.user = {
        id: user._id.toString(),
      };

      next();
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      return res.status(401).json({
        success: false,
        message: 'Geçersiz token - Doğrulama hatası',
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Yetkilendirme başarısız',
    });
  }
}; 
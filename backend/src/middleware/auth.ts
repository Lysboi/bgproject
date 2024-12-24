import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Yetkilendirme token\'ı bulunamadı',
      });
    }

    // Token doğrulama
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Kullanıcı kontrolü
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz token',
      });
    }

    req.user = {
      id: user._id.toString(),
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Yetkilendirme başarısız',
    });
  }
}; 
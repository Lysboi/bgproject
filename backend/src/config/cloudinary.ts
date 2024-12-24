import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Cloudinary yapılandırması
const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
};

console.log('Cloudinary yapılandırması (cloudinary.ts):', {
  cloud_name: cloudinaryConfig.cloud_name,
  api_key: cloudinaryConfig.api_key,
  api_secret: '***'
});

cloudinary.config(cloudinaryConfig);

// Görsel yükleme fonksiyonu
export const uploadImage = async (file: Express.Multer.File, folder: string) => {
  try {
    console.log('Uploading image to Cloudinary:', {
      path: file.path,
      folder: `thisorthat/${folder}`
    });

    const result = await cloudinary.uploader.upload(file.path, {
      folder: `thisorthat/${folder}`,
      resource_type: 'auto'
    });

    console.log('Cloudinary upload result:', result);
    return result.secure_url;
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Görsel yüklenirken hata oluştu: ${error.message}`);
  }
};

// Görsel silme fonksiyonu
export const deleteImage = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error: any) {
    throw new Error(`Görsel silinirken hata oluştu: ${error.message}`);
  }
};

// Cloudinary depolama yapılandırması
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'thisorthat',
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
    format: 'jpg'
  } as any
});

// Multer yükleyici
export const upload = multer({ storage: storage }); 
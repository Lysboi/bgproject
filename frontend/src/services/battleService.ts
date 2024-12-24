import axios from 'axios';
import { getToken } from './authService';

// API URL'ini tanımla
const API_URL = 'http://localhost:5000/api/battles';

// Kapışma tipi
export interface Battle {
  _id: string;
  title: string;
  category: string;
  creator: {
    _id: string;
    username: string;
    profileImage: string;
  };
  coverImage: string;
  playCount: number;
  createdAt: string;
  options: Array<{
    _id: string;
    title: string;
    image: string;
    selectCount: number;
  }>;
}

// Tüm kapışmaları getir
export const getBattles = async (category?: string, sort: string = '-createdAt'): Promise<Battle[]> => {
  try {
    let url = API_URL;
    const params = new URLSearchParams();
    
    if (category) {
      params.append('category', category);
    }
    if (sort) {
      params.append('sort', sort);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await axios.get(url);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Kapışmalar yüklenirken bir hata oluştu');
  }
};

// Tek bir kapışmayı getir
export const getBattle = async (id: string): Promise<Battle> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Kapışma yüklenirken bir hata oluştu');
  }
};

// Yeni kapışma oluştur
export const createBattle = async (battleData: {
  title: string;
  category: string;
  coverImage: string;
  options: Array<{ title: string; image: string; }>;
}): Promise<Battle> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Oturum süresi dolmuş. Lütfen tekrar giriş yapın.');
    }

    console.log('Token:', token);

    // FormData oluştur
    const formData = new FormData();
    formData.append('title', battleData.title);
    formData.append('category', battleData.category);

    // Base64'ten dosyaya çevir
    const coverImageBlob = await fetch(battleData.coverImage).then(r => r.blob());
    formData.append('coverImage', coverImageBlob, 'cover.jpg');

    // Seçenekleri ekle
    formData.append('options', JSON.stringify(battleData.options.map(opt => ({ title: opt.title }))));

    // Seçenek görsellerini ekle
    for (let i = 0; i < battleData.options.length; i++) {
      const imageBlob = await fetch(battleData.options[i].image).then(r => r.blob());
      formData.append('optionImages', imageBlob, `option${i}.jpg`);
    }

    console.log('FormData içeriği:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data;
  } catch (error: any) {
    console.error('Create battle error:', error);
    console.error('Error response:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Kapışma oluşturulurken bir hata oluştu');
  }
};

// Kapışmaya oy ver
export const voteBattle = async (battleId: string, optionId: string): Promise<void> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Oturum süresi dolmuş. Lütfen tekrar giriş yapın.');
    }

    await axios.post(`${API_URL}/${battleId}/vote`, 
      { optionId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Oy verilirken bir hata oluştu');
  }
};

// Kapışmayı sil
export const deleteBattle = async (battleId: string): Promise<void> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Oturum süresi dolmuş. Lütfen tekrar giriş yapın.');
    }

    await axios.delete(`${API_URL}/${battleId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Kapışma silinirken bir hata oluştu');
  }
}; 
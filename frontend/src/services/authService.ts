import axios from 'axios';

// API URL'ini tanımla
const API_URL = 'http://localhost:5000/api/users';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  emailOrUsername: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

// Kayıt olma
export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data.success) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Giriş yapma
export const login = async (userData: LoginData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data.success) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Çıkış yapma
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Kullanıcı bilgilerini getirme
export const getCurrentUser = (): any => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

// Token kontrolü
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Profil resmini güncelleme
export const updateProfileImage = async (profileImage: string): Promise<any> => {
  const token = getToken();
  
  if (!token) {
    throw new Error('Oturum süresi dolmuş. Lütfen tekrar giriş yapın.');
  }

  try {
    const response = await axios.put(
      `${API_URL}/profile-image`,
      { profileImage },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    if (response.data.success) {
      const currentUser = getCurrentUser();
      const updatedUser = { ...currentUser, profileImage };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      // Token geçersiz veya süresi dolmuş
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw new Error('Oturum süresi dolmuş. Lütfen tekrar giriş yapın.');
    }
    throw error;
  }
}; 
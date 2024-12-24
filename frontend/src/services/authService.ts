import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api/users'  // Production'da aynı domain'den servis edileceği için
  : 'http://localhost:5001/api/users'; // Development ortamında yeni port

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
}; 
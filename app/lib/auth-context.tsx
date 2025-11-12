'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/app/types/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  rememberMe: boolean;
  login: (user: User, rememberMe?: boolean) => void;
  logout: () => Promise<void>;
  updateProfile: (updatedUser: User) => void; // ⭐ เพิ่มฟังก์ชันอัปเดต
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const login = (userData: User, remember: boolean = false) => {
    setUser(userData);
    setRememberMe(remember);
  };

  // ⭐ ฟังก์ชันอัปเดตข้อมูล user
  const updateProfile = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setRememberMe(false);
      window.location.href = '/user/signin';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // ⭐ ตรวจสอบสถานะ auth เมื่อ app โหลด
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setRememberMe(data.rememberMe || false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      rememberMe, 
      login, 
      logout, 
      updateProfile // ⭐ เพิ่มฟังก์ชันใน context
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

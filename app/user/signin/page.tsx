// app/user/signin/page.tsx
'use client';
import React, { useState } from 'react';
import { FloatingInput } from '@/app/function/FloatingInput';
import { useAuth } from '@/app/lib/auth-context';
import { useAuthRedirect } from '@/app/hooks/useAuthRedirect';
import Link from 'next/link';

export default function Signin() {
  const { login } = useAuth();
  const { loading: authLoading } = useAuthRedirect();
  
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.emailOrPhone, formData.password);
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof typeof formData) => (value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl text-gray-900 mb-4">
            ลงชื่อเข้าใช้เพื่อชำระเงินได้รวดเร็วกว่า
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center gap-6">
            <h2 className="text-2xl font-bold text-gray-500">
              ลงชื่อเข้าใช้ Apple Store
            </h2>

            {error && (
              <div className="w-full max-w-sm bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="w-full max-w-sm space-y-6">
              <FloatingInput
                id="emailOrPhone"
                label="อีเมลหรือเบอร์โทรศัพท์"
                type="text"
                value={formData.emailOrPhone}
                onChange={updateField('emailOrPhone')}
                required
                autoComplete="username"
              />

              <FloatingInput
                id="password"
                label="รหัสผ่าน"
                type="password"
                value={formData.password}
                onChange={updateField('password')}
                required
                autoComplete="current-password"
              />

              <div className="flex items-center gap-3 mt-4">
                <input
                  type="checkbox"
                  id="remember"
                  checked={formData.rememberMe}
                  onChange={(e) => updateField('rememberMe')(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  จดจำการลงชื่อเข้าใช้
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium text-base mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    กำลังเข้าสู่ระบบ...
                  </div>
                ) : (
                  'ลงชื่อเข้าใช้'
                )}
              </button>
            </div>

            <div className="text-center space-y-3">
              <div>
                <Link
                  href="/user/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                >
                  ลืมรหัสผ่านใช่หรือไม่?
                </Link>
              </div>
              <div className="text-sm text-gray-600">
                ยังไม่มีบัญชี?{' '}
                <Link
                  href="/user/signup"
                  className="text-blue-600 hover:text-blue-500 transition-colors"
                >
                  สร้างบัญชีใหม่
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
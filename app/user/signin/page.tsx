'use client';
import React, { useState } from 'react';
import { FloatingInput } from '@/app/function/FloatingInput'; // adjust path as needed
import Link from 'next/link';

export default function Signin() {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const updateField = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="min-h-screen  py-12 px-4">
      {/* Header อยู่ด้านนอก - ซ้ายสุด
       */}
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
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  จดจำการลงชื่อเข้าใช้
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium text-base mt-6"
              >
                ลงชื่อเข้าใช้
              </button>
            </div>

            <div className="text-center space-y-3">
              <div>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                >
                  ลืมรหัสผ่านใช่หรือไม่?
                </a>
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

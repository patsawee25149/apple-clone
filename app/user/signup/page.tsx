// app/user/signup/page.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaApple } from 'react-icons/fa';
import { FloatingInput } from '@/app/function/FloatingInput';
import { FloatingSelect } from '@/app/function/FloatingSelect';
import { countries } from '@/app/data/countries';
import { dates, months, years } from '@/app/data/date';
import { useAuth } from '@/app/lib/auth-context';
import { useAuthRedirect } from '@/app/hooks/useAuthRedirect';

export default function SignUp() {
  const { signup } = useAuth();
  const { loading: authLoading } = useAuthRedirect();
  
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    country: 'TH',
    dates: '',
    months: '',
    years: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    if (formData.password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }

    if (!formData.dates || !formData.months || !formData.years) {
      setError('กรุณาเลือกวันเกิดให้ครบถ้วน');
      return;
    }

    setLoading(true);

    try {
      await signup({
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        country: formData.country,
        dates: formData.dates,
        months: formData.months,
        years: formData.years,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
      } else {
        setError('เกิดข้อผิดพลาดในการสมัครสมาชิก');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    <div className="min-h-screen flex justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-10 text-center text-3xl font-extrabold text-gray-700">
            สร้างบัญชี Apple ของคุณ
          </h2>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* ชื่อและนามสกุล */}
          <div className="flex space-x-4">
            <FloatingInput
              id="name"
              label="ชื่อ"
              type="text"
              value={formData.name}
              onChange={updateField('name')}
              required
              autoComplete="given-name"
              className="flex-1"
            />

            <FloatingInput
              id="lastname"
              label="นามสกุล"
              type="text"
              value={formData.lastname}
              onChange={updateField('lastname')}
              required
              autoComplete="family-name"
              className="flex-1"
            />
          </div>

          {/* ประเทศ */}
          <FloatingSelect
            id="country"
            label="ประเทศ/ภูมิภาค"
            value={formData.country}
            onChange={updateField('country')}
            options={countries}
            required
          />

          {/* วันเกิด */}
          <div className="grid grid-cols-3 gap-4">
            <FloatingSelect
              id="dates"
              label="วัน"
              options={dates}
              value={formData.dates}
              onChange={updateField('dates')}
              required
            />

            <FloatingSelect
              id="months"
              label="เดือน"
              options={months}
              value={formData.months}
              onChange={updateField('months')}
              required
            />

            <FloatingSelect
              id="years"
              label="ปี"
              options={years}
              value={formData.years}
              onChange={updateField('years')}
              required
            />
          </div>

          {/* อีเมล */}
          <FloatingInput
            id="email"
            label="อีเมล"
            type="email"
            value={formData.email}
            onChange={updateField('email')}
            required
            autoComplete="email"
          />

          {/* เบอร์โทรศัพท์ */}
          <FloatingInput
            id="phone"
            label="เบอร์โทรศัพท์ (ไม่จำเป็น)"
            type="tel"
            value={formData.phone}
            onChange={updateField('phone')}
            autoComplete="tel"
          />

          {/* รหัสผ่าน */}
          <FloatingInput
            id="password"
            label="รหัสผ่าน"
            type="password"
            value={formData.password}
            onChange={updateField('password')}
            required
            autoComplete="new-password"
          />

          {/* ยืนยันรหัสผ่าน */}
          <FloatingInput
            id="confirmPassword"
            label="ยืนยันรหัสผ่าน"
            type="password"
            value={formData.confirmPassword}
            onChange={updateField('confirmPassword')}
            required
            autoComplete="new-password"
          />

          {/* ปุ่มสมัครสมาชิก */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                กำลังสร้างบัญชี...
              </div>
            ) : (
              'สร้างบัญชี'
            )}
          </button>

          {/* ลงชื่อเข้าใช้ด้วย Apple */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <FaApple className="text-2xl text-gray-700" />
            <span className="text-gray-600">หรือสร้างบัญชีด้วย Apple</span>
          </div>

          {/* ข้อกำหนดและเงื่อนไข */}
          <div className="text-sm text-center text-gray-500 mt-4">
            การสร้างบัญชีแสดงว่าคุณยอมรับ{' '}
            <Link
              href="/terms"
              className="text-indigo-600 hover:text-indigo-500 underline"
            >
              ข้อกำหนดการให้บริการ
            </Link>{' '}
            และ{' '}
            <Link
              href="/privacy"
              className="text-indigo-600 hover:text-indigo-500 underline"
            >
              นโยบายความเป็นส่วนตัว
            </Link>
          </div>

          {/* ลิงก์ไปหน้า Sign In */}
          <div className="text-center mt-6">
            <span className="text-gray-600">มีบัญชีอยู่แล้ว? </span>
            <Link
              href="/user/signin"
              className="text-indigo-600 hover:text-indigo-500 font-medium underline"
            >
              ลงชื่อเข้าใช้
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
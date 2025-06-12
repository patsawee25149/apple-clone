'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaApple } from 'react-icons/fa';
import { FloatingInput } from '@/app/function/FloatingInput';
import { FloatingSelect } from '@/app/function/FloatingSelect';
import { countries } from '@/app/data/countries';
import { dates, months, years } from '@/app/data/date'; // adjust path as needed
// adjust path as needed

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    country: 'ประเทศไทย',
    dates: '',
    months : '',
    years: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [error, setError] = useState('');
  

  // ข

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          lastname: formData.lastname,
          country: formData.country,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          dates: formData.dates,
          months: formData.months,
          years: formData.years,
          birthday: `${formData.dates}-${formData.months}-${formData.years}`,
        }),
      });

      if (response.ok) {
        router.push('/user/signin');
      } else {
        const data = await response.json();
        console.error('Signup error:', data);
        setError(data.message || 'เกิดข้อผิดพลาด');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('ไม่สามารถสร้างบัญชีได้');
    }
  };

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
            <div className="text-red-500 text-center text-sm bg-red-50 p-3 rounded-lg">
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
              onChange={(value) => setFormData({ ...formData, name: value })}
              required
              autoComplete="given-name"
              className="flex-1"
            />

            <FloatingInput
              id="lastname"
              label="นามสกุล"
              type="text"
              value={formData.lastname}
              onChange={(value) =>
                setFormData({ ...formData, lastname: value })
              }
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
            onChange={(value) => setFormData({ ...formData, country: value })}
            options={countries}
            required
          />

          {/* วันเกิด */}

          <div className="grid grid-cols-3 space-y-4 gap-4 sm:space-y-0 sm:flex-row sm:space-x-4">
            <FloatingSelect
              id="dates"
              label="วัน"
              options={dates}
              value={formData.dates}
              onChange={(value) =>
                setFormData({ ...formData, dates: value })
              }
              required
            />

            <FloatingSelect
              id="months"
              label="เดือน"
              options={months}
              value={formData.months}
              onChange={(value) =>
                setFormData({ ...formData, months: value })
              }
              required
            />

            <FloatingSelect
              id="years"
              label="ปี"
              options={years}
              value={formData.years}
              onChange={(value) =>
                setFormData({ ...formData, years: value })
              }
              required
            />
          </div>

          {/* อีเมล */}
          <FloatingInput
            id="email"
            label="อีเมลหรือเบอร์โทรศัพท์"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            required
            autoComplete="email"
          />

          {/* เบอร์โทรศัพท์ */}
          <FloatingInput
            id="phone"
            label="เบอร์โทรศัพท์"
            type="tel"
            value={formData.phone}
            onChange={(value) => setFormData({ ...formData, phone: value })}
            autoComplete="tel"
          />

          {/* รหัสผ่าน */}
          <FloatingInput
            id="password"
            label="รหัสผ่าน"
            type="password"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
            required
            autoComplete="new-password"
          />

          {/* ยืนยันรหัสผ่าน */}
          <FloatingInput
            id="confirmPassword"
            label="ยืนยันรหัสผ่าน"
            type="password"
            value={formData.confirmPassword}
            onChange={(value) =>
              setFormData({ ...formData, confirmPassword: value })
            }
            required
            autoComplete="new-password"
          />

          {/* ปุ่มสมัครสมาชิก */}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            สร้างบัญชี
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

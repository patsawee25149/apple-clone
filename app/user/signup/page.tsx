'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// adjust path as needed
import { FaApple } from 'react-icons/fa';
import { FloatingInput } from '@/app/context/FloatingInput';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    country: '',
    birthday: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      setError('Passwords do not match');
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
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        router.push('/login');
      } else {
        const data = await response.json();
        console.error('Signup error:', data);
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full ">
        <div>
          <h2 className="mt-10 text-center text-3xl font-extrabold text-gray-700">
            สร้างบัญชี Apple ของคุณ
          </h2>
        </div>
        <form
          className="space-y-8 justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="mt-10 flex flex-col-2 w-full space-y-6 space-x-4">
            <FloatingInput
              id="name"
              label="ชื่อ"
              type="text"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              required
              autoComplete="name"
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
              autoComplete="lastname"
            />
          </div>
          <select
            className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg text-base bg-transparent outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 peer floating-input"
            id=""
            value={formData.country}
          >
            ประเทศ/ภูมิภาค
          </select>
        </form>
        <form
          className="space-y-10 justify-center items-center"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}
          <div className="w-full space-y-6">
            <FloatingInput
              id="email"
              label="อีเมลหรือเบอร์โทรศัพท์"
              type="text"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              required
              autoComplete="email"
            />

            <FloatingInput
              id="password"
              label="รหัสผ่าน"
              type="password"
              value={formData.password}
              onChange={(value) =>
                setFormData({ ...formData, password: value })
              }
              required
              autoComplete="current-password"
            />

            <FloatingInput
              id="confirmPassword"
              label="ยืนยันรหัสผ่าน"
              type="password"
              value={formData.confirmPassword}
              onChange={(value) =>
                setFormData({ ...formData, confirmPassword: value })
              }
              required
              autoComplete="current-password"
            />

            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>

            <div className="text-sm text-center"></div>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <FaApple className="text-2xl text-gray-700" />
              <span className="text-gray-600">or sign up with Apple</span>
            </div>
            <div className="text-sm text-center text-gray-500 mt-4">
              By signing up, you agree to our{' '}
              <Link
                href="/terms"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

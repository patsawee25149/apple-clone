'use client';
import React from 'react';
import { useAuth } from '@/app/lib/auth-context';
import { useRequireAuth } from '@/app/hooks/useRequireAuth';

export default function Profile() {
  const { user } = useAuth();
  const { loading } = useRequireAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will be redirected by middleware
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-6 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              โปรไฟล์ของฉัน
            </h1>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ชื่อ
                </label>
                <div className="mt-1 text-sm text-gray-900">
                  {user.name}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  นามสกุล
                </label>
                <div className="mt-1 text-sm text-gray-900">
                  {user.lastname}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  อีเมล
                </label>
                <div className="mt-1 text-sm text-gray-900">
                  {user.email}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ประเทศ
                </label>
                <div className="mt-1 text-sm text-gray-900">
                  {user.country}
                </div>
              </div>
              
              {user.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    เบอร์โทรศัพท์
                  </label>
                  <div className="mt-1 text-sm text-gray-900">
                    {user.phone}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                แก้ไขข้อมูล
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors">
                เปลี่ยนรหัสผ่าน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
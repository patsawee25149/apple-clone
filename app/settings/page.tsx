'use client';
import React from 'react';
import { useAuth } from '@/app/lib/auth-context';
import { useRequireAuth } from '@/app/hooks/useRequireAuth';

export default function Settings() {
  const { user, logout } = useAuth();
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

  const handleLogout = async () => {
    if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
      await logout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-6 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              ตั้งค่าบัญชี
            </h1>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  ข้อมูลส่วนตัว
                </h2>
                <div className="space-y-4">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    แก้ไขข้อมูลส่วนตัว
                  </button>
                  <br />
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    เปลี่ยนรหัสผ่าน
                  </button>
                  <br />
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    เปลี่ยนอีเมล
                  </button>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  การแจ้งเตือน
                </h2>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    รับการแจ้งเตือนทางอีเมล
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    รับข่าวสารและโปรโมชั่น
                  </label>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  ความปลอดภัย
                </h2>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
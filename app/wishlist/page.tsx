'use client';
import React from 'react';
import { useAuth } from '@/app/lib/auth-context';
import { useRequireAuth } from '@/app/hooks/useRequireAuth';

export default function Wishlist() {
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
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-6 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              รายการโปรด
            </h1>
            
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                คุณยังไม่มีรายการโปรด
              </div>
              <div className="text-sm text-gray-400 mt-2">
                เพิ่มสินค้าที่คุณชอบเข้ามาในรายการโปรด
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

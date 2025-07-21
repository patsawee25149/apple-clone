'use client';
import React, { useState } from 'react';
import DropdownMenu from './dropdown';
import { useMenu } from '../function/MenuContext';
import Link from 'next/link';
import { GrShop } from 'react-icons/gr';
import { CiSearch } from 'react-icons/ci';
import { GoArrowRight } from 'react-icons/go';
import { FiBox } from 'react-icons/fi';
import { VscHeart } from 'react-icons/vsc';
import { CiSettings } from 'react-icons/ci';
import { FiUser } from 'react-icons/fi';
import { HiMenu } from 'react-icons/hi';

export default function Header() {
  const { activeMenu, setActiveMenu } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="w-full z-50 relative bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop and Tablet Header */}
        <div className="flex items-center justify-between py-3 sm:py-4 lg:py-5">
          {/* Logo */}
          <Link href="/" className="text-lg sm:text-xl lg:text-2xl font-bold">
            MyStore
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex space-x-4 xl:space-x-8">
            <DropdownMenu
              id="iphone"
              label="iPhone"
              header={[
                { label: 'ดูข้อมูล iPhone' },
                { label: 'เลือกซื้อ iPhone' },
                { label: 'อีกมากมายจาก iPhone' },
              ]}
              rows1={[
                { label: 'ดูข้อมูล iPhone ทั้งหมด', href: '/iphone' },
                { label: 'iPhone 16', href: '/iphone-16' },
                { label: 'iPhone 16 Pro', href: '/iphone-16-pro' },
                { label: 'iPhone 16 Pro Max', href: '/iphone-16-pro-max' },
                { label: 'iPhone 16 Plus', href: '/iphone-16-plus' },
              ]}
              rows2={[
                { label: 'เลือกซื้อ iPhone', href: '/iphone' },
                { label: 'อุปกรณ์เสริม iPhone', href: '/iphone/accessories' },
              ]}
              rows3={[
                {
                  label: 'บริการช่วยเหลือสำหรับ iPhone',
                  href: '/support/iphone',
                },
                { label: 'AppleCare+ สำหรับ iPhone', href: '/support/iphone' },
                { label: 'Apple Music', href: '/apple-music' },
              ]}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />

            <DropdownMenu
              id="mac"
              label="Mac"
              header={[
                { label: 'ดูข้อมูล Mac' },
                { label: 'เลือกซื้อ Mac' },
                { label: 'อีกมากมายจาก Mac' },
              ]}
              rows1={[
                { label: 'ดูข้อมูล Mac ทั้งหมด', href: '/mac' },
                { label: 'MacBook Air', href: '/macbook-air' },
                { label: 'MacBook Pro', href: '/macbook-pro' },
                { label: 'Mac mini', href: '/mac-mini' },
              ]}
              rows2={[
                { label: 'เลือกซื้อ Mac', href: '/mac' },
                { label: 'อุปกรณ์เสริม Mac', href: '/mac/accessories' },
              ]}
              rows3={[
                { label: 'บริการช่วยเหลือสำหรับ Mac', href: '/support/mac' },
                { label: 'AppleCare+ สำหรับ Mac', href: '/support/mac' },
                { label: 'Apple Music', href: '/apple-music' },
              ]}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />

            <DropdownMenu
              id="watch"
              label="Watch"
              header={[
                { label: 'ดูข้อมูล Watch' },
                { label: 'เลือกซื้อ Watch' },
                { label: 'อีกมากมายจาก Watch' },
              ]}
              rows1={[
                { label: 'ดูข้อมูล Watch ทั้งหมด', href: '/watch' },
                { label: 'Apple Watch Series 9', href: '/apple-watch-9' },
                { label: 'Ultra 2', href: '/ultra-2' },
                { label: 'Bands', href: '/bands' },
              ]}
              rows2={[
                { label: 'Apple Watch SE', href: '/apple-watch-se' },
                { label: 'Apple Watch Series 8', href: '/apple-watch-8' },
              ]}
              rows3={[
                { label: 'บริการช่วยเหลือสำหรับ Watch', href: '/support/watch' },
                { label: 'AppleCare+ สำหรับ Watch', href: '/support/watch' },
                { label: 'Apple Music', href: '/apple-music' },
              ]}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon - Always visible */}
            <div className="hidden sm:block">
              <DropdownMenu
                id="search"
                label={<CiSearch className="text-xl sm:text-2xl" />}
                header={[]}
                rows1={[
                  {
                    label: (
                      <form onSubmit={handleSearchSubmit} className="w-full">
                        <div className="flex items-center">
                          <CiSearch className="text-2xl text-gray-500" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="ค้นหาสินค้าในร้านค้า"
                            className="flex-1 px-1 py-2 text-sm"
                          />
                        </div>
                      </form>
                    ),
                    href: undefined,
                  },
                  {
                    label: (
                      <>
                        <GoArrowRight className="flex mr-2 top-1" />
                        ค้นหาขั้นสูง
                      </>
                    ),
                    href: '/search/advanced',
                  },
                  {
                    label: (
                      <>
                        <GoArrowRight className="flex mr-2 top-1" />
                        อุปกรณ์เสริม
                      </>
                    ),
                    href: '/search/products',
                  },
                  {
                    label: (
                      <>
                        <GoArrowRight className="flex inline mr-2 top-1" />
                        Airpods
                      </>
                    ),
                    href: '/search/store',
                  },
                  {
                    label: (
                      <>
                        <GoArrowRight className="flex inline mr-2 top-1" />
                        Apple Intelligence
                      </>
                    ),
                    href: '/search/apple-music',
                  },
                  {
                    label: (
                      <>
                        <GoArrowRight className="flex inline mr-2 top-1" />
                        Apple Trade In
                      </>
                    ),
                    href: '/search/support',
                  },
                ]}
                rows2={[]}
                rows3={[]}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
            </div>

            {/* Cart Icon - Always visible */}
            <DropdownMenu
              id="cart"
              label={<GrShop className="text-lg sm:text-xl" />}
              header={[
                { label: 'ถุงของคุณว่างเปล่า' },
                { label: ' ' },
                { label: ' ' },
              ]}
              rows1={[
                {
                  label: (
                    <span className="text-[12px] sm:text-[14px] text-gray-500 bottom-6 relative">
                      <Link
                        href="/user/signin"
                        className="text-blue-500 underline text-[12px] sm:text-[14px]"
                      >
                        ลงชื่อเข้าใช้
                      </Link>{' '}
                      เพื่อดูว่าคุณมีรายการที่บันทึกไว้หรือไม่
                    </span>
                  ),
                  href: undefined,
                },
                {
                  label: <span className="text-gray-500">โปรไฟล์ของฉัน</span>,
                  href: '/',
                },
                {
                  label: (
                    <>
                      <FiBox className="flex mr-2 top-1" />
                      คำสั่งซื้อ
                    </>
                  ),
                  href: '/order',
                },
                {
                  label: (
                    <>
                      <VscHeart className="flex mr-2 top-1" />
                      บันทึกของคุณ
                    </>
                  ),
                  href: '/wishlist',
                },
                {
                  label: (
                    <>
                      <CiSettings className="flex mr-2 top-1" />
                      บัญชี
                    </>
                  ),
                  href: '/myprofile',
                },
                {
                  label: (
                    <>
                      <FiUser className="flex mr-2 top-1" />
                      ลงชื่อเข้าใช้
                    </>
                  ),
                  href: '/user/signin',
                },
              ]}
              rows2={[
                { label: '', href: '' },
                { label: '', href: '' },
              ]}
              rows3={[{ label: '  ', href: '' }]}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />

            {/* Hamburger Menu - Only visible on mobile/tablet */}
            <div className="lg:hidden">
              <DropdownMenu
                id="hamburger"
                label={<HiMenu className="text-xl sm:text-2xl" />}
                header={[
                  { label: 'เมนูหลัก' },
                  { label: 'บัญชีของฉัน' },
                  { label: 'ลิงก์ด่วน' },
                ]}
                rows1={[
                  { label: 'iPhone', href: '/iphone' },
                  { label: 'Mac', href: '/mac' },
                  { label: 'Watch', href: '/watch' },
                  { label: 'อุปกรณ์เสริม', href: '/search/products' },
                ]}
                rows2={[
                  {
                    label: (
                      <>
                        <FiUser className="relative mr-2 top-1" />
                        ลงชื่อเข้าใช้
                      </>
                    ),
                    href: '/user/signin',
                  },
                  {
                    label: (
                      <>
                        <FiBox className="relative mr-2 top-1" />
                        คำสั่งซื้อ
                      </>
                    ),
                    href: '/order',
                  },
                  {
                    label: (
                      <>
                        <VscHeart className="relative mr-2 top-1" />
                        บันทึกของคุณ
                      </>
                    ),
                    href: '/wishlist',
                  },
                  {
                    label: (
                      <>
                        <CiSettings className="relative mr-2 top-1" />
                        บัญชี
                      </>
                    ),
                    href: '/myprofile',
                  },
                ]}
                rows3={[
                  {
                    label: (
                      <>
                        <GoArrowRight className="relative mr-2 top-1" />
                        ค้นหาขั้นสูง
                      </>
                    ),
                    href: '/search/advanced',
                  },
                  {
                    label: (
                      <>
                        <GoArrowRight className="relative mr-2 top-1" />
                        บริการช่วยเหลือ
                      </>
                    ),
                    href: '/support',
                  },
                  {
                    label: (
                      <>
                        <GoArrowRight className="relative mr-2 top-1" />
                        Apple Music
                      </>
                    ),
                    href: '/apple-music',
                  },
                ]}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Only visible on mobile */}
        <div className="sm:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="flex items-center bg-white rounded-lg border px-3 py-2">
              <CiSearch className="text-xl text-gray-500 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาสินค้า"
                className="flex-1 text-sm outline-none"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
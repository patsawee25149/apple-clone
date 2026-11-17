// app/Navbar/page.tsx
"use client";
import React, { useState } from "react";
import DropdownMenu from "./dropdown";
import { useMenu } from "../function/MenuContext";
import { useAuth } from "../lib/auth-context";
import Link from "next/link";
import { GrShop } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { GoArrowRight } from "react-icons/go";
import { FiBox, FiUser, FiMenu, FiX } from "react-icons/fi";
import { VscHeart } from "react-icons/vsc";
import { CiSettings } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi";

export default function Header() {
  const { activeMenu, setActiveMenu } = useMenu();
  const { user, logout, loading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getCartDropdownContent = () => {
    if (loading) {
      return {
        header: [{ label: "กำลังโหลด..." }, { label: " " }, { label: " " }],
        rows1: [
          {
            label: (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            ),
            href: undefined,
          },
        ],
      };
    }

    if (!user) {
      return {
        header: [{ label: "ถุงของคุณว่างเปล่า" }, { label: " " }, { label: " " }],
        rows1: [
          {
            label: (
              <span className="text-[18px] w-96 -translate-x-20 flex text-gray-500">
                <Link href="/user/signin" className="text-blue-500 underline  ">ลงชื่อเข้าใช้</Link>
                 เพื่อดูว่าคุณมีรายการที่บันทึกไว้หรือไม่
              </span>
            ),
            href: undefined,
          },
          { label: <><FiUser className="relative mr-2 top-1" />ลงชื่อเข้าใช้</>, href: "/user/signin" },
          { label: <><FiUser className="relative mr-2 top-1" />สร้างบัญชีใหม่</>, href: "/user/signup" },
        ],
      };
    }

    return {
      header: [{ label: `สวัสดี ${user.name}` }, { label: " " }, { label: " " }],
      rows1: [
        { label: <span className="text-[16px] text-gray-700 -translate-x-20 flex">ยินดีต้อนรับ, {user.name} {user.lastname}</span>, href: undefined },
        { label: <><FiUser className="mr-2 relative top-1" />โปรไฟล์ของฉัน</>, href: "/profile" },
        { label: <><FiBox className="mr-2 relative top-1" />คำสั่งซื้อ</>, href: "/orders" },
        { label: <><VscHeart className="mr-2 relative top-1" />บันทึกของคุณ</>, href: "/wishlist" },
        { label: <><CiSettings className="mr-2 relative top-1" />ตั้งค่าบัญชี</>, href: "/settings" },
        { label: <><BiLogOut className="mr-2 relative top-1" />ออกจากระบบ {user.name}</>, href: undefined, onClick: handleLogout },
      ],
    };
  };

  const cartContent = getCartDropdownContent();

  return (
    <header className="w-full relative z-50 bg-gray-50 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold shrink-0">
            MyStore
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <DropdownMenu
              id="iphone" label="iPhone"
              header={[{ label: "ดูข้อมูล iPhone" }, { label: "เลือกซื้อ iPhone" }, { label: "อีกมากมายจาก iPhone" }]}
              rows1={[
                { label: "ดูข้อมูล iPhone ทั้งหมด", href: "/iphone" },
                { label: "iPhone 16", href: "/iphone-16" },
                { label: "iPhone 16 Pro", href: "/iphone-16-pro" },
                { label: "iPhone 16 Pro Max", href: "/iphone-16-pro-max" },
                { label: "iPhone 16 Plus", href: "/iphone-16-plus" },
              ]}
              rows2={[{ label: "เลือกซื้อ iPhone", href: "/iphone" }, { label: "อุปกรณ์เสริม iPhone", href: "/iphone/accessories" }]}
              rows3={[{ label: "บริการช่วยเหลือสำหรับ iPhone", href: "/support/iphone" }, { label: "AppleCare+ สำหรับ iPhone", href: "/support/iphone" }, { label: "Apple Music", href: "/apple-music" }]}
              activeMenu={activeMenu} setActiveMenu={setActiveMenu}
            />
            <DropdownMenu
              id="mac" label="Mac"
              header={[{ label: "ดูข้อมูล Mac" }, { label: "เลือกซื้อ Mac" }, { label: "อีกมากมายจาก Mac" }]}
              rows1={[
                { label: "ดูข้อมูล Mac ทั้งหมด", href: "/mac" },
                { label: "MacBook Air", href: "/macbook-air" },
                { label: "MacBook Pro", href: "/macbook-pro" },
                { label: "Mac mini", href: "/mac-mini" },
              ]}
              rows2={[{ label: "เลือกซื้อ Mac", href: "/mac" }, { label: "อุปกรณ์เสริม Mac", href: "/mac/accessories" }]}
              rows3={[{ label: "บริการช่วยเหลือสำหรับ Mac", href: "/support/mac" }, { label: "AppleCare+ สำหรับ Mac", href: "/support/mac" }, { label: "Apple Music", href: "/apple-music" }]}
              activeMenu={activeMenu} setActiveMenu={setActiveMenu}
            />
            <DropdownMenu
              id="watch" label="Watch"
              header={[{ label: "ดูข้อมูล Watch" }, { label: "เลือกซื้อ Watch" }, { label: "อีกมากมายจาก Watch" }]}
              rows1={[
                { label: "ดูข้อมูล Watch ทั้งหมด", href: "/watch" },
                { label: "Apple Watch Series 9", href: "/apple-watch-9" },
                { label: "Ultra 2", href: "/ultra-2" },
                { label: "Bands", href: "/bands" },
              ]}
              rows2={[{ label: "Apple Watch SE", href: "/apple-watch-se" }, { label: "Apple Watch Series 8", href: "/apple-watch-8" }]}
              rows3={[{ label: "บริการช่วยเหลือสำหรับ Watch", href: "/support/watch" }, { label: "AppleCare+ สำหรับ Watch", href: "/support/watch" }, { label: "Apple Music", href: "/apple-music" }]}
              activeMenu={activeMenu} setActiveMenu={setActiveMenu}
            />

            {/* Search */}
            <DropdownMenu
              id="search"
              label={<CiSearch className="text-2xl" />}
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
                          className="flex-1 px-1 py-2 text-sm outline-none"
                        />
                      </div>
                    </form>
                  ),
                  href: undefined,
                },
                { label: <><GoArrowRight className="mr-2 relative top-1" />ค้นหาขั้นสูง</>, href: "/search/advanced" },
                { label: <><GoArrowRight className="mr-2 relative top-1" />อุปกรณ์เสริม</>, href: "/search/products" },
                { label: <><GoArrowRight className="mr-2 relative top-1" />Airpods</>, href: "/search/store" },
                { label: <><GoArrowRight className="mr-2 relative top-1" />Apple Intelligence</>, href: "/search/apple-music" },
                { label: <><GoArrowRight className="mr-2 relative top-1" />Apple Trade In</>, href: "/search/support" },
              ]}
              rows2={[]} rows3={[]}
              activeMenu={activeMenu} setActiveMenu={setActiveMenu}
            />

            {/* Cart */}
            <DropdownMenu
              id="cart"
              label={<GrShop className="text-xl" />}
              header={cartContent.header}
              rows1={cartContent.rows1}
              rows2={[]} rows3={[]}
              activeMenu={activeMenu} setActiveMenu={setActiveMenu}
            />
          </nav>

          {/* Mobile: Search + Cart + Hamburger */}
          <div className="flex md:hidden items-center space-x-4">
            <CiSearch className="text-2xl cursor-pointer" />
            <GrShop className="text-xl cursor-pointer" />
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        
       {/* Mobile Menu */}
{mobileOpen && (
  <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
    
    {/* iPhone */}
    <div className="px-4 py-2">
      <p className="font-medium text-gray-900 mb-1">iPhone</p>
      <div className="pl-4 space-y-1">
        <Link href="/iphone" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>ดูข้อมูล iPhone ทั้งหมด</Link>
        <Link href="/iphone-16" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>iPhone 16</Link>
        <Link href="/iphone-16-pro" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>iPhone 16 Pro</Link>
        <Link href="/iphone-16-pro-max" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>iPhone 16 Pro Max</Link>
        <Link href="/iphone-16-plus" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>iPhone 16 Plus</Link>
        <Link href="/iphone/accessories" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>อุปกรณ์เสริม iPhone</Link>
      </div>
    </div>

    {/* Mac */}
    <div className="px-4 py-2 border-t border-gray-100">
      <p className="font-medium text-gray-900 mb-1">Mac</p>
      <div className="pl-4 space-y-1">
        <Link href="/mac" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>ดูข้อมูล Mac ทั้งหมด</Link>
        <Link href="/macbook-air" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>MacBook Air</Link>
        <Link href="/macbook-pro" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>MacBook Pro</Link>
        <Link href="/mac-mini" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>Mac mini</Link>
        <Link href="/mac/accessories" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>อุปกรณ์เสริม Mac</Link>
      </div>
    </div>

    {/* Watch */}
    <div className="px-4 py-2 border-t border-gray-100">
      <p className="font-medium text-gray-900 mb-1">Watch</p>
      <div className="pl-4 space-y-1">
        <Link href="/watch" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>ดูข้อมูล Watch ทั้งหมด</Link>
        <Link href="/apple-watch-9" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>Apple Watch Series 9</Link>
        <Link href="/ultra-2" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>Ultra 2</Link>
        <Link href="/bands" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>Bands</Link>
        <Link href="/apple-watch-se" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}>Apple Watch SE</Link>
      </div>
    </div>

    {/* Search */}
    <div className="px-4 py-2 border-t border-gray-100">
      <form onSubmit={handleSearchSubmit} className="w-full">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <CiSearch className="text-xl text-gray-500 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาสินค้าในร้านค้า"
            className="flex-1 text-sm outline-none"
          />
        </div>
      </form>
    </div>

    {/* User / Auth */}
    <div className="px-4 py-2 border-t border-gray-100 space-y-1">
      {user ? (
        <>
          <p className="text-sm text-gray-500 mb-2">สวัสดี {user.name} {user.lastname}</p>
          <Link href="/profile" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}><FiUser className="inline mr-2" />โปรไฟล์ของฉัน</Link>
          <Link href="/orders" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}><FiBox className="inline mr-2" />คำสั่งซื้อ</Link>
          <Link href="/wishlist" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}><VscHeart className="inline mr-2" />บันทึกของคุณ</Link>
          <Link href="/settings" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}><CiSettings className="inline mr-2" />ตั้งค่าบัญชี</Link>
          <button onClick={handleLogout} className="block w-full text-left py-1 text-sm text-red-500 hover:text-red-700"><BiLogOut className="inline mr-2" />ออกจากระบบ</button>
        </>
      ) : (
        <>
          <Link href="/user/signin" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}><FiUser className="inline mr-2" />ลงชื่อเข้าใช้</Link>
          <Link href="/user/signup" className="block py-1 text-sm text-gray-600 hover:text-black" onClick={() => setMobileOpen(false)}><FiUser className="inline mr-2" />สร้างบัญชีใหม่</Link>
        </>
      )}
    </div>

  </div>
)}
      </div>
    </header>
  );
}
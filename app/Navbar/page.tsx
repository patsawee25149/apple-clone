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
import { FiBox } from "react-icons/fi";
import { VscHeart } from "react-icons/vsc";
import { CiSettings } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

export default function Header() {
  const { activeMenu, setActiveMenu } = useMenu();
  const { user, logout, loading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
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

  // Cart dropdown content based on auth status
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
        header: [
          { label: "ถุงของคุณว่างเปล่า" },
          { label: " " },
          { label: " " },
        ],
        rows1: [
          {
            label: (
              <span className="text-[14px] text-gray-500 bottom-1 right-20 relative">
                <Link
                  href="/user/signin"
                  className="text-blue-500 underline text-[14px]"
                >
                  ลงชื่อเข้าใช้
                </Link>{" "}
                เพื่อดูว่าคุณมีรายการที่บันทึกไว้หรือไม่
              </span>
            ),
            href: undefined,
          },
          {
            label: (
              <>
                <FiUser className="relative mr-2 top-1" />
                ลงชื่อเข้าใช้
              </>
            ),
            href: "/user/signin",
          },
          {
            label: (
              <>
                <FiUser className="relative mr-2 top-1" />
                สร้างบัญชีใหม่
              </>
            ),
            href: "/user/signup",
          },
        ],
      };
    }

    return {
      header: [
        { label: `สวัสดี ${user.name}` },
        { label: " " },
        { label: " " },
      ],
      rows1: [
        {
          label: (
            <span className="text-[14px] text-gray-700 right-20 relative">
              ยินดีต้อนรับ, {user.name} {user.lastname}
            </span>
          ),
          href: undefined,
        },
        {
          label: (
            <>
              <FiUser className=" mr-2 " />
              โปรไฟล์ของฉัน
            </>
          ),
          href: "/profile",
        },
        {
          label: (
            <>
              <FiBox className="mr-2 " />
              คำสั่งซื้อ
            </>
          ),
          href: "/orders",
        },
        {
          label: (
            <>
              <VscHeart className="mr-2 " />
              บันทึกของคุณ
            </>
          ),
          href: "/wishlist",
        },
        {
          label: (
            <>
              <CiSettings className="relative mr-2 " />
              ตั้งค่าบัญชี
            </>
          ),
          href: "/settings",
        },
        {
          label: (
            <>
              <BiLogOut className="relative mr-2 top-1 " />
              ออกจากระบบ {user.name} {user.lastname}
            </>
          ),
          href: undefined,
          onClick: handleLogout, // ⭐ ใช้ onClick prop แทน
        },
      ],
    };
  };

  const cartContent = getCartDropdownContent();

  return (
    <header className="w-full z-50 flex relative bg-gray-50 right-10">
      <div className="max-w-screen-xl mx-auto flex justify-center p-5">
        <Link href="/" className="text-xl font-bold ">
          MyStore
        </Link>

        <nav className="flex space-x-8 ml-[100px]">
          <DropdownMenu
            id="iphone"
            label="iPhone"
            header={[
              { label: "ดูข้อมูล iPhone" },
              { label: "เลือกซื้อ iPhone" },
              { label: "อีกมากมายจาก iPhone" },
            ]}
            rows1={[
              { label: "ดูข้อมูล iPhone ทั้งหมด", href: "/iphone" },
              { label: "iPhone 16", href: "/iphone-16" },
              { label: "iPhone 16 Pro", href: "/iphone-16-pro" },
              { label: "iPhone 16 Pro Max", href: "/iphone-16-pro-max" },
              { label: "iPhone 16 Plus", href: "/iphone-16-plus" },
            ]}
            rows2={[
              { label: "เลือกซื้อ iPhone", href: "/iphone" },
              { label: "อุปกรณ์เสริม iPhone", href: "/iphone/accessories" },
            ]}
            rows3={[
              {
                label: "บริการช่วยเหลือสำหรับ iPhone",
                href: "/support/iphone",
              },
              { label: "AppleCare+ สำหรับ iPhone", href: "/support/iphone" },
              { label: "Apple Music", href: "/apple-music" },
            ]}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />

          <DropdownMenu
            id="mac"
            label="Mac"
            header={[
              { label: "ดูข้อมูล Mac" },
              { label: "เลือกซื้อ Mac" },
              { label: "อีกมากมายจาก Mac" },
            ]}
            rows1={[
              { label: "ดูข้อมูล Mac ทั้งหมด", href: "/mac" },
              { label: "MacBook Air", href: "/macbook-air" },
              { label: "MacBook Pro", href: "/macbook-pro" },
              { label: "Mac mini", href: "/mac-mini" },
            ]}
            rows2={[
              { label: "เลือกซื้อ Mac", href: "/mac" },
              { label: "อุปกรณ์เสริม Mac", href: "/mac/accessories" },
            ]}
            rows3={[
              { label: "บริการช่วยเหลือสำหรับ Mac", href: "/support/mac" },
              { label: "AppleCare+ สำหรับ Mac", href: "/support/mac" },
              { label: "Apple Music", href: "/apple-music" },
            ]}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />

          <DropdownMenu
            id="watch"
            label="Watch"
            header={[
              { label: "ดูข้อมูล Watch" },
              { label: "เลือกซื้อ Watch" },
              { label: "อีกมากมายจาก Watch" },
            ]}
            rows1={[
              { label: "ดูข้อมูล Watch ทั้งหมด", href: "/watch" },
              { label: "Apple Watch Series 9", href: "/apple-watch-9" },
              { label: "Ultra 2", href: "/ultra-2" },
              { label: "Bands", href: "/bands" },
            ]}
            rows2={[
              { label: "Apple Watch SE", href: "/apple-watch-se" },
              { label: "Apple Watch Series 8", href: "/apple-watch-8" },
            ]}
            rows3={[
              { label: "บริการช่วยเหลือสำหรับ Watch", href: "/support/watch" },
              { label: "AppleCare+ สำหรับ Watch", href: "/support/watch" },
              { label: "Apple Music", href: "/apple-music" },
            ]}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />

          {/* Search Dropdown */}
          <DropdownMenu
            id="search"
            label={<CiSearch className="text-2xl relative left-[120px]" />}
            header={[]}
            rows1={[
              {
                label: (
                  <form onSubmit={handleSearchSubmit} className="w-full">
                    <div className="flex items-center" autoFocus>
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
                    <GoArrowRight className="relative mr-2 top-1" />
                    ค้นหาขั้นสูง
                  </>
                ),
                href: "/search/advanced",
              },
              {
                label: (
                  <>
                    <GoArrowRight className="relative inline mr-2 top-1" />
                    อุปกรณ์เสริม
                  </>
                ),
                href: "/search/products",
              },
              {
                label: (
                  <>
                    <GoArrowRight className="relative inline mr-2 top-1" />
                    Airpods
                  </>
                ),
                href: "/search/store",
              },
              {
                label: (
                  <>
                    <GoArrowRight className="relative inline mr-2 top-1" />
                    Apple Intelligence
                  </>
                ),
                href: "/search/apple-music",
              },
              {
                label: (
                  <>
                    <GoArrowRight className="relative inline mr-2 top-1" />
                    Apple Trade In
                  </>
                ),
                href: "/search/support",
              },
            ]}
            rows2={[]}
            rows3={[]}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />

          {/* Cart/User Dropdown */}
          <DropdownMenu
            id="cart"
            label={<GrShop className="text-xl relative left-[100px]" />}
            header={cartContent.header}
            rows1={cartContent.rows1}
            rows2={[]}
            rows3={[]}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </nav>
      </div>
    </header>
  );
}

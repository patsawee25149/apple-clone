"use client";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";

interface DropdownMenuProps {
  label: React.ReactNode;
  id: string;
  header: { label: string; href?: string }[];
  rows1: { label: React.ReactNode; href?: string }[];
  rows2: { label: string; href?: string }[];
  rows3: { label: string; href?: string }[];
  activeMenu: string | null;
  setActiveMenu: (label: string | null) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  id,
  rows1,
  rows2,
  rows3,
  header,
  activeMenu,
  setActiveMenu,
}) => {
  return (
    <div className="relative" onMouseEnter={() => setActiveMenu(id)}>
      <button className="flex items-center gap-1 hover:text-blue-500">
        {label} {typeof label === "string" && <IoMdArrowDropdown />}
      </button>

      <div
        onMouseLeave={() => setActiveMenu(null)}
        className={`fixed left-0 w-screen bg-white min-h-fit shadow-lg mt-4 transition-all duration-300 z-50 overflow-visible ${
          activeMenu === id
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className={`max-w-screen-xl pl-[680px] py-6 grid grid-cols-3 items-start text-black ${
          id === "cart" ? "pb-16" : ""
        }`}>
          {/* Column 1 */}
          <ul className="space-y-2">
            <li className="mb-5">
              <p
                className={`text-sm font-semibold ${
                  id === "cart" ? "text-xl " : "text-black"
                }`}
              >
               {header[0]?.label}
              </p>
            </li>

            {rows1.map((item, idx) => (
              <li key={idx} className={`text-sm ${
                id === "cart" && idx === 0 ? "pt-10 " : ""
              }`}>
                {item.href ? (
                  <Link 
                    href={item.href} 
                    className={`hover:text-blue-500 transition-colors ${
                      id === "cart" ? "text-[14px]" : "text-base flex"
                    } ${
                      id === "search" ? "text-[14px] font-bold" : "text-base flex"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="cursor-default">{item.label}</span>
                )}
              </li>
            ))}
          </ul>

          {/* Column 2 */}
          <ul className="space-y-2">
            <li className="mb-4">
              <p
                className={`text-sm font-semibold ${
                  id === "cart" ? "text-xl" : "text-black"
                }`}
              >
                {header[1]?.label}
              </p>
            </li>

            {rows2.map((item, idx) => (
              <li key={idx} className="text-sm">
                {item.href ? (
                  <Link 
                    href={item.href} 
                    className="hover:text-blue-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="cursor-default">{item.label}</span>
                )}
              </li>
            ))}
          </ul>

          {/* Column 3 */}
          <ul className="space-y-2">
            <li className="mb-4">
              <p
                className={`text-sm font-semibold ${
                  id === "cart" ? "text-xl" : "text-black"
                }`}
              >
                {header[2]?.label}
              </p>
            </li>

            {rows3.map((item, idx) => (
              <li key={idx} className="text-sm">
                {item.href ? (
                  <Link 
                    href={item.href} 
                    className="hover:text-blue-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="cursor-default">{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
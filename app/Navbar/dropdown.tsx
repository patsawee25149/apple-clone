"use client";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";

interface DropdownMenuProps {
  label: React.ReactNode;
  id: string;
  header: { label: string; href?: string }[];
  rows1: {
    label: React.ReactNode;
    href?: string;
    onClick?: () => void;
  }[];
  rows2: { label: React.ReactNode; href?: string; onClick?: ()=> void; }[];
  rows3: { label: React.ReactNode; href?: string; onClick?: ()=> void; }[];
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
      <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
        {label} {typeof label === "string" && <IoMdArrowDropdown />}
      </button>

      <div
        onMouseLeave={() => setActiveMenu(null)}
        className={`
          fixed left-0 w-screen bg-white shadow-lg transition-all duration-300 z-50
          ${
            activeMenu === id
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-3 pointer-events-none"
          }
          ${id === "search" ? "mt-2" : "mt-4"}
        `}
      >
        <div
          className={`
          max-w-screen  px-10 py-6 
          ${id === "cart" ? "pb-16" : ""}
          
          // Mobile (phone) - Stack vertically
          grid grid-cols-2 gap-4 px-2 py-4
          
          // Tablet (iPad) - 2 columns
          md:grid-cols-2 md:gap-10 md:px-1 md:py-10 md:pr-[200px]
          
          // Desktop (PC) - 3 columns
          lg:grid-cols-3 lg:gap-6 lg:px-[300px] lg:ml-[10px] md:ml-[200px]
          
          items-start text-black
        `}
        >
          {/* Column 1 */}
          <div
            className={`
            ${
              id === "search"
                ? "col-span-full md:col-span-2 lg:col-span-1 md:-ml-20"
                : ""
            }
          `}
          >
            <ul className="space-y-2">
              <li className="mb-3 lg:mb-5">
                <p
                  className={`
                  font-semibold
                  ${
                    id === "cart"
                      ? "text-lg md:text-xl w-[150px] md:w-[200px] lg:w-[250px] md:-ml-20 "
                      : "text-sm md:text-base text-black"
                  }
                `}
                >
                  {header[0]?.label}
                </p>
              </li>

              {rows1.map((item, idx) => (
                <li key={idx} className={`...existing classes...`}>
                  {item.onClick ? (
                    <span
                      onClick={item.onClick}
                      className="hover:text-blue-500 transition-colors block cursor-pointer flex items-start w-[300px] md:w-[200px] lg:w-[250px] md:-ml-20"
                    >
                      {item.label}
                    </span>
                  ) : item.href ? (
                    <Link
                      href={item.href}
                      className={`hover:text-blue-500  transition-colors flex  w-[300px]
                        ${id === "cart" ? "-translate-x-20" : ""}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="cursor-default block ">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 - Hidden on mobile for search, visible for others */}
          <div
            className={`
            ${id === "search" ? "hidden lg:block" : "block"}
          `}
          >
            <ul className="space-y-2">
              <li className="mb-3 lg:mb-4">
                <p
                  className={`
                  font-semibold
                  ${
                    id === "cart"
                      ? "text-lg md:text-xl"
                      : "text-sm md:text-base text-black"
                  }
                `}
                >
                  {header[1]?.label}
                </p>
              </li>

              {rows2.map((item, idx) => (
                <li key={idx} className="text-sm md:text-base">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="hover:text-blue-500 transition-colors block md:w-screen md:flex flex"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="cursor-default block">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Hidden on mobile and tablet for search */}
          <div
            className={`
            ${
              id === "search"
                ? "hidden lg:block"
                : "block md:col-span-2 lg:col-span-1"
            }
          `}
          >
            <ul className="space-y-2">
              <li className="mb-3 lg:mb-4">
                <p
                  className={`
                  font-semibold
                  ${
                    id === "cart"
                      ? "text-lg md:text-xl"
                      : "text-sm md:text-base text-black"
                  }
                `}
                >
                  {header[2]?.label}
                </p>
              </li>

              {rows3.map((item, idx) => (
                <li key={idx} className="text-sm md:text-base flex w-full">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="hover:text-blue-500 transition-colors block md:w-screen md:flex md:-ml-3 flex -ml-2 "
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="cursor-default block">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;

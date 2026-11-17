"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/lib/auth-context";
import { gadgets } from "@/app/data/gadgets";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function WishlistPage() {
  const { user, loading } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      if (user?.email) {
        try {
          const res = await fetch("/api/wishlist");
          if (res.ok) {
            const json = await res.json();
            setWishlistIds(json.wishlist ?? []);
          } else {
            setWishlistIds([]);
          }
        } catch {
          setWishlistIds([]);
        }
      } else {
        const saved = localStorage.getItem("wishlist");
        setWishlistIds(saved ? JSON.parse(saved) : []);
      }
      setIsLoading(false);
    };
    load();
  }, [user]);

  const wishlistItems = useMemo(
    () => gadgets.filter((item) => wishlistIds.includes(item.id)),
    [wishlistIds]
  );

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const toggleWishlist = async (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    event.stopPropagation();

    const next = wishlistIds.includes(id)
      ? wishlistIds.filter((x) => x !== id)
      : [...wishlistIds, id];

    setWishlistIds(next);

    if (!user?.email) return;

    setIsSaving(true);
    const action = wishlistIds.includes(id) ? "remove" : "add";
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      if (res.ok) {
        const data = await res.json();
        setWishlistIds(data.wishlist || []);
      } else {
        setWishlistIds(next);
      }
    } catch {
      setWishlistIds(next);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || isLoading) {
    return <div className="p-8 text-center">กำลังโหลด...</div>;
  }

  if (!wishlistItems.length) {
    return (
      <main className="min-h-screen py-[150px] bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Wishlist ของคุณ</h1>
          <p className="text-gray-600">ยังไม่มีสินค้าใน wishlist</p>
        </div>
      </main>
    );
  }

  return (
    <main className="py-[150px] bg-gray-50 min-h-screen w-full mx-auto">
      <div className="relative w-full scroll-smooth">
        <h2 className="text-stone-500 text-4xl mb-10 ml-[150px]">
          <span className="text-black">Wishlist ของคุณ</span>{" "}
          สินค้าที่คุณเซฟไว้
        </h2>

        {/* Navigation buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <FiChevronLeft size={35} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <FiChevronRight size={35} />
        </button>

        {/* Scroll area with padding both sides */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth py-5 no-scrollbar px-[100px]"
        >
          {wishlistItems.map((card) => (
            <Link
              href={`/products/gadget/${card.id}`}
              key={card.id}
              className="w-[300px] h-[500px] rounded-xl shadow-lg hover:shadow-lg transition-all duration-600 hover:scale-105 relative bg-white flex-shrink-0"
            >
              <div className="rounded-xl overflow-hidden w-full h-full">
                <img
                  src={card.img}
                  alt={card.title}
                  className="object-contain scale-80 pb-[200px] w-full h-full duration-400"
                />
                <div className="absolute top-0 left-0 w-[250px] bg-gradient-to-t to-transparent p-4 text-black">
                  <div className="absolute mt-[360px] w-[220px]">
                    <p className="text-sm pb-4 font-semibold text-[16px] text-start overflow-hidden line-clamp-1 leading-tight">
                      {card.title}
                    </p>
                  </div>
                  <p className="ml-5 text-gray-600 mt-[430px] text-[16px]">
                    {card.price}
                  </p>

                  {/* wishlist icons */}
                  {wishlistIds.includes(card.id) ? (
                    <FaHeart
                      className={`text-[24px] absolute bottom-4 right-4 cursor-pointer text-red-500 hover:scale-120 transition-transform duration-300 ${
                        isSaving ? "opacity-50" : ""
                      }`}
                      onClick={(e) => toggleWishlist(e, card.id)}
                    />
                  ) : (
                    <FaRegHeart
                      className={`text-[24px] absolute bottom-4 right-4 cursor-pointer text-gray-400 hover:text-red-500 hover:scale-120 transition-transform duration-300 ${
                        isSaving ? "opacity-50" : ""
                      }`}
                      onClick={(e) => toggleWishlist(e, card.id)}
                    />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

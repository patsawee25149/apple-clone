"use client";
import { FloatingSelect } from "@/app/function/FloatingSelect";
import React, { useState } from "react";
import { gadgets } from "@/app/data/gadgets";
import { phone } from "@/app/data/phone";
import Image from "next/image";
import { FaShippingFast } from "react-icons/fa";
import { CiCirclePlus, CiSaveDown2 } from "react-icons/ci";
import { PiShoppingBagOpenDuotone, PiChatsCircle } from "react-icons/pi";
import { MdConnectWithoutContact } from "react-icons/md";
import { useParams } from "next/navigation";

export default function GadgetPage() {
  const params = useParams();
  const id = params?.id;
  const img = gadgets.find((gadget) => gadget.id === Number(id))?.img;
  const title = gadgets.find((gadget) => gadget.id === Number(id))?.title;
  const price = gadgets.find((gadget) => gadget.id === Number(id))?.price;

  const [formData, setFormData] = useState({ size: "I16" });

  const updateField = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Mobile: รูปอยู่บน, Tablet/Desktop: รูปอยู่ขวา */}
        <div className="flex flex-col md:flex-row md:gap-10 lg:gap-16">

          {/* รูปภาพ — บนสุดใน mobile, ขวาใน md ขึ้นไป */}
          <section className="w-full md:w-1/2 md:order-2 flex items-start justify-center mb-6 md:mb-0">
            <div className="w-full max-w-sm md:max-w-full  md:mt-20 top-20">
              {img && (
                <Image
                  src={img}
                  alt={title ?? "gadget"}
                  width={500}
                  height={500}
                  className="object-contain w-full h-auto rounded-xl"
                  priority
                />
              )}
            </div>
          </section>

          {/* ข้อมูลสินค้า — ล่างใน mobile, ซ้ายใน md ขึ้นไป */}
          <section className="w-full md:w-1/2 md:order-1 flex flex-col space-y-6">
            <p className="text-red-600 text-base">ใหม่</p>
            <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
            <p className="text-lg font-light">{price}</p>

            <FloatingSelect
              id="size"
              label="ขนาด"
              value={formData.size}
              onChange={updateField("size")}
              options={phone}
              required
            />

            <div className="border-t border-gray-300 pt-6 space-y-6">

              {/* การจัดส่ง */}
              <div className="space-y-1">
                <div>
                  <FaShippingFast className="text-2xl bottom-1 relative inline mr-2" />
                  การจัดส่ง:
                </div>
                <span className="block text-black font-light pl-2">
                  1-2 สัปดาห์ บริการจัดส่งฟรี
                </span>
                <a href="" className="flex ml-8 text-blue-500 font-light hover:underline">
                  ดูวันส่งมอบสินค้า <CiCirclePlus className="text-lg m-1" />
                </a>
              </div>

              {/* การรับสินค้า */}
              <div className="space-y-1">
                <div>
                  <PiShoppingBagOpenDuotone className="text-2xl bottom-1 relative inline mr-2" />
                  การรับสินค้า:
                </div>
                <a href="" className="flex ml-8 text-blue-500 font-light hover:underline">
                  ตรวจสอบความพร้อมในการจำหน่าย
                  <CiCirclePlus className="text-lg m-1" />
                </a>
              </div>

              {/* ปุ่ม */}
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors text-base font-light">
                เพิ่มลงในถุงช้อปปิ้ง
              </button>

              {/* บันทึกภายหลัง */}
              <div className="border-t border-gray-300 pt-4 space-y-2">
                <p className="font-medium">ต้องการเวลาอีกหน่อยใช่หรือไม่</p>
                <p className="font-light text-sm text-gray-600">
                  เก็บรักษาตัวเลือกสินค้าทั้งหมดของคุณโดยการบันทึกอุปกรณ์นี้ไปยังบันทึกของคุณ
                  จากนั้นกลับมาดูภายหลังได้ตลอดเวลาและรับสินค้าด้วยตัวเองได้ทันทีต่อจากที่ค้างไว้
                </p>

                <div className="border-t border-gray-300 pt-4 space-y-2">
                  <a href="" className="flex text-blue-500 items-center font-light hover:underline">
                    <CiSaveDown2 className="text-lg mr-1" />บันทึกเพื่อดำเนินการภายหลัง
                  </a>
                  <p className="flex items-center">
                    <PiChatsCircle className="text-lg mr-1" />รับความช่วยเหลือเกี่ยวกับการซื้อ
                  </p>
                  <div className="flex items-center flex-wrap gap-1">
                    <a href="" className="text-blue-500 flex hover:underline items-center">
                      แชทสดตอนนี้ <MdConnectWithoutContact className="mx-1" />
                    </a>
                    <span className="text-black">หรือโทร. 1800-01-9209</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
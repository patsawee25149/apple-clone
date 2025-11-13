"use client";
import { FloatingSelect } from "@/app/function/FloatingSelect";
import React, { useState } from "react";
import { phone } from "@/app/data/phone";
import Image from "next/image";
import { FaShippingFast } from "react-icons/fa";
import { CiCirclePlus , CiSaveDown2 } from "react-icons/ci";
import { PiShoppingBagOpenDuotone , PiChatsCircle } from "react-icons/pi";
import { MdConnectWithoutContact } from "react-icons/md";

export default function GadgetPage() {
  const [formData, setFormData] = useState({
    size: "I16",
  });

  const updateField = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid grid-cols-4 gap-4 min-h-screen w-screen justify-center bg-white">
      <section className="col-start-2 col-end-3 min-h-screen w-[500px] flex flex-col items-left p-20 bg-white space-y-10">
        <p className="text-red-600 text-[18px]">ใหม่</p>
        <h1 className="text-2xl font-bold mb-6">
          เคสซิลิโคนสำหรับ iPhone 16 Pro Max พร้อม MagSafe - สีชมพูเข้มพีโอนี
        </h1>
        <p className="text-[18px] font-light">฿1990.00</p>

        <FloatingSelect
          id="size"
          label="ขนาด"
          value={formData.size}
          onChange={updateField("size")}
          options={phone}
          required
        />

        <div className="border-t border-gray-300 pt-6">
          <div>
            <div className="-space-y-2">
              <FaShippingFast className="text-[28px] bottom-1 relative inline mr-2" />
              การจัดส่ง:
              <span className="flex text-black font-light p-2">
                1-2 สัปดาห์ บริการจัดส่งฟรี
              </span>
              <a
                href=""
                className="flex ml-10 text-blue-500 font-light hover:underline"
              >
                ดูวันส่งมอบสินค้า <CiCirclePlus className="text-[18px] m-1" />
              </a>
            </div>

            <div className="mt-6 -space-y-2">
              <PiShoppingBagOpenDuotone className="text-[28px] bottom-1 relative inline mr-2 " />
              การรับสินค้า:
              <a
                href=""
                className="flex ml-10 text-blue-500 font-light hover:underline"
              >
                ตรวจสอบความพร้อมในการจำหน่าย
                <CiCirclePlus className="text-[18px] m-1 " />
              </a>
              <button className="mt-10 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors text-[16px] font-light">
                
                เพิ่มลงในถุงช้อปปิ้ง
              </button>
            </div>

            <div className=" border-gray-300 pt-6">
              <span className=" relative inline mr-2">
                ต้องการเวลาอีกหน่อยใช่หรือไม่
              </span>
              <p className="font-light">
                เก็บรักษาตัวเลือกสินค้าทั้งหมดของคุณโดยการบันทึกอุปกรณ์นี้ไปยังบันทึกของคุณ
                จากนั้นกลับมาดูภายหลังได้ตลอดเวลาและรับสินค้าด้วยตัวเองได้ทันทีต่อจากที่ค้างไว้
              </p>

              <div className="mt-4 font-light border-t border-gray-300 pt-4">
              
              <a href="" className="flex text-blue-500 items-center font-light hover:underline"><CiSaveDown2 className="text-[18px] m-1"/>บันทึกเพื่อดำเนินการภายหลัง</a>

              <p className="flex items-center m-1"><PiChatsCircle className="text-[18px]" />รับความช่วยเหลือเกี่ยวกับการซื้อ</p>
              <div className="flex items-center m-1">
              <a href="" className="text-blue-500 flex hover:underline ">แชทสดตอนนี้ <MdConnectWithoutContact className="mx-1" /> </a> <span className="text-black">หรือโทร. 1800-01-9209</span>
              </div>
              
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="top-20 right-20">
        <section>
        <div>
          <Image
            className="mt-20 col-span-2 col-end-7"
            src="/images/casewhite.jpeg"
            width={500}
            height={500}
            alt="casewhite"
            
          />
        </div>
      </section>

      </section>
        
      <section className="col-start-2 col-end-3 min-h-screen w-[500px] flex flex-col items-left pl-20 bg-white">
          <div className="flex w-[800px] items-center justify-center">
            <p className="mt-20 text-[16px] font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi iste dolorem corporis minima praesentium accusamus delectus! Maxime ex laborum soluta?
            </p>
          <Image
            className="mt-10 object-contain w-[1000px] h-[400px]"
            src="/images/casegadget.jpg"
            width={1400}
            height={500}
            alt="casegadget"
          />
        </div>
      </section>
    </div>
  );
}

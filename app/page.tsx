'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useMenu } from './function/MenuContext';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: '$129.00',
    img: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: '$99.00',
    img: 'https://images.pexels.com/photos/437038/pexels-photo-437038.jpeg',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: '$59.00',
    img: 'https://images.pexels.com/photos/1034653/pexels-photo-1034653.jpeg',
  },
  {
    id: 4,
    name: 'Gaming Mouse',
    price: '$39.00',
    img: 'https://images.pexels.com/photos/9091100/pexels-photo-9091100.jpeg',
  },
  {
    id: 5,
    name: '4K Monitor',
    price: '$299.00',
    img: 'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/04/Product/gigabyte-aorus-co49dq-49-qd-oled-dqhd-curved-gaming-monitor-144hz-front-view.jpg',
  },
  {
    id: 6,
    name: 'Macbook Air M3',
    price: '$1299.00',
    img: 'https://images.pexels.com/photos/986812/pexels-photo-986812.jpeg',
  },
];

const cards = [
  {
    id: 1,
    img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-macbook-air-202503?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=MjhMcWJ2MGZwbXEwdnBkcUN6ZnhyOWVOMytmanI1M0ZTQWR1RjlDMWJpNXFTRjNxbmh1UnU2R29ibGdpZUFXc0prY3crUWRsN1dqVjRnMHR5S1hVbk15N0N0R0lhUGhlMG1Tdmc3RjZVQ09NTUhYNlZ6OGxKNWpBMHlTSTlldko',
    title: 'Wireless Headphones',
    description: 'Experience the freedom of wireless sound.',
    price: '$129.00',
  },
  {
    id: 2,
    img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-watch-s10-202409?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=QWhYaUFuRS9hTUliZ3N5RWVCV09vbGtrQjBqdmhJbWlLcCtlQTMwc01SdjkvamYzRzRvcFlnajNacmhEOC9BeDE1UUxLT2t0cW42N3FvQzVqaGhrVVlSek45NHpYUG91NnZ3YmlDQlpUYnArYWpGdS9XeFgvbS9ITnNYOEhYaG4',
    title: 'Smart Watch',
    description: 'Stay connected on the go.',
    price: '$99.00',
  },
  {
    id: 3,
    img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-ipad-air-202503?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=UzBXQnlhUWdraTNvNU1Kb3pEQlpXRFJ0OFRiWngrNGllYTMvQ1dlWDBQZjZXYXJlRUd1cTBYTnRnbTNlazIvMzRHeXB5TnVsU3R6Qjd0Y2JzbURyWEdJV2RaUklyUnViT0c4OGJXRWhUTnArYWpGdS9XeFgvbS9ITnNYOEhYaG4',
    title: 'Bluetooth Speaker',
    description: 'Portable sound for every occasion.',
    price: '$59.00',
  },
  {
    id: 4,
    img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-iphone-16e-202502?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=UzBXQnlhUWdraTNvNU1Kb3pEQlpXUEpocHFEYXNEd3ZLM21EWlJLVUF6am45S05qekNUdVUwMVFyK1pKaERUd2JGcXNRQnFCV0w3WVRjTExvdm1ic1RTTDdTY01tcXFQU3QvbDFBbGxDRkc1dDgvV3BhU1hoSzFPUEZjam5HQ2g',
    title: 'Gaming Mouse',
    description: 'Precision and speed for gamers.',
    price: '$39.00',
  },
  {
    id: 5,
    img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-iphone-16-pro-202409?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=UzBXQnlhUWdraTNvNU1Kb3pEQlpXUHpnd0VsRWFiaWRaRHRaUXBvNTNkalNab1lJcUZwSFVRK1htYlNmZUtPTG54cStVNU5BQmhzbkxYRGxDWUc3R1lXVzNzT2dSajRTd2tFaEdoYUp2VnY1WVJVT21DTzBZRFlBTTZySFFMbHY',
    title: '4K Monitor',
    description: 'Stunning visuals for your workspace.',
    price: '$299.00',
    textColor: 'text-white',
  },
  {
    id: 6,
    img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-ipad-202503_GEO_TH_LANG_TH?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=UzBXQnlhUWdraTNvNU1Kb3pEQlpXRVR1bGNDQXBzM3BPRFkvZThBc2ZnemErNW1tckRnVE5VLzJqQ0ZvUk9uRllEamZDVFNES0txdDcrN05FQnRVVVdqMWVhN3ZXRnI1bnI2dlp2SjB4V1FCVTZVRyt6ZzdnZDhTNVRRMFpSTlk',
    title: 'Macbook Air M3',
    description: 'Powerful performance in a sleek design.',
    price: '$1299.00',
  },
  {
    id: 7,
    img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-iphone-16-202409?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=UzBXQnlhUWdraTNvNU1Kb3pEQlpXSHNhd1RFMExoRHFBcWNCalJOblBtbjkvamYzRzRvcFlnajNacmhEOC9BeDE1UUxLT2t0cW42N3FvQzVqaGhrVVQ1UEcwSy9Yd3FpT0wveFRydDk3cE4rYWpGdS9XeFgvbS9ITnNYOEhYaG4',
    title: 'Wireless Headphones',
    description: 'Experience the freedom of wireless sound.',
    price: '$129.00',
    textColor: 'text-white',
  },
];

const services = [
  {
    id: 1,
    img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-50-earth-day-specialist-help-202504?wid=4000&hei=4167&fmt=p-jpg&qlt=95&.v=cHZTdEJURVNIcmNmcWQ1YlUyV2pSZmZ6Q2ZTaDM0dDFtQTRQZitiSUxoQ3ZaQ3BPZ3VPbjZ1OE1jMHB0VHplaVQ1SVRRZnoyY2xiVHFIbFpnUnJwcmJKaWduWDhrL3RFTDJVSS83Tk9MYXNncFNxekt2MjNBWmdPdTJsTW1wWDdOcEJRdUlLK3pHczBBRDF3cDFHQ3Bn',
    title: 'APPLE SPECIALIST',
    description: 'ช็อปแบบตัวต่อตัวกับ Specialist ทางออนไลน์หรือในร้าน',
  },
  {
    id: 2,
    img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-50-taa-gaad-202505?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=cFEvalhFakpZVzg4RFZsWktqbXFNY0c2by9KWHE0U1NmaEtuWndhZksrQ2o2Z1ptREdBenZRTjZuSCtBemFnUTRHeXB5TnVsU3R6Qjd0Y2JzbURyWFA2Q2ZXNGtMc2tNc1puZEN0QmlFbFIrYWpGdS9XeFgvbS9ITnNYOEhYaG4',
    title: 'TODAY AT APPLE',
    description: 'จองเซสชั่นการช่วยการเข้าถึงสำหรับกลุ่มของคุณ',
    context:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
  },
  {
    id: 3,
    img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-50-personal-setup-202408?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=cFhHZjJBWFBWT2pMQnNFR2RGWlEwWlNLRUlsMkFxY1ZMQzZzY0tkenJrbmJpYlE0VldEazFQNXh6WFBPRkF3SmNva0xZQWFEV2ljOWRGNWZJRk4vWGpyanhrWU1SUk1JdlhicWJrdXd2djlzeDRiY2xGcWt2YVRkSWVZeUhQK1U',
    title: 'ตั้งค่าส่วนตัวของคุณ',
    description:
      'ตั้งค่าอุปกรณ์เครื่องใหม่ของคุณด้วยความช่วยเหลือจาก Specialist',
    context:
      'ให้เราช่วยแนะนำคุณเกี่ยวกับการถ่ายโอนข้อมูล คุณสมบัติล่าสุด และอื่นๆ ในเซสชั่นออนไลน์แบบตัวต่อตัว',
  },
  {
    id: 4,
    img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-50-genius-202108?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=UjZWNjB3VDZRK09HelFpSjJDWXROSXFFVHJmY3pQTE80cGIxc1pFQ1VBQWYzUHRVc053YldlK2NuZForb0M1V0tRNjVHZTlIV04vVjZjbEh0Rm5SYzRmTnpyOVBFZDFPdWR2WFZpUzNkaDA',
    description: 'รับบริการและความช่วยเหลือจากผู้เชี่ยวชาญที่ Genius Bar',
  },
];

export default function MainPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320; // ปรับขนาดการเลื่อน
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const { activeMenu } = useMenu();

  return (
    <main className="py-[150px] bg-gray-50 min-h-screen w-full mx-auto">
      {activeMenu && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-lg z-10 pointer-events-none"></div>
      )}
      {/* Top Section */}
      <section className="TopContext pl-[150px] mb-10 flex justify-between">
        <div>
          <h1 className="text-start text-[44px] font-bold text-blue-500 w-4/6 line-clamp-3 ">
            Lorem <span className="text-sky-600">ipsum</span> dolor sit amet{' '}
            <span className="text-indigo-500">consectetur</span> adipisicing.
          </h1>
        </div>

        <div className="flex pr-[100px] max-w-2xl text-start">
          <div className="font-bold text-gray-600 flex flex-col gap-6">
            {/* 1st row */}
            <div className="flex items-center gap-4">
              <img
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
                alt=""
                className="w-10 h-10 object-cover rounded-full"
              />
              <div>
                <p className="text-[18px] w-[300px]">
                  Lorem ipsum dolor sit amet elit.
                </p>
                <Link
                  href=""
                  className="text-blue-500 font-light flex items-center"
                >
                  Need Help <RiArrowRightUpLine className="ml-1 mt-[2px]" />
                </Link>
              </div>
            </div>

            {/* 2nd row */}
            <div className="flex items-center gap-4">
              <img
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
                alt=""
                className="w-10 h-10 object-cover rounded-full"
              />
              <div>
                <p className="text-[18px] w-[300px]">Lorem ipsum dolor elit.</p>
                <Link
                  href=""
                  className="text-blue-500 font-light flex items-center"
                >
                  Find out <RiArrowRightUpLine className="ml-1 mt-[2px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Title */}
      <section className="text-center mb-12 pt-[80px]">
        <h1 className="text-4xl font-bold">Welcome to TechShop</h1>
        <p className="text-gray-600 mt-2">
          Discover the latest gadgets at great prices
        </p>
      </section>

      {/* Carousel Section */}
      <div className="relative max-w-[1440px] mx-auto px-4">
        {/* Navigation Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-1 bg-white shadow p-2 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-1 bg-white shadow p-2 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Scrollable Items */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-2 no-scrollbar"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[280px] max-w-[300px] bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="overflow-hidden rounded-xl h-48 w-full">
                <img
                  src={product.img}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-blue-500">{product.price}</p>
                <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel card */}
      <div className="relative  mt-[150px] w-full ">
        <h2 className="text-stone-500 text-4xl mb-10 ml-[150px]">
          <span className="text-black">ผลิตภัณฑ์ล่าสุดของเรา</span>{' '}
          มาดูว่ามีอะไรใหม่บ้างได้เลย
        </h2>

        {/* Navigation buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <FiChevronLeft size={35} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <FiChevronRight size={35} />
        </button>

        {/* Scroll area */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth py-5 no-scrollbar"
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="min-w-[380px] w-[70px] left-[150px] rounded-xl shadow-lg hover:shadow-lg transition-all duration-300 relative"
            >
              <div className="rounded-xl overflow-hidden w-full h-[500px]  hover:scale-105 duration-300 ">
                <img
                  src={card.img}
                  alt={card.title}
                  className="object-cover w-full h-full transition-transform duration-300 "
                />
                <div className="absolute top-0 left-0 w-full bg-gradient-to-t to-transparent p-4 text-black">
                  <h2 className={`text-3xl font-bold pb-4 ${card.textColor}`}>
                    {card.title}
                  </h2>
                  <p className={`text-sm font-bold pb-4 ${card.textColor}`}>
                    {card.description}
                  </p>
                  <p className={`font-medium ${card.textColor}`}>
                    {card.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*Service Scroll area */}
      <div className="relative  mt-[150px] w-full ">
        <h2 className="text-stone-500 text-4xl mb-10 ml-[150px]">
          <span className="text-black">ความช่วยเหลืออยู่ที่นี่ </span>{' '}
          ไม่ว่าเมื่อไหร่หรือแบบไหนที่คุณต้องการ
        </h2>

        {/* Navigation buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <FiChevronLeft size={35} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <FiChevronRight size={35} />
        </button>

        {/* Scroll area */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth py-5 no-scrollbar"
        >
          {services.map((card) => (
            <div
              key={card.id}
              className="min-w-[500px] h-[500px] left-[150px] rounded-xl shadow-lg hover:shadow-lg transition-all duration-300 relative"
            >
              <div className="rounded-xl overflow-hidden w-full h-[500px]  hover:scale-105 duration-300 ">
                <img
                  src={card.img}
                  alt={card.title}
                  className="object-cover w-full h-full transition-transform duration-300 "
                />
                <div className="absolute top-0 left-0 w-full bg-gradient-to-t to-transparent p-4 text-black">
                  <p className={`text-sm pb-4 text-gray-500`}>{card.title}</p>
                  <h2 className={`text-3xl pb-4 `}>{card.description}</h2>
                  <p className="">{card.context}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

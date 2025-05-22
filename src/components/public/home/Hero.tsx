'use client';

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import Slider to avoid SSR issues
const Slider = dynamic(() => import("react-slick"), { ssr: false });
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const heroContent = [
  {
    title:
      "Integrated Financial Management Information System (IFMIS) for Malawi",
    description:
      "The main purpose of implementing IFMIS is to improve financial management in Government. Specifically, the objectives of IFMIS Division are: Controlling over expenditure in Government; Production of timely financial reports; Enhancing transparency and accountability in government.",
    image: "/hero/1.JPG",
  },
  {
    title: "Accounting Services",
    description:
      "Accounting services is a division under AGD which is responsible for monitoring of Budget Implementation, Production of Public Financial Reports and making sure that there is total compliance to Public Finance Laws and Regulations.",
    image: "/hero/2.JPG",
  },
  {
    title: "Pay Services",
    description:
      "To provide efficient and effective pay services through processing of Pensions, Advances, Salaries and also workers compensation, general compensations and losses, subscriptions",
    image: "/hero/3.JPG",
  },
  {
    title: "Information and Communication Technology Services",
    description:
      "The Information and Communication Technology Unit is responsible for the provision of technical support services in an efficient and effective way to facilitate the smooth running of the SAP-Based IFMIS.",
    image: "/hero/6.JPG",
  },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
    customPaging: (i: number) => (
      <div
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i === activeSlide ? "bg-primary w-4" : "bg-white/50"
        }`}
      />
    ),
  };

  return (
    <div className="w-full overflow-hidden relative">
      <style jsx global>{`
        .slick-dots {
          position: absolute;
          bottom: 25px;
          display: flex !important;
          justify-content: center;
          width: 100%;
          padding: 0;
          margin: 0;
          list-style: none;
          z-index: 30;
        }
        .slick-dots li {
          margin: 0 5px;
        }
        .slick-dots li button {
          font-size: 0;
          line-height: 0;
          display: block;
          padding: 5px;
          color: transparent;
          border: 0;
          outline: none;
          background: transparent;
          cursor: pointer;
        }
        .slick-dots li button:before {
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          display: block;
          transition: all 0.3s ease;
        }
        .slick-dots li.slick-active button:before {
          background-color: var(--primary);
          width: 24px;
          border-radius: 12px;
        }
      `}</style>

      <Slider {...sliderSettings} className="hero-slider">
        {heroContent.map((content, index) => (
          <div key={index} className="relative h-[600px]">
            <Image
              src={content.image}
              alt={content.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/50 rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-700/50 rounded-tl-full" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 md:px-20">
              {/* Enhanced Title with decorative elements */}
              <div className="flex flex-col items-center mb-6 relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-20">
                  <div className="w-full h-full border-t-2 border-l-2 border-primary rotate-45 absolute" />
                  <div className="w-full h-full border-b-2 border-r-2 border-red-700 rotate-45 absolute" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-center leading-tight px-8 py-4">
                  <span className="relative">
                    {/* Main title text */}
                    <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                      {content.title}
                    </span>
                    {/* Decorative underline */}
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-white to-red-700" />
                  </span>
                </h2>
                {/* Additional decorative accent */}
                <div className="h-1 w-32 mt-6 bg-gradient-to-r from-primary to-red-700 rounded-full" />
              </div>

              {/* Description with styled container */}
              <div className="max-w-4xl bg-black/30 p-6 rounded-lg backdrop-blur-sm border border-white/10">
                <p className="text-base md:text-lg text-center leading-relaxed">
                  {content.description}
                </p>
              </div>

              {/* Animated Gradient Button */}
              <button className="mt-8 px-8 py-3 relative group overflow-hidden rounded-full">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-red-700 to-black animate-gradient-x" />

                {/* Button text */}
                <span className="relative z-10 text-white font-semibold">
                  Learn More
                </span>

                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20" />
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
} 
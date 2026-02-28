import React, { useState, useEffect } from "react";
import {
  heroImage,
  bottomLeftShape,
  topRightShape,
  dealBanner,
} from "@public/images";
import Picture from "../picture/Picture";

const DealBanner = () => {
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 326,
    hours: 3,
    minutes: 6,
    seconds: 52,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="w-full bg-white py-10 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="relative w-full h-[350px] sm:h-[400px] lg:h-[450px] bg-black overflow-hidden rounded-sm flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Picture
              src={dealBanner}
              alt="Keyboard Banner Background"
              className="object-cover w-full h-full opacity-90"
            />
          </div>

          {/* Decorative left shape overlapping box */}
          <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-20 w-16 lg:w-32 opacity-20 pointer-events-none mix-blend-screen">
            <Picture
              src={bottomLeftShape}
              alt="shape"
              className="object-contain"
            />
          </div>

          {/* Content Box */}
          <div className="relative z-10 bg-white ml-4 sm:ml-12 lg:ml-24 p-6 sm:p-8 lg:p-10 w-[90%] sm:w-[500px] lg:w-[550px] shadow-2xl rounded-sm">
            {/* Tag */}
            <h5 className="text-[#F24135] font-black tracking-widest text-sm mb-4">
              35%{" "}
              <span className="text-gray-400 font-semibold text-xs ml-1">
                OFF
              </span>
            </h5>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4 tracking-tight leading-snug">
              Great deal on Accessories.
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-[400px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              maecenas accumsan lacus vel facilisis.
            </p>

            {/* Timer */}
            <div className="inline-flex items-center gap-2 sm:gap-4 p-3 border border-red-100 rounded-sm bg-white">
              {/* Days */}
              <div className="flex flex-col items-center min-w-[50px]">
                <span className="text-lg sm:text-xl font-black text-gray-900">
                  {formatNumber(timeLeft.days)}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">
                  Days
                </span>
              </div>
              <span className="text-gray-300 font-bold mb-3">:</span>

              {/* Hours */}
              <div className="flex flex-col items-center min-w-[50px]">
                <span className="text-lg sm:text-xl font-black text-gray-900">
                  {formatNumber(timeLeft.hours)}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">
                  Hrs
                </span>
              </div>
              <span className="text-gray-300 font-bold mb-3">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center min-w-[50px]">
                <span className="text-lg sm:text-xl font-black text-gray-900">
                  {formatNumber(timeLeft.minutes)}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">
                  Min
                </span>
              </div>
              <span className="text-gray-300 font-bold mb-3">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center min-w-[50px]">
                <span className="text-lg sm:text-xl font-black text-gray-900">
                  {formatNumber(timeLeft.seconds)}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">
                  Sec
                </span>
              </div>
            </div>
          </div>

          {/* Decorative right shape */}
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 w-16 lg:w-24 opacity-20 pointer-events-none mix-blend-screen">
            <Picture
              src={topRightShape}
              alt="shape"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealBanner;

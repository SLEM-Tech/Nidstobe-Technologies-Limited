import React from "react";
import Link from "next/link";
import Picture from "../picture/Picture";
import { pinnacleImg } from "@public/images";

const BuyAccessories = () => {
  return (
    <div className="max-w-[1256px] mx-auto px-4 py-10 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left — Dark Card */}
        <div className="relative bg-[#1A1A2E] rounded-2xl overflow-hidden p-8 sm:p-12 flex flex-col justify-center min-h-[320px]">
          {/* Decorative arcs */}
          <div className="absolute bottom-0 left-0 w-40 h-40 border-2 border-white/10 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 border-2 border-white/10 rounded-full translate-y-1/2 pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            Buy <br />
            Accessories
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm mb-8">
            Boost performance, enhance productivity, and upgrade your workspace
            with reliable, modern tech essentials.
          </p>
          <div>
            <Link
              href="/category"
              className="inline-block bg-[#E91E8C] hover:bg-[#d4177f] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.2em] px-8 py-3.5 rounded transition-colors">
              Explore Shop
            </Link>
          </div>
        </div>

        {/* Right — Pinnacle Image */}
        <div className="bg-white rounded-2xl overflow-hidden flex items-center justify-center p-4">
          <Picture
            src={pinnacleImg}
            alt="Pinnacle Accessories"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default BuyAccessories;

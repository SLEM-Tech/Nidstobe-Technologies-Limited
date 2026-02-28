import React from "react";
import { FiBox, FiPhoneCall, FiTruck, FiShield } from "react-icons/fi";

const badges = [
  {
    title: "Product Packing",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    icon: <FiBox className="text-3xl text-emerald-400" />,
  },
  {
    title: "24X7 Support",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    icon: <FiPhoneCall className="text-3xl text-emerald-400" />,
  },
  {
    title: "Delivery in 5 Days",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    icon: <FiTruck className="text-3xl text-emerald-400" />,
  },
  {
    title: "Payment Secure",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    icon: <FiShield className="text-3xl text-emerald-400" />,
  },
];

const TrustBadges = () => {
  return (
    <div className="w-full bg-white py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center p-8 bg-[#FAFAFA] border border-gray-100/50 rounded-sm hover:shadow-sm transition-shadow">
              <div className="mb-4">{badge.icon}</div>
              <h4 className="text-gray-900 font-bold text-base mb-2 tracking-wide">
                {badge.title}
              </h4>
              <p className="text-gray-400 text-xs sm:text-sm max-w-[200px] leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;

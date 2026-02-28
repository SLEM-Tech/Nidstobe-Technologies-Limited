import React from "react";

interface FooterCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
}

const FooterCard = ({ icon, name, description }: FooterCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-[#F8F9FA] rounded-md p-6 sm:p-8 w-full gap-3 transition-transform hover:-translate-y-1 duration-300">
      <div className="flex items-center justify-center mb-1">{icon}</div>
      <div className="flex flex-col gap-1">
        <h4 className="text-[15px] sm:text-[17px] text-[#333333] font-bold leading-[1.2]">
          {name}
        </h4>
        <span className="text-xs sm:text-[13px] text-[#999999] font-medium leading-[1.5]">
          {description}
        </span>
      </div>
    </div>
  );
};

export default FooterCard;

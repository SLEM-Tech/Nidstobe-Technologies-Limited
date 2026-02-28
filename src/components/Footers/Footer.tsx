"use client";
import React from "react";
import FooterCard from "../Cards/FooterCard";
import Link from "next/link";
import useToken from "../hooks/useToken";
import { signOut } from "@utils/lib";
import { CompanyName, filterCustomersByEmail } from "@constants";
import { useCustomer } from "../lib/woocommerce";
import { LogoImage } from "@utils/function";
import { usePathname } from "next/navigation";
import {
  FiBox,
  FiPhoneCall,
  FiTruck,
  FiShield,
  FiMapPin,
  FiMail,
  FiSend,
  FiFacebook,
  FiTwitter,
  FiDribbble,
  FiInstagram,
} from "@node_modules/react-icons/fi";

const Footer = () => {
  const { email } = useToken();
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const { data: customer } = useCustomer("");
  const wc_customer2_info: Woo_Customer_Type[] = customer;
  const wc_customer_info: Woo_Customer_Type | undefined =
    filterCustomersByEmail(wc_customer2_info, email);
  const firstName = wc_customer_info?.first_name;

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Delivery Information", href: "/terms-of-use?delivery-return" },
    { label: "Privacy Policy", href: "/terms-of-use?privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-of-use?terms-of-use" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Support Center", href: "/faq" },
  ];

  const categoryLinks = [
    { label: "Dairy & Bakery", href: "/products-category/dairy-bakery" },
    {
      label: "Fruits & Vegetable",
      href: "/products-category/fruits-vegetable",
    },
    { label: "Snack & Spice", href: "/products-category/snack-spice" },
    { label: "Juice & Drinks", href: "/products-category/juice-drinks" },
    { label: "Chicken & Meat", href: "/products-category/chicken-meat" },
    { label: "Fast Food", href: "/products-category/fast-food" },
  ];

  const socialIcons = [
    {
      icon: (
        <FiFacebook className="text-gray-600 hover:text-primary-100 transition-colors" />
      ),
      href: "#",
    },
    {
      icon: (
        <FiTwitter className="text-gray-600 hover:text-primary-100 transition-colors" />
      ),
      href: "#",
    },
    {
      icon: (
        <FiDribbble className="text-gray-600 hover:text-primary-100 transition-colors" />
      ),
      href: "#",
    },
    {
      icon: (
        <FiInstagram className="text-gray-600 hover:text-primary-100 transition-colors" />
      ),
      href: "#",
    },
  ];

  return (
    <footer className="w-full relative bg-[#F8F9FA] overflow-hidden">
      {/* Decorative background images conceptually included here if available. For now they're absent. */}

      <div className="mx-auto max-w-[1400px] w-full px-4 sm:px-6 lg:px-8 pt-12 pb-6 relative z-10">
        {/* Main Footer Links & Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <LogoImage className="w-[120px] sm:w-[140px]" />
            <p className="text-[#666666] text-sm leading-[1.8] mt-2 mb-2 pr-4">
              FoodTrove is the biggest market of grocery products. Get your
              daily needs from our store.
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-primary-100 text-lg mt-1 shrink-0" />
                <span className="text-[#666666] text-sm leading-[1.6]">
                  51 Green St. Huntington ohio beach ontario, NY 11746 KY 4783,
                  USA.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-primary-100 text-lg shrink-0" />
                <span className="text-[#666666] text-sm">
                  example@email.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhoneCall className="text-primary-100 text-lg shrink-0" />
                <span className="text-[#666666] text-sm">+91 123 4567890</span>
              </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h3 className="text-black font-bold text-lg mb-2">Company</h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[#666666] text-sm hover:text-primary-100 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Category */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h3 className="text-black font-bold text-lg mb-2">Category</h3>
            <ul className="flex flex-col gap-3">
              {categoryLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[#666666] text-sm hover:text-primary-100 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <h3 className="text-black font-bold text-lg mb-2">
              Subscribe Our Newsletter
            </h3>

            <div className="flex items-center w-full max-w-sm border border-gray-200 bg-white rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="Search here..."
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-0 w-full"
              />
              <button className="px-4 text-black hover:text-primary-100 transition-colors">
                <FiSend className="text-xl" />
              </button>
            </div>

            <div className="flex items-center gap-3 mt-4">
              {socialIcons.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="p-2 border border-gray-200 rounded-md bg-white hover:border-primary-100 hover:shadow-sm transition-all shadow-sm">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="w-full border-gray-200 my-6" />

        {/* Bottom Bar: Copyright */}
        <div className="flex items-center justify-center pt-2 pb-4 text-center">
          <p className="text-[#666666] text-sm">
            &copy; {currentYear}{" "}
            <span className="text-primary-100">foodzy</span>, All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

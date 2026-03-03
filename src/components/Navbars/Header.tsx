"use client";
import React, { useMemo, useState, useTransition, Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { useAppDispatch, useAppSelector } from "../hooks";
import Drawer from "rc-drawer";
import { useCustomer } from "../lib/woocommerce";
import {
  currencyOptions,
  filterCustomersByEmail,
  headerNavLinks,
} from "@constants";
import { getFirstCharacter, signOut } from "@utils/lib";
import { LogoImage } from "@utils/function";
import Picture from "../picture/Picture";
import { APICall } from "@utils";
import { fetchExchangeRate } from "@utils/endpoints";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import FormToast from "../Reusables/Toast/SigninToast";
import useToken from "../hooks/useToken";

// Headless UI Components
import { Menu, Transition } from "@headlessui/react";
import {
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiShoppingCart,
  FiBookmark,
} from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import Flag from "react-world-flags";
import GlobalLoader from "../modal/GlobalLoader";
import MobileNav from "./MobileNav";
import ProductTable from "../Tables/ProductTable";
import CategoryPageBottomHeader from "./CategoryPageBottomHeader";
import ProductPageBottomHeader from "./ProductPageBottomHeader";
import HomePageBottomHeader from "./HomePageBottomHeader";
import { FaCartArrowDown } from "@node_modules/react-icons/fa";
import { BiUser } from "@node_modules/react-icons/bi";
import { ImSpinner2 } from "@node_modules/react-icons/im";

import FooterCard from "../Cards/FooterCard";
import { FiBox, FiPhoneCall, FiTruck, FiShield } from "react-icons/fi";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email } = useToken();
  const { totalItems } = useCart();

  const { baseCurrency } = useAppSelector((state) => state.currency);
  const [isPending, startTransition] = useTransition();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { data: customer } = useCustomer("");
  const wc_customer_info = useMemo(
    () => filterCustomersByEmail(customer as Woo_Customer_Type[], email),
    [customer, email],
  );

  const onOpenCart = () => setIsCartOpen(true);
  const onCloseCart = () => setIsCartOpen(false);

  const handleCurrencyChange = async (code: string) => {
    const selectedObj = currencyOptions.find((c) => c.code === code);
    if (!selectedObj) return;

    try {
      const data = await APICall(fetchExchangeRate, ["NGN", code], true, true);
      if (data) {
        dispatch(setExchangeRate(data));
        dispatch(setBaseCurrency(selectedObj));
        FormToast({ message: `Switched to ${code}`, success: true });
      }
    } catch (error) {
      FormToast({ message: "Currency switch failed", success: false });
    }
  };

  const handleSearch = () => {
    if (!searchValue) return;

    startTransition(() => {
      router.push(`/search?${searchValue}`);
    });
  };

  const userDropDownLinks = [
    {
      id: 1,
      href: "/user/dashboard",
      icon: <BiUser />,
      label: "My Account",
    },
    {
      id: 2,
      href: "/user/my-orders",
      icon: <FaCartArrowDown />,
      label: "Orders",
    },
    { id: 3, onClick: onOpenCart, icon: <FiShoppingCart />, label: "Cart" },
  ];

  return (
    <>
      <header className="flex flex-col w-full bg-white z-[100] fixed top-0 shadow-sm transition-all">
        {/* Desktop Header */}

        <div className="hidden slg:flex flex-col w-full mx-auto">
          {/* Top Tier (Navigation & Contact) */}
          <div className="w-full border-b border-gray-100 bg-[#FAFAFA]">
            <div className="max-w-[1440px] px-8 mx-auto flex items-center justify-between py-2.5">
              {/* Left: Menu & Nav Links */}
              <div className="flex items-center gap-8">
                <button className="flex items-center justify-center p-2 border border-gray-200 rounded hover:bg-gray-50 transition cursor-pointer bg-white">
                  <FiMenu className="text-gray-600 text-lg" />
                </button>

                <nav className="flex items-center gap-6">
                  {headerNavLinks.slice(0, 6).map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      className={`text-[13px] font-bold tracking-wide capitalize flex items-center gap-1 transition ${
                        pathname === link.href ?
                          "text-black"
                        : "text-gray-700 hover:text-black"
                      }`}>
                      {link.text}
                      {/* Add a dropdown arrow if the item typically has submenus. We'll simulate this for all except Home for the design match */}
                      {link.text !== "Home" && (
                        <SlArrowDown className="text-[9px] text-gray-500 mt-0.5 font-bold" />
                      )}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Right: Contact Info */}
              <div className="flex items-center gap-2 text-gray-700">
                <FiPhoneCall className="text-[13px] text-gray-500" />
                <span className="text-[13px] font-semibold tracking-wide">
                  +123 ( 456 ) ( 7890 )
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Tier (Logo, Search, User Actions) */}
          <div className="w-full bg-white">
            <div className="max-w-[1440px] px-8 mx-auto flex items-center justify-between py-5 gap-8">
              {/* Left: Logo */}
              <LogoImage className="w-[40px] sm:w-[40px] lg:w-[50px]" />

              {/* Center: Search Bar Component */}
              <div className="flex-1 max-w-2xl flex items-center border border-[#7DCCAE] rounded-md overflow-hidden bg-white h-11 transition-shadow hover:shadow-sm focus-within:shadow-sm focus-within:border-emerald-500">
                <input
                  type="text"
                  placeholder="Search For items..."
                  className="flex-1 h-full px-4 text-sm text-gray-700 placeholder-gray-400 border-none outline-none focus:ring-0 bg-transparent"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />

                {/* Divider */}
                <div className="h-6 w-px bg-gray-200"></div>

                {/* Categories Dropdown */}
                <div className="h-full flex px-3 items-center justify-between gap-3 text-sm text-gray-600 cursor-pointer bg-transparent hover:bg-gray-50">
                  <span className="truncate whitespace-nowrap min-w-[90px]">
                    All Categories
                  </span>
                  <SlArrowDown className="text-[10px] text-gray-400 font-bold" />
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="h-full px-6 flex items-center justify-center bg-[#F24135] hover:bg-[#d63428] text-white transition-colors cursor-pointer">
                  {isPending ?
                    <ImSpinner2 className="text-sm animate-spin" />
                  : <FiSearch className="text-lg font-bold" />}
                </button>
              </div>

              {/* Right: User Action Links */}
              <div className="flex items-center gap-6 xl:gap-8">
                {/* User Account Dropdown */}
                <Menu as="div" className="relative inline-block text-left">
                  {({ open }) => (
                    <>
                      <Menu.Button className="flex items-center gap-2 cursor-pointer group outline-none focus:ring-0 text-gray-700 hover:text-black transition">
                        <FiUser className="text-[22px] stroke-[1.5]" />
                        <span className="text-sm font-bold tracking-wide">
                          Account
                        </span>
                      </Menu.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="absolute right-0 mt-3 w-52 origin-top-right bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 z-[110] outline-none">
                          <div className="px-3 py-2 border-b border-gray-100 mb-1">
                            <p className="text-xs text-gray-500">
                              Logged in as
                            </p>
                            <p className="text-sm font-bold text-gray-900 truncate">
                              {wc_customer_info?.first_name || "User"}
                            </p>
                          </div>

                          <div className="flex flex-col gap-0.5">
                            {userDropDownLinks.map((item) => (
                              <Menu.Item key={item.id}>
                                {({ active }) => (
                                  <button
                                    onClick={(e) => {
                                      if (item.onClick) {
                                        e.preventDefault();
                                        item.onClick();
                                      } else if (item.href) {
                                        router.push(item.href);
                                      }
                                    }}
                                    className={`${
                                      active ?
                                        "bg-gray-50 text-gray-900"
                                      : "text-gray-600"
                                    } flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors`}>
                                    <span className="text-lg text-gray-400">
                                      {item.icon}
                                    </span>
                                    {item.label}
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </div>

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => signOut()}
                                className={`${
                                  active ?
                                    "bg-red-50 text-red-600"
                                  : "text-red-500"
                                } flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold mt-1 transition-colors`}>
                                <FiLogOut className="text-lg" /> Log Out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>

                {/* Wishlist Placeholder */}
                <Link
                  href="/wishlist"
                  className="flex items-center gap-2 group cursor-pointer text-gray-700 hover:text-black transition">
                  <FiBookmark className="text-[22px] stroke-[1.5]" />
                  <span className="text-sm font-bold tracking-wide">
                    Wishlist
                  </span>
                </Link>

                {/* Cart */}
                <button
                  className="relative flex items-center gap-2 group cursor-pointer text-gray-700 hover:text-black transition outline-none"
                  onClick={onOpenCart}>
                  <div className="relative">
                    <FiShoppingCart className="text-[22px] stroke-[1.5]" />
                    {totalItems > 0 && (
                      <span className="absolute -top-[5px] -right-[6px] size-[18px] bg-[#F24135] text-white text-[10px] font-black flex items-center justify-center rounded-full leading-none">
                        {totalItems}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold tracking-wide">Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header (Hidden on Laptop) */}
        <div className="slg:hidden flex flex-col w-full px-4 py-3 gap-3 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDrawerVisible(true)}
                className="p-1 border border-gray-200 rounded text-gray-700 bg-gray-50">
                <FiMenu className="text-xl" />
              </button>
              <LogoImage className="w-[40px] sm:w-[40px] lg:w-[50px]" />
            </div>

            <div className="flex items-center gap-4">
              <button onClick={onOpenCart} className="relative text-gray-700">
                <FiShoppingCart className="text-[22px] stroke-[1.5]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 size-4 bg-[#F24135] rounded-full text-[9px] font-black flex items-center justify-center text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="relative h-11 flex items-center border border-[#7DCCAE] rounded-md overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Search For items..."
              className="flex-1 h-full px-4 text-sm text-gray-700 placeholder-gray-400 border-none outline-none focus:ring-0 bg-transparent"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {isPending ?
              <ImSpinner2 className="absolute right-4 text-sm animate-spin text-gray-400" />
            : <FiSearch
                className="absolute right-4 text-lg text-gray-500 cursor-pointer"
                onClick={handleSearch}
              />
            }
          </div>
        </div>

        {/* Conditional Bottom Headers */}
        {pathname.includes("/category") ?
          <CategoryPageBottomHeader />
        : pathname.includes("/home-item") ?
          <ProductPageBottomHeader />
        : <HomePageBottomHeader />}
      </header>

      <Drawer
        open={isCartOpen}
        onClose={onCloseCart}
        placement="right"
        width={
          typeof window !== "undefined" && window.innerWidth > 768 ?
            500
          : "100%"
        }>
        <ProductTable onClose={onCloseCart} />
      </Drawer>

      <GlobalLoader isPending={isPending} />
      <MobileNav
        closeDrawer={() => setDrawerVisible(false)}
        drawerVisible={drawerVisible}
      />
    </>
  );
};

export default Header;

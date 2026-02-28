"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import {
  heroBg,
  heroImage,
  heroImage2,
  heroImage3,
  bottomLeftShape,
  topRightShape,
} from "@public/images";
import HeroCarousel from "../Cards/HeroCarousel";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { useCart } from "react-use-cart";
import TrustBadges from "./TrustBadges";
import DealBanner from "./DealBanner";
import BuyAccessories from "./BuyAccessories";
import { FiShoppingBag, FiCheck } from "react-icons/fi";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const AllCategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { addItem, getItem, removeItem } = useCart();

  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: CategoryType[] = categories;
  const TotalCatgory = Categories?.length - 1;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);

        const filteredCategories = categories
          ?.filter((category: CategoryType) => category?.count > 0)
          ?.slice(0, 5);

        if (filteredCategories) {
          const productsPromises = filteredCategories.map(
            async (category: CategoryType) => {
              const response = await WooCommerce.get(
                `products?category=${category?.id}`,
              );

              // Check if there is at least one product in the category
              const firstProductImage =
                response?.data.length > 0 ?
                  response?.data[0]?.images[0]?.src
                : null;

              return {
                categoryId: category?.id,
                firstProductImage: firstProductImage, // Store the first product's image
              };
            },
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with the first product images mapped by category
          const productsMap = productsResults.reduce(
            (acc: any, result: any) => ({
              ...acc,
              [result.categoryId]: result.firstProductImage,
            }),
            {},
          );

          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  // Fetch latest products for New Arrivals
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await WooCommerce.get(
          "products?orderby=date&order=desc&per_page=8",
        );
        if (response?.data) {
          setLatestProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    };
    fetchLatestProducts();
  }, []);

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
      setCurrentIndex((prevIndex) =>
        prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      // console.log(scrollLeft);
      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      }
    }
  };

  return (
    <>
      {/* Hero Concept inspired by the design */}
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#2c2f35] to-[#40434b] flex items-center justify-center py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-24 min-h-[500px] lg:min-h-[600px] pt-30">
        {/* Main hero background image wrapper */}
        <div className="absolute inset-0 z-0">
          <Picture
            src={heroBg}
            alt="Hero Background"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
          />
        </div>

        {/* Background Shapes */}
        <Picture
          src={bottomLeftShape}
          alt="decoration"
          className="absolute bottom-0 left-0 w-32 md:w-48 lg:w-64 opacity-80 z-[1] h-auto select-none object-contain pointer-events-none"
        />
        <Picture
          src={topRightShape}
          alt="decoration"
          className="absolute top-0 right-0 w-32 md:w-48 lg:w-64 opacity-80 z-[1] h-auto select-none object-contain rotate-180 pointer-events-none"
        />

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-8 items-center h-full">
          {/* Left Column (Text & Offer) */}
          <div className="flex flex-col items-start text-left lg:pl-10 space-y-4 lg:space-y-6 relative h-full justify-center">
            <p className="text-[#DB9E45] font-medium text-sm sm:text-lg lg:text-xl tracking-wide">
              Super Delicious
            </p>

            <h1 className="text-white font-black text-3xl sm:text-5xl lg:text-6xl lg:leading-[1.1] uppercase tracking-wide">
              THE BEST WAY TO <br className="hidden sm:block" />
              STUFF YOUR <br className="hidden sm:block" />
              WALLET.
            </h1>

            <p className="text-[#DB9E45] font-medium text-sm sm:text-base lg:text-lg tracking-wide">
              Today's Best Deal
            </p>

            <button className="flex items-center gap-3 bg-[#DB9E45] hover:bg-[#c98e3b] text-white rounded-full py-2.5 px-5 sm:py-3 sm:px-7 mt-4 transition-transform hover:scale-105 active:scale-95">
              <span className="bg-white text-[#DB9E45] w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs">
                →
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase">
                ORDER NOW
              </span>
            </button>

            {/* Simulated 50% OFF Badge Graphic */}
            <div className="absolute right-0 bottom-[-60px] lg:bottom-[-20%] lg:right-[-10%] select-none rotate-[-10deg] hidden sm:flex">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 border-[3px] border-white/60 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] border-dashed flex flex-col items-center justify-center">
                <span className="text-white font-light text-2xl sm:text-4xl lg:text-5xl leading-none">
                  50%
                </span>
                <span className="text-white font-light text-xl sm:text-2xl lg:text-3xl tracking-widest leading-none mt-1">
                  OFF
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (Hero Image) */}
          <div className="relative flex justify-center lg:justify-end items-center h-full mt-12 lg:mt-0 w-full min-h-[300px]">
            {/* The actual product image / monitor layout provided */}
            <div className="w-full flex justify-center lg:justify-end z-10 pointer-events-none text-right">
              <Picture
                src={heroImage}
                alt="Monitor Setup Background"
                className="w-full max-w-[700px] h-auto object-contain"
              />
            </div>

            {/* Note: If the lamp piece is a separate image, uncomment/add it below. 
                 Assuming it exists in heroImage composition right now. */}
            {/*
             <Picture
                src={lampImage}
                alt="Lamp"
                className="absolute right-0 bottom-0 w-32 h-auto"
             /> 
             */}
          </div>
        </div>

        {/* Contact info at bottom right */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 lg:bottom-8 lg:right-12 z-20 flex flex-col items-end text-right leading-snug">
          <a
            href="tel:609-791-3583"
            className="text-[#DB9E45] font-black text-sm sm:text-base lg:text-lg uppercase hover:underline">
            609-791-3583
          </a>
          <a
            href="https://www.exemple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium tracking-widest text-[10px] sm:text-xs lg:text-sm uppercase hover:text-gray-200 transition-colors">
            WWW.EXEMPLE.COM
          </a>
        </div>
      </div>

      <TrustBadges />

      {/* Popular Products Section */}
      <div className="max-w-[1440px] mx-auto px-4 py-12 sm:py-20 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-10 lg:mb-14 px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 tracking-wide mb-3">
            Popular Products
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore lacus vel facilisis.
          </p>
        </div>

        {/* Product Grid - 5 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 xl:gap-8">
          {latestProducts.length > 0 ?
            latestProducts.slice(0, 10).map((product: ProductType) => {
              const price = parseInt(product?.price || "0");
              const oldPrice =
                product?.regular_price ? parseInt(product.regular_price) : null;
              const slugDesc = convertToSlug(product?.name);
              const ID = product?.id?.toString();
              const cartItem = getItem(ID);
              const categoryName =
                product?.categories?.[0]?.name || "Accessory";

              // Mock rating
              const rating = 4.5;

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-white border border-gray-100 rounded p-4 hover:shadow-lg transition-shadow duration-300">
                  {/* Image Container with the little bag icon overlapping the bottom */}
                  <div className="relative w-full aspect-square bg-[#F9F9F9] rounded flex items-center justify-center p-6 mb-8 group-hover:bg-[#F0F0F0] transition-colors">
                    <Link
                      href={`/home-item/product/${slugDesc}-${product.id}`}
                      className="w-full h-full flex items-center justify-center outline-none">
                      <Picture
                        src={product?.images?.[0]?.src}
                        alt={product?.name}
                        className="object-contain max-h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Add to Cart Toggle Button */}
                    {price > 0 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (cartItem) removeItem(ID);
                          else
                            addItem({
                              id: ID,
                              name: product?.name,
                              price,
                              quantity: 1,
                              image: product?.images?.[0]?.src,
                            });
                        }}
                        className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm border ${
                          cartItem ?
                            "bg-[#F24135] text-white border-[#F24135] scale-110"
                          : "bg-white text-[#F24135] border-gray-200 hover:border-[#F24135] hover:text-white hover:bg-[#F24135]"
                        }`}
                        title={cartItem ? "Remove from Cart" : "Add to Cart"}>
                        {cartItem ?
                          <FiCheck className="text-sm font-bold" />
                        : <FiShoppingBag className="text-sm stroke-[2]" />}
                      </button>
                    )}
                  </div>

                  {/* Product Info (Centered) */}
                  <div className="flex flex-col items-center text-center">
                    <span className="text-[11px] text-gray-400 capitalize mb-1.5 tracking-wider">
                      {categoryName}
                    </span>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-2">
                      <FaStar className="text-[10px] text-[#F24135]" />
                      <FaStar className="text-[10px] text-[#F24135]" />
                      <FaStar className="text-[10px] text-[#F24135]" />
                      <FaStar className="text-[10px] text-[#F24135]" />
                      <FaStarHalfAlt className="text-[10px] text-[#F24135]" />
                      <span className="text-[10px] text-gray-400 font-medium ml-1">
                        ({rating})
                      </span>
                    </div>

                    <Link
                      href={`/home-item/product/${slugDesc}-${product.id}`}
                      className="text-[13px] font-bold text-gray-800 line-clamp-2 mb-2 hover:text-[#F24135] transition-colors leading-relaxed px-2"
                      dangerouslySetInnerHTML={{ __html: product?.name }}
                    />

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-[#F24135] font-black text-sm">
                        {price ?
                          <FormatMoney2 value={price} />
                        : "N/A"}
                      </span>
                      {oldPrice && oldPrice > price && (
                        <span className="text-xs text-gray-400 line-through font-semibold decoration-gray-300">
                          <FormatMoney2 value={oldPrice} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          : /* Loading Skeleton - 5 cols */
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex flex-col items-center bg-white border border-gray-100 rounded p-4">
                <div className="w-full aspect-square bg-gray-100 rounded mb-6" />
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-2 bg-gray-200 rounded w-1/2 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))
          }
        </div>
      </div>

      {/* Deal Banner Section */}
      <DealBanner />
    </>
  );
};

export default AllCategorySection;

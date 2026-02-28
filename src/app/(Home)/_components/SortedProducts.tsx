"use client";
import { convertToSlug } from "@constants";
import Picture from "@src/components/picture/Picture";
import { FormatMoney2 } from "@src/components/Reusables/FormatMoney";
import { useCategories, WooCommerce } from "@src/components/lib/woocommerce";
import GlobalLoader from "@src/components/modal/GlobalLoader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useCart } from "react-use-cart";
import { FiShoppingBag, FiCheck } from "react-icons/fi";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export const Loader = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 xl:gap-8 w-full">
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="animate-pulse flex flex-col items-center bg-white border border-gray-100 rounded p-4">
        <div className="w-full aspect-square bg-gray-100 rounded mb-6" />
        <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-2 bg-gray-200 rounded w-1/2 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    ))}
  </div>
);

const SortedProducts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saleProducts, setSaleProducts] = useState<ProductType[]>([]);
  const [popularProducts, setPopularProducts] = useState<ProductType[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { addItem, getItem, removeItem } = useCart();

  // Fetch sale products (on_sale) and popular products (by popularity)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const [saleRes, popularRes] = await Promise.all([
          WooCommerce.get(
            "products?on_sale=true&per_page=6&orderby=date&order=desc",
          ),
          WooCommerce.get("products?orderby=popularity&per_page=8&order=desc"),
        ]);
        if (saleRes?.data) setSaleProducts(saleRes.data);
        if (popularRes?.data) setPopularProducts(popularRes.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* ─── Popular Products Section ─── */}
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
          {isLoading ?
            <Loader />
          : popularProducts.slice(0, 10).map((product: ProductType) => {
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
          }
        </div>
      </div>
      {/* ─── Sale Section — Purple Background ─── */}

      <GlobalLoader isPending={isPending} />
    </>
  );
};

export default SortedProducts;

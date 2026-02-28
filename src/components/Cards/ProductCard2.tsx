"use client";

import React from "react";
import { useCart } from "react-use-cart";
import { FiShoppingBag, FiCheck } from "react-icons/fi";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import Link from "next/link";
import Picture from "../picture/Picture";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { convertToSlug } from "@constants";

interface ProductCard2Props {
  id: string | number;
  image: string;
  oldAmount?: string;
  newAmount: string;
  description: string;
  boxShadow?: boolean;
}

const ProductCard2 = ({
  id,
  image,
  oldAmount,
  newAmount,
  description,
  boxShadow = true,
}: ProductCard2Props) => {
  const { addItem, removeItem, updateItem, getItem } = useCart();

  const ID = id.toString();
  const cartItem = getItem(ID);
  const quantity = cartItem?.quantity || 0;
  const price = parseInt(newAmount);
  const slugDesc = convertToSlug(description);

  // Calculate Discount Percentage
  const discount =
    oldAmount ?
      Math.round(((parseInt(oldAmount) - price) / parseInt(oldAmount)) * 100)
    : 0;

  const addToCart = () => {
    if (cartItem) {
      removeItem(ID);
    } else {
      addItem({ id: ID, name: description, price, quantity: 1, image });
    }
  };

  const increase = () => updateItem(ID, { quantity: quantity + 1 });
  const decrease = () => {
    if (quantity <= 1) removeItem(ID);
    else updateItem(ID, { quantity: quantity - 1 });
  };

  const categoryName = "Accessory"; // Or accept as prop if needed
  const rating = 4.5;

  return (
    <div className="group relative flex flex-col bg-white border border-gray-100 rounded p-4 hover:shadow-lg transition-shadow duration-300 min-w-52 lg:min-w-64">
      {/* Image Container with the little bag icon overlapping the bottom */}
      <div className="relative w-full aspect-square bg-[#F9F9F9] rounded flex items-center justify-center p-6 mb-8 group-hover:bg-[#F0F0F0] transition-colors">
        <Link
          href={`/home-item/product/${slugDesc}-${id}`}
          className="w-full h-full flex items-center justify-center outline-none">
          <Picture
            src={image}
            alt={description}
            className="object-contain max-h-full group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Elegant Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-slate-900 text-white text-xs font-black px-2 py-1 rounded-sm shadow-sm z-10">
            -{discount}%
          </div>
        )}

        {/* Add to Cart Toggle Button */}
        {price > 0 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart();
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

        {/* Title / Description */}
        <Link
          href={`/home-item/product/${slugDesc}-${id}`}
          className="text-[13px] font-bold text-gray-800 line-clamp-2 mb-2 hover:text-[#F24135] transition-colors leading-relaxed px-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-[#F24135] font-black text-sm">
            {price ?
              <FormatMoney2 value={price} />
            : "N/A"}
          </span>
          {oldAmount && parseInt(oldAmount) > price && (
            <span className="text-xs text-gray-400 line-through font-semibold decoration-gray-300">
              <FormatMoney2 value={parseInt(oldAmount)} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;

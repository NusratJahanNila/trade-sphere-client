import React from "react";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const {
    productName,
    productImage,
    price,
    originCountry,
    rating,
    availableQuantity,
  } = product;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 h-[420px]">
      {/* Product Image */}
      <div className="p-3">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-48 object-cover rounded-xl"
        />
      </div>

      {/* Info Section */}
      <div className="px-4 flex-1 flex flex-col justify-between">
        {/* Top Row: Country + Rating */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
          <span className="font-medium">{originCountry}</span>
          <span className="flex items-center gap-1">
            <FaRegStar className="w-4 h-4 text-yellow-500 fill-yellow-500"/>
            {rating}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {productName}
        </h3>

        {/* Price & Quantity */}
        <div className="text-sm text-gray-600 mb-3">
          <p>
            <span className="font-medium text-gray-700">Price:</span>{" "}
            <span className="text-primary font-semibold">{price} BDT</span>
          </p>
          <p>
            <span className="font-medium text-gray-700">Available:</span>{" "}
            {availableQuantity} pcs
          </p>
        </div>
      </div>

      {/* See Details Button */}
      <div className="px-4 pb-4 mt-auto">
        <Link
          to={``}
          className="block w-full text-center bg-primary text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

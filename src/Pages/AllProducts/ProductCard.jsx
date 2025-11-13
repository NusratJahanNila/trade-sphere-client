import { DollarSign, LocateFixed, Package, TrendingUp } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { _id, productName, productImage, price, originCountry, rating, availableQuantity, } = product;

  return (
    <div className="overflow-hidden flex flex-col justify-between  h-[430px] border-2 border-gray-100 dark:border-gray-700 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl  hover:border-[#f04a00] dark:hover:border-[#f04a00] ">
      <div className="p-3">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-48 object-cover rounded-xl"
        />
      </div>

      <div className="px-4 flex-1 flex flex-col justify-between">

        <h3 className="text-lg font-semibold mb-2 line-clamp-1">
          {productName}
        </h3>
        <div className="badge badge-primary badge-outline text-xs p-3">
          <LocateFixed className="w-3 h-3 mr-1" />
          {originCountry}
        </div>

        <div className="grid grid-cols-3 gap-3 my-1 border-y py-3 border-gray-100">

          <div className="flex flex-col ">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-xs text-gray-500">Price</span>
            <p className="font-semibold text-md text-green-600">${price}</p>
          </div>

          <div className="flex flex-col ">
            <TrendingUp className="w-4 h-4 text-yellow-500" />
            <span className="text-xs text-gray-500">Rating</span>
            <p className="ml-1 font-semibold text-md text-yellow-500">{rating}</p>
          </div>

          <div className="flex flex-col ">
            <Package className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-gray-500">Quantity</span>
            <p className="font-semibold text-md text-blue-500">{availableQuantity}</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 mt-auto">
        <Link
          to={`/product-details/${_id}`}
          className="block w-full text-center bg-[#f04a00] hover:bg-[#e34234] text-white font-semibold py-2 rounded-xl transition-colors duration-200"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

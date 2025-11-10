import React, { use, useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import {  useParams } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

const ProductDetails = () => {
    const { user, } = use(AuthContext);
    // console.log(user)
    // data from useEffect
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true)

    const { id } = useParams();


    // API call from server
    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(res => res.json())
            .then(data => {
                // console.log('after token verify', data)
                setLoading(false)
                setProduct(data)
            })
    }, [user, id, setLoading,])

    if (loading) {
        return <p>Loading...</p>
    }
  const {
    productImage,
    productName,
    price,
    originCountry,
    rating,
    availableQuantity,
    exportBy,
    exportAt,
  } = product;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Product Image */}
        <div className="flex items-center justify-center bg-gray-100 p-6">
          <img
            src={productImage}
            alt={productName}
            className="rounded-xl object-cover w-full max-h-[420px]"
          />
        </div>

        {/* Right: Product Info */}
        <div className="p-8 flex flex-col justify-between">
          {/* Product Title */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {product.productName}
            </h2>

            {/* Rating and Country */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm">
                Origin: <span className="font-medium">{originCountry}</span>
              </span>
              <span className="flex items-center gap-1 text-yellow-500">
                <FaRegStar className="w-4 h-4 text-yellow-500 fill-yellow-500"/>
                <span className="text-gray-700 font-medium">{rating}</span>
              </span>
            </div>

            {/* Price and Availability */}
            <div className="mb-4 text-gray-700">
              <p className="text-lg font-semibold text-primary">
                Price: {price} BDT
              </p>
              <p className="text-sm mt-1">
                Available Quantity:
                <span className="font-medium">{availableQuantity}</span>
              </p>
            </div>

            {/* Export Info */}
            <div className="text-sm text-gray-600 mb-6">
              <p>
                Exported By: <span className="font-medium">{exportBy}</span>
              </p>
              <p>
                Exported At:
                <span className="font-medium">
                  {exportAt}
                </span>
              </p>
            </div>
          </div>

          {/* Import Now Button */}
          <button
            className="w-full mt-6 bg-primary hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 shadow"
            onClick={() => alert("Import Now clicked! (Modal to be added later)")}
          >
            Import Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

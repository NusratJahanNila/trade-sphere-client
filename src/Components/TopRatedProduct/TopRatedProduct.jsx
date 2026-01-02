import React, { useEffect, useState } from "react";
import { Star, TrendingUp } from "lucide-react";

const TopRatedProduct = () => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetch("https://trade-sphere-server.vercel.app/top-rated-products")
      .then((res) => res.json())
      .then((data) => {
        setTopProducts(data)
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="my-8 sm:my-12 md:my-16 shadow-sm shadow-gray-300 bg-base-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center p-4 sm:p-6 md:p-8 lg:p-10">

        {/* Left Content */}
        <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex gap-1 sm:gap-2 items-center justify-center lg:justify-start">
            <TrendingUp className="text-[#f04a00] w-6 h-7 sm:w-7 sm:h-8 md:w-8 md:h-10" />
            <span className="text-[#f04a00]">Top Rated</span> Products
          </h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
            Explore the most highly rated exports from our trusted exporters
            around the world. Quality products that meet international trade
            standards.
          </p>
        </div>

        {/* Product Cards */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {topProducts
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3)
            .map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-3 sm:gap-4 bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition p-3 sm:p-4"
              >
                {/* Product Image */}
                <div className="w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-24 shrink-0">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-full h-full object-cover rounded-md sm:rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-between grow min-w-0"> {/* min-w-0 prevents overflow */}
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
                    {product.productName}
                  </h3>

                  <div className="flex flex-wrap gap-1 sm:gap-2 items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <span>
                      Origin: <span className="font-medium">{product.originCountry}</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="sm:hidden block"></span>
                    <span>
                      Qty: <span className="font-medium">{product.availableQuantity}</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                      Price: <span className="text-primary"> {product.price.toLocaleString()} BDT</span>
                    </p>
                    <span className="flex items-center gap-1 text-sm sm:text-base">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}

          {/* If no products available */}
          {topProducts.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4 sm:py-6 text-sm sm:text-base">
              No top-rated products available yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopRatedProduct;

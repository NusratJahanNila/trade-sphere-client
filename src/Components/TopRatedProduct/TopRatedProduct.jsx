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
    <section className="my-10 ">
      <div className="max-w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center  shadow-sm shadow-gray-300 rounded-xl p-8 dark:bg-gray-800">

        <div className="space-y-4 text-center lg:text-left ">
          <h2 className="text-3xl font-bold flex gap-2 items-center"><TrendingUp className="text-[#f04a00] w-8 h-10"/> <span className="text-[#f04a00]">Top Rated</span> Products</h2>
          <p className="leading-relaxed max-w-md mx-auto lg:mx-0">
            Explore the most highly rated exports from our trusted exporters
            around the world. Quality products that meet international trade
            standards.
          </p>
        </div>

        {/*product cards */}
        <div className="flex flex-col gap-4">
          {topProducts.sort((a, b) => b.rating - a.rating).slice(0,3).map((product) => (
            <div
              key={product._id}
              className="flex items-center gap-4 bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
            >
              {/* Product Image */}
              <div className="w-28 h-24 shrink-0">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-between grow">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {product.productName}
                </h3>

                <p className="text-sm text-gray-500 mb-1">
                  Origin: <span className="font-medium">{product.originCountry}</span>
                </p>

                <p className="text-gray-700 font-medium">
                  Price: <span className="text-primary"> {product.price.toLocaleString()} BDT</span>
                </p>

                <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />{" "}
                    {product.rating}
                  </span>
                  <span>Qty: {product.availableQuantity}</span>
                </div>
              </div>
            </div>
          ))}

          {/* if less than 3 data available */}
          {topProducts.length === 0 && (
            <p className="text-gray-500 text-center py-6">
              No top-rated products available yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopRatedProduct;

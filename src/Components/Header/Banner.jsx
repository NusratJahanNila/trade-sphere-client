import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";

const Banner = ({ data }) => {
  return (
    <div className="w-11/12 mx-auto p-10 bg-blue-50 rounded-lg shadow-sm">
      <h2 className="text-3xl font-bold text-center mb-6">
        Explore Our <span className=" text-blue-900">Products</span>
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
      >
        {/* {skills.map((skill) => ( */}
        {data.map(product =>
          <SwiperSlide key={product._id}>
            <div className="rounded-2xl overflow-hidden shadow-xl group grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-64 border border-gray-400 rounded-2xl bg-cover "
              />
              <div className="">
                <h2 className="text-3xl font-bold">{product.productName}</h2>
                <p className="text-gray-500 text-sm mt-2">Get this {product.productName} at amazing deals, only on Trade Sphere.</p>
                <Link to='/all-products' className="btn btn-primary mt-4">Explore more</Link>
              </div>
            </div>
          </SwiperSlide>)
        }

        {/* ))} */}
      </Swiper>
    </div>
  );
};

export default Banner;

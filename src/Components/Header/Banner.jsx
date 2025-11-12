import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="w-11/12 mx-auto p-10 rounded-lg ">
      <h2 className="text-3xl font-bold text-center mb-6">
        Your Global Trade <span className="text-blue-900">Partner</span>
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
      >

        <SwiperSlide>
          <div
            className='rounded-2xl overflow-hidden shadow-2xl p-6 bg-blue-500/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[350px]' >

            <div className="md:order-1 order-2 p-4">
              <h2 className="text-2xl lg:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">Global Sourcing, Simplified.</h2>
              <p className="text-xl text-gray-700 mb-6">Browse millions of products and import to your Hub with a single click.</p>

              <Link to='/all-products' className="btn btn-primary btn-lg shadow-xl hover:shadow-none transition-all duration-300">Start Importing</Link>
            </div>

            <div className="md:order-2 order-1 flex justify-center items-center">
              <img
                src="https://i.ibb.co.com/ZzTTvcjQ/1688366606042-e-2147483647-v-beta-t-zo-L37-SQANfyv-P5-PU4538-Rz2yc-Dnkr-n2ki-DNSpk-Ddc.png"
                alt='Global Sourcing'
                className="w-full h-80 object-cover rounded-xl shadow-2xl transform transition duration-500"
              />
            </div>

          </div>

        </SwiperSlide>
        {/* 2nd slide */}
        <SwiperSlide>
          
          <div
            className='rounded-2xl overflow-hidden shadow-2xl p-6 bg-green-500/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[350px]' >

            <div className="md:order-1 order-2 p-4">
              <h2 className="text-2xl lg:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">Manage Your Exports in Real-Time.</h2>
              <p className="text-xl text-gray-700 mb-6">Securely track, update, and manage all your shipments from one unified dashboard.</p>

              <Link to='/my-exports' className="btn btn-primary btn-lg shadow-xl hover:shadow-none transition-all duration-300">Manage Exports</Link>
            </div>

            <div className="md:order-2 order-1 flex justify-center items-center">
              <img
                src="https://i.ibb.co.com/pr9xQ2NH/hand-drawn-delivery-concept-with-truck-23-2149147759.jpg"
                alt='Manage Your Exports'
                className="w-full h-80 object-cover rounded-xl shadow-2xl transform transition duration-500 "
              />
            </div>

          </div>

        </SwiperSlide>
        {/* 3rd slide */}
        <SwiperSlide>
          
          <div
            className='rounded-2xl overflow-hidden shadow-2xl p-6 bg-purple-500/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[350px]' >

            <div className="md:order-1 order-2 p-4">
              <h2 className="text-2xl lg:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">Secure Trade. Instant Sync.</h2>
              <p className="text-xl text-gray-700 mb-6">Experience enterprise-grade security and real-time data synchronization across all devices.</p>

              <Link to='/auth/login' className="btn btn-primary btn-lg shadow-xl hover:shadow-none transition-all duration-300">Join The Hub</Link>
            </div>

            <div className="md:order-2 order-1 flex justify-center items-center">
              <img
                src="https://i.ibb.co.com/Vpj8dD6s/hand-drawn-ai-investing-illustration-52683-156321.jpg"
                alt='Secure Trade'
                className="w-full h-80 object-cover rounded-xl shadow-2xl transform transition duration-500 "
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
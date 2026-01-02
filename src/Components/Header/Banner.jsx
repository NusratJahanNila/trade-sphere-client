import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 md:py-10 rounded-lg mt-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16">
        Your Global Trade <span className="text-[#f04a00]">Partner</span>
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
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 1, spaceBetween: 20 },
          1024: { slidesPerView: 1, spaceBetween: 25 },
        }}
      >
        <SwiperSlide>
          <div className='rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl p-4 sm:p-6 bg-blue-500/10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center min-h-[280px] sm:min-h-[320px] md:min-h-[350px]'>
            <div className="md:order-1 order-2 p-2 sm:p-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                Global Sourcing, Simplified.
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
                Browse millions of products and import to your Hub with a single click.
              </p>
              <Link 
                to='/all-products' 
                className="btn btn-sm sm:btn-md btn-outline border-2 border-[#e34234] text-[#e34324] hover:text-white hover:bg-[#f04a00] rounded-xl"
              >
                Start Importing
              </Link>
            </div>

            <div className="md:order-2 order-1 flex justify-center items-center">
              <img
                src="https://i.ibb.co.com/ZzTTvcjQ/1688366606042-e-2147483647-v-beta-t-zo-L37-SQANfyv-P5-PU4538-Rz2yc-Dnkr-n2ki-DNSpk-Ddc.png"
                alt='Global Sourcing'
                className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl"
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl p-4 sm:p-6 bg-green-500/10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center min-h-[280px] sm:min-h-[320px] md:min-h-[350px]'>
            <div className="md:order-1 order-2 p-2 sm:p-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                Manage Your Exports in Real-Time.
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
                Securely track, update, and manage all your shipments from one unified dashboard.
              </p>
              <Link 
                to='/my-export' 
                className="btn btn-sm sm:btn-md btn-outline border-2 border-[#e34234] text-[#e34324] hover:text-white hover:bg-[#f04a00] rounded-xl"
              >
                Manage Exports
              </Link>
            </div>

            <div className="md:order-2 order-1 flex justify-center items-center">
              <img
                src="https://i.ibb.co.com/pr9xQ2NH/hand-drawn-delivery-concept-with-truck-23-2149147759.jpg"
                alt='Manage Your Exports'
                className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl"
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl p-4 sm:p-6 bg-purple-500/10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center min-h-[280px] sm:min-h-[320px] md:min-h-[350px]'>
            <div className="md:order-1 order-2 p-2 sm:p-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                Secure Trade. Instant Sync.
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
                Experience enterprise-grade security and real-time data synchronization across all devices.
              </p>
              <Link 
                to='/auth/login' 
                className="btn btn-sm sm:btn-md btn-outline border-2 border-[#e34234] text-[#e34324] hover:text-white hover:bg-[#f04a00] rounded-xl"
              >
                Join The Hub
              </Link>
            </div>

            <div className="md:order-2 order-1 flex justify-center items-center">
              <img
                src="https://i.ibb.co.com/Vpj8dD6s/hand-drawn-ai-investing-illustration-52683-156321.jpg"
                alt='Secure Trade'
                className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
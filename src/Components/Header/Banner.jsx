import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {

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
          <SwiperSlide >
            <div className="rounded-2xl overflow-hidden shadow-xl group grid grid-cols-2 gap-5 items-center">
              <img
                // src={skill.image}
                // alt={skill.skillName}
                src='https://www.shutterstock.com/image-vector/vintage-persian-carpet-design-traditional-260nw-2606950665.jpg'
                alt=''
                className="w-full h-64  "
              />
              <div className="">
                <h2>Product Title</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, dolore, quod animi assumenda perspiciatis quibusdam illum officiis ratione culpa repellat esse. Nostrum quae at qui quis. Pariatur culpa possimus laborum?</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide >
            <div className="rounded-2xl overflow-hidden shadow-xl group grid grid-cols-2 gap-5 items-center">
              <img
                // src={skill.image}
                // alt={skill.skillName}
                src='https://www.shutterstock.com/image-vector/vintage-persian-carpet-design-traditional-260nw-2606950665.jpg'
                alt=''
                className="w-full h-64  "
              />
              <div className="">
                <h2>Product Title</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, dolore, quod animi assumenda perspiciatis quibusdam illum officiis ratione culpa repellat esse. Nostrum quae at qui quis. Pariatur culpa possimus laborum?</p>
              </div>
            </div>
          </SwiperSlide>
        {/* ))} */}
      </Swiper>
    </div>
  );
};

export default Banner;

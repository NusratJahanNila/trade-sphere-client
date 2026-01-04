// components/Testimonials.jsx
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Import Manager, TechGadgets Inc.",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            content: "TradeSphere revolutionized our import process. We reduced sourcing time by 70% and found reliable suppliers in Asia we never knew existed!",
            rating: 5,
            country: "🇺🇸 USA"
        },
        {
            name: "Mohammed Al-Farsi",
            role: "Export Director, TextileHub",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            content: "As an exporter from Bangladesh, this platform helped me reach European markets directly. My business grew 300% in the first year!",
            rating: 5,
            country: "🇧🇩 Bangladesh"
        },
        {
            name: "Elena Rodriguez",
            role: "CEO, EuroImport Ltd.",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            content: "The real-time tracking and secure payment system gave us confidence to expand into new markets. Best trade platform we've used!",
            rating: 5,
            country: "🇪🇸 Spain"
        },
        {
            name: "Kenji Tanaka",
            role: "Procurement Head, AutoParts Japan",
            image: "https://randomuser.me/api/portraits/men/67.jpg",
            content: "Finding quality industrial parts was challenging until we found TradeSphere. The verification system ensures we only deal with trusted partners.",
            rating: 4,
            country: "🇯🇵 Japan"
        },
        {
            name: "Sarah Johnson",
            role: "Import Manager, TechGadgets Inc.",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            content: "TradeSphere revolutionized our import process. We reduced sourcing time by 70% and found reliable suppliers in Asia we never knew existed!",
            rating: 5,
            country: "🇺🇸 USA"
        },
        {
            name: "Mohammed Al-Farsi",
            role: "Export Director, TextileHub",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            content: "As an exporter from Bangladesh, this platform helped me reach European markets directly. My business grew 300% in the first year!",
            rating: 5,
            country: "🇧🇩 Bangladesh"
        },
        {
            name: "Elena Rodriguez",
            role: "CEO, EuroImport Ltd.",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            content: "The real-time tracking and secure payment system gave us confidence to expand into new markets. Best trade platform we've used!",
            rating: 5,
            country: "🇪🇸 Spain"
        },
        {
            name: "Kenji Tanaka",
            role: "Procurement Head, AutoParts Japan",
            image: "https://randomuser.me/api/portraits/men/67.jpg",
            content: "Finding quality industrial parts was challenging until we found TradeSphere. The verification system ensures we only deal with trusted partners.",
            rating: 4,
            country: "🇯🇵 Japan"
        },
    ];

    return (
        <section className="py-16  dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 lg:mb-14">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        What Our <span className="text-[#f04a00]">Customers Say</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
                        Real stories from global traders who transformed their business
                    </p>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }
                        }}
                        className="pb-12"
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-7 shadow-lg  border border-gray-100 dark:border-gray-700 h-90">
                                    {/* Quote Icon */}
                                    <div className="mb-4 text-[#f04a00]/20">
                                        <Quote className="w-10 h-10" />
                                    </div>

                                    {/* Rating */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < testimonial.rating
                                                        ? 'text-yellow-500 fill-yellow-500'
                                                        : 'text-gray-300 dark:text-gray-600'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Content */}
                                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base italic mb-6 leading-relaxed">
                                        "{testimonial.content}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full border-2 border-[#f04a00] object-cover"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                                                {testimonial.name}
                                            </h4>
                                            <div className="flex items-center gap-2">
                                                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                                                    {testimonial.role}
                                                </p>
                                                <span className="text-lg">{testimonial.country}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

               
            </div>
        </section>
    );
};

export default Testimonials;
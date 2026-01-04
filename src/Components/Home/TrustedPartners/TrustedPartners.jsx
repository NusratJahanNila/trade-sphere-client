// components/TrustedPartners.jsx (Simpler Carousel Version)
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TrustedPartners = () => {
    const partners = [
        { name: "DHL", color: "#FFCC00" },
        { name: "FedEx", color: "#4D148C" },
        { name: "Maersk", color: "#E40521" },
        { name: "UPS", color: "#FFB500" },
        { name: "HSBC", color: "#DB0011" },
        { name: "PayPal", color: "#003087" },
        { name: "Visa", color: "#1A1F71" },
        { name: "Mastercard", color: "#EB001B" }
    ];

    const itemsPerPage = 4;
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex + itemsPerPage >= partners.length ? 0 : prevIndex + itemsPerPage
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex - itemsPerPage < 0 ? partners.length - itemsPerPage : prevIndex - itemsPerPage
        );
    };

    const visiblePartners = partners.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <section className="mt-10 py-6 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Trusted By <span className="text-[#f04a00]">Global Leaders</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
                        Partnered with world's leading logistics and payment providers
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 btn btn-circle btn-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 btn btn-circle btn-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Partners Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-8">
                        {visiblePartners.map((partner, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-[#f04a00]/50 p-6 flex items-center justify-center h-32"
                            >
                                <div
                                    className="text-xl md:text-2xl font-bold"
                                    style={{ color: partner.color }}
                                >
                                    {partner.name}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {Array.from({ length: Math.ceil(partners.length / itemsPerPage) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index * itemsPerPage)}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    currentIndex === index * itemsPerPage 
                                        ? 'bg-[#f04a00]' 
                                        : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Partner Benefits */}
                <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {[
                        {
                            title: "Integrated Logistics",
                            description: "Seamless shipping with real-time tracking"
                        },
                        {
                            title: "Secure Payments",
                            description: "Multiple payment options with fraud protection"
                        },
                        {
                            title: "Global Network",
                            description: "Local expertise in 150+ countries worldwide"
                        }
                    ].map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-linear-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-5 sm:p-6 border border-orange-200 dark:border-gray-700"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-[#f04a00] flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                                    {benefit.title}
                                </h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedPartners;
// components/TrustedPartners.jsx
import { useState } from 'react';

const TrustedPartners = () => {
  const [isPaused, setIsPaused] = useState(false);

  const partners = [
    { name: "DHL", logo: "https://cdn.worldvectorlogo.com/logos/dhl-2.svg", color: "#FFCC00" },
    { name: "FedEx", logo: "https://cdn.worldvectorlogo.com/logos/fedex-express-6.svg", color: "#4D148C" },
    { name: "Maersk", logo: "https://cdn.worldvectorlogo.com/logos/maersk-2.svg", color: "#E40521" },
    { name: "UPS", logo: "https://cdn.worldvectorlogo.com/logos/ups-3.svg", color: "#FFB500" },
    { name: "HSBC", logo: "https://cdn.worldvectorlogo.com/logos/hsbc-2.svg", color: "#DB0011" },
    { name: "PayPal", logo: "https://cdn.worldvectorlogo.com/logos/paypal-3.svg", color: "#003087" },
    { name: "Visa", logo: "https://cdn.worldvectorlogo.com/logos/visa.svg", color: "#1A1F71" },
    { name: "Mastercard", logo: "https://cdn.worldvectorlogo.com/logos/mastercard-2.svg", color: "#EB001B" }
  ];

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted By <span className="text-[#f04a00]">Global Leaders</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Partnered with world's leading logistics and payment providers
          </p>
        </div>

        {/* Marquee Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 w-16 sm:w-24 h-full bg-linear-to-r from-white dark:from-gray-800 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-16 sm:w-24 h-full bg-linear-to-l from-white dark:from-gray-800 to-transparent z-10"></div>

          {/* Marquee */}
          <div className={`overflow-hidden ${isPaused ? '' : 'animate-marquee'}`}>
            <div className="flex space-x-8 sm:space-x-12 py-4">
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={index}
                  className="shrink-0 w-32 sm:w-40 h-20 sm:h-24 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-[#f04a00]/50 flex items-center justify-center p-4"
                >
                  {/* For production, use actual SVG/logos */}
                  <div 
                    className="text-2xl sm:text-3xl font-bold text-center"
                    style={{ color: partner.color }}
                  >
                    {partner.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second row (reverse) */}
          {/* <div className={`mt-6 overflow-hidden ${isPaused ? '' : 'animate-marquee-reverse'}`}>
            <div className="flex space-x-8 sm:space-x-12 py-4">
              {duplicatedPartners.reverse().map((partner, index) => (
                <div
                  key={index}
                  className="shrink-0 w-32 sm:w-40 h-20 sm:h-24 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-[#f04a00]/50 flex items-center justify-center p-4"
                >
                  <div 
                    className="text-xl sm:text-2xl font-bold text-center opacity-80"
                    style={{ color: partner.color }}
                  >
                    {partner.name}
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/*  marquee animation */}
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-reverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .animate-marquee-reverse {
            animation: marquee-reverse 40s linear infinite;
          }
        `}</style>

        {/* Partner Benefits */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "Integrated Logistics",
              description: "Seamless shipping with real-time tracking across all partners"
            },
            {
              title: "Secure Payments",
              description: "Multiple payment options with fraud protection & escrow"
            },
            {
              title: "Global Network",
              description: "Access to local expertise in 150+ countries worldwide"
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
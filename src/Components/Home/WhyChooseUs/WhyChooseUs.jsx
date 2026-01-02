// components/WhyChooseUs.jsx
import { Shield, Zap, Globe, Users, BarChart, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Access products from 150+ countries with local trade support",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Trading",
      description: "Bank-level security with escrow protection for all transactions",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Processing",
      description: "Instant product imports and 24-hour export listing approval",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Verified Partners",
      description: "All exporters are verified with trade history and ratings",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Track market trends, pricing, and your trade performance",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service in multiple languages",
      gradient: "from-teal-500 to-green-500"
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose <span className="text-[#f04a00]">TradeSphere</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Experience the future of global trade with our platform advantages
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-[#f04a00]/30"
            >
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              
              {/* Icon with gradient background */}
              <div className={`mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[#f04a00] to-orange-400 group-hover:w-20 transition-all duration-300 rounded-t-full"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        {/* <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: "10K+", label: "Active Traders" },
            { value: "150+", label: "Countries" },
            { value: "5M+", label: "Products" },
            { value: "99.7%", label: "Satisfaction" }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 text-center border border-gray-100 dark:border-gray-800 hover:border-[#f04a00]/50 transition-colors"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f04a00] mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default WhyChooseUs;
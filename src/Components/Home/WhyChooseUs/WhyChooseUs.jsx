import { Shield, Zap, Globe, Users, BarChart, Clock } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Global Reach",
      description: "Access products from 150+ countries worldwide.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure Trading",
      description: "Bank-level security with escrow protection.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Fast Processing",
      description: "Instant imports and quick export approvals.",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Verified Partners",
      description: "All exporters are verified and rated.",
    },
    {
      icon: <BarChart className="w-5 h-5" />,
      title: "Real-time Analytics",
      description: "Track performance and market trends easily.",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "24/7 Support",
      description: "Round-the-clock customer assistance.",
    },
  ];

  return (
    <section className="w-full bg-linear-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-6">
      <div className="">
        <h2 className="text-3xl text-center mx-auto font-bold text-gray-900 dark:text-white mb-4">
          Why Choose <span className="text-[#f04a00]">TradeSphere</span>
        </h2>
        <p className="text-gray-600 mx-auto dark:text-gray-300 mb-8 max-w-xl text-center">
          TradeSphere helps you import and export with confidence, speed, and
          transparency — all in one global platform.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-10">

          {/* LEFT CONTENT */}
          <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition"
                >
                  <div className="p-2 rounded-lg bg-[#f04a00]/10 text-[#f04a00]">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-base">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://i.ibb.co.com/B5MyHsbm/different-people-asking-questions-illustrated-23-2148904558.jpg"
              alt="Why Choose TradeSphere"
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

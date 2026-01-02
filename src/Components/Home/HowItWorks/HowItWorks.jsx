// components/HowItWorks.jsx
const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Browse Products",
      description: "Explore millions of global products with filters & search",
      icon: "🔍",
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 2,
      title: "One-Click Import",
      description: "Add any product to your imports with a single click",
      icon: "⬇️",
      color: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 3,
      title: "Track & Manage",
      description: "Monitor your imports/exports in real-time dashboard",
      icon: "📊",
      color: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 4,
      title: "Secure Payment",
      description: "Safe transactions with multiple payment options",
      icon: "🔒",
      color: "bg-orange-100 dark:bg-orange-900/30",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How <span className="text-[#f04a00]">TradeSphere</span> Works
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Simple 4-step process to start your global trade journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative group"
            >
              {/* Step Number */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[#f04a00] text-white font-bold text-sm z-10">
                {step.id}
              </div>
              
              {/* Step Card */}
              <div className={`${step.color} rounded-2xl p-6 sm:p-7 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#f04a00]/20 pt-10`}>
                <div className="text-4xl mb-4 text-center">{step.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base text-center">
                  {step.description}
                </p>
              </div>

              {/* Connector line between steps (hidden on mobile) */}
              {index < steps.length - 1 && (
                <>
                  <div className="hidden lg:block absolute top-10 right-0 w-full h-0.5 bg-gradient-to-r from-[#f04a00] to-transparent transform translate-x-1/2"></div>
                  <div className="hidden sm:block lg:hidden absolute top-10 right-0 w-0.5 h-full bg-gradient-to-b from-[#f04a00] to-transparent transform translate-x-1/2"></div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
const About = () => {
  return (
    <section className="py-12 md:py-16 bg-base-200 mt-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-2">
            About <span className="text-[#f04a00]">TradeSphere</span>
          </h2>
          <p className="text-gray-600 mx-auto dark:text-gray-300 mb-8 max-w-xl text-center">
            Learn about our mission, team, and values
          </p>
        </div>

        {/* DaisyUI Tabs - Lift Style */}
        <div className="tabs tabs-lift justify-start mb-8">
          <input 
            type="radio" 
            name="about_tabs" 
            className="tab" 
            aria-label="Our Story" 
            defaultChecked 
          />
          <div className="tab-content bg-base-100 border border-base-300 dark:border-gray-700 rounded-box p-0 mt-3">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Our Journey
              </h3>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Founded in 2018, TradeSphere started as a platform to connect local exporters in Bangladesh with regional markets. Our vision was simple: make international trade accessible to businesses of all sizes.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Today, we've grown into a global marketplace serving businesses in 150+ countries, facilitating over $500M in annual trade volume. We help thousands of companies expand internationally without traditional barriers.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-3 bg-base-200 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-[#f04a00]">2018</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Founded</div>
                  </div>
                  <div className="text-center p-3 bg-base-200 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-[#f04a00]">150+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Countries</div>
                  </div>
                  <div className="text-center p-3 bg-base-200 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-[#f04a00]">10K+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Businesses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <input 
            type="radio" 
            name="about_tabs" 
            className="tab" 
            aria-label="Mission & Vision" 
          />
          <div className="tab-content bg-base-100 border border-base-300 dark:border-gray-700 rounded-box p-0 mt-3">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mission */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                    To democratize global trade by providing businesses of all sizes with tools, connections, and security needed to compete internationally without traditional barriers.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Eliminate trade barriers',
                      'Simplify cross-border transactions',
                      'Ensure secure payments',
                      'Provide real-time tracking'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#f04a00] mt-2"></div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Vision */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Our Vision
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                    To become the world's most trusted digital trade ecosystem where any business can seamlessly connect, trade, and grow with confidence.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Global trade network by 2025',
                      'AI-powered trade insights',
                      'Blockchain-based transactions',
                      'Carbon-neutral shipping options'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 mt-2"></div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <input 
            type="radio" 
            name="about_tabs" 
            className="tab" 
            aria-label="Our Team" 
          />
          <div className="tab-content bg-base-100 border border-base-300 dark:border-gray-700 rounded-box p-0 mt-3">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Leadership Team
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    name: "Nusrat Jahan",
                    role: "CEO & Founder",
                    bio: "1.5+ years in international trade and business strategy"
                  },
                  {
                    name: "Nila Moni",
                    role: "Chief Operations Officer",
                    bio: "Supply chain and logistics expert with global experience"
                  },
                  {
                    name: "Arzun Majumdar",
                    role: "Chief Technology Officer",
                    bio: "Specialized in fintech, blockchain, and trade technology"
                  },
                  {
                    name: "Tasfia Sultana",
                    role: "Head of Growth",
                    bio: "Market expansion and business development specialist"
                  }
                ].map((member, idx) => (
                  <div key={idx} className="p-4 bg-base-200 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f04a00] flex items-center justify-center text-white font-semibold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {member.name}
                        </h4>
                        <div className="text-[#f04a00] text-sm mb-1">{member.role}</div>
                        <p className="text-gray-600 dark:text-gray-300 text-xs">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-base-200 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  <span className="font-semibold text-[#f04a00]">Global Team:</span> 200+ professionals across 12 countries, dedicated to transforming global trade.
                </p>
              </div>
            </div>
          </div>

          <input 
            type="radio" 
            name="about_tabs" 
            className="tab" 
            aria-label="Our Values" 
          />
          <div className="tab-content bg-base-100 border border-base-300 dark:border-gray-700 rounded-box p-0 mt-3">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Core Values
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Integrity First",
                    description: "Transparent, honest, and ethical practices in all dealings"
                  },
                  {
                    title: "Customer Success",
                    description: "Your growth and satisfaction are our primary metrics"
                  },
                  {
                    title: "Innovation",
                    description: "Constantly evolving to provide better trade solutions"
                  },
                  {
                    title: "Global Mindset",
                    description: "Thinking beyond borders while respecting local cultures"
                  },
                  {
                    title: "Partnership",
                    description: "Collaborative approach to mutual growth and success"
                  },
                  {
                    title: "Sustainability",
                    description: "Responsible and eco-friendly trade practices"
                  }
                ].map((value, idx) => (
                  <div key={idx} className="p-4 bg-base-200 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-md bg-[#f04a00]/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#f04a00]"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {value.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-xs">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
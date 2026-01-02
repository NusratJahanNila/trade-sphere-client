const TermsAndCondition = () => {
  return (
    <section className="py-12 md:py-16 mt-10 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Terms & <span className="text-[#f04a00]">Conditions</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Last updated: January 2026
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Terms List */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-6 bg-[#f04a00] rounded"></div>
                1. Acceptance of Terms
              </h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>By accessing and using TradeSphere, you accept and agree to be bound by these Terms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>You must be at least 18 years old to use our platform for trade activities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>We reserve the right to modify these Terms at any time. Continued use constitutes acceptance.</span>
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-6 bg-[#f04a00] rounded"></div>
                2. User Accounts
              </h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>You are responsible for maintaining the confidentiality of your account credentials.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>All account activities are your responsibility. Notify us immediately of any unauthorized use.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>We may suspend or terminate accounts violating these Terms or engaging in fraudulent activities.</span>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-6 bg-[#f04a00] rounded"></div>
                3. Trade & Transactions
              </h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>TradeSphere acts as a platform connecting exporters and importers. We are not a party to transactions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>Import quantities cannot exceed available stock. Orders violating this will be cancelled.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>Prices are set by exporters and may change. Final price is confirmed at checkout.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>Shipping costs, taxes, and customs duties are the responsibility of the buyer unless stated otherwise.</span>
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-6 bg-[#f04a00] rounded"></div>
                4. Product Listings
              </h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>Exporters must provide accurate product information, including origin, specifications, and pricing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>Prohibited items include illegal goods, counterfeit products, and restricted materials.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>We reserve the right to remove listings violating policies or applicable laws.</span>
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-6 bg-[#f04a00] rounded"></div>
                5. Intellectual Property
              </h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>TradeSphere and its content are protected by copyright, trademark, and other laws.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>You may not copy, modify, or distribute platform content without permission.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>User-generated content remains your property but grants us license to display it on the platform.</span>
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-6 bg-[#f04a00] rounded"></div>
                6. Limitation of Liability
              </h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>TradeSphere is not liable for indirect, incidental, or consequential damages from platform use.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>Maximum liability is limited to fees paid to us in the preceding 6 months.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f04a00]"></div>
                  </div>
                  <span>We are not responsible for disputes between users. Resolution tools are provided as courtesy.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="sticky top-24">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Important Information
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Please read all terms and conditions carefully before using our platform
                </p>
              </div>

              {/* Terms & Conditions Illustration */}
              <div className="mb-6">
                <div className="w-full h-64 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
                  <img
                    src="https://i.ibb.co.com/0RnKVHMn/man-stands-clipboard-with-checklist-it-possibly-inspecting-completing-tasks-online-employment-contra.jpg"
                    alt="Person reviewing terms and conditions checklist"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Optional caption */}
                <p className="text-center text-gray-500 dark:text-gray-400 text-xs mt-2 italic">
                  Reviewing terms carefully ensures a smooth trade experience
                </p>
              </div>

              {/* Key Points Box */}
              <div className="bg-base-100 dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Key Points to Remember:
                </h4>
                <div className="space-y-3">
                  {[
                    "Review terms before trading",
                    "Keep account credentials secure",
                    "Verify product details before importing",
                    "Contact support for disputes",
                    "Check for updates regularly"
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#f04a00]/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#f04a00]"></div>
                      </div>
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-6 p-4 bg-base-200 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                  Questions about our Terms?<br />
                  <span className="text-[#f04a00] font-medium">Contact: legal@tradesphere.com</span>
                </p>
              </div>
            </div>

            {/* Update Notice */}
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                </div>
                <div>
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium mb-1">
                    Terms Update Notice
                  </p>
                  <p className="text-yellow-700 dark:text-yellow-300 text-xs">
                    These terms were last updated on January 3,2026. Major changes will be notified via email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndCondition;
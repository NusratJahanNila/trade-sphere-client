// components/FAQ.jsx
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I start importing products?",
      answer: "Simply browse our product catalog, click 'Import Now' on any product, enter your desired quantity, and confirm. Your product will be added to 'My Imports' section."
    },
    {
      question: "Is there a minimum order quantity?",
      answer: "No minimum quantity required. You can import as little as 1 unit of any product available in our marketplace."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, PayPal, bank transfers, and offer secure escrow services for large transactions."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary by origin country and product type. Typically 7-21 days. You can track shipments in real-time from your dashboard."
    },
    {
      question: "Can I export my own products?",
      answer: "Yes! Registered users can add products to export from 'Add Export' page. Your products will appear in our global marketplace."
    },
    {
      question: "Is my trade data secure?",
      answer: "We use enterprise-grade encryption, secure servers, and comply with international data protection regulations (GDPR)."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked <span className="text-[#f04a00]">Questions</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Find quick answers to common questions about global trade
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#f04a00]/50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 flex justify-between items-center bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-left text-sm sm:text-base font-medium text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <span className="text-[#f04a00] shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </span>
              </button>
              
              <div
                className={`px-5 sm:px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index 
                    ? 'max-h-96 py-4 sm:py-5 border-t border-gray-200 dark:border-gray-700' 
                    : 'max-h-0'
                }`}
              >
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-10 sm:mt-12 text-center p-5 sm:p-6 bg-linear-to-r from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-orange-200 dark:border-gray-700">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4">
            Our trade experts are available 24/7 to help you
          </p>
          <Link to={"/contact"} className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#f04a00] text-white font-medium rounded-lg hover:bg-[#e34234] transition-colors text-sm sm:text-base">
            Contact Support
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
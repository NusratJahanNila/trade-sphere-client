// components/CTA.jsx
import { ArrowRight, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router';

const CTA = () => {
    return (
        <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-[#f04a00]/10 via-orange-50/30 to-transparent dark:from-[#f04a00]/5 dark:via-gray-900/50"></div>

            {/* Animated Background Elements */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-[#f04a00]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Content */}
                        <div className="p-8 sm:p-10 lg:p-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f04a00]/10 text-[#f04a00] text-sm font-medium mb-6">
                                <TrendingUp className="w-4 h-4" />
                                Limited Time Offer
                            </div>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Start Your Global Trade Journey
                                <span className="text-[#f04a00]"> Today!</span>
                            </h2>

                            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-8 leading-relaxed">
                                Join thousands of successful traders. Get verified, access premium features,
                                and receive <span className="font-semibold text-[#f04a00]">1-month free premium membership</span>
                                when you sign up this week!
                            </p>

                            {/* Benefits List */}
                            <div className="space-y-3 mb-8">
                                {[
                                    "✓ No hidden fees or commissions",
                                    "✓ Priority customer support",
                                    "✓ Advanced analytics dashboard",
                                    "✓ Custom trade alerts & insights"
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                                            {benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/auth/register"
                                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-[#f04a00] to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base"
                                >
                                    Get Started Free
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Link>
                                <Link
                                    to="/all-products"
                                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-[#f04a00] hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 text-sm sm:text-base"
                                >
                                    Browse Products
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Trust Indicator */}
                            <div className="mt-8 flex items-center gap-3 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                                <Users className="w-4 h-4" />
                                <span>Join 10,000+ trusted traders worldwide</span>
                            </div>
                        </div>

                        {/* Right Visual */}
                        <div className="bg-linear-to-br from-[#f04a00]/5 to-orange-400/10 dark:from-gray-800 dark:to-gray-900 p-8 sm:p-10 lg:p-12 flex items-center justify-center">
                            <div className="relative w-full max-w-md">
                                {/* Stats Cards */}
                                <div className="absolute -top-6 -left-6 w-40 h-32 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700 transform rotate-3">
                                    <div className="text-3xl font-bold text-[#f04a00] mb-1">150+</div>
                                    <div className="text-gray-600 dark:text-gray-300 text-sm">Countries Available</div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#f04a00] rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="absolute -bottom-6 -right-6 w-40 h-32 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700 transform -rotate-3">
                                    <div className="text-3xl font-bold text-[#f04a00] mb-1">5M+</div>
                                    <div className="text-gray-600 dark:text-gray-300 text-sm">Products Listed</div>
                                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#f04a00] rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Main Image/Illustration */}
                                <div className="relative z-10 bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                                    <div className="text-center">
                                        <div className="text-5xl mb-4">🌐</div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            Global Trade Made Easy
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            Start trading in minutes, not days
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
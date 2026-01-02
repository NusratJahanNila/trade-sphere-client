// components/Contact.jsx
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <section className="py-12 md:py-16 mt-10 bg-base-200 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        Contact <span className="text-[#f04a00]">Information</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                        Reach out to us through any of these channels
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Address Card */}
                    <div className="bg-base-100 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#f04a00]/10 flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-[#f04a00]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Office Address
                            </h3>
                        </div>
                        <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                            <p>Ullon Road, West Rampura</p>
                            <p>Rampura, 1219</p>
                            <p>Dhaka, Dhaka Division</p>
                            <p className="font-medium">Bangladesh</p>
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="bg-base-100 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#f04a00]/10 flex items-center justify-center">
                                <Phone className="w-5 h-5 text-[#f04a00]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Contact Details
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                                <p className="text-gray-900 dark:text-white font-medium">+880 1234 567890</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
                                <p className="text-gray-900 dark:text-white font-medium">info@tradesphere.com</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Support</p>
                                <p className="text-gray-900 dark:text-white font-medium">support@tradesphere.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className="bg-base-100 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#f04a00]/10 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-[#f04a00]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Business Hours
                            </h3>
                        </div>
                        <div className="space-y-3">
                            {[
                                { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
                                { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
                                { day: 'Sunday', time: 'Closed' }
                            ].map((schedule, idx) => (
                                <div key={idx} className="flex justify-between">
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">{schedule.day}</span>
                                    <span className="font-medium text-gray-900 dark:text-white text-sm">{schedule.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/*  Footer Note */}
                <div className="mt-10 text-center">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        We respond to all inquiries within 24 hours during business days
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
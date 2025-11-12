import { Globe, Package, TrendingUp, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const TradeInfo = () => {
    return (
        <div className="py-20 px-4 bg-white dark:bg-gray-900 max-w-11/12 mx-auto">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold mb-3 text-gray-900 dark:text-white">
                    Trade Sphere: Global Trade By The Numbers
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-16">
                    Join the fastest-growing community of importers and exporters transforming global supply chains.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="p-8 border-2 border-gray-100 dark:border-gray-700 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl hover:border-info dark:hover:border-info bg-white dark:bg-gray-800">

                        <div className="flex justify-center mb-4">
                            <Package className="w-10 h-10 text-info" />
                        </div>
                        <p className="text-5xl font-extrabold text-info mb-1 leading-none">
                            25,000+
                        </p>
                        <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                            Products Listed
                        </p>
                    </div>
                    <div className="p-8 border-2 border-gray-100 dark:border-gray-700 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl hover:border-info dark:hover:border-info bg-white dark:bg-gray-800">

                        <div className="flex justify-center mb-4">
                            <Globe className="w-10 h-10 text-info" />
                        </div>
                        <p className="text-5xl font-extrabold text-info mb-1 leading-none">
                            150+
                        </p>
                        <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                            Countries of Origin
                        </p>
                    </div>
                    <div className="p-8 border-2 border-gray-100 dark:border-gray-700 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl hover:border-info dark:hover:border-info bg-white dark:bg-gray-800">

                        <div className="flex justify-center mb-4">
                            <TrendingUp className="w-10 h-10 text-info" />
                        </div>
                        <p className="text-5xl font-extrabold text-info mb-1 leading-none">
                            $500M
                        </p>
                        <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                            Total Trade Volume
                        </p>
                    </div>
                    <div className="p-8 border-2 border-gray-100 dark:border-gray-700 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl hover:border-info dark:hover:border-info bg-white dark:bg-gray-800">

                        <div className="flex justify-center mb-4">
                            <Users className="w-10 h-10 text-info" />
                        </div>
                        <p className="text-5xl font-extrabold text-info mb-1 leading-none">
                            10,000+
                        </p>
                        <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                            Active Exporters
                        </p>
                    </div>
                </div>
                {/* <Link
                    to="/auth/login"
                    className="btn btn-info mt-16 text-lg px-8 py-3 font-semibold transition duration-300 shadow-md hover:shadow-lg"
                >
                    Start Trading Now
                </Link> */}
            </div>
        </div>
    );
};

export default TradeInfo;
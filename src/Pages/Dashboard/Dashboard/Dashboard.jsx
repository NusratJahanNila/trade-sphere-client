import { useContext, useEffect, useState } from "react";
import Loader from "../../../Components/Loader/Loader";
import { PackagePlus, Truck, ShoppingBag } from "lucide-react";
import { AuthContext } from "../../../Provider/AuthContext";
import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    const [summary, setSummary] = useState(null);
    const [analytics, setAnalytics] = useState({
        importsByCategory: [],
        monthlyTrend: []
    });
    const [recentImports, setRecentImports] = useState([]);
    const [recentExports, setRecentExports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const email = user?.email;

                // Fetch all data in parallel
                const [
                    summaryRes,
                    allImportsRes,
                    recentImportsRes,
                    recentExportsRes,
                ] = await Promise.all([
                    fetch(`https://trade-sphere-server.vercel.app/dashboard/summary?email=${email}`),
                    fetch(`https://trade-sphere-server.vercel.app/my-imports?email=${email}`),
                    fetch(`https://trade-sphere-server.vercel.app/dashboard/recent-imports?email=${email}`),
                    fetch(`https://trade-sphere-server.vercel.app/dashboard/recent-exports?email=${email}`),
                ]);

                const summaryData = await summaryRes.json();
                const allImports = await allImportsRes.json();
                const recentImportsData = await recentImportsRes.json();
                const recentExportsData = await recentExportsRes.json();

                setSummary(summaryData);
                setRecentImports(recentImportsData);
                setRecentExports(recentExportsData);

                // Process data for charts
                if (allImports && allImports.length > 0) {
                    // Process category data for pie chart
                    const categoryMap = {};
                    allImports.forEach(imp => {
                        const category = imp.category || "Uncategorized";
                        categoryMap[category] = (categoryMap[category] || 0) + 1;
                    });

                    const importsByCategory = Object.keys(categoryMap).map(category => ({
                        category,
                        count: categoryMap[category]
                    }));

                    // Process monthly data for bar chart
                    const monthlyMap = {};
                    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                    allImports.forEach(imp => {
                        try {
                            const date = new Date(imp.importedAt || imp.exportAt);
                            const monthName = monthNames[date.getMonth()];
                            monthlyMap[monthName] = (monthlyMap[monthName] || 0) + 1;
                        } catch (error) {
                            console.log("Date parsing error for item:", imp._id, error);
                        }
                    });

                    // Fill all months (even with 0 values)
                    const monthlyTrend = monthNames.map(month => ({
                        month,
                        count: monthlyMap[month] || 0
                    }));

                    setAnalytics({
                        importsByCategory,
                        monthlyTrend
                    });
                } else {
                    // No imports found
                    setAnalytics({
                        importsByCategory: [],
                        monthlyTrend: []
                    });
                }

            } catch (err) {
                console.error("Dashboard error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user?.email]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="p-6 space-y-8 my-10">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold">Dashboard Overview</h2>
                <p className="text-gray-500">Welcome back, {user?.displayName || user?.email}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Products"
                    value={summary?.totalProducts || 0}
                    icon={<ShoppingBag />}
                />
                <StatCard
                    title="My Exports"
                    value={summary?.myExports || 0}
                    icon={<PackagePlus />}
                />
                <StatCard
                    title="My Imports"
                    value={summary?.myImports || 0}
                    icon={<Truck />}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Pie Chart */}
                <ChartCard title="Imports by Category">
                    {analytics.importsByCategory?.length > 0 ? (
                        <div className="h-64">
                            <Pie
                                data={{
                                    labels: analytics.importsByCategory.map(item => item.category),
                                    datasets: [{
                                        label: 'Imports',
                                        data: analytics.importsByCategory.map(item => item.count),
                                        backgroundColor: [
                                            "#f04a00", // Primary orange
                                            "#3b82f6", // Blue
                                            "#10b981", // Green
                                            "#8b5cf6", // Purple
                                            "#f59e0b", // Yellow
                                            "#ef4444", // Red
                                            "#06b6d4", // Cyan
                                        ],
                                        borderWidth: 1,
                                        borderColor: '#fff'
                                    }]
                                }}
                                options={{
                                    plugins: {
                                        legend: {
                                            position: 'right',
                                            labels: {
                                                padding: 15,
                                                usePointStyle: true
                                            }
                                        }
                                    },
                                    maintainAspectRatio: false
                                }}
                            />
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center">
                            <p className="text-gray-500 text-center">No import data available</p>
                        </div>
                    )}
                </ChartCard>

                {/* Monthly Trend Bar Chart */}
                <ChartCard title="Monthly Import Trend">
                    {analytics.monthlyTrend?.length > 0 ? (
                        <div className="h-64">
                            <Bar
                                data={{
                                    labels: analytics.monthlyTrend.map(item => item.month),
                                    datasets: [{
                                        label: 'Number of Imports',
                                        data: analytics.monthlyTrend.map(item => item.count),
                                        backgroundColor: "#f04a00",
                                        borderColor: "#e34234",
                                        borderWidth: 1,
                                        borderRadius: 4
                                    }]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            ticks: {
                                                stepSize: 1
                                            },
                                            title: {
                                                display: true,
                                                text: 'Imports Count'
                                            }
                                        },
                                        x: {
                                            title: {
                                                display: true,
                                                text: 'Month'
                                            }
                                        }
                                    },
                                    plugins: {
                                        legend: {
                                            display: false
                                        }
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center">
                            <p className="text-gray-500 text-center">No monthly trend data</p>
                        </div>
                    )}
                </ChartCard>
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentActivityCard
                    title="Recent Imports"
                    data={recentImports}
                />
                <RecentActivityCard
                    title="Recent Exports"
                    data={recentExports}
                />
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 pt-4 justify-center">
                <QuickActionButton
                    label="Add New Export"
                    link="/dashboard/add-export"
                />
                <QuickActionButton
                    label="View My Exports"
                    link="/dashboard/my-exports"
                />
                <QuickActionButton
                    label="View My Imports"
                    link="/dashboard/my-imports"
                />
                <QuickActionButton
                    label="Browse All Products"
                    link="/all-products"
                />
            </div>
        </div>
    );
};

export default Dashboard;

// ==================== Reusable Components ====================

const StatCard = ({ title, value, icon }) => (
    <div className="p-6 rounded-xl  shadow bg-white dark:bg-gray-800 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
        <div className="p-3 rounded-lg bg-[#f04a00]/10 text-[#f04a00]">
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
    </div>
);

const ChartCard = ({ title, children }) => (
    <div className="p-6 rounded-xl  shadow bg-white dark:bg-gray-800">
        <h4 className="font-semibold text-lg mb-4">{title}</h4>
        {children}
    </div>
);

const RecentActivityCard = ({ title, data }) => (
    <div className="p-6 rounded-xl  shadow bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-lg">{title}</h4>
            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                {data?.length || 0} items
            </span>
        </div>

        {data?.length === 0 ? (
            <div className="py-8 text-center">
                <p className="text-gray-500">No recent activity found</p>
            </div>
        ) : (
            <div className="space-y-3">
                {data.slice(0, 3).map(item => (
                    <div
                        key={item._id}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
                            <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                                }}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item.productName}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                                <span>৳{item.price}</span>
                                {item.userQuantity && (
                                    <span>Qty: {item.userQuantity}</span>
                                )}
                                {item.rating && (
                                    <span className="flex items-center">
                                        ⭐ {item.rating}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

const QuickActionButton = ({ label, link }) => (
    <a
        href={link}
        className="px-5 py-3 rounded-lg bg-linear-to-r from-[#f04a00] to-[#e34234] text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
    >
        {label}
    </a>
);
import React, { useState } from "react";
import { notify } from "@custom-components/toastHelper.jsx";
import Sidebar from "./Sidebar";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import { AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Area } from "recharts";
import CustomTooltip from "@custom-components/CustomTooltip";

const Dashboard = () => {
    
    const [selectedRange, setSelectedRange] = useState('1y');
    const [dummyData, setDummyData] = useState(dummyChartData('1y'));
    const [expanded, setExpanded] = useState(true);

    const handleDateRangeChange = (range) => {
        setSelectedRange(range);

        // Implement data fetching or filtering logic based on the selected range
        notify("info", `Loading data for: ${range}`);

        // Example: fetchDataForRange(range);
        setTimeout(() => {

            setDummyData(dummyChartData(range));

            notify("success", `Data loaded for: ${range}`);
        }, 4000);
    };

    const cards = [
        { id: 1, title: "Total Properties", value: 120 },
        { id: 2, title: "Total Tenants", value: 300 },
        { id: 3, title: "Occupied Units", value: 95 },
        { id: 4, title: "Vacant Units", value: 25 },
        { id: 5, title: "Total Income", value: "KES 150,000" },
        { id: 6, title: "Monthly Rent Collected", value: "KES 45,000" },
        { id: 7, title: "Pending Maintenance Requests", value: 8 },
        { id: 8, title: "New Inquiries", value: 15 },
        { id: 9, title: "Upcoming Lease Expirations", value: 5 },
        { id: 10, title: "Total Expenses", value: "KES 30,000" },
    ];

    // const dummyChartData = (range) => {};

    function dummyChartData(range) {
        const now = new Date();  // current date
        const result = [];

        switch (range) {
            case '1y':
                // code for 1 year data
                for (let i = 11; i >= 0; i--) {
                    const date = new Date(now); // clone current date
                    // console.log(date);
                    date.setMonth(now.getMonth() - i); // generate past months
                    result.push({ 
                        date: date.toLocaleString('default', { month: 'short' }), 
                        income: Math.floor(Math.random() * 10000) + 5000,
                        expense: Math.floor(Math.random() * 8000) + 3000
                    });
                }
                break;
            case '2y':
                // code for 2 year data
                for (let i = 1; i >= 0; i--) {
                    for (let m = 11; m >= 0; m--) {
                        const date = new Date(now.getFullYear() - i, now.getMonth() - m, 1);
                        result.push({ 
                            date: date.toLocaleString('default', { month: 'short', year: '2-digit' }), 
                            income: Math.floor(Math.random() * 10000) + 5000,
                            expense: Math.floor(Math.random() * 8000) + 3000 
                        });
                    }
                }
                break;
            case '5y':
                // code for 5 year data
                for (let i = 4; i >= 0; i--) {
                    const year = now.getFullYear() - i;
                    result.push({ 
                        date: year.toString(), 
                        income: Math.floor(Math.random() * 120000) + 6000,
                        expense: Math.floor(Math.random() * 90000) + 4000 
                    });
                }
                break;
            case '10y':
                // code for 10 year data
                for (let i = 9; i >= 0; i--) {
                    const year = now.getFullYear() - i;
                    result.push({
                        date: year.toString(),
                        income: Math.floor(Math.random() * 120000) + 60000,
                        expense: Math.floor(Math.random() * 90000) + 40000
                    });
                }
                break;
            default:
                for (let i = 60; i >= 0; i--) {
                    const date = new Date(now);
                    date.setDate(now.getDate() - i);
                    result.push({
                        date: `${date.getMonth() + 1}/${date.getDate()}`,
                        income: Math.floor(Math.random() * 100) + 250,
                        expense: Math.floor(Math.random() * 80) + 150
                    });
                }
                break;
        }

        return result;

        // fully understand this function (esp the for...loop)
        // Why we had to subtract i from now.getMonth() or now.getFullYear()
        // How the date formatting works
        // Why we had to duplicate the inner loop for 2y case
        // Why we had to duplicate <Area /> & gradient definitions in the chart for income & expense
    };

    return (
        <>
            <div className="flex flex-col w-full bg-gray-100">
                <PropertyManagerNavbar />
                <div className="flex mt-20">
                    <Sidebar expanded={expanded} setExpanded={setExpanded} />
                    <div className={`flex flex-1 flex-col min-h-screen
                    transition-all duration-300 ease-in-out ${expanded ? "ml-64" : "ml-20"}`}>
                        <div className="px-4 pt-4 pb-0 max-w-[calc(100vw-16rem)] mx-auto w-full">
                            <h1 className="text-2xl font-bold mb-4 text-gray-700">Dashboard</h1>

                            {/* Dashboard content goes here */}
                            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {cards.map(card => (
                                    <div 
                                        key={card.id}
                                        className="bg-white rounded-lg shadow p-6 flex flex-col items-center transition-transform transform hover:scale-105 cursor-pointer"
                                    >
                                        <h2 className="text-md font-semibold text-gray-600 mb-2">{card.title}</h2>
                                        <p className="text-lg font-bold text-gray-800">{card.value}</p>
                                    </div>
                                ))}
                            </section>

                            {/* Chart section */}
                            <div className="mt-10 bg-white shadow p-6 rounded-lg">
                                <div className="flex items-center mb-5 space-x-3.5">
                                    <h3 className="text-lg font-semibold text-gray-900">Income Vs Expense</h3>

                                    {/* Add any filters or date range selectors here */}
                                    {['1y', '2y', '5y', '10y'].map((dateRange) => (
                                        <button
                                            key={dateRange}
                                            className={`px-4 py-2 cursor-pointer rounded-lg ${selectedRange === dateRange ? 'bg-[rgb(0,0,30)] text-amber-500' : 'bg-[rgb(0,0,30)] text-white hover:bg-slate-700'}`}
                                            onClick={() => handleDateRangeChange(dateRange)}
                                        >
                                            {dateRange}
                                        </button>
                                    ))}
                                </div>

                                <ResponsiveContainer width="100%" height={300}>
                                    {/* Chart canvas goes here */}
                                    <AreaChart
                                        data={dummyData}
                                        animationDuration={800}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                    >
                                        {/* Define gradients, axes, tooltips, and areas here */}

                                        {/* Gradients */}
                                        <defs>
                                            <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#0071c5" stopOpacity={0.4} />
                                                <stop offset="100%" stopColor="#0071c5" stopOpacity={0.2} />
                                            </linearGradient>
                                            <linearGradient id="expenseColor" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#ff4d4f" stopOpacity={0.4} />
                                                <stop offset="100%" stopColor="#ff4d4f" stopOpacity={0.2} />
                                            </linearGradient>
                                        </defs>

                                        {/* Axes */}
                                        <XAxis 
                                            dataKey="date" 
                                            // stroke="#8884d8" 
                                        />
                                        <YAxis />
                                        <Tooltip content={<CustomTooltip />} />

                                        {/* Area */}
                                        <Area
                                            type="monotone" // smooth curve
                                            dataKey="income"
                                            stroke="#0071c5" // line color
                                            strokeWidth={2} // line thickness
                                            // fillOpacity={1}
                                            fill="url(#incomeColor)"
                                            // dot={{ r: 4 }}
                                            dot={false} // hides circular dots on each data point
                                        />

                                        <Area
                                            type="monotone" // smooth curve
                                            dataKey="expense"
                                            stroke="#ff4d4f" // line color
                                            strokeWidth={2} // line thickness
                                            // fillOpacity={1}
                                            fill="url(#expenseColor)"
                                            // dot={{ r: 4 }}
                                            dot={false} // hides circular dots on each data point
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Bottom Copyright Section */}
                        {/* <div className="w-full border-t mt-8 bg-[rgb(0,0,30)] border-gray-500 py-6 text-center text-sm text-gray-300">
                            <p>&copy; 2025 AirHousing. All rights reserved.</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
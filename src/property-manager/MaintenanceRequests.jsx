import { useState } from "react";
import { AlertCircle, AlertTriangle, CheckCircle, ClipboardList, Timer, Wrench, Plus } from "lucide-react";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import Sidebar from "./Sidebar";
import { StatCard } from "@custom-components/StatCard";

const MaintenaceRequests = () => {

    const [expanded, setExpanded] = useState(false);
    const [showAddMaintenanceRequestModal, setShowAddMaintenanceRequestModal] = useState(false);

    return (
        <>
            <div className="flex flex-col w-full bg-gray-100">
                <PropertyManagerNavbar />
                <div className="flex mt-20">
                    <Sidebar expanded={expanded} setExpanded={setExpanded} />
                    <main className={`flex flex-1 flex-col min-h-screen
                        transition-all duration-300 ease-in-out ${expanded ? "ml-64" : "ml-20"}`}>
                            <div className="px-4 pt-4 pb-8 max-w-[calc(100vw-16rem)] mx-auto w-full">
                                <h1 className="text-2xl font-bold mb-4 text-gray-700">Maintenance Requests</h1>

                                {/* StatCards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                    <StatCard title="Total Requests" value={0} icon={ClipboardList} iconColor="text-blue-600" iconBgColor="bg-blue-100" subtitle="Total number of maintenance requests" />
                                    <StatCard title="New Requests" value={0} icon={AlertCircle} iconColor="text-amber-600" iconBgColor="bg-amber-100" subtitle="New maintenance requests this week" />
                                    <StatCard title="In Progress" value={0} icon={Wrench} iconColor="text-indigo-600" iconBgColor="bg-indigo-100" subtitle="Maintenance requests currently in progress" />
                                    <StatCard title="High Priority" value={0} icon={AlertTriangle} iconColor="text-red-600" iconBgColor="bg-red-100" subtitle="High priority maintenance requests" />
                                    <StatCard title="Completed (This Month)" value={0} icon={CheckCircle} iconColor="text-green-600" iconBgColor="bg-green-100" subtitle="Completed maintenance requests this month" />
                                    <StatCard title="Average Resolution Time" value={0} icon={Timer} iconColor="text-orange-600" iconBgColor="bg-orange-100" subtitle="Average time to resolve maintenance requests (days)" />
                                </div>

                                {/* Additional content such as tables or charts can be added here */}
                                <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                                    <div className="border-b border-gray-200">
                                        <div className="flex items-center justify-between px-6 py-4">
                                            <div className="flex gap-4">
                                                {[{label: 'Maintenance Requests', value: 'maintenance-requests'}].map((tab) => (
                                                    <button
                                                        key={tab.value}
                                                        // onClick={() => setActiveTab(tab.value)}
                                                        className="px-4 py-2 font-medium cursor-pointer rounded-lg transition-colors bg-[rgb(0,0,30)] text-amber-500 hover:bg-slate-700 duration-300"
                                                    >
                                                        {tab.label}
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => setShowAddMaintenanceRequestModal(true)}
                                                className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-[rgb(0,0,30)] text-white rounded-lg hover:bg-slate-700 transition-colors"
                                            >
                                                <Plus className="w-5 h-5 text-amber-500" />
                                                <span className="text-amber-500">Add Maintenance Request</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div></div>
                                </div>
                            </div>
                        </main>
                </div>
            </div>
        </>
    );
};

export default MaintenaceRequests;
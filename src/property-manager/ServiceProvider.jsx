import { useState } from "react";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import Sidebar from "./Sidebar";
import { StatCard } from "@custom-components/StatCard";
import { BarChart3, CheckCircle, ShieldCheck, UserCheck, Users, Wallet, Plus, FileText, Pencil, Trash2 } from "lucide-react";

const ServiceProvider = () => {
    const [serviceProviders, setServiceProviders] = useState(() => {
        const storedProviders = localStorage.getItem("serviceProviders");
        return storedProviders ? JSON.parse(storedProviders) : [];
    });
    const [expanded, setExpanded] = useState(true);
    const [showAddServiceProviderModal, setShowAddServiceProviderModal] = useState(false);
    const [currentServiceProvider, setCurrentServiceProvider] = useState(null);

    return (
        <>
            <div className="flex flex-col w-full bg-gray-100">
                <PropertyManagerNavbar />
                <div className="flex mt-20">
                    <Sidebar expanded={expanded} setExpanded={setExpanded} />
                    <main className={`flex flex-1 flex-col min-h-screen
                        transition-all duration-300 ease-in-out ${expanded ? "ml-64" : "ml-20"}`}>
                            <div className="px-4 pt-4 pb-8 max-w-[calc(100vw-16rem)] mx-auto w-full">
                                <h1 className="text-2xl font-bold mb-4 text-gray-700">Maintainer/Service Providers</h1>

                                {/* Stat Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                    <StatCard title="Total Service Providers" value={0} icon={Users} iconColor="text-blue-600" iconBgColor="bg-blue-100" subtitle="Number of service providers in the system" />
                                    <StatCard title="Active Service Providers" value={0} icon={UserCheck} iconColor="text-green-600" iconBgColor="bg-green-100" subtitle="Number of active service providers in the system" />
                                    <StatCard title="Service Providers on Retainer" value={0} icon={ShieldCheck} iconColor="text-purple-600" iconBgColor="bg-purple-100" subtitle="Number of verified service providers in the system" />
                                    <StatCard title="Jobs Completed (This Month)" value={0} icon={CheckCircle} iconColor="text-emerald-600" iconBgColor="bg-emerald-100" subtitle="Number of jobs completed this month" />
                                    <StatCard title="Total Maintenance Cost" value={0} icon={Wallet} iconColor="text-red-600" iconBgColor="bg-red-100" subtitle="Total maintenance cost for all service providers" />
                                    <StatCard title="Average Job Cost" value={0} icon={BarChart3} iconColor="text-orange-600" iconBgColor="bg-orange-100" subtitle="Average cost of jobs completed" />
                                </div>

                                {/* Additional content such as tables or charts can be added here */}
                                <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                                    <div className="border-b border-gray-200">
                                        <div className="flex items-center justify-between px-6 py-4">
                                            <div className="flex gap-4">
                                                {[{label: 'Service Providers', value: 'service-providers'}].map((tab) => (
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
                                                onClick={() => setShowAddServiceProviderModal(true)}
                                                className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-[rgb(0,0,30)] text-white rounded-lg hover:bg-slate-700 transition-colors"
                                            >
                                                <Plus className="w-5 h-5 text-amber-500" />
                                                <span className="text-amber-500">Add Service Provider</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <>
                                            {/* Table or list of service providers would go here */}
                                            {serviceProviders.length === 0 ? (
                                                <div className="text-center py-12">
                                                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No service providers yet</h3>
                                                    <p className="text-gray-600 mb-4">Create your first service provider to start tracking service providers</p>
                                                    <button
                                                        onClick={() => setShowAddServiceProviderModal(true)}
                                                        className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-[rgb(0,0,30)] text-amber-500 rounded-lg hover:bg-slate-700 transition-colors"
                                                    >
                                                    <Plus className="w-5 h-5" />
                                                        Create Service Provider
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    {/* Render list of service providers */}
                                                    <div className="overflow-x-auto">
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                            <thead className="bg-gray-50">
                                                                <tr>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Type</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jobs Completed</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost Incurred</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {paginatedServiceProviders.map((provider, index) => (
                                                                    <tr 
                                                                        key={index}
                                                                        className="hover:bg-gray-50 cursor-pointer transition-all duration-300 animate-[fadeInUp_0.3s_ease-in-out]"
                                                                    >
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.name}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.specialization}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.phone}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.contractType}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.status}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.jobsCompleted}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">KES {provider.totalCostIncurred}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                            <button 
                                                                                className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer"
                                                                                onClick={() => {
                                                                                    // e.stopPropagation();
                                                                                    setShowAddServiceProviderModal(true);
                                                                                    setCurrentServiceProvider(provider);
                                                                                }}
                                                                            >
                                                                                {/* include an edit icon instead of text */}
                                                                                <Pencil className="w-5 h-5" />
                                                                            </button>
                                                                            <button 
                                                                                className="text-red-600 hover:text-red-900 cursor-pointer"
                                                                                onClick={() => {
                                                                                    handleDeleteServiceProvider(provider.id)
                                                                                }}
                                                                            >
                                                                                {/* include a delete/trash icon instead of text */}
                                                                                <Trash2 className="w-5 h-5" />
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    </div>
                                </div>
                            </div>
                        </main>
                </div>
            </div>
        </>
    );
};

export default ServiceProvider;
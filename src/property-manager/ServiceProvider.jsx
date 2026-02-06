import { useState, useMemo } from "react";
import { notify } from "@custom-components/toastHelper";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import Sidebar from "./Sidebar";
import { StatCard } from "@custom-components/StatCard";
import { BarChart3, CheckCircle, ShieldCheck, UserCheck, Users, Wallet, Plus, FileText, Pencil, Trash2 } from "lucide-react";
import AddServiceProviderModal from "@custom-components/AddServiceProviderModal";
import Pagination from "@custom-components/Pagination";

const ServiceProvider = () => {
    const [serviceProviders, setServiceProviders] = useState(() => {
        const storedProviders = localStorage.getItem("serviceProviders");
        return storedProviders ? JSON.parse(storedProviders) : [];
    });
    const [expanded, setExpanded] = useState(true);
    const [showAddServiceProviderModal, setShowAddServiceProviderModal] = useState(false);
    const [currentServiceProvider, setCurrentServiceProvider] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const handleAddEditServiceProvider = async (serviceProviderData) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (currentServiceProvider) {
            // Edit existing service provider
            const updatedServiceProvider = { ...currentServiceProvider, ...serviceProviderData };
            const updated = serviceProviders.map((i) => (i.id === updatedServiceProvider.id ? updatedServiceProvider : i));
            setServiceProviders(updated);
            localStorage.setItem('serviceProviders', JSON.stringify(updated));
            notify('success', 'Service provider updated successfully.');
            setCurrentServiceProvider(null); // Clear current service provider after editing
        } else {
            // Add new service provider
            const newServiceProvider = { id: crypto.randomUUID(), ...serviceProviderData };
            const updated = [...serviceProviders, newServiceProvider];
            setServiceProviders(updated);
            try {
                localStorage.setItem('serviceProviders', JSON.stringify(updated));
            } catch (error) {
                if (error.name === 'QuotaExceededError') {
                    console.error('Local storage quota exceeded. Cannot save service provider.');
                    notify('error', 'Failed to save service provider: local storage quota exceeded.');
                    return;
                }
            }
            notify('success', 'Service provider added successfully.');
        }
    };

    // Filter service providers based  based on their name, specialization, or contract type
    const filteredServiceProviders = serviceProviders.filter((provider) => {
        const query = searchQuery.trim().toLowerCase();
        return (
            provider.name.toLowerCase().includes(query) ||
            provider.specialization.toLowerCase().includes(query) ||
            provider.contractType.toLowerCase().includes(query)
        );
    });

    // Pagination logic
    // total pages based on filtered service providers
    const totalPages = Math.ceil(filteredServiceProviders.length / itemsPerPage);

    // get current page service providers
    const paginatedServiceProviders = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredServiceProviders.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredServiceProviders, currentPage, itemsPerPage]);

    // function to handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.availabilityStatus}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.jobsCompleted || 0}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">KES {Number(provider.totalCostIncurred).toLocaleString()}</td>
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

                                                    {/* If no service providers match the search query */}
                                                    {filteredServiceProviders.length === 0 && (
                                                        <div className="text-center py-12">
                                                            <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                                            <h3 className="mt-2 text-sm font-medium text-gray-900">No service providers found</h3>
                                                            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or add a new service provider.</p>
                                                        </div>
                                                    )}
    
                                                    {/* Pagination Controls */}
                                                    <Pagination
                                                        currentPage={currentPage}
                                                        setCurrentPage={setCurrentPage}
                                                        itemsPerPage={itemsPerPage}
                                                        setItemsPerPage={setItemsPerPage}
                                                        totalPages={totalPages}
                                                        handlePageChange={handlePageChange}
                                                    />
                                                </>
                                            )}
                                        </>
                                    </div>
                                </div>
                            </div>

                            <AddServiceProviderModal 
                                isOpen={showAddServiceProviderModal} // controls modal visibility
                                data={currentServiceProvider} // passes current service provider data for editing (null for adding new)
                                onSubmit={handleAddEditServiceProvider} // handles modal form submission
                                onClose={() => setShowAddServiceProviderModal(false)} // function to close the modal
                            />
                        </main>
                </div>
            </div>
        </>
    );
};

export default ServiceProvider;
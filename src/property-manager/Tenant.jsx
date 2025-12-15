import React, { useEffect, useMemo } from "react";
import { StatCard } from "@custom-components/StatCard";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import { Users, FileText, DollarSign, TrendingUp, Plus, Search, Pencil, Trash2 } from 'lucide-react';
import Sidebar from "./Sidebar";
import { AddInvoiceModal } from "@custom-components/AddInvoiceModal";
import { AddTenantModal } from "@custom-components/AddTenantModal";
import { notify } from "@custom-components/toastHelper";
import Pagination from "@custom-components/Pagination";
import isExpiringSoon from "@custom-components/isExpiringSoon";

const Tenant = () => {
    // Sample data - replace with actual data fetching logic
    const [tenants, setTenants] = React.useState(() => {
        const storedTenants = localStorage.getItem('tenants');
        return storedTenants ? JSON.parse(storedTenants) : [];
    });
    // const [invoices, setInvoices] = React.useState(() => {
    //     const storedInvoices = localStorage.getItem('invoices');
    //     return storedInvoices ? JSON.parse(storedInvoices) : [];
    // });
    const [expanded, setExpanded] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(5);
    const [currentTenant, setCurrentTenant] = React.useState(null);
    const [currentInvoice, setCurrentInvoice] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState('tenants');
    const [showAddTenantModal, setShowAddTenantModal] = React.useState(false);
    const [showAddInvoiceModal, setShowAddInvoiceModal] = React.useState(false);
    const [isExpiringSoonTenants, setIsExpiringSoonTenants] = React.useState(false);

    const activeTenants = tenants.filter((t) => t.status === 'active');
    const totalRent = activeTenants.reduce((sum, t) => sum + Number(t.rent_amount), 0);
    // const pendingInvoices = invoices.filter((i) => i.status === 'pending');
    // const paidInvoices = invoices.filter((i) => i.status === 'paid');
    // const pendingAmount = pendingInvoices.reduce((sum, i) => sum + Number(i.amount), 0);
    

    // Persist tenants and invoices to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('tenants', JSON.stringify(tenants));
    }, [tenants]);

    // useEffect(() => {
    //     localStorage.setItem('invoices', JSON.stringify(invoices));
    // }, [invoices]);


    // filter data by name, email or phone
    const filterTenants = tenants.filter((tenant) => 
    {
        const query = searchQuery.trim().toLowerCase();
        return (
            tenant.name.toLowerCase().includes(query) || 
            tenant.email.toLowerCase().includes(query) || 
            tenant.phone.toLowerCase().includes(query)
        );
    });


    // const itemsPerPage = 5;
    const totalPages = Math.ceil(filterTenants.length / itemsPerPage);


    // paginate filtered tenants
    const paginatedTenants = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filterTenants.slice(startIndex, startIndex + itemsPerPage);
    }, [filterTenants, currentPage, itemsPerPage]);


    // page change handler
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };


    // function to handle deleting a tenant with a custom toast notification
    const handleDeleteTenant = (tenantId) => {
        // Show confirmation toast
        if (window.confirm("Are you sure you want to delete this tenant? This action cannot be undone.")) {
            handleDeleteTenantConfirmed(tenantId);
        }
    };


    // function that confirms deletion after user confirmation
    const handleDeleteTenantConfirmed = (tenantId) => {

        // toast notification asking for deletion confirmation
        notify(`info`, `Deleting...`);

        // Logic to delete tenant only after confirmation
        setTimeout(() => {
            const updatedTenants = tenants.filter((t) => t.id !== tenantId);
            setTenants(updatedTenants);
            localStorage.setItem('tenants', JSON.stringify(updatedTenants));
            notify('success', 'Tenant deleted successfully.');
        }, 3000); // Simulate delay for deletion

    };

    // const handleDeleteInvoice = (invoiceId) => {
    //     // Show confirmation toast
    //     if (window.confirm("Are you sure you want to delete this invoice? This action cannot be undone.")) {
    //         handleDeleteInvoiceConfirmed(invoiceId);
    //     }
    // };

    // const handleDeleteInvoiceConfirmed = (invoiceId) => {
    //     // toast notification asking for deletion confirmation
    //     notify(`info`, `Deleting...`);

    //     // Logic to delete invoice only after confirmation
    //     setTimeout(() => {
    //         const updatedInvoices = invoices.filter((i) => i.id !== invoiceId);
    //         setInvoices(updatedInvoices);
    //         localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
    //         notify('success', 'Invoice deleted successfully.');
    //     }, 3000); // Simulate delay for deletion
    // };

    const handleAddEditTenant = async (tenantData) => {
        // Simulate API call
        // const newTenant = { id: Date.now(), ...tenantData };
        // setTenants((prev) => [...prev, newTenant]);
        // localStorage.setItem('tenants', JSON.stringify(tenants));
        if (currentTenant) {
            // Edit existing tenant
            const updatedTenant = { ...currentTenant, ...tenantData };
            setTenants((prev) => {
                const next = prev.map((t) => (t.id === updatedTenant.id ? updatedTenant : t));
                localStorage.setItem('tenants', JSON.stringify(next)); // persist the actual updated array
                return next;
            });
            notify('success', 'Tenant updated successfully.');
            setCurrentTenant(null); // Clear current tenant after editing
        } else {
            // Add new tenant
            const newTenant = { id: Date.now(), ...tenantData };
            setTenants((prev) => [...prev, newTenant]);
            localStorage.setItem('tenants', JSON.stringify(tenants));
            notify('success', 'Tenant added successfully.');
        }
    };

    // const handleAddEditInvoice = async (invoiceData) => {
    //     // Simulate API call
    //     // const newInvoice = { id: Date.now(), ...invoiceData };
    //     // setInvoices((prev) => [...prev, newInvoice]);

    //     if (currentInvoice) {
    //         // Edit existing invoice
    //         const updatedInvoice = { ...currentInvoice, ...invoiceData };
    //         setInvoices((prev) => prev.map((i) => (i.id === updatedInvoice.id ? updatedInvoice : i)));
    //         localStorage.setItem('invoices', JSON.stringify(invoices));
    //         notify('success', 'Invoice updated successfully.');
    //         setCurrentInvoice(null); // Clear current invoice after editing
    //     } else {
    //         // Add new invoice
    //         const newInvoice = { id: Date.now(), ...invoiceData };
    //         setInvoices((prev) => [...prev, newInvoice]);
    //         localStorage.setItem('invoices', JSON.stringify(invoices));
    //         notify('success', 'Invoice added successfully.');
    //     }
    // };


    // functions to handle editing and deleting tenants and invoices
    const handleEditTenant = (tenantData) => {
        // Logic to edit tenant details

        // You can pre-fill the modal form with tenant data here
        setCurrentTenant(tenantData);

        setShowAddTenantModal(true); // Open the modal for editing
    };

    const expiringSoonTenants = tenants.filter((tenant) => {
        // isExpiringSoon(tenant.lease_end)
        localStorage.setItem('tenants', JSON.stringify(tenants)); // Persist tenants to localStorage
        return isExpiringSoon(tenant.lease_end);
    });

    const handleExpiringSoonTenantsVisibility = () => {
        setIsExpiringSoonTenants(!isExpiringSoonTenants);
    };

    // console.log("Expiring Soon Tenants:", expiringSoonTenants.length);

    return (
        <>
            <div className="flex flex-col w-full bg-gray-100">
                <PropertyManagerNavbar />
                <div className="flex mt-20">
                    <Sidebar expanded={expanded} setExpanded={setExpanded} />
                    <div className={`flex flex-1 flex-col min-h-screen
                    transition-all duration-300 ease-in-out ${expanded ? "ml-64" : "ml-20"}`}>
                        <div className="px-4 pt-4 pb-8 max-w-[calc(100vw-16rem)] mx-auto w-full">
                            <h1 className="text-2xl font-bold mb-4 text-gray-700">Tenants</h1>

                            {/* Users content goes here */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                <StatCard
                                    title="Total Tenants"
                                    value={tenants.length}
                                    icon={Users}
                                    iconColor="text-blue-600"
                                    iconBgColor="bg-blue-100"
                                    subtitle={`${activeTenants.length} active`}
                                />
                                <StatCard
                                    title="Monthly Revenue"
                                    value={`KES ${totalRent.toLocaleString()}`}
                                    icon={DollarSign}
                                    iconColor="text-emerald-600"
                                    iconBgColor="bg-emerald-100"
                                    subtitle="From active tenants"
                                />
                                {/* <TenantStatCard
                                    title="Pending Invoices"
                                    value={pendingInvoices.length}
                                    icon={FileText}
                                    iconColor="text-amber-600"
                                    iconBgColor="bg-amber-100"
                                    subtitle={`KES ${pendingAmount.toLocaleString()} due`}
                                />
                                <TenantStatCard
                                    title="Paid Invoices"
                                    value={paidInvoices.length}
                                    icon={TrendingUp}
                                    iconColor="text-emerald-600"
                                    iconBgColor="bg-emerald-100"
                                    subtitle="This period"
                                /> */}
                                <StatCard
                                    title="Leases Expiring Soon"
                                    value={expiringSoonTenants.length}
                                    icon={Users}
                                    iconColor="text-red-600"
                                    iconBgColor="bg-red-100"
                                    subtitle="Within 30 days"
                                    onClick={handleExpiringSoonTenantsVisibility}
                                />
                            </div>

                            {/* Additional content such as tenant list/table can go here */}
                            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                                <div className="border-b border-gray-200">
                                    <div className="flex items-center justify-between px-6 py-4">
                                        <div className="flex gap-4">
                                            {/* <button
                                                onClick={() => setActiveTab('tenants')}
                                                className={`px-4 py-2 font-medium cursor-pointer rounded-lg transition-colors ${
                                                    activeTab === 'tenants'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                Tenants
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('invoices')}
                                                className={`px-4 py-2 font-medium cursor-pointer rounded-lg transition-colors ${
                                                    activeTab === 'invoices'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                Invoices
                                            </button> */}
                                            {[{label: 'Tenants', value: 'tenants'}].map((tab) => (
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
                                            onClick={() =>
                                                setShowAddTenantModal(true)
                                            }
                                            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-[rgb(0,0,30)] text-white rounded-lg hover:bg-slate-700 transition-colors"
                                        >
                                            <Plus className="w-5 h-5 text-amber-500" />
                                            <span className="text-amber-500">Add Tenant</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div>
                                        {tenants.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No tenants yet</h3>
                                            <p className="text-gray-600 mb-4">Get started by adding your first tenant</p>
                                            <button
                                                onClick={() => setShowAddTenantModal(true)}
                                                className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-[rgb(0,0,30)] text-white rounded-lg hover:bg-slate-700 transition-colors"
                                            >
                                                <Plus className="w-5 h-5 text-amber-500" />
                                                <span className="text-amber-500">Add Tenant</span>
                                            </button>
                                        </div>
                                        ) : (
                                        // <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        //     {tenants.map((tenant) => (
                                        //         <TenantCard key={tenant.id} tenant={tenant} onClick={() => {}} />
                                        //     ))}
                                        // </div>

                                        // New tenant table
                                        <div>
                                            {/* Include a search bar above the table to filter tenants by name, email, or phone */}
                                            <div className="mb-4 relative">
                                                {/* Add an icon inside the search input if desired */}
                                                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                                                <input
                                                    type="text"
                                                    value={searchQuery}
                                                    placeholder="Search tenants by name, email, or phone"
                                                    className="w-[50%] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                                                    text-gray-900 pl-10 transition-all duration-300"
                                                    onChange={
                                                        (e) => {
                                                            setSearchQuery(e.target.value)
                                                            setCurrentPage(1); // Reset to first page on new search
                                                        }
                                                    }
                                                    // Add onChange handler to update search state here
                                                />
                                            </div>

                                            <div>
                                                {isExpiringSoonTenants ? (
                                                    <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent Amount</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {expiringSoonTenants.map((tenant, index) => (
                                                                <tr key={index} className="hover:bg-gray-50 cursor-pointer transition-all duration-300 animate-[fadeInUp_0.3s_ease-in-out]">
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tenant.name}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.email}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.phone}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {Number(tenant.rent_amount).toLocaleString()}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tenant.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}>
                                                                            {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                                                                        </span>
                                                                    </td>
                                                                    {/* Actions column has edit/delete buttons */}
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                        <button 
                                                                            className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer"
                                                                            onClick={() => handleEditTenant(tenant)}
                                                                        >
                                                                            {/* include an edit icon instead of text */}
                                                                            <Pencil className="w-5 h-5" />
                                                                        </button>
                                                                        <button 
                                                                            className="text-red-600 hover:text-red-900 cursor-pointer"
                                                                            onClick={() => handleDeleteTenant(tenant.id)}
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
                                                ) : (
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent Amount</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {paginatedTenants.map((tenant, index) => (
                                                            <tr key={index} className="hover:bg-gray-50 cursor-pointer transition-all duration-300 animate-[fadeInUp_0.3s_ease-in-out]">
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tenant.name}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.email}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.phone}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {Number(tenant.rent_amount).toLocaleString()}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tenant.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}>
                                                                        {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                                                                    </span>
                                                                </td>
                                                                {/* Actions column has edit/delete buttons */}
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    <button 
                                                                        className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer"
                                                                        onClick={() => handleEditTenant(tenant)}
                                                                    >
                                                                        {/* include an edit icon instead of text */}
                                                                        <Pencil className="w-5 h-5" />
                                                                    </button>
                                                                    <button 
                                                                        className="text-red-600 hover:text-red-900 cursor-pointer"
                                                                        onClick={() => handleDeleteTenant(tenant.id)}
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
                                                )}
                                                </div>

                                                {/* If no tenants match the search query, show a message */}
                                                {paginatedTenants.length === 0 && (
                                                    <div className="text-center py-12">
                                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No tenants found</h3>
                                                        <p className="text-gray-600">Try adjusting your search criteria.</p>
                                                    </div>
                                                )}


                                                {/* Pagination Controls */}
                                                <Pagination
                                                    currentPage={currentPage}
                                                    setCurrentPage={setCurrentPage}
                                                    itemsPerPage={itemsPerPage}
                                                    setItemsPerPage={setItemsPerPage}
                                                    handlePageChange={handlePageChange}
                                                    totalPages={totalPages}
                                                />

                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <AddTenantModal
                            isOpen={showAddTenantModal} // control modal visibility
                            onClose={() => setShowAddTenantModal(false)} // function to close the modal
                            onSubmit={handleAddEditTenant} // function to handle form submission
                            data={currentTenant} // pass tenant data for editing
                        />

                        {/* <AddInvoiceModal
                            isOpen={showAddInvoiceModal}
                            onClose={() => setShowAddInvoiceModal(false)}
                            onSubmit={handleAddEditInvoice}
                            tenants={tenants}
                        /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

// Persisting data across page reloads ***
// Work on Edit and Delete functionalities later ***
// Work on Invoices tab table later
// Track leases expiring soon later ***
// Work on search and pagination later ***
// create a re-usable pagination component later ***

export default Tenant;
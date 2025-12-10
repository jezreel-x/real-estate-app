import React, { useEffect, useMemo } from "react";
import Sidebar from "./Sidebar";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import { StatCard } from "@custom-components/StatCard";
import { FileText, TrendingUp, Plus, Pencil, Trash2, Search } from 'lucide-react';
import { AddInvoiceModal } from "@custom-components/AddInvoiceModal";
import { notify } from "@custom-components/toastHelper";
import Pagination from "@custom-components/Pagination";


const Invoice = () => {

    const [expanded, setExpanded] = React.useState(true);
    const [invoices, setInvoices] = React.useState(() => {
        const storedInvoices = localStorage.getItem('invoices');
        return storedInvoices ? JSON.parse(storedInvoices) : [];
    });
    const [tenants] = React.useState(() => {
        const storedTenants = localStorage.getItem('tenants');
        return storedTenants ? JSON.parse(storedTenants) : [];
    });
    const [showAddInvoiceModal, setShowAddInvoiceModal] = React.useState(false);
    const [currentInvoice, setCurrentInvoice] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState("");
    
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(5);

    const pendingInvoices = invoices.filter((i) => i.status === 'pending');
    const paidInvoices = invoices.filter((i) => i.status === 'paid');
    const pendingAmount = pendingInvoices.reduce((sum, i) => sum + Number(i.amount), 0);

    useEffect(() => {
        // persist invoices to localStorage whenever they change
        localStorage.setItem('invoices', JSON.stringify(invoices));
    }, [invoices]);

    const handleDeleteInvoice = (invoiceId) => {
        // Show confirmation toast
        if (window.confirm("Are you sure you want to delete this invoice? This action cannot be undone.")) {
            handleDeleteInvoiceConfirmed(invoiceId);
        }
    };
    
    const handleDeleteInvoiceConfirmed = (invoiceId) => {
        // toast notification asking for deletion confirmation
        notify(`info`, `Deleting...`);

        // Logic to delete invoice only after confirmation
        setTimeout(() => {
            const updatedInvoices = invoices.filter((i) => i.id !== invoiceId);
            setInvoices(updatedInvoices);
            localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
            notify('success', 'Invoice deleted successfully.');
        }, 3000); // Simulate delay for deletion
    };

    const handleAddEditInvoice = async (invoiceData) => {
        // Simulate API call
        // const newInvoice = { id: Date.now(), ...invoiceData };
        // setInvoices((prev) => [...prev, newInvoice]);

        if (currentInvoice) {
            // Edit existing invoice
            const updatedInvoice = { ...currentInvoice, ...invoiceData };
            setInvoices((prev) => prev.map((i) => (i.id === updatedInvoice.id ? updatedInvoice : i)));
            localStorage.setItem('invoices', JSON.stringify(invoices));
            notify('success', 'Invoice updated successfully.');
            setCurrentInvoice(null); // Clear current invoice after editing
        } else {
            // Add new invoice
            const newInvoice = { id: Date.now(), ...invoiceData };
            setInvoices((prev) => [...prev, newInvoice]);
            localStorage.setItem('invoices', JSON.stringify(invoices));
            notify('success', 'Invoice added successfully.');
        }
    };

    const handleEditInvoice = (invoiceData) => {
        setCurrentInvoice(invoiceData);
        setShowAddInvoiceModal(true);
    };

    const filteredInvoices = invoices.filter((invoice) => {
        const query = searchQuery.trim().toLowerCase();
        return (
            invoice.tenant_label.toLowerCase().includes(query) ||
            invoice.invoice_number.toLowerCase().includes(query) ||
            invoice.amount.toString().toLowerCase().includes(query) ||
            invoice.due_date.toLowerCase().includes(query) ||
            invoice.status.toLowerCase().includes(query)
        );
    });

    // Pagination logic
    const paginatedInvoices = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredInvoices.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredInvoices, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

    // page change handler
    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="flex flex-col w-full bg-gray-100">
                <PropertyManagerNavbar />
                <div className="flex mt-20">
                    <Sidebar expanded={expanded} setExpanded={setExpanded} />
                    <main 
                        className={`flex flex-1 flex-col min-h-screen
                        transition-all duration-300 ease-in-out ${expanded ? "ml-64" : "ml-20"}`}
                    >
                        <div className="px-4 pt-4 pb-8 max-w-[calc(100vw-16rem)] mx-auto w-full">
                            <h1 className="text-2xl font-bold mb-4 text-gray-700">Invoices</h1>

                            {/* Invoice content goes here */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                <StatCard
                                    title="Pending Invoices"
                                    value={pendingInvoices.length}
                                    icon={FileText}
                                    iconColor="text-amber-600"
                                    iconBgColor="bg-amber-100"
                                    subtitle={`KES ${pendingAmount.toLocaleString()} due`}
                                />
                                <StatCard
                                    title="Paid Invoices"
                                    value={paidInvoices.length}
                                    icon={TrendingUp}
                                    iconColor="text-emerald-600"
                                    iconBgColor="bg-emerald-100"
                                    subtitle="This period"
                                />
                            </div>

                            {/* Additional information and actions */}
                            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                                <div className="border-b border-gray-200">
                                    <div className="flex items-center justify-between px-6 py-4">
                                        <div className="flex gap-4">
                                            {[{label: 'Invoices', value: 'invoices'}].map((tab) => (
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
                                            onClick={() => setShowAddInvoiceModal(true)}
                                            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-[rgb(0,0,30)] text-white rounded-lg hover:bg-slate-700 transition-colors"
                                        >
                                            <Plus className="w-5 h-5 text-amber-500" />
                                            <span className="text-amber-500">Add Invoice</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div>
                                        {invoices.length === 0 ? (
                                            <div className="text-center py-12">
                                                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices yet</h3>
                                                <p className="text-gray-600 mb-4">Create your first invoice to start tracking payments</p>
                                                <button
                                                    onClick={() => setShowAddInvoiceModal(true)}
                                                    className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-[rgb(0,0,30)] text-amber-500 rounded-lg hover:bg-slate-700 transition-colors"
                                                >
                                                <Plus className="w-5 h-5" />
                                                Create Invoice
                                                </button>
                                            </div>
                                        ) : (
                                            // Render invoices list here
                                            <div>
                                                {/* Your invoices list rendering logic */}
                                                {/* Include a search bar above the table to filter tenants by name, email, or phone */}
                                                <div className="mb-4 relative">
                                                    {/* Add an icon inside the search input if desired */}
                                                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                                                    <input
                                                        type="text"
                                                        value={searchQuery}
                                                        placeholder="Search invoices by tenant, invoice number, amount or status"
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

                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Number</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th> */}
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {paginatedInvoices.map((invoice, index) => (
                                                            <tr key={index} className="hover:bg-gray-50 cursor-pointer transition-all duration-300 animate-[fadeInUp_0.3s_ease-in-out]">
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.tenant_label}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.invoice_number}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {Number(invoice.amount).toLocaleString()}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.due_date}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invoice.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 
                                                                    invoice.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                                                                    }`}>
                                                                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                                                    </span>
                                                                </td>
                                                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.description}</td> */}
                                                                {/* Actions column has edit/delete buttons */}
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    <button 
                                                                        className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer"
                                                                        onClick={() => handleEditInvoice(invoice)}
                                                                    >
                                                                        {/* include an edit icon instead of text */}
                                                                        <Pencil className="w-5 h-5" />
                                                                    </button>
                                                                    <button 
                                                                        className="text-red-600 hover:text-red-900 cursor-pointer"
                                                                        onClick={() => handleDeleteInvoice(invoice.id)}
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

                                                {/* If no invoices match the search query, show a message */}
                                                {paginatedInvoices.length === 0 && (
                                                    <div className="text-center py-12">
                                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
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

                        <AddInvoiceModal
                            isOpen={showAddInvoiceModal} // controls modal visibility
                            onClose={() => setShowAddInvoiceModal(false)} // handles closing the modal
                            onSubmit={handleAddEditInvoice} // handles form submission
                            tenants={tenants} // pass tenants for the dropdown
                            data={currentInvoice} // pass current invoice for editing
                        />
                    </main>
                </div>
            </div>
        </div>
    );
};

// why invoice data is not being persisted to modal when editing?

export default Invoice;
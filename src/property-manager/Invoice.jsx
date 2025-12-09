import React from "react";
import Sidebar from "./Sidebar";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import { StatCard } from "@custom-components/StatCard";
import { FileText, TrendingUp, Plus } from 'lucide-react';
import { AddInvoiceModal } from "@custom-components/AddInvoiceModal";

const Invoice = () => {

    const [expanded, setExpanded] = React.useState(true);
    const [invoices, setInvoices] = React.useState(() => {
        const storedInvoices = localStorage.getItem('invoices');
        return storedInvoices ? JSON.parse(storedInvoices) : [];
    });
    const [tenants, setTenants] = React.useState(() => {
        const storedTenants = localStorage.getItem('tenants');
        return storedTenants ? JSON.parse(storedTenants) : [];
    });
    const [showAddInvoiceModal, setShowAddInvoiceModal] = React.useState(false);
    const [currentInvoice, setCurrentInvoice] = React.useState(null);
    // const [activeTab, setActiveTab] = React.useState('tenants');
    

    const pendingInvoices = invoices.filter((i) => i.status === 'pending');
    const paidInvoices = invoices.filter((i) => i.status === 'paid');
    const pendingAmount = pendingInvoices.reduce((sum, i) => sum + Number(i.amount), 0);

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
                                                    className="px-4 py-2 font-medium cursor-pointer rounded-lg transition-colors bg-[rgb(0,0,30)] text-amber-500 hover:bg-slate-700"
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
                        />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
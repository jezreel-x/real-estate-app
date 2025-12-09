import React from "react";
import Sidebar from "./Sidebar";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import { StatCard } from "@custom-components/StatCard";
import { FileText, TrendingUp } from 'lucide-react';
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

    const pendingInvoices = invoices.filter((i) => i.status === 'pending');
    const paidInvoices = invoices.filter((i) => i.status === 'paid');
    const pendingAmount = pendingInvoices.reduce((sum, i) => sum + Number(i.amount), 0);

    const handleAddInvoice = async (invoiceData) => {
        // Simulate API call
        const newInvoice = { id: Date.now(), ...invoiceData };
        setInvoices((prev) => [...prev, newInvoice]);
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
                        </div>

                        <AddInvoiceModal
                            isOpen={showAddInvoiceModal} // controls modal visibility
                            onClose={() => setShowAddInvoiceModal(false)} // handles closing the modal
                            onSubmit={handleAddInvoice} // handles form submission
                            tenants={tenants} // pass tenants for the dropdown
                        />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
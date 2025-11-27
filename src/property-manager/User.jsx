import React from "react";
import { TenantStatCard } from "@custom-components/TenantStatCard";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import { Users, FileText, DollarSign, TrendingUp, Plus } from 'lucide-react';
import Sidebar from "./Sidebar";
import { AddInvoiceModal } from "@custom-components/AddInvoiceModal";
import { AddTenantModal } from "@custom-components/AddTenantModal";

const User = () => {
    // Sample data - replace with actual data fetching logic
    const [tenants, setTenants] = React.useState([]);
    const [invoices, setInvoices] = React.useState([]);
    const [activeTab, setActiveTab] = React.useState('tenants');
    const [showAddTenantModal, setShowAddTenantModal] = React.useState(false);
    const [showAddInvoiceModal, setShowAddInvoiceModal] = React.useState(false);

    const activeTenants = tenants.filter((t) => t.status === 'active');
    const totalRent = activeTenants.reduce((sum, t) => sum + Number(t.rent_amount), 0);
    const pendingInvoices = invoices.filter((i) => i.status === 'pending');
    const paidInvoices = invoices.filter((i) => i.status === 'paid');
    const pendingAmount = pendingInvoices.reduce((sum, i) => sum + Number(i.amount), 0);


    const handleAddTenant = async (tenantData) => {
        // Simulate API call
        const newTenant = { id: Date.now(), ...tenantData };
        setTenants((prev) => [...prev, newTenant]);
    };

    const handleAddInvoice = async (invoiceData) => {
        // Simulate API call
        const newInvoice = { id: Date.now(), ...invoiceData };
        setInvoices((prev) => [...prev, newInvoice]);
    };

    return (
        <>
            <div className="flex flex-col w-full bg-gray-100">
                <PropertyManagerNavbar />
                <div className="flex mt-20">
                    <Sidebar />
                    <div className="flex flex-1 max-w-[calc(100vw-16rem)] mx-auto flex-col min-h-screen">
                        <div className="px-4 pt-4 pb-0">
                            <h1 className="text-2xl font-bold mb-4 text-gray-700">Tenants</h1>

                            {/* Users content goes here */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                <TenantStatCard
                                    title="Total Tenants"
                                    value={tenants.length}
                                    icon={Users}
                                    iconColor="text-blue-600"
                                    iconBgColor="bg-blue-100"
                                    subtitle={`${activeTenants.length} active`}
                                />
                                <TenantStatCard
                                    title="Monthly Revenue"
                                    value={`$${totalRent.toLocaleString()}`}
                                    icon={DollarSign}
                                    iconColor="text-emerald-600"
                                    iconBgColor="bg-emerald-100"
                                    subtitle="From active tenants"
                                />
                                <TenantStatCard
                                    title="Pending Invoices"
                                    value={pendingInvoices.length}
                                    icon={FileText}
                                    iconColor="text-amber-600"
                                    iconBgColor="bg-amber-100"
                                    subtitle={`$${pendingAmount.toLocaleString()} due`}
                                />
                                <TenantStatCard
                                    title="Paid Invoices"
                                    value={paidInvoices.length}
                                    icon={TrendingUp}
                                    iconColor="text-emerald-600"
                                    iconBgColor="bg-emerald-100"
                                    subtitle="This period"
                                />
                            </div>

                            {/* Additional content such as tenant list/table can go here */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="border-b border-gray-200">
                                    <div className="flex items-center justify-between px-6 py-4">
                                        <div className="flex gap-4">
                                            <button
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
                                            </button>
                                        </div>
                                        <button
                                            onClick={() =>
                                            activeTab === 'tenants' ? setShowAddTenantModal(true) : setShowAddInvoiceModal(true)
                                            }
                                            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Add {activeTab === 'tenants' ? 'Tenant' : 'Invoice'}
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {activeTab === 'tenants' ? (
                                    <div>
                                        {tenants.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No tenants yet</h3>
                                            <p className="text-gray-600 mb-4">Get started by adding your first tenant</p>
                                            <button
                                                onClick={() => setShowAddTenantModal(true)}
                                                className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                <Plus className="w-5 h-5" />
                                                Add Tenant
                                            </button>
                                        </div>
                                        ) : (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {tenants.map((tenant) => (
                                                <TenantCard key={tenant.id} tenant={tenant} onClick={() => {}} />
                                            ))}
                                        </div>
                                        )}
                                    </div>
                                    ) : (
                                    <div>
                                        {invoices.length === 0 ? (
                                        <div className="text-center py-12">
                                            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices yet</h3>
                                            <p className="text-gray-600 mb-4">Create your first invoice to start tracking payments</p>
                                            <button
                                            onClick={() => setShowAddInvoiceModal(true)}
                                            className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                            <Plus className="w-5 h-5" />
                                            Create Invoice
                                            </button>
                                        </div>
                                        ) : (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {invoicesWithTenants.map((invoice) => (
                                            <InvoiceCard key={invoice.id} invoice={invoice} onClick={() => {}} />
                                            ))}
                                        </div>
                                        )}
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <AddTenantModal
                            isOpen={showAddTenantModal}
                            onClose={() => setShowAddTenantModal(false)}
                            onSubmit={handleAddTenant}
                        />

                        <AddInvoiceModal
                            isOpen={showAddInvoiceModal}
                            onClose={() => setShowAddInvoiceModal(false)}
                            onSubmit={handleAddInvoice}
                            tenants={tenants}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default User;
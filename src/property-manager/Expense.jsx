import React, { useState } from "react";
import { notify } from "@custom-components/toastHelper";
import { StatCard } from "@custom-components/StatCard";
import AddExpenseModal from "@custom-components/AddExpenseModal";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import Sidebar from "./Sidebar";
import { Plus, FileText, AlertTriangle, BarChart3, CheckCircle, Clock, Tags, Wallet } from "lucide-react";

const Expense = () => {

    const [expenses, setExpenses] = useState(() => {
        const storedExpenses = localStorage.getItem("expenses");
        return storedExpenses ? JSON.parse(storedExpenses) : [];
    });
    const [properties, setProperties] = useState(() => {
            const storedProperties = localStorage.getItem('properties');
            return storedProperties ? JSON.parse(storedProperties) : []; 
    });
    const [units, setUnits] = React.useState(() => {
        const storedUnits = localStorage.getItem('units');
        return storedUnits ? JSON.parse(storedUnits) : []; 
    });
    const [expanded, setExpanded] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);

    const handleAddEditExpense = async (expenseData) => {
        // Simulate API call
        // const newInvoice = { id: Date.now(), ...expenseData };
        // setInvoices((prev) => [...prev, newInvoice]);

        if (currentExpense) {
            // Edit existing expense
            const updatedExpense = { ...currentExpense, ...expenseData };
            setExpenses((prev) => prev.map((i) => (i.id === updatedExpense.id ? updatedExpense : i)));
            localStorage.setItem('expenses', JSON.stringify(expenses));
            notify('success', 'Expense updated successfully.');
            setCurrentExpense(null); // Clear current expense after editing
        } else {
            // Add new expense
            const newExpense = { id: crypto.randomUUID(), ...expenseData };
            setExpenses((prev) => [...prev, newExpense]);
            try {
                localStorage.setItem('expenses', JSON.stringify(expenses));
            } catch (error) {
                if (error.name === 'QuotaExceededError') {
                    console.error('Local storage quota exceeded. Cannot save expense.');
                    notify('error', 'Failed to save expense: local storage quota exceeded.');
                    return;
                }
            }
            notify('success', 'Expense added successfully.');
        }
    };

    return (
        <>
            <div className="flex flex-col w-full bg-gray-100">
                <PropertyManagerNavbar />
                <div className="flex mt-20">
                    <Sidebar expanded={expanded} setExpanded={setExpanded} />
                    <main className={`flex flex-1 flex-col min-h-screen
                        transition-all duration-300 ease-in-out ${expanded ? "ml-64" : "ml-20"}`}
                    >
                        <div className="px-4 pt-4 pb-8 max-w-[calc(100vw-16rem)] mx-auto w-full">
                            <h1 className="text-2xl font-bold mb-4 text-gray-700">Expenses</h1>

                            {/* Stat Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                <StatCard title="Total Expenses (This Month)" value={0} icon={Wallet} iconColor="text-blue-600" iconBgColor="bg-blue-100" subtitle="Snapshot of current cash outflow" />
                                <StatCard title="Year-To-Date Expenses" value={0} icon={BarChart3} iconColor="text-indigo-600" iconBgColor="bg-indigo-100" subtitle="Tracks annual spending" />
                                <StatCard title="Paid Expenses" value={0} icon={CheckCircle} iconColor="text-green-600" iconBgColor="bg-green-100" subtitle="Confirmed payments" />
                                <StatCard title="Pending Expenses" value={0} icon={Clock} iconColor="text-amber-600" iconBgColor="bg-amber-100" subtitle="Highlights unpaid obligations" />
                                <StatCard title="Overdue Expenses" value={0} icon={AlertTriangle} iconColor="text-red-600" iconBgColor="bg-red-100" subtitle="Flags urgent financial issues" />
                                <StatCard title="Top Expenses" value={0} icon={Tags} iconColor="text-purple-600" iconBgColor="bg-purple-100" subtitle="Most frequent expenses" />
                            </div>

                            {/* Additional Information & Actions */}
                            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                                <div className="border-b border-gray-200">
                                    <div className="flex items-center justify-between px-6 py-4">
                                        <div className="flex gap-4">
                                            {[{label: 'Expenses', value: 'expenses'}].map((tab) => (
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
                                            onClick={() => setShowAddExpenseModal(true)}
                                            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-[rgb(0,0,30)] text-white rounded-lg hover:bg-slate-700 transition-colors"
                                        >
                                            <Plus className="w-5 h-5 text-amber-500" />
                                            <span className="text-amber-500">Add Expense</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <>  
                                        {/* Expense list or content goes here */}
                                        {expenses.length === 0 ? (
                                            <div className="text-center py-12">
                                                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
                                                <p className="text-gray-600 mb-4">Create your first expense to start tracking expenses</p>
                                                <button
                                                    onClick={() => setShowAddExpenseModal(true)}
                                                    className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-[rgb(0,0,30)] text-amber-500 rounded-lg hover:bg-slate-700 transition-colors"
                                                >
                                                <Plus className="w-5 h-5" />
                                                    Create Expense
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="text-gray-600 mb-4 text-center">Expenses Added</p>
                                        )}
                                    </>
                                </div>
                            </div>
                        </div>

                        <AddExpenseModal
                            isOpen={showAddExpenseModal} // controls modal visibility
                            onClose={() => setShowAddExpenseModal(false)} // handles closing the modal
                            onSubmit={handleAddEditExpense} // handles modal form submission
                            properties={properties} // pass properties for the dropdown
                            units={units} // pass units for the dropdown
                            data={currentExpense} // pass current expense for editing
                        />
                    </main>
                </div>
            </div>
        </>
    );
};

export default Expense;
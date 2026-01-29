import React, { useState, useMemo } from "react";
import { notify } from "@custom-components/toastHelper";
import { StatCard } from "@custom-components/StatCard";
import AddExpenseModal from "@custom-components/AddExpenseModal";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import Sidebar from "./Sidebar";
import { Plus, FileText, AlertTriangle, BarChart3, CheckCircle, Clock, Tags, Wallet, Trash2, Pencil } from "lucide-react";
import Pagination from "@custom-components/Pagination";

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
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const totalMonthExpenses = expenses
        .filter((expense) => {
            const expenseDate = new Date(expense.date);
            const now = new Date();
            return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
        })
        .reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);

    const totalExpenses = totalMonthExpenses;

    const paidExpenses = expenses
        .filter((expense) => expense.status === 'Paid')
        .reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);

    const pendingExpenses = expenses
        .filter((expense) => expense.status === 'Unpaid')
        .reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);

    const currentYear = new Date().getFullYear();
    const yearToDateExpenses = expenses
        .filter((expense) => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getFullYear() === currentYear;
        })
        .reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);

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

    // Filter expenses based on search query (date, property, unit, vendor, category)
    const filteredExpenses = expenses.filter((expense) => {
        const query = searchQuery.trim().toLowerCase();
        return (
            expense.date.toLowerCase().includes(query) ||
            expense.property.toLowerCase().includes(query) ||
            expense.unit.toLowerCase().includes(query) ||
            expense.vendor.toLowerCase().includes(query) ||
            expense.category.toLowerCase().includes(query)
        );
    });

    // total pages
    const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

    // get current page expenses
    const paginatedExpenses = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredExpenses.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredExpenses, currentPage, itemsPerPage]);

    // function to handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    // function to handle prompting of whether to delete or not
    const handleDeleteExpense = (expenseID) => {
        if (window.confirm('Are you sure you want to delete this expense? This action cannot be undone.')) {
            handleDeleteExpenseConfirmed(expenseID);
        }
    }; 

    // function to confirm deletion of an expense
    const handleDeleteExpenseConfirmed = (expenseID) => {

        // loading notification for deletion process
        notify('info', 'Deleting Expense...');

        setTimeout(() => {
            const updatedExpenses = expenses.filter((expense) => expense.id !== expenseID);
            setExpenses(updatedExpenses);
            localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
            notify('success', 'Expense deleted successfully!!!');
        }, 3000);
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
                                <StatCard title="Total Expenses (This Month)" value={`KES ${totalExpenses.toLocaleString()}`} icon={Wallet} iconColor="text-blue-600" iconBgColor="bg-blue-100" subtitle="Snapshot of current cash outflow" />
                                <StatCard title="Year-To-Date Expenses" value={`KES ${yearToDateExpenses.toLocaleString()}`} icon={BarChart3} iconColor="text-indigo-600" iconBgColor="bg-indigo-100" subtitle="Tracks annual spending" />
                                <StatCard title="Paid Expenses" value={`KES ${paidExpenses.toLocaleString()}`} icon={CheckCircle} iconColor="text-green-600" iconBgColor="bg-green-100" subtitle="Confirmed payments" />
                                <StatCard title="Pending Expenses" value={`KES ${pendingExpenses.toLocaleString()}`} icon={Clock} iconColor="text-amber-600" iconBgColor="bg-amber-100" subtitle="Highlights unpaid obligations" />
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
                                            <>
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {paginatedExpenses.map((expense, index) => (
                                                                <tr 
                                                                    key={index}
                                                                    className="hover:bg-gray-50 cursor-pointer transition-all duration-300 animate-[fadeInUp_0.3s_ease-in-out]"
                                                                >
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.date}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.property}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.unit}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.category}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.vendor}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">KES {expense.amount}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        {expense.status === 'Paid' ? (
                                                                            <span className="px-2 py-1 text-xs leading-tight rounded-full bg-green-100 text-green-800">Paid</span>
                                                                        ) : (
                                                                            <span className="px-2 py-1 text-xs leading-tight rounded-full bg-amber-100 text-amber-800">Pending</span>
                                                                        )}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                        <button 
                                                                            className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer"
                                                                            onClick={() => {
                                                                                // e.stopPropagation();
                                                                                setShowAddExpenseModal(true);
                                                                                setCurrentExpense(expense);
                                                                            }}
                                                                        >
                                                                            {/* include an edit icon instead of text */}
                                                                            <Pencil className="w-5 h-5" />
                                                                        </button>
                                                                        <button 
                                                                            className="text-red-600 hover:text-red-900 cursor-pointer"
                                                                            onClick={() => {
                                                                                handleDeleteExpense(expense.id)
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


                                                {/* If no expenses match the search query */}
                                                {filteredExpenses.length === 0 && (
                                                    <div className="text-center py-12">
                                                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No expenses found</h3>
                                                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or add a new expense.</p>
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
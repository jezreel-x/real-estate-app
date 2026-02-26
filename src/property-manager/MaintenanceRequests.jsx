import { useState, useMemo } from "react";
import { AlertCircle, AlertTriangle, CheckCircle, ClipboardList, Timer, Wrench, Plus, FileText, Search, Pencil, Trash2 } from "lucide-react";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import Sidebar from "./Sidebar";
import { StatCard } from "@custom-components/StatCard";
import { notify } from "@custom-components/toastHelper";
import AddMaintenanceRequestModal from "@custom-components/AddMaintenanceRequestModal";
import Pagination from "@custom-components/Pagination";


const MaintenaceRequests = () => {

    const [expanded, setExpanded] = useState(false);
    const [showAddMaintenanceRequestModal, setShowAddMaintenanceRequestModal] = useState(false);
    const [maintenanceRequests, setMaintenanceRequests] = useState(() => {
        const storedRequests = localStorage.getItem("maintenanceRequests");
        return storedRequests ? JSON.parse(storedRequests) : [];
    });
     const [properties, setProperties] = useState(() => {
        const storedProperties = localStorage.getItem('properties');
        return storedProperties ? JSON.parse(storedProperties) : []; 
    });
    const [units, setUnits] = useState(() => {
        const storedUnits = localStorage.getItem('units');
        return storedUnits ? JSON.parse(storedUnits) : []; 
    });
    const [tenants, setTenants] = useState(() => {
        const storedTenants = localStorage.getItem('tenants');
        return storedTenants ? JSON.parse(storedTenants) : [];
    });
    const [currentMaintenanceRequest, setCurrentMaintenanceRequest] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);


    const handleAddEditMaintenanceRequest = (requestData, generateRequestID) => {
        if (currentMaintenanceRequest) {
            // Edit existing request
            const updatedRequests = maintenanceRequests.map(req => 
                req.id === currentMaintenanceRequest.id ? requestData : req
            );
            setMaintenanceRequests(updatedRequests);
            localStorage.setItem("maintenanceRequests", JSON.stringify(updatedRequests));
        } else {

            // generate unique request ID using crypto API for better uniqueness and security
            var generateRequestID = (length = 6) => {
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let result = '';

                for (let i = 0; i < length; i++) {
                    result += chars.charAt(Math.floor(Math.random() * chars.length));
                };

                return result.toUpperCase();
            };

            // Add new request
            const newMaintenanceRequest = { id: crypto.randomUUID(), requestID: generateRequestID(), ...requestData };
            const updatedRequests = [...maintenanceRequests, newMaintenanceRequest];
            setMaintenanceRequests(updatedRequests);
            try {
                localStorage.setItem('maintenanceRequests', JSON.stringify(updatedRequests));
            } catch (error) {
                if (error.name === 'QuotaExceededError') {
                    console.error('Local storage quota exceeded. Cannot save maintenance request.');
                    notify('error', 'Failed to save maintenance request: local storage quota exceeded.');
                    return;
                }
            }
            notify('success', 'Maintenance request added successfully.');
        }
        // setCurrentMaintenanceRequest(null);
        // setShowAddMaintenanceRequestModal(false);
    };

    // Filter maintenance requests based on search query
    const filteredMaintenanceRequests = maintenanceRequests.filter(request => {
        const query = searchQuery.trim().toLowerCase();

        return (
            request.assignedMaintainer.toLowerCase().includes(query) ||
            request.property.toLowerCase().includes(query) ||
            request.unit.toLowerCase().includes(query) ||
            request.issueCategory.toLowerCase().includes(query) ||
            request.priority.toLowerCase().includes(query) ||
            request.description.toLowerCase().includes(query) ||
            request.status.toLowerCase().includes(query)
        );
    });


    // Pagination logic
    // total pages based on filtered service providers
    const totalPages = Math.ceil(filteredMaintenanceRequests.length / itemsPerPage);

    // get current page service providers
    const paginatedMaintenanceRequests = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredMaintenanceRequests.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredMaintenanceRequests, currentPage, itemsPerPage]);

    // function to handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // function to handle prompting of whether to delete or not
    const handleDeleteMaintenanceRequest = (maintenanceRequestID) => {
        if (window.confirm('Are you sure you want to delete this maintenance request? This action cannot be undone.')) {
            handleDeleteMaintenanceRequestConfirmed(maintenanceRequestID);
        }
    }; 

    // function to confirm deletion of a maintenance request and show loading notification while deleting
    const handleDeleteMaintenanceRequestConfirmed = (maintenanceRequestID) => {

        // loading notification for deletion process
        notify('info', 'Deleting Maintenance Request...');

        setTimeout(() => {
            const updatedMaintenanceRequests = maintenanceRequests.filter((request) => request.id !== maintenanceRequestID);
            setMaintenanceRequests(updatedMaintenanceRequests);
            localStorage.setItem('maintenanceRequests', JSON.stringify(updatedMaintenanceRequests));
            notify('success', 'Maintenance Request deleted successfully!!!');
        }, 3000);
    };

    {/* 
    * @TODO: Implement edit functionality - when clicking on a maintenance request, populate the AddMaintenanceRequestModal with the request's data and allow editing. 
      This will involve setting currentMaintenanceRequest to the selected request and modifying handleAddEditMaintenanceRequest to handle both adding and editing logic based on whether 
      currentMaintenanceRequest is null or not.

      @TODO: Implement delete functionality - add a delete button for each maintenance request in the table, and implement a function to remove the request from state 
      and localStorage when clicked.

      @TODO: Implement pagination for the maintenance requests table, especially when there are many requests. This will involve adding state for currentPage and itemsPerPage, and
      modifying the rendering logic to only show the requests for the current page, as well as adding pagination controls to navigate between pages.
    *
    * */}

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

                                    <div className="p-6">
                                        <>
                                            {/* Table or list of service providers would go here */}
                                            {maintenanceRequests.length === 0 ? (
                                                <div className="text-center py-12">
                                                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No maintenance requests yet</h3>
                                                    <p className="text-gray-600 mb-4">Create your first maintenance request to start tracking maintenance requests</p>
                                                    <button
                                                        onClick={() => setShowAddMaintenanceRequestModal(true)}
                                                        className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-[rgb(0,0,30)] text-amber-500 rounded-lg hover:bg-slate-700 transition-colors"
                                                    >
                                                        <Plus className="w-5 h-5" />
                                                        Create Maintenance Request
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    {/* Search Bar */}
                                                    <div className="mb-4 relative">
                                                    {/* Add an icon inside the search input if desired */}
                                                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                                                        <input
                                                            type="text"
                                                            value={searchQuery}
                                                            placeholder="Search maintenance requests by title, description, or status..."
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

                                                    {/* Render list of Maintenance Requests */}
                                                    <div className="overflow-x-auto">
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                            <thead className="bg-gray-50">
                                                                <tr>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Category</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Resolved</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {paginatedMaintenanceRequests.map((request, index) => (
                                                                    <tr 
                                                                        key={index}
                                                                        className="hover:bg-gray-50 cursor-pointer transition-all duration-300 animate-[fadeInUp_0.3s_ease-in-out]"
                                                                    >
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.requestID}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.property}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.unit}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.issueCategory}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.priority}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.status}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.assignedMaintainer !== "" ? request.assignedMaintainer : "Unassigned"}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.dateReported}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.dateResolved !== null ? request.dateResolved : "Not Resolved"}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                            <button 
                                                                                className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer"
                                                                                onClick={() => {
                                                                                    // e.stopPropagation();
                                                                                    setShowAddMaintenanceRequestModal(true);
                                                                                    setCurrentMaintenanceRequest(request);
                                                                                }}
                                                                            >
                                                                                {/* include an edit icon instead of text */}
                                                                                <Pencil className="w-5 h-5" />
                                                                            </button>
                                                                            <button 
                                                                                className="text-red-600 hover:text-red-900 cursor-pointer"
                                                                                onClick={() => {
                                                                                    handleDeleteMaintenanceRequest(request.id)
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

                                                    {/* If no maintenance requests match the search query */}
                                                    {filteredMaintenanceRequests.length === 0 && (
                                                        <div className="text-center py-12">
                                                            <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                                            <h3 className="mt-2 text-sm font-medium text-gray-900">No maintenance requests found</h3>
                                                            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or add a new maintenance request.</p>
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

                            {/* AddMaintenanceRequestModal */}
                            <AddMaintenanceRequestModal 
                                isOpen={showAddMaintenanceRequestModal}
                                data={currentMaintenanceRequest}
                                onSubmit={handleAddEditMaintenanceRequest}
                                onClose={() => setShowAddMaintenanceRequestModal(false)}
                                properties={properties}
                                units={units}
                                tenants={tenants}
                                // onAdd={(newRequest) => {
                                //     const updatedRequests = [...maintenanceRequests, newRequest];
                                //     setMaintenanceRequests(updatedRequests);
                                //     localStorage.setItem("maintenanceRequests", JSON.stringify(updatedRequests));
                                // }}
                            />
                        </main>
                </div>
            </div>
        </>
    );
};

export default MaintenaceRequests;
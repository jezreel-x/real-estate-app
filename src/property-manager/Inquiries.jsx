import React, { useEffect, useMemo } from "react";
import { differenceInDays, parseISO } from "date-fns";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import { StatCard } from "@custom-components/StatCard";
import { notify } from "@custom-components/toastHelper";
import Sidebar from "./Sidebar";
import { CalendarSearch, Clock, Inbox, Mail, MessageCircle, User, VideoIcon, Search } from "lucide-react";
import InquiriesEmptyState from "@custom-components/InquiriesEmptyState";
import InquiriesTable from "@custom-components/InquiriesTable";
import Pagination from "@custom-components/Pagination";
import SearchBar from "../custom-components/SearchBar";

const Inquiries = () => {

    const [expanded, setExpanded] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState("more-info-requests");
    const [moreInfoRequests, setMoreInfoRequests] = React.useState([]);
    const [scheduledVisits, setScheduledVisits] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(5);

    const unreadCount = moreInfoRequests.filter(request => !request.isRead).length;

    useEffect(() => {
        try {
            const storedInfoRequests = localStorage.getItem('requestInfoData');
            if (storedInfoRequests) {
                setMoreInfoRequests(Array.isArray(JSON.parse(storedInfoRequests)) ? JSON.parse(storedInfoRequests) : []);
            }
        } catch (error) {
            console.error('Error parsing requestInfoData from localStorage:', error);
            setMoreInfoRequests([]);
        }
    }, []);

    useEffect(() => {
        try {
            const storedVisits = localStorage.getItem('scheduledVisits');
            if (storedVisits) {
                setScheduledVisits(JSON.parse(storedVisits));
            }
        } catch (error) {
            console.error('Error parsing scheduledVisits from localStorage:', error);
            setScheduledVisits([]);
        }
    }, []);

    const TABS = {
        MORE_INFO: 'more-info-requests',
        SCHEDULED_VISITS: 'scheduled-visits'
    };

    // function to handle deleting a unit with a custom toast notification
    const handleDeleteRequest = (inquiryId) => {
        // Show confirmation toast
        if (window.confirm("Are you sure you want to delete this inquiry? This action cannot be undone.")) {
            handleDeleteRequestConfirmed(inquiryId);
        }
    };

    const handleDeleteRequestConfirmed = (id) => {
        // toast notification asking for deletion confirmation
        notify(`info`, `Deleting...`);

        // Logic to delete unit only after confirmation
        setTimeout(() => {
            const updatedRequests = moreInfoRequests.filter((r) => r.id !== id);
            setMoreInfoRequests(updatedRequests);
            localStorage.setItem('requestInfoData', JSON.stringify(updatedRequests));
            notify('success', 'Request deleted successfully.');
        }, 3000); // Simulate delay for deletion
    };

    // function to mark inquiry as read
    const markAsRead = (id) => {
        const updatedReadUnreadRequests = moreInfoRequests.map((inq) =>
            inq.id === id ? { ...inq, isRead: true } : inq
        );
        setMoreInfoRequests(updatedReadUnreadRequests);
        localStorage.setItem("requestInfoData", JSON.stringify(updatedReadUnreadRequests));
    };

    // function to mark scheduled visit as read
    const markScheduledVisitAsRead = (id) => {
        const updatedReadUnreadVisits = scheduledVisits.map((visit) =>
            visit.id === id ? { ...visit, isRead: true } : visit
        );
        setScheduledVisits(updatedReadUnreadVisits);
        localStorage.setItem("scheduledVisits", JSON.stringify(updatedReadUnreadVisits));
    };

    {/* Pagination and Search Logic for Info Requests */}
    // Filter Inquiries by name, email
    const filteredInfoRequests = moreInfoRequests.filter((info) => {
        const query = searchQuery.trim().toLowerCase();
        return(
            info.name.toLowerCase().includes(query) ||
            info.email.toLowerCase().includes(query)
        );
    });

    const totalPages = Math.ceil(filteredInfoRequests.length / itemsPerPage);

    // Paginate filtered Inquiries (basically, what INQUIRIES (Info Requests) to display for that current page)
    const paginatedInfoRequests = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredInfoRequests.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredInfoRequests, itemsPerPage, currentPage]);

    // // handles page change
    // const handlePageChange = (page) => {
    //     if (page < 1 || page > totalPages) return;
    //     setCurrentPage(page);
    // };


    {/* Pagination and Search Logic for Scheduled Visits */}
    const filteredScheduledVisits = scheduledVisits.filter((visit) => {
        const query = searchQuery.trim().toLowerCase();
        return (
            visit.name.toLowerCase().includes(query) ||
            visit.email.toLowerCase().includes(query)
        );
    });

    const totalPagesScheduledVisits = Math.ceil(filteredScheduledVisits.length / itemsPerPage);

    // Paginate filtered Scheduled Visits
    const paginatedScheduledVisits = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredScheduledVisits.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredScheduledVisits, itemsPerPage, currentPage]);

    // handles page change
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const upcomingVisitsCount = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // start of today at midnight

        const sevenDaysFromNow = new Date(today); // creating a shallow copy of today midnight in sevenDaysFromNow constant 
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7); // the final result of sevenDaysFromNow, literally

        return scheduledVisits.filter((visit) => {
            const visitDate = new Date(visit.date); // converts date string (from localStorage) to a valid Date Object
            return visitDate >= today && visitDate <= sevenDaysFromNow;
        }).length;
    }, [scheduledVisits]);

    return (
        <>
            <div className="flex flex-col w-full bg-gray-100">
                <PropertyManagerNavbar />
                <div className="flex mt-20">
                    <Sidebar expanded={expanded} setExpanded={setExpanded} />
                    <main className={`flex flex-1 flex-col min-h-screen
                        transition-all duration-300 ease-in-out ${expanded ? "ml-64" : "ml-20"}`}>
                        <div className="px-4 pt-4 pb-8 max-w-[calc(100vw-16rem)] mx-auto w-full">
                            <h1 className="text-2xl font-bold mb-4 text-gray-700">Inquiries</h1>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                <StatCard title="Total Inquiries" value={moreInfoRequests.length + scheduledVisits.length} icon={Inbox} iconColor="text-blue-600" iconBgColor="bg-blue-100" subtitle="Inquiries received" />
                                <StatCard title="New/Unread Inquiries" value={unreadCount} icon={Mail} iconColor="text-emerald-600" iconBgColor="bg-emerald-100" subtitle="Unread inquiries" />
                                <StatCard title="More Info Requests" value={moreInfoRequests.length} icon={MessageCircle} iconColor="text-amber-600" iconBgColor="bg-amber-100" subtitle="More Info on a property requests" />
                                <StatCard title="Scheduled Visits" value={scheduledVisits.length} icon={CalendarSearch} iconColor="text-green-600" iconBgColor="bg-green-100" subtitle="Scheduled Visits by tenant" />
                                <StatCard title="Upcoming Visits (Next 7 days)" value={upcomingVisitsCount} icon={Clock} iconColor="text-indigo-600" iconBgColor="bg-indigo-100" subtitle="Visits within 7 days" />
                                <StatCard title="In-Person Visits" value={scheduledVisits.filter(v => v.scheduleType === 'In Person').length} icon={User} iconColor="text-violet-600" iconBgColor="bg-violet-100" subtitle="Physical visits by tenant(s)" />
                                <StatCard title="Virtual Visits" value={scheduledVisits.filter(v => v.scheduleType === 'Virtual').length} icon={VideoIcon} iconColor="text-gray-600" iconBgColor="bg-gray-100" subtitle="Online tour of property" />
                            </div>

                            {/* Additional information and actions */}
                            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                                <div className="border-b border-gray-200">
                                    <div className="flex items-center justify-between px-6 py-4">
                                        <div className="flex gap-4">
                                            {[{label: 'More Info Requests', value: 'more-info-requests'}, {label: 'Scheduled Visits', value: 'scheduled-visits'}].map((tab) => (
                                                <button
                                                    key={tab.value}
                                                    onClick={() => setActiveTab(tab.value)}
                                                    className={`px-4 py-2 font-medium cursor-pointer rounded-lg transition-colors 
                                                        ${activeTab === tab.value ? 'bg-[rgb(0,0,30)] text-amber-500' : 'bg-slate-700 text-white hover:bg-slate-800'} duration-300`}
                                                >
                                                    {tab.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {/* Then simplify the JSX */}
                                    <div className="">
                                        {activeTab === TABS.MORE_INFO && (
                                            moreInfoRequests.length === 0 ? (
                                                <InquiriesEmptyState title="More Info Requests" message="No more info requests at this time." />
                                            ) : (
                                                <>
                                                    <SearchBar 
                                                        query={searchQuery} 
                                                        setSearchQuery={setSearchQuery} 
                                                        setCurrentPage={setCurrentPage} 
                                                        placeholder="Search inquiries by name, email, or date..."
                                                    />
                                                    <InquiriesTable 
                                                        requests={paginatedInfoRequests} 
                                                        columns={['Name', 'Email', 'Message', 'Date Submitted', 'Actions']}
                                                        handleDeleteRequest={handleDeleteRequest} 
                                                        markAsRead={markAsRead}
                                                        activeTab={activeTab}
                                                    />

                                                    {/* If no info requests match the search query, show a message */}
                                                    {paginatedInfoRequests.length === 0 && (
                                                        <div className="text-center py-12">
                                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No info requests found</h3>
                                                            <p className="text-gray-600">Try adjusting your search criteria.</p>
                                                        </div>
                                                    )}

                                                    {/* Pagination Component */}
                                                    <Pagination
                                                        currentPage={currentPage}
                                                        setCurrentPage={setCurrentPage}
                                                        itemsPerPage={itemsPerPage}
                                                        setItemsPerPage={setItemsPerPage}
                                                        handlePageChange={handlePageChange}
                                                        totalPages={totalPages}
                                                    />
                                                </>
                                            )
                                        )}
                                        {activeTab === TABS.SCHEDULED_VISITS && (
                                            scheduledVisits.length === 0 ? (
                                                <InquiriesEmptyState title="Scheduled Visits" message="No scheduled visits at this time." />
                                            ) : (
                                                <>
                                                    <SearchBar 
                                                        query={searchQuery} 
                                                        setSearchQuery={setSearchQuery} 
                                                        setCurrentPage={setCurrentPage} 
                                                        placeholder="Search inquiries by name, email, or date..."
                                                    />
                                                    <InquiriesTable 
                                                        requests={paginatedScheduledVisits} 
                                                        columns={['Name', 'Email', 'Phone', 'Schedule Type', 'Date', 'Actions']}
                                                        handleDeleteRequest={handleDeleteRequest} 
                                                        markAsRead={markScheduledVisitAsRead} 
                                                        activeTab={activeTab}
                                                    />

                                                    {/* If no scheduled visits match the search query, show a message */}
                                                    {paginatedScheduledVisits.length === 0 && (
                                                        <div className="text-center py-12">
                                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No scheduled visits found</h3>
                                                            <p className="text-gray-600">Try adjusting your search criteria.</p>
                                                        </div>
                                                    )}

                                                    {/* Pagination Component */}
                                                    <Pagination
                                                        currentPage={currentPage}
                                                        setCurrentPage={setCurrentPage}
                                                        itemsPerPage={itemsPerPage}
                                                        setItemsPerPage={setItemsPerPage}
                                                        handlePageChange={handlePageChange}
                                                        totalPages={totalPagesScheduledVisits}
                                                    />
                                                </>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
};

export default Inquiries;
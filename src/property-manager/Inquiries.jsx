import React, { useEffect } from "react";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import { StatCard } from "@custom-components/StatCard";
import { notify } from "@custom-components/toastHelper";
import Sidebar from "./Sidebar";
import { CalendarSearch, Clock, Inbox, Mail, MessageCircle, User, VideoIcon, FileText } from "lucide-react";
import InquiriesEmptyState from "@custom-components/InquiriesEmptyState";
import InquiriesTable from "@custom-components/InquiriesTable";

const Inquiries = () => {

    const [expanded, setExpanded] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState("more-info-requests");
    const [moreInfoRequests, setMoreInfoRequests] = React.useState([]);
    const [scheduledVisits, setScheduledVisits] = React.useState([]);

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

    const markAsRead = (id) => {
        const updatedReadUnreadRequests = moreInfoRequests.map((inq) =>
            inq.id === id ? { ...inq, isRead: true } : inq
        );
        setMoreInfoRequests(updatedReadUnreadRequests);
        localStorage.setItem("requestInfoData", JSON.stringify(updatedReadUnreadRequests));
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
                            <h1 className="text-2xl font-bold mb-4 text-gray-700">Inquiries</h1>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                <StatCard title="Total Inquiries" value={moreInfoRequests.length + scheduledVisits.length} icon={Inbox} iconColor="text-blue-600" iconBgColor="bg-blue-100" subtitle="Inquiries received" />
                                <StatCard title="New/Unread Inquiries" value={unreadCount} icon={Mail} iconColor="text-emerald-600" iconBgColor="bg-emerald-100" subtitle="Unread inquiries" />
                                <StatCard title="More Info Requests" value={moreInfoRequests.length} icon={MessageCircle} iconColor="text-amber-600" iconBgColor="bg-amber-100" subtitle="More Info on a property requests" />
                                <StatCard title="Scheduled Visits" value={scheduledVisits.length} icon={CalendarSearch} iconColor="text-green-600" iconBgColor="bg-green-100" subtitle="Scheduled Visits by tenant" />
                                <StatCard title="Upcoming Visits (Next 7 days)" value={0} icon={Clock} iconColor="text-indigo-600" iconBgColor="bg-indigo-100" subtitle="Visits within 7 days" />
                                <StatCard title="In-Person Visits" value={0} icon={User} iconColor="text-violet-600" iconBgColor="bg-violet-100" subtitle="Physical visits by tenant(s)" />
                                <StatCard title="Virtual Visits" value={0} icon={VideoIcon} iconColor="text-gray-600" iconBgColor="bg-gray-100" subtitle="Online tour of property" />
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
                                    <div className="p-6">
                                        {activeTab === TABS.MORE_INFO && (
                                            moreInfoRequests.length === 0 ? (
                                                <InquiriesEmptyState title="More Info Requests" message="No more info requests at this time." />
                                            ) : (
                                                <InquiriesTable 
                                                    requests={moreInfoRequests} 
                                                    columns={['Name', 'Email', 'Message', 'Date Submitted', 'Actions']}
                                                    handleDeleteRequest={handleDeleteRequest} 
                                                    markAsRead={markAsRead}
                                                />
                                            )
                                        )}
                                        {activeTab === TABS.SCHEDULED_VISITS && (
                                            scheduledVisits.length === 0 ? (
                                                <InquiriesEmptyState title="Scheduled Visits" message="No scheduled visits at this time." />
                                            ) : (
                                                <InquiriesTable requests={scheduledVisits} columns={['Name', 'Email', 'Schedule Type', 'Date']} />
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
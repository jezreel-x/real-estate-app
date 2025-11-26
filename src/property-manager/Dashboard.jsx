import Sidebar from "./Sidebar";
import PropertyManagerNavbar from "./PropertyManagerNavbar";

const Dashboard = () => {

    const cards = [
        { id: 1, title: "Total Properties", value: 120 },
        { id: 2, title: "Total Tenants", value: 300 },
        { id: 3, title: "Occupied Units", value: 95 },
        { id: 4, title: "Vacant Units", value: 25 },
        { id: 5, title: "Total Income", value: "$150,000" },
        { id: 6, title: "Monthly Rent Collected", value: "$45,000" },
        { id: 7, title: "Pending Maintenance Requests", value: 8 },
        { id: 8, title: "New Inquiries", value: 15 },
        { id: 9, title: "Upcoming Lease Expirations", value: 5 },
        { id: 10, title: "Total Expenses", value: "$30,000" },
    ];

    return (
        <>
            <div className="flex flex-col w-full bg-gray-100">
                <PropertyManagerNavbar />
                <div className="flex mt-20">
                    <Sidebar />
                    <div className="flex-1 p-4">
                        <h1 className="text-2xl font-bold mb-4 text-gray-700">Dashboard</h1>

                        {/* Dashboard content goes here */}
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                            {cards.map(card => (
                                <div 
                                    key={card.id}
                                    className="bg-white rounded-lg shadow p-6 flex flex-col items-center"
                                >
                                    <h2 className="text-md font-semibold text-gray-600 mb-2">{card.title}</h2>
                                    <p className="text-lg font-bold text-gray-800">{card.value}</p>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
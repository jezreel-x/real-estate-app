import Sidebar from "./Sidebar";

const Dashboard = () => {
    return (
        <>
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4 text-gray-700">Dashboard</h1>
                    {/* Dashboard content goes here */}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
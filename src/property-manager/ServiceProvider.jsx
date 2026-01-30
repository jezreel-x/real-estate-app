import { useState } from "react";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import Sidebar from "./Sidebar";

const ServiceProvider = () => {
    const [expanded, setExpanded] = useState(true);


    return (
        <>
            <div className="flex flex-col w-full bg-gray-100">
                <PropertyManagerNavbar />
                <div className="flex mt-20">
                    <Sidebar expanded={expanded} setExpanded={setExpanded} />
                    <main className={`flex flex-1 flex-col min-h-screen
                        transition-all duration-300 ease-in-out ${expanded ? "ml-64" : "ml-20"}`}>
                            <div className="px-4 pt-4 pb-8 max-w-[calc(100vw-16rem)] mx-auto w-full">
                                <h1 className="text-2xl font-bold mb-4 text-gray-700">Maintainer/Service Provider</h1>
                            </div>
                        </main>
                </div>
            </div>
        </>
    );
};

export default ServiceProvider;
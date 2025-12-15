import React from "react";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import { notify } from "@custom-components/toastHelper";
import Sidebar from "./Sidebar";

const Property = () => {

    const [expanded, setExpanded] = React.useState(true);
    const [properties, setProperties] = React.useState(() => {
        const storedProperties = localStorage.getItem('properties');
        return storedProperties ? JSON.parse(storedProperties) : [];
    });
    const [currentProperty, setCurrentProperty] = React.useState(null);

    const handleAddEditProperty = async (propertyData) => {

        if (currentProperty) {
            // edit a property
            const updatedProperty = {...currentProperty, ...propertyData};
            setProperties(
            (prev) => {
                const next = prev.map((t) => (t.id === updatedProperty.id ? updatedProperty : t));
                localStorage.setItem('properties', JSON.stringify(next));
                return next;
            });
            notify('success', 'Property updated successfully.');
            setCurrentProperty(null); // clear current property after editing
        } else {
            // add a property
            const newProperty = { id: crypto.randomUUID(), ...propertyData };
            setProperties((prev) => [...prev, newProperty]);
            localStorage.setItem('properties', JSON.stringify(properties));
            notify('success', 'Property added successfully.');
        }

    };
    
    return(
        <>
            <div className="flex flex-col w-full bg-gray-100">
                <PropertyManagerNavbar />
                <div className="flex mt-20">
                    <Sidebar expanded={expanded} setExpanded={setExpanded} />
                    <main className={`flex flex-1 flex-col min-h-screen
                    transition-all duration-300 ease-in-out ${expanded ? "ml-64" : "ml-20"}`}>
                        <div className="px-4 pt-4 pb-8 max-w-[calc(100vw-16rem)] mx-auto w-full">
                            <h1 className="text-2xl font-bold mb-4 text-gray-700">Properties</h1>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Property;
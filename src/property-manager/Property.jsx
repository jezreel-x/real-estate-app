import React from "react";
import { Building, Building2, Plus } from "lucide-react";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import { notify } from "@custom-components/toastHelper";
import Sidebar from "./Sidebar";
import { StatCard } from "@custom-components/StatCard";

const Property = () => {

    const [expanded, setExpanded] = React.useState(true);
    const [properties, setProperties] = React.useState(() => {
        const storedProperties = localStorage.getItem('properties');
        return storedProperties ? JSON.parse(storedProperties) : [];
    });
    const [currentProperty, setCurrentProperty] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState('properties');
    const [showAddPropertyModal, setShowAddPropertyModal] = React.useState(false);
    const activeProperties = properties.filter((p) => p.status === 'active');

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

                            {/* Stat Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                <StatCard
                                    title="Total Properties"
                                    value={properties.length}
                                    icon={Building}
                                    iconColor="text-blue-600"
                                    iconBgColor="bg-blue-100"
                                    subtitle={`${activeProperties.length} active`}
                                />
                                <StatCard
                                    title="Occupied units"
                                    value={0}
                                    icon={Building2}
                                    iconColor="text-emerald-600"
                                    iconBgColor="bg-emerald-100"
                                    // subtitle={`${activeProperties.length} active`}
                                />
                                <StatCard
                                    title="Vacant units"
                                    value={0}
                                    icon={Building2}
                                    iconColor="text-amber-600"
                                    iconBgColor="bg-amber-100"
                                    // subtitle={`${activeProperties.length} active`}
                                />
                            </div>

                            {/* Property list/table */}
                            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                                <div className="border-b border-gray-200">
                                    <div className="flex items-center justify-between px-6 py-4">
                                        <div className="flex gap-4">
                                            {[{ label: 'Properties', value: 'properties' }, { label: "Units", value: "units" }].map((tab) => (
                                                <button
                                                    key={tab.value}
                                                    onClick={() => setActiveTab(tab.value)}
                                                    className={`px-4 py-2 font-medium cursor-pointer rounded-lg transition-colors duration-300
                                                        ${activeTab === tab.value ? "bg-[rgb(0,0,30)] text-amber-500" : "bg-slate-200 hover:bg-slate-300 text-slate-700"}`}
                                                >
                                                    {tab.label}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() =>
                                                setShowAddPropertyModal(true)
                                            }
                                            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-[rgb(0,0,30)] text-white rounded-lg hover:bg-slate-700 transition-colors"
                                        >
                                            <Plus className="w-5 h-5 text-amber-500" />
                                                <span className="text-amber-500">Add {activeTab === "properties" ? "Property" : "Unit"}</span>
                                        </button>
                                    </div>

                                    <div className="p-6">
                                        <>
                                            {activeTab === "properties" && properties.length === 0 ? (
                                                <div className="text-center py-12">
                                                    <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
                                                    <p className="text-gray-600 mb-4">Get started by adding your first property</p>
                                                    <button
                                                        onClick={() => setShowAddPropertyModal(true)}
                                                        className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-[rgb(0,0,30)] text-white rounded-lg hover:bg-slate-700 transition-colors"
                                                    >
                                                        <Plus className="w-5 h-5 text-amber-500" />
                                                        <span className="text-amber-500">Add Property</span>
                                                    </button>
                                                </div>
                                            ) : (
                                                // new property table
                                                // Include a search bar above the table to filter properties by property_name, property_type, or property_category 

                                                <div></div>
                                            )}
                                        </>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Property;
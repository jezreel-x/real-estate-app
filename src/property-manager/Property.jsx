import React, { useEffect, useMemo } from "react";
import { Building, Building2, Plus, Search, Pencil, Trash2 } from "lucide-react";
import PropertyManagerNavbar from "./PropertyManagerNavbar";
import { notify } from "@custom-components/toastHelper";
import Sidebar from "./Sidebar";
import { StatCard } from "@custom-components/StatCard";
import Pagination from "@custom-components/Pagination";
import { AddPropertyModal } from "@custom-components/AddPropertyModal";
import { AddUnitModal } from "../custom-components/AddUnitModal";


const Property = () => {

    const [expanded, setExpanded] = React.useState(true);
    const [properties, setProperties] = React.useState(() => {
        const storedProperties = localStorage.getItem('properties');
        return storedProperties ? JSON.parse(storedProperties) : []; 
    });
    const [units, setUnits] = React.useState(() => {
        const storedUnits = localStorage.getItem('units');
        return storedUnits ? JSON.parse(storedUnits) : []; 
    });
    const [currentProperty, setCurrentProperty] = React.useState(null);
    const [currentUnit, setCurrentUnit] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState('properties');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(5);
    const [showAddPropertyModal, setShowAddPropertyModal] = React.useState(false);
    const [showAddUnitModal, setShowAddUnitModal] = React.useState(false);
    const [selectedProperty, setSelectedProperty] = React.useState(null);
    const activeProperties = properties.filter((p) => p.status === 'active');

    // persists property data to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('properties', JSON.stringify(properties))
    }, [properties]);

    // persists unit data to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('units', JSON.stringify(units))
    }, [units]);

    // handles adding or editing mode of an existing property
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

    // handles adding or editing mode of an existing unit
    const handleAddEditUnit = async (unitData) => {

        if (currentUnit) {
            // edit a property
            const updatedUnit = {...currentUnit, ...unitData};
            setUnits(
            (prev) => {
                const next = prev.map((u) => (u.id === updatedUnit.id ? updatedUnit : u));
                localStorage.setItem('units', JSON.stringify(next));
                return next;
            });
            notify('success', 'Unit updated successfully.');
            setCurrentUnit(null); // clear current unit after editing
        } else {
            // add a unit
            const newUnit = { id: crypto.randomUUID(), ...unitData };
            setUnits((prev) => [...prev, newUnit]);
            localStorage.setItem('units', JSON.stringify(units));
            notify('success', 'Unit added successfully.');
        }

    }; 

    // handles editing of an existing property
    const handleEditProperty = (propertyData) => {
        // pre-fills the modal form with selected property data
        setCurrentProperty(propertyData);

        // then opens up the modal form
        setShowAddPropertyModal(true);
    };

    // filter properties by property_name, property_type, or property_category
    const filteredProperties = properties.filter((property) => {
        const query = searchQuery.trim().toLowerCase();
        return(
            property.property_name.toLowerCase().includes(query) ||
            property.property_type.toLowerCase().includes(query) ||
            property.property_category.toLowerCase().includes(query)
        );
    });

    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

    // paginate filtered properties (basically, what property objects to display for that current page)
    const paginatedProperties = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProperties.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredProperties, itemsPerPage, currentPage]);

    // handles page change
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // function to handle deleting a tenant with a custom toast notification
    const handleDeleteProperty = (propertyId) => {
        // Show confirmation toast
        if (window.confirm("Are you sure you want to delete this property? This action cannot be undone.")) {
            handleDeletePropertyConfirmed(propertyId);
        }
    };

    // function that confirms deletion after user confirmation
    const handleDeletePropertyConfirmed = (propertyId) => {

        // toast notification asking for deletion confirmation
        notify(`info`, `Deleting...`);

        // Logic to delete tenant only after confirmation
        setTimeout(() => {
            const updatedProperties = properties.filter((p) => p.id !== propertyId);
            setProperties(updatedProperties);
            localStorage.setItem('properties', JSON.stringify(updatedProperties));
            notify('success', 'Property deleted successfully.');
        }, 3000); // Simulate delay for deletion

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
                                            onClick={() => {
                                                activeTab === "properties" ? setShowAddPropertyModal(true) : setShowAddUnitModal(true)
                                            }}
                                            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-[rgb(0,0,30)] text-white rounded-lg hover:bg-slate-700 transition-colors"
                                        >
                                            <Plus className="w-5 h-5 text-amber-500" />
                                            <span className="text-amber-500">Add {activeTab === "properties" ? "Property" : "Unit"}</span>
                                        </button>
                                    </div>

                                    <div className="p-6">
                                        <>
                                            {activeTab === "properties" ? (
                                            // Properties section
                                            <>
                                                {properties.length === 0 ? (
                                                    <div className="text-center py-12">
                                                        <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
                                                        <p className="text-gray-600 mb-4">Get started by adding your first property, afterwards, create units for your properties</p>
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

                                                    <div>
                                                        <div className="mb-4 relative">
                                                            {/* Add an icon inside the search input if desired */}
                                                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                                                            <input
                                                                type="text"
                                                                value={searchQuery}
                                                                placeholder="Search properties by property name, property type, or property category"
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

                                                        <div>
                                                            <div className="overflow-x-auto">
                                                                <table className="min-w-full divide-y divide-gray-200">
                                                                    <thead className="bg-gray-50">
                                                                        <tr>
                                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Name</th>
                                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Type</th>
                                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Category</th>
                                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Units</th>
                                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                                        {paginatedProperties.map((property, index) => (
                                                                        <tr 
                                                                            key={index} 
                                                                            className="hover:bg-gray-50 cursor-pointer transition-all duration-300 animate-[fadeInUp_0.3s_ease-in-out]"
                                                                            onClick={
                                                                                () => {
                                                                                    setActiveTab("units")
                                                                                    setSelectedProperty(property)
                                                                                }
                                                                            }
                                                                        >
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{property.property_name}</td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property_type}</td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property_category}</td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.total_units}</td>
                                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${property.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}>
                                                                                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                                                                                </span>
                                                                            </td>
                                                                            {/* Actions column has edit/delete buttons */}
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                                <button 
                                                                                    className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer"
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        handleEditProperty(property);
                                                                                    }}
                                                                                >
                                                                                    {/* include an edit icon instead of text */}
                                                                                    <Pencil className="w-5 h-5" />
                                                                                </button>
                                                                                <button 
                                                                                    className="text-red-600 hover:text-red-900 cursor-pointer"
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        handleDeleteProperty(property.id);
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

                                                            {/* If no properties match the search query, show a message */}
                                                            {paginatedProperties.length === 0 && (
                                                                <div className="text-center py-12">
                                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                                                                    <p className="text-gray-600">Try adjusting your search criteria.</p>
                                                                </div>
                                                            )}


                                                            {/* Pagination Controls */}
                                                            <Pagination
                                                                currentPage={currentPage}
                                                                setCurrentPage={setCurrentPage}
                                                                itemsPerPage={itemsPerPage}
                                                                setItemsPerPage={setItemsPerPage}
                                                                handlePageChange={handlePageChange}
                                                                totalPages={totalPages}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                            ) : (
                                            <>
                                                {selectedProperty && (
                                                    <div className="space-y-4">
                                                        <h2 className="text-xl font-semibold text-slate-800">
                                                            Units – {selectedProperty.property_name}
                                                        </h2>
                                                        {selectedProperty.total_units === 0 ? (
                                                            <div className="text-center py-12">
                                                                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No units yet</h3>
                                                                <p className="text-gray-600 mb-4">Get started by adding your first unit</p>
                                                                <button
                                                                    onClick={() => setShowAddUnitModal(true)}
                                                                    className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-[rgb(0,0,30)] text-white rounded-lg hover:bg-slate-700 transition-colors"
                                                                >
                                                                    <Plus className="w-5 h-5 text-amber-500" />
                                                                    <span className="text-amber-500">Add Unit</span>
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                                Almost there...
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                            )}
                                        </>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <AddPropertyModal
                            isOpen={showAddPropertyModal} // control modal visibility
                            onClose={() => setShowAddPropertyModal(false)} // function to close the modal
                            onSubmit={handleAddEditProperty} // function to handle form submission
                            data={currentProperty} // pass tenant data for editing
                            units={units}
                        />

                        <AddUnitModal
                            isOpen={showAddUnitModal} // control modal visibility
                            onClose={() => setShowAddUnitModal(false)} // function to close the modal
                            onSubmit={handleAddEditUnit} // function to handle form submission
                            data={currentUnit} // pass tenant data for editing
                        />
                    </main>
                </div>
            </div>
        </>
    );
};

export default Property;
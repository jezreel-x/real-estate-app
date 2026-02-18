import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { setHours, setMinutes } from "date-fns";
import CustomStyles from '@custom-components/CustomStyles';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddMaintenanceRequestModal = ({ isOpen, data, onSubmit, onClose, properties, units }) => {

    const [formData, setFormData] = useState({
        // Define your form fields here
        property: '',
        unit: '',
        issueCategory: '',
        priority: 'Medium',
        description: '',
        preferredVisitDateAndTime: null,
        tenantName: '',
        tenantPhoneNumber: '',
        images: [] // base64 previews (max 5)
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (data) {
            setFormData({
                ...data // populate form with existing data for editing
            });
        }
    }, [data]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default form submission
        setIsSubmitting(true);

        try {
            await onSubmit(formData);
            setFormData({
                // Define your form fields here
                property: '',
                unit: '',
                issueCategory: '',
                priority: 'Medium',
                description: '',
                preferredVisitDateAndTime: null,
                tenantName: '',
                tenantPhoneNumber: '',
                images: [] // base64 previews (max 5)
            });
            onClose();
        } 
        catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"> {/* Modal Overlay */}
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"> {/* Modal Container */}
                    
                    {/* Modal Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">{data ? "Edit" : "Create"} Maintenance Request</h2>
                        <button
                            onClick={onClose} // Close modal on click
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6 cursor-pointer" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {/* Form fields go here */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Property *
                                </label>
                                <Select
                                    isClearable
                                    isSearchable
                                    placeholder="Select a property"
                                    value={formData.property ? { label: formData.property, value: formData.property } : null}
                                    onChange={(selectedOption) => {
                                        setFormData({ 
                                            ...formData, 
                                            property: selectedOption ? selectedOption.value : ''
                                        });
                                    }}
                                    options={properties.map((property) => ({
                                        label: property.property_name,
                                        value: property.property_name
                                    }))}
                                    styles={CustomStyles}
                                />
                            </div>

                            <div>
                                {formData.property && (
                                    <>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Unit *
                                        </label>
                                        <Select
                                            isClearable
                                            isSearchable
                                            placeholder="Select a unit"
                                            value={formData.unit ? { label: formData.unit, value: formData.unit } : null}
                                            onChange={(selectedOption) => {
                                                setFormData({ 
                                                    ...formData, 
                                                    unit: selectedOption ? selectedOption.value : ''
                                                });
                                            }}
                                            options={units.filter(u => u.property_id === properties.find(p => p.property_name === formData.property)?.id).map((unit) => ({
                                                label: unit.label,
                                                value: unit.label
                                            }))}
                                            styles={CustomStyles}
                                        />
                                    </>
                                )}
                            </div>

                            {formData.unit && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tenant Name *
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={formData.unit ? units.filter(u => u.property_id === properties.find(p => p.property_name === formData.property)?.id).find(u => u.label === formData.unit)?.tenant_name : ''}
                                        placeholder="Enter tenant name"
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 transition-all duration-300 hover:cursor-not-allowed bg-gray-100"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Issue *
                                </label>
                                <Select
                                    isClearable
                                    isSearchable
                                    placeholder="Select an issue"
                                    value={formData.issueCategory ? { label: formData.issueCategory, value: formData.issueCategory } : null}
                                    onChange={(selectedOption) => {
                                        setFormData({ 
                                            ...formData, 
                                            issueCategory: selectedOption ? selectedOption.value : ''
                                        });
                                    }}
                                    options={[
                                        { label: 'Plumbing', value: 'Plumbing' },
                                        { label: 'Electrical', value: 'Electrical' },
                                        { label: 'Heating/Cooling', value: 'Heating/Cooling' },
                                        { label: 'Appliances', value: 'Appliances' },
                                        { label: 'Structural', value: 'Structural' },
                                        { label: 'Pest Control', value: 'Pest Control' },
                                        { label: 'Other', value: 'Other' }
                                    ]}
                                    styles={CustomStyles}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Priority *
                                </label>
                                <Select
                                    isClearable
                                    isSearchable
                                    placeholder="Select priority level"
                                    value={formData.priority ? { label: formData.priority, value: formData.priority } : null}
                                    onChange={(selectedOption) => {
                                        setFormData({ 
                                            ...formData, 
                                            priority: selectedOption ? selectedOption.value : ''
                                        });
                                    }}
                                    options={[
                                        { label: 'Low', value: 'Low' },
                                        { label: 'Medium', value: 'Medium' },
                                        { label: 'High', value: 'High' }
                                    ]}
                                    styles={CustomStyles}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Preferred Visit Date & Time *
                                </label>
                                <DatePicker
                                    selected={formData.preferredVisitDateAndTime}
                                    onChange={(date) => setFormData({ ...formData, preferredVisitDateAndTime: date })}
                                    showTimeSelect
                                    minDate={new Date()}
                                    timeFormat="HH:mm"
                                    timeIntervals={30}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    minTime={setHours(setMinutes(new Date(), 0), 9)}
                                    maxTime={setHours(setMinutes(new Date(), 30), 17)}
                                    placeholderText="Select preferred visit date and time"
                                    className="w-full px-3 py-2.5 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                />
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
        
};

export default AddMaintenanceRequestModal;
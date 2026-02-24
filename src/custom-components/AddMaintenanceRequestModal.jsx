import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { setHours, setMinutes } from "date-fns";
import CustomStyles from '@custom-components/CustomStyles';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploader from "./ImageUploader";

const AddMaintenanceRequestModal = ({ isOpen, data, onSubmit, onClose, properties, units, tenants }) => {

    const [formData, setFormData] = useState({
        // Define your form fields here
        property: '',
        unit: '',
        issueCategory: '',
        priority: 'Medium',
        status: 'New', // default status for new requests
        assignedMaintainer: '', // assigned maintainer from service providers
        description: '',
        preferredVisitDateAndTime: null,
        tenantName: '',
        tenantPhoneNumber: '',
        images: [] // base64 previews (max 5)
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serviceProviders, setServiceProviders] = useState(() => {
        const storedProviders = localStorage.getItem("serviceProviders");
        return storedProviders ? JSON.parse(storedProviders) : [];
    });

    useEffect(() => {
        if (data) {
            setFormData({
                ...data // populate form with existing data for editing
            });
        }
    }, [data]);

    useEffect(() => {
        if (formData.unit) {
            const selectedUnit = units
                .filter(u => u.property_id === properties.find(p => p.property_name === formData.property)?.id)
                .find(u => u.label === formData.unit);
            
            setFormData(prev => ({ 
                ...prev, 
                tenantName: selectedUnit?.tenant_name || '',
                tenantPhoneNumber: tenants.find(t => t.plot_number === formData.unit)?.phone || ''
             }));
         } else {
            setFormData(prev => ({ 
                ...prev, 
                tenantName: '',
                tenantPhoneNumber: ''
            }));
         };
        }, [formData.unit, formData.property, properties, units]);

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
                status: 'New', // default status for new requests
                assignedMaintainer: '', // assigned maintainer from service providers
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

    const handleImagesUpdate = (newImages) => {
        setFormData(prev => ({ ...prev, images: newImages }));
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
                                <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tenant Name *
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            value={formData.tenantName}
                                            placeholder="Enter tenant name"
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 transition-all duration-300 hover:cursor-not-allowed bg-gray-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tenant Phone Number *
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            value={formData.unit ? tenants.find(t => t.plot_number === formData.unit)?.phone : ''}
                                            placeholder="Enter tenant phone number"
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 transition-all duration-300 hover:cursor-not-allowed bg-gray-100"
                                        />
                                    </div>
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
                                    Status *
                                </label>
                                <Select
                                    isClearable
                                    isSearchable
                                    placeholder="Select status"
                                    value={formData.status ? { label: formData.status, value: formData.status } : null}
                                    onChange={(selectedOption) => {
                                        setFormData({ 
                                            ...formData, 
                                            status: selectedOption ? selectedOption.value : '',
                                            assignedMaintainer: selectedOption?.value !== 'Assigned' ? '' : formData.assignedMaintainer
                                        });
                                    }}
                                    options={[
                                        { label: 'New', value: 'New' },
                                        { label: 'Assigned', value: 'Assigned' },
                                        { label: 'In Progress', value: 'In Progress' },
                                        { label: 'Completed', value: 'Completed' },
                                        { label: 'Closed', value: 'Closed' }
                                    ]}
                                    styles={CustomStyles}
                                />
                            </div>

                            {formData.status === 'Assigned' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Assigned Maintainer *
                                    </label>
                                    <Select
                                        isClearable
                                        isSearchable
                                        placeholder="Select a service provider"
                                        value={formData.assignedMaintainer ? { 
                                            label: `${formData.assignedMaintainer.name} (${formData.assignedMaintainer.specialization})`, 
                                            value: formData.assignedMaintainer 
                                        } : null}
                                        onChange={(selectedOption) => {
                                            setFormData({ 
                                                ...formData, 
                                                assignedMaintainer: selectedOption ? selectedOption.value : ''
                                            });
                                        }}
                                        options={serviceProviders.map((provider) => ({
                                            label: `${provider.name} (${provider.specialization})`,
                                            value: provider
                                        }))}
                                        styles={CustomStyles}
                                    />
                                </div>
                            )}

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

                        {/* Image upload and description fields can be added here */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload images (5 max.) *
                            </label>
                            <div className='flex border border-gray-300 rounded-lg py-3 px-2 flex-wrap gap-4'>
                                <ImageUploader
                                    images={formData.images}
                                    setImages={handleImagesUpdate}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description (Optional)
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows={4}
                                placeholder='Description of the maintenance issue, any specific instructions for the maintenance team, or additional context for the request.'
                            />
                        </div>

                        <div className='flex space-x-3 pt-4'>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 cursor-pointer px-4 py-2 border border-gray-300 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 cursor-pointer px-4 py-2 bg-[rgb(0,0,30)] text-amber-500 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : data ? 'Update Maintenance Request' : 'Add Maintenance Request'}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
        
};

export default AddMaintenanceRequestModal;
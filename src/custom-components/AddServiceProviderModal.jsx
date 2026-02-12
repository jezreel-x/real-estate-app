import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Select from 'react-select';
import CustomStyles from '@custom-components/CustomStyles';

const AddServiceProviderModal = ({ isOpen, data, onSubmit, onClose }) => {

    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        phone: '',
        email: '',
        contractType: '',
        totalCostIncurred: '',
        availabilityStatus: 'Available',
        jobsCompletedStatus: '',
        date: '',
        notes: '',
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
                name: '',
                specialization: '',
                phone: '',
                email: '',
                contractType: '',
                availabilityStatus: 'Available',
                jobsCompletedStatus: '',
                date: '',
                notes: '',
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
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'> {/* Overlay */}
                <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'> {/* Modal Container */}

                    {/* Modal Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">{data ? "Edit" : "Create"} Service Provider</h2>
                        <button
                            onClick={onClose} // Close modal on click
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6 cursor-pointer" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Specialization *
                                </label>
                                <Select
                                    isClearable
                                    isSearchable
                                    placeholder="Select a specialization"
                                    value={formData.specialization ? { label: formData.specialization, value: formData.specialization } : null}
                                    onChange={(selectedOption) => {
                                        setFormData({ 
                                            ...formData, 
                                            specialization: selectedOption ? selectedOption.value : ''
                                        });
                                    }}
                                    options={[ 
                                        { label: 'Plumber', value: 'Plumber' }, 
                                        { label: 'Electrician', value: 'Electrician' }, 
                                        { label: 'General', value: 'General' }, 
                                        { label: 'Cleaner', value: 'Cleaner' },
                                        { label: 'Gardener', value: 'Gardener' },
                                        { label: 'Painter', value: 'Painter' },
                                        { label: 'Other', value: 'Other' },
                                    ]}
                                    styles={CustomStyles}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    inputMode='numeric'
                                    required
                                    maxLength={10}
                                    value={formData.phone}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        setFormData({ ...formData, phone: value });
                                    }}
                                    className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email * (Optional) 
                                </label>
                                <input
                                    type="email"
                                    inputMode='email'
                                    placeholder='example@gmail.com'
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contract Type *
                                </label>
                                <Select
                                    isClearable
                                    isSearchable
                                    placeholder="Select a contract type"
                                    value={formData.contractType ? { label: formData.contractType, value: formData.contractType } : null}
                                    onChange={(selectedOption) => {
                                        setFormData({ 
                                            ...formData, 
                                            contractType: selectedOption ? selectedOption.value : ''
                                        });
                                    }}
                                    options={[ 
                                        { label: 'Ad-hoc - Pay per job, no ongoing commitment', value: 'Ad-hoc' }, 
                                        { label: 'Retainer - Recurring agreement with guaranteed availability', value: 'Retainer' }, 
                                        { label: 'Project-based', value: 'Project-based' }, 
                                        { label: 'Other', value: 'Other' },
                                    ]}
                                    styles={CustomStyles}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Total Cost Incurred for the job *
                                </label>
                                <input
                                    type="number"
                                    inputMode='decimal'
                                    required
                                    min="0"
                                    value={formData.totalCostIncurred}
                                    onChange={(e) => setFormData({ ...formData, totalCostIncurred: e.target.value })}
                                    className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Availability Status *
                                </label>
                                <Select
                                    isClearable
                                    isSearchable
                                    placeholder="Select an availability status"
                                    value={formData.availabilityStatus ? { label: formData.availabilityStatus, value: formData.availabilityStatus } : null}
                                    onChange={(selectedOption) => {
                                        setFormData({ 
                                            ...formData, 
                                            availabilityStatus: selectedOption ? selectedOption.value : ''
                                        });
                                    }}
                                    options={[ 
                                        { label: 'Available', value: 'Available' }, 
                                        { label: 'Not Available', value: 'Not Available' }, 
                                        { label: 'On Leave', value: 'On Leave' }, 
                                        { label: 'Other', value: 'Other' },
                                    ]}
                                    styles={CustomStyles}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Status *
                                </label>
                                <Select
                                    isClearable
                                    isSearchable
                                    placeholder="Select a job status"
                                    value={formData.jobsCompletedStatus ? { label: formData.jobsCompletedStatus, value: formData.jobsCompletedStatus } : null}
                                    onChange={(selectedOption) => {
                                        setFormData({ 
                                            ...formData, 
                                            jobsCompletedStatus: selectedOption ? selectedOption.value : ''
                                        });
                                    }}
                                    options={[ 
                                        { label: 'In Progress', value: 'In Progress' }, 
                                        { label: 'Completed', value: 'Completed' }, 
                                        { label: 'Cancelled', value: 'Cancelled' }
                                    ]}
                                    styles={CustomStyles}
                                />
                            </div>
                            {formData.jobsCompletedStatus === 'Completed' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Job Completion Date *
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )}
                        </div>

                    
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Notes (Optional)
                            </label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows={4}
                                placeholder='Notes on the service(s) by the service provider / about the service provider'
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
                                {isSubmitting ? 'Submitting...' : data ? 'Update Service Provider' : 'Add Service Provider'}
                            </button>
                        </div>
                       
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddServiceProviderModal;
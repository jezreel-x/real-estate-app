import { X } from 'lucide-react';
import { useState } from 'react';

export function AddInvoiceModal({ isOpen, onClose, onSubmit, tenants }) {
    const [formData, setFormData] = useState({
        tenant_id: '',
        invoice_number: '',
        amount: 0,
        due_date: '',
        status: 'pending',
        description: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
        await onSubmit(formData);
        setFormData({
            tenant_id: '',
            invoice_number: '',
            amount: 0,
            due_date: '',
            status: 'pending',
            description: '',
        });
        onClose();
        } catch (error) {
        console.error('Error submitting form:', error);
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Create Invoice</h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-6 h-6 cursor-pointer" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tenant *
                        </label>
                        <select
                            required
                            value={formData.tenant_id}
                            onChange={(e) => setFormData({ ...formData, tenant_id: e.target.value })}
                            className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option className='text-gray-900' value="" disabled>Select a tenant</option>
                            {tenants.map((tenant) => (
                            <option className='text-gray-900' key={tenant.id} value={tenant.id}>
                                {tenant.name} - Plot {tenant.plot_number}
                            </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Invoice Number *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.invoice_number}
                            onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"
                            placeholder="INV-001"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Amount *
                        </label>
                        <input
                            type="number"
                            required
                            inputMode='decimal'
                            min="0"
                            // step="0.01"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Due Date *
                        </label>
                        <input
                            type="date"
                            required
                            value={formData.due_date}
                            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                            className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status *
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option className='text-gray-900' value="pending">Pending</option>
                            <option className='text-gray-900' value="paid">Paid</option>
                            <option className='text-gray-900' value="overdue">Overdue</option>
                        </select>
                    </div>

                    {formData.status === 'paid' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Paid Date
                        </label>
                        <input
                        type="date"
                        value={formData.paid_date || ''}
                        onChange={(e) => setFormData({ ...formData, paid_date: e.target.value })}
                        className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Monthly rent payment, maintenance fee, etc."
                    />
                </div>

                <div className="flex gap-3 pt-4">
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
                        {isSubmitting ? 'Creating...' : 'Create Invoice'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}

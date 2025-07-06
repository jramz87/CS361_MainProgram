import { useState } from 'react';
import { createClient, updateClient } from '../services/clientAPI';

export default function ClientForm({ client = null, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: client?.name || '',
        email: client?.email || '',
        phone: client?.phone || '',
        destination: client?.destination || '',
        startDate: client?.startDate || '',
        endDate: client?.endDate || '',
        preferences: client?.preferences || '',
        budget: client?.budget || ''
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            if (client) {
                await updateClient(client.id, formData);
            } else {
                await createClient(formData);
            }
            onSave();
        } catch (error) {
            alert('Failed to save client: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="max-w-2xl mx-auto p-6" style={{ backgroundColor: '#FDFCDC' }}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#0081A7' }}>
            {client ? 'Edit Client' : 'New Client Profile'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                Client Name *
                </label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md border"
                style={{ backgroundColor: '#FDFCDC', borderColor: '#00AFB9' }}
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                Email
                </label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-md border"
                style={{ backgroundColor: '#FDFCDC', borderColor: '#00AFB9' }}
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                Phone
                </label>
                <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-md border"
                style={{ backgroundColor: '#FDFCDC', borderColor: '#00AFB9' }}
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                Destination *
                </label>
                <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md border"
                style={{ backgroundColor: '#FDFCDC', borderColor: '#00AFB9' }}
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                Start Date *
                </label>
                <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md border"
                style={{ backgroundColor: '#FDFCDC', borderColor: '#00AFB9' }}
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                End Date *
                </label>
                <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md border"
                style={{ backgroundColor: '#FDFCDC', borderColor: '#00AFB9' }}
                />
            </div>
            </div>
            
            <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                Travel Preferences
            </label>
            <textarea
                name="preferences"
                value={formData.preferences}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 rounded-md border"
                style={{ backgroundColor: '#FDFCDC', borderColor: '#00AFB9' }}
                placeholder="Adventure, relaxation, cultural sites, food experiences..."
            />
            </div>
            
            <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                Budget Range
            </label>
            <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full p-3 rounded-md border"
                style={{ backgroundColor: '#FDFCDC', borderColor: '#00AFB9' }}
            >
                <option value="">Select budget range</option>
                <option value="budget">Budget ($0-$2,000)</option>
                <option value="mid-range">Mid-range ($2,000-$5,000)</option>
                <option value="luxury">Luxury ($5,000+)</option>
            </select>
            </div>
            
            <div className="flex space-x-4 pt-4">
            <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-md text-white font-medium"
                style={{ backgroundColor: '#00AFB9' }}
            >
                {loading ? 'Saving...' : (client ? 'Update Client' : 'Create Client')}
            </button>
            
            <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 rounded-md font-medium"
                style={{ backgroundColor: '#FED9B7', color: '#0081A7' }}
            >
                Cancel
            </button>
            </div>
        </form>
        </div>
    );
}
// this is the questionnarie displayed on the Clients page (add new)

import { useState } from 'react';

export default function ClientForm({ client = null, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        firstName: client?.firstName || '',
        lastName: client?.lastName || '',
        email: client?.email || '',
        phone: client?.phone || '',
        budget: client?.budget || '',
        activities: client?.activities || [],
        notes: client?.notes || ''
    });

    const budgetOptions = [
        '$1,500 to $2,500',
        '$2,500 to $3,500', 
        '$3,500 to $4,500',
        '$5,000 to $6,500',
        '$7,000 to $8,500',
        '$9,000+'
    ];

    const activityOptions = [
        'Beach', 'Adventure', 'Food & Drink', 'Shopping', 'Nightlife', 
        'Culture', 'Nature', 'Sports', 'Relaxation'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleActivityChange = (activity) => {
        setFormData(prev => ({
            ...prev,
            activities: prev.activities.includes(activity)
                ? prev.activities.filter(a => a !== activity)
                : [...prev.activities, activity]
        }));
    };

    return (    // using tailwind components below
        <div className="px-6 py-24 sm:py-32 lg:px-8" style={{ backgroundColor: '#FDFCDC' }}>
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        background: 'linear-gradient(to top right, #F07167, #00AFB9)'
                    }}
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[72.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />
            </div>
            
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl" style={{ color: '#0081A7' }}>
                    {client ? 'Edit Client' : 'New Client'}
                </h2>
                <p className="mt-2 text-lg" style={{ color: '#F07167' }}>
                    Let's plan your next adventure!
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-2xl sm:mt-20">
                {/* Basic Client Info */}
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 mb-8">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold" style={{ color: '#0081A7' }}>
                            First name
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full rounded-md border px-3 py-2"
                            style={{ 
                                backgroundColor: '#FDFCDC',
                                borderColor: '#00AFB9',
                                color: '#0081A7'
                            }}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold" style={{ color: '#0081A7' }}>
                            Last name
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full rounded-md border px-3 py-2"
                            style={{ 
                                backgroundColor: '#FDFCDC',
                                borderColor: '#00AFB9',
                                color: '#0081A7'
                            }}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold" style={{ color: '#0081A7' }}>
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full rounded-md border px-3 py-2"
                            style={{ 
                                backgroundColor: '#FDFCDC',
                                borderColor: '#00AFB9',
                                color: '#0081A7'
                            }}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="phone" className="block text-sm font-semibold" style={{ color: '#0081A7' }}>
                            Phone
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border px-3 py-2"
                            style={{ 
                                backgroundColor: '#FDFCDC',
                                borderColor: '#00AFB9',
                                color: '#0081A7'
                            }}
                        />
                    </div>
                </div>

                {/* Budget categories*/}
                <div className="mb-8">
                    <label htmlFor="budget" className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                        Budget per person
                    </label>
                    <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="block w-full rounded-md border px-3 py-2"
                        style={{ 
                            backgroundColor: '#FDFCDC',
                            borderColor: '#00AFB9',
                            color: '#0081A7'
                        }}
                    >
                        <option value="">Select budget</option>
                        {budgetOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* Activities Preferences */}
                <div className="mb-8">
                    <label className="block text-sm font-semibold mb-4" style={{ color: '#0081A7' }}>
                        Interested activities
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {activityOptions.map(activity => (
                            <div key={activity} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={activity}
                                    checked={formData.activities.includes(activity)}
                                    onChange={() => handleActivityChange(activity)}
                                    className="h-4 w-4 rounded"
                                    style={{ accentColor: '#00AFB9' }}
                                />
                                <label htmlFor={activity} className="ml-2 text-sm" style={{ color: '#0081A7' }}>
                                    {activity}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notes */}
                <div className="mb-8">
                    <label htmlFor="notes" className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                        Special requests or notes
                    </label>
                    <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Any special requests, dietary restrictions, etc."
                        className="block w-full rounded-md border px-3 py-2"
                        style={{ 
                            backgroundColor: '#FDFCDC',
                            borderColor: '#00AFB9',
                            color: '#0081A7'
                        }}
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-x-4">
                    <button
                        type="submit"
                        className="flex-1 rounded-md px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                        style={{ backgroundColor: '#00AFB9' }}
                    >
                        {client ? 'Update Client' : 'Save Client'}
                    </button>
                    
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 rounded-md px-4 py-2 text-sm font-semibold hover:opacity-90"
                        style={{ 
                            backgroundColor: '#FED9B7',
                            color: '#0081A7'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
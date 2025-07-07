import { useState } from 'react';
import { createClient, updateClient } from '../services/clientAPI';
import { ChevronDownIcon } from './Icons';

export default function ClientForm({ client = null, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        firstName: client?.firstName || '',
        middleName: client?.middleName || '',
        lastName: client?.lastName || '',
        preferredName: client?.preferredName || '',
        birthday: client?.birthday || '',
        gender: client?.gender || '',
        citizenship: client?.citizenship || '',
        loyaltyPrograms: client?.loyaltyPrograms || [],
        knownTravelerNumber: client?.knownTravelerNumber || '',
        email: client?.email || '',
        phone: client?.phone || '',
        preferredCommunication: client?.preferredCommunication || '',
        hasPassport: client?.hasPassport || '',
        departureCity: client?.departureCity || '',
        alternateAirports: client?.alternateAirports || '',
        budget: client?.budget || '',
        activities: client?.activities || [],
        preferences: client?.preferences || '',
        electronicDocuments: client?.electronicDocuments || ''
    });

    const [loading, setLoading] = useState(false);

    const budgetOptions = [
        { value: '1500-2500', label: '$1,500 to $2,500' },
        { value: '2500-3500', label: '$2,500 to $3,500' },
        { value: '3500-4500', label: '$3,500 to $4,500' },
        { value: '5000-6500', label: '$5,000 to $6,500' },
        { value: '7000-8500', label: '$7,000 to $8,500' },
        { value: '9000+', label: '$9,000+' },
        { value: 'unlimited', label: 'Unlimited Budget' }
    ];

    const activityOptions = [
        'Beach and water', 'Gambling', 'Scuba', 'Adventure activities', 'Golf',
        'Nightlife', 'Arts and theater', 'Catamaran/Yacht', 'ATVs', 'Ziplining',
        'Island Tour', 'City Tour', 'Food Tour', 'Other'
    ];

    const popularLoyaltyPrograms = [
        'American Airlines (AAdvantage)', 'United Airlines (Mileage Plus)', 'Delta Air Lines (SkyMiles)',
        'Hilton (Honors)', 'Marriott Bonvoy', 'Southwest Airlines (Rapid Rewards)',
        'IHG Rewards Club', 'Hyatt (World of Hyatt)', 'JetBlue Airways (trueBlue)',
        'British Airways (Executive Club)', 'Alaska Airlines (Mileage Plan)', 'Hertz Gold Plus Rewards'
    ];

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
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleMultiSelect = (e, fieldName) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [fieldName]: checked 
                ? [...prev[fieldName], value]
                : prev[fieldName].filter(item => item !== value)
        }));
    };

    return (
        <div className="isolate px-6 py-24 sm:py-32 lg:px-8" style={{ backgroundColor: '#FDFCDC' }}>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                    style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        background: 'linear-gradient(to top right, #F07167, #00AFB9)'
                    }}
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[72.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />
            </div>
            
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl" style={{ color: '#0081A7' }}>
                    {client ? 'Edit Client Profile' : 'Client Travel Inquiry'}
                </h2>
                <p className="mt-2 text-lg/8" style={{ color: '#F07167' }}>
                    Another memorable trip possible with Experience Travel by Gigi!
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-4xl sm:mt-20">
                {/* Personal Information */}
                <div className="mb-12">
                    <h3 className="text-xl font-semibold mb-6" style={{ color: '#0081A7' }}>Personal Details</h3>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="firstName" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                First name *
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border px-3.5 py-2 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="middleName" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                Middle name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="middleName"
                                    name="middleName"
                                    type="text"
                                    value={formData.middleName}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border px-3.5 py-2 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="lastName" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                Last name *
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border px-3.5 py-2 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="preferredName" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                Preferred name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="preferredName"
                                    name="preferredName"
                                    type="text"
                                    value={formData.preferredName}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border px-3.5 py-2 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="birthday" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                Birthday *
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="birthday"
                                    name="birthday"
                                    type="date"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border px-3.5 py-2 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="gender" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                Gender
                            </label>
                            <div className="mt-2.5">
                                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md border py-2 pr-7 pl-3.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                        style={{ 
                                            backgroundColor: '#FDFCDC',
                                            borderColor: '#00AFB9',
                                            outlineColor: '#00AFB9',
                                            color: '#0081A7'
                                        }}
                                    >
                                        <option value="">Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="sm:col-span-2">
                            <label htmlFor="citizenship" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                Citizenship *
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="citizenship"
                                    name="citizenship"
                                    type="text"
                                    value={formData.citizenship}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., United States"
                                    className="block w-full rounded-md border px-3.5 py-2 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>
                        </div>
                        
                        <div className="sm:col-span-2">
                            <label htmlFor="knownTravelerNumber" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                Known Traveler Number
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="knownTravelerNumber"
                                    name="knownTravelerNumber"
                                    type="text"
                                    value={formData.knownTravelerNumber}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border px-3.5 py-2 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="mb-12">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                Email *
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border px-3.5 py-2 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>
                        </div>
                        
                        <div className="sm:col-span-2">
                            <label htmlFor="phone" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                Phone number *
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="123-456-7890"
                                    className="block w-full rounded-md border px-3.5 py-2 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>
                        </div>
                        
                        <div className="sm:col-span-2">
                            <label htmlFor="preferredCommunication" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                Preferred method of communication *
                            </label>
                            <div className="mt-2.5">
                                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                    <select
                                        id="preferredCommunication"
                                        name="preferredCommunication"
                                        value={formData.preferredCommunication}
                                        onChange={handleChange}
                                        required
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md border py-2 pr-7 pl-3.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                        style={{ 
                                            backgroundColor: '#FDFCDC',
                                            borderColor: '#00AFB9',
                                            outlineColor: '#00AFB9',
                                            color: '#0081A7'
                                        }}
                                    >
                                        <option value="">Select communication method</option>
                                        <option value="phone">Phone Call</option>
                                        <option value="email">Email</option>
                                        <option value="text">Text</option>
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="hasPassport" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                Has a passport? *
                            </label>
                            <div className="mt-2.5">
                                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                    <select
                                        id="hasPassport"
                                        name="hasPassport"
                                        value={formData.hasPassport}
                                        onChange={handleChange}
                                        required
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md border py-2 pr-7 pl-3.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                        style={{ 
                                            backgroundColor: '#FDFCDC',
                                            borderColor: '#00AFB9',
                                            outlineColor: '#00AFB9',
                                            color: '#0081A7'
                                        }}
                                    >
                                        <option value="">Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="departureCity" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                Departure city and closest/preferred airport *
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="departureCity"
                                    name="departureCity"
                                    type="text"
                                    value={formData.departureCity}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Oklahoma City (OKC)"
                                    className="block w-full rounded-md border px-3.5 py-2 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>
                        </div>
                        
                        <div className="sm:col-span-2">
                            <label htmlFor="alternateAirports" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                What surrounding airports are possible for departure? (These may have better pricing)
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="alternateAirports"
                                    name="alternateAirports"
                                    type="text"
                                    value={formData.alternateAirports}
                                    onChange={handleChange}
                                    placeholder="e.g., DFW, TUL"
                                    className="block w-full rounded-md border px-3.5 py-2 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Budget and Preferences */}
                <div className="mb-12">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6">
                        <div>
                            <label htmlFor="budget" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                What is your ideal budget (per individual traveler)? *
                            </label>
                            <div className="mt-2.5">
                                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                    <select
                                        id="budget"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        required
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md border py-2 pr-7 pl-3.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                        style={{ 
                                            backgroundColor: '#FDFCDC',
                                            borderColor: '#00AFB9',
                                            outlineColor: '#00AFB9',
                                            color: '#0081A7'
                                        }}
                                    >
                                        <option value="">Select budget range</option>
                                        {budgetOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm/6 font-semibold mb-4" style={{ color: '#0081A7' }}>
                                What activities are you interested in?
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {activityOptions.map(activity => (
                                    <div key={activity} className="flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <div className="group relative inline-flex w-8 shrink-0 rounded-full p-px outline-offset-2 transition-colors duration-200 ease-in-out focus-visible:outline-2"
                                                    style={{ 
                                                        backgroundColor: formData.activities.includes(activity) ? '#00AFB9' : '#d1d5db',
                                                        outlineColor: '#00AFB9' 
                                                    }}>
                                                <span className="size-4 rounded-full shadow-xs transition-transform duration-200 ease-in-out" 
                                                        style={{ 
                                                            backgroundColor: '#FDFCDC',
                                                            transform: formData.activities.includes(activity) ? 'translateX(0.875rem)' : 'translateX(0)'
                                                        }} />
                                                <input
                                                    type="checkbox"
                                                    value={activity}
                                                    checked={formData.activities.includes(activity)}
                                                    onChange={(e) => handleMultiSelect(e, 'activities')}
                                                    aria-label={activity}
                                                    className="absolute inset-0 appearance-none focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                        <label className="text-sm/6" style={{ color: '#0081A7' }}>
                                            {activity}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="preferences" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                                What else would you like me to know?
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    id="preferences"
                                    name="preferences"
                                    rows={4}
                                    value={formData.preferences}
                                    onChange={handleChange}
                                    placeholder="Tell us about your travel preferences, special needs, dietary restrictions, etc."
                                    className="block w-full rounded-md border px-3.5 py-2 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loyalty Programs */}
                <div className="mb-12">
                    <h3 className="text-xl font-semibold mb-6" style={{ color: '#0081A7' }}>Loyalty Programs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {popularLoyaltyPrograms.map(program => (
                            <div key={program} className="flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <div className="group relative inline-flex w-8 shrink-0 rounded-full p-px outline-offset-2 transition-colors duration-200 ease-in-out focus-visible:outline-2"
                                         style={{ 
                                             backgroundColor: formData.loyaltyPrograms.includes(program) ? '#00AFB9' : '#d1d5db',
                                             outlineColor: '#00AFB9' 
                                         }}>
                                        <span className="size-4 rounded-full shadow-xs transition-transform duration-200 ease-in-out" 
                                              style={{ 
                                                  backgroundColor: '#FDFCDC',
                                                  transform: formData.loyaltyPrograms.includes(program) ? 'translateX(0.875rem)' : 'translateX(0)'
                                              }} />
                                        <input
                                            type="checkbox"
                                            value={program}
                                            checked={formData.loyaltyPrograms.includes(program)}
                                            onChange={(e) => handleMultiSelect(e, 'loyaltyPrograms')}
                                            aria-label={program}
                                            className="absolute inset-0 appearance-none focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <label className="text-sm/6" style={{ color: '#0081A7' }}>
                                    {program}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Document Delivery Consent */}
                <div className="mb-12">
                    <div>
                        <label htmlFor="electronicDocuments" className="block text-sm/6 font-semibold" style={{ color: '#0081A7' }}>
                            Do you consent to receiving all travel documents electronically? *
                        </label>
                        <div className="mt-2.5">
                            <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                <select
                                    id="electronicDocuments"
                                    name="electronicDocuments"
                                    value={formData.electronicDocuments}
                                    onChange={handleChange}
                                    required
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md border py-2 pr-7 pl-3.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                >
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                <ChevronDownIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-x-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{ 
                            backgroundColor: '#00AFB9',
                            outlineColor: '#00AFB9'
                        }}
                    >
                        {loading ? 'Saving...' : (client ? 'Update Client' : 'Submit Inquiry')}
                    </button>
                    
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 rounded-md px-3.5 py-2.5 text-center text-sm font-semibold shadow-xs hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{ 
                            backgroundColor: '#FED9B7',
                            color: '#0081A7',
                            outlineColor: '#FED9B7'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
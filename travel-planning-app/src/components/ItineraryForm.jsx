// itinerary questionnaire displayed on create new itinerary page

import React, { useState, useEffect } from 'react';

// TODO: move these ?
const TRIP_TYPES = ['Leisure', 'Business', 'Adventure', 'Family'];

export default function ItineraryForm({ itinerary = null, onSave, onCancel }) {
    const [clients, setClients] = useState([]);
    const [isLoadingWeather, setIsLoadingWeather] = useState(false);
    
    // simplify this somehow?
    const [formData, setFormData] = useState({
        tripTitle: itinerary?.tripTitle || '',
        clientName: itinerary?.clientName || '',
        destination: itinerary?.destination || '',
        startDate: itinerary?.startDate || '',
        endDate: itinerary?.endDate || '',
        numberOfTravelers: itinerary?.numberOfTravelers || 1,
        tripType: itinerary?.tripType || '',
        notes: itinerary?.notes || '',
        dailyPlans: itinerary?.dailyPlans?.length > 0 
            ? itinerary.dailyPlans 
            : [{ date: '', weather: '', activities: '' }]
    });

    useEffect(() => {
        // load clients when component mounts
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/clients');
            if (!response.ok) {
                throw new Error('Failed to fetch clients');
            }
            const clientData = await response.json();
            setClients(clientData);
        } catch (err) {
            console.error('Error loading clients:', err);
            // TODO: show user-friendly error message
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const getWeatherData = async () => {
        // basic validation
        if (!formData.destination.trim()) {
            alert('Please enter a destination first!');
            return;
        }
        if (!formData.startDate || !formData.endDate) {
            alert('Please select both start and end dates');
            return;
        }

        setIsLoadingWeather(true);
        
        try {
            const apiUrl = `http://localhost:3001/api/weather/forecast?location=${encodeURIComponent(formData.destination)}&startDate=${formData.startDate}&endDate=${formData.endDate}`;
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`Weather API returned ${response.status}`);
            }
            
            const weatherData = await response.json();
            
            if (weatherData?.days) {
                const plans = generateDailyPlansWithWeather(weatherData.days);
                setFormData(prev => ({ 
                    ...prev, 
                    dailyPlans: plans 
                }));
            } else {
                alert('No weather data available for those dates');
            }
        } catch (error) {
            console.error('Weather fetch failed:', error);
            alert("Couldn\\'t get weather info - please try again later");
        } finally {
            setIsLoadingWeather(false);
        }
    };

    // helper function to generate daily plans with weather
    const generateDailyPlansWithWeather = (weatherDays) => {
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        const plans = [];
        
        for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
            const dateString = currentDate.toISOString().split('T')[0];
            const weatherInfo = weatherDays.find(day => day.datetime === dateString);
            
            plans.push({
                date: dateString,
                weather: weatherInfo 
                    ? `${Math.round(weatherInfo.temp)}°F - ${weatherInfo.conditions}`
                    : 'Weather unavailable',
                activities: ''
            });
        }
        
        return plans;
    };

    const addNewDay = () => {
        setFormData(prev => ({
            ...prev,
            dailyPlans: [
                ...prev.dailyPlans, 
                { date: '', weather: '', activities: '' }
            ]
        }));
    };

    const removeDayPlan = (indexToRemove) => {
        // don't let them remove the last day
        if (formData.dailyPlans.length <= 1) return;
        
        setFormData(prev => ({
            ...prev,
            dailyPlans: prev.dailyPlans.filter((_, idx) => idx !== indexToRemove)
        }));
    };

    const updateDayPlan = (dayIndex, fieldName, newValue) => {
        setFormData(prev => {
            const updatedPlans = [...prev.dailyPlans];
            updatedPlans[dayIndex] = {
                ...updatedPlans[dayIndex],
                [fieldName]: newValue
            };
            
            return {
                ...prev,
                dailyPlans: updatedPlans
            };
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        console.log('saving trip...');
        
        // basic validation 
        if (!formData.tripTitle.trim() || !formData.destination.trim()) {
            alert('Please fill in required fields');
            return;
        }
        
        try {
            const method = itinerary ? 'PUT' : 'POST';
            const url = itinerary 
                ? `http://localhost:3001/api/itineraries/${itinerary.id}`
                : 'http://localhost:3001/api/itineraries';
                
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                console.log('server error:', response.status);
                throw new Error(`Failed to save: ${response.status}`);
            }
            
            const savedTrip = await response.json();
            console.log('trip saved!', savedTrip);
            alert('Trip saved!');
            
            // call parent callback if exists
            if (onSave && typeof onSave === 'function') {
                onSave(savedTrip);
            }
            
        } catch (error) {
            console.error('save error:', error);
            alert('Could not save trip');
        }
    };

    return (
        <div className="p-6" style={{ backgroundColor: '#FDFCDC', minHeight: '100vh' }}>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6" style={{ color: '#0081A7' }}>
                    {itinerary ? 'Edit Your Trip' : 'Plan a New Trip'}
                </h1>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                    {/* Trip basics section */}
                    <div className="p-4 rounded-lg border-2" style={{ borderColor: '#00AFB9', backgroundColor: '#FDFCDC' }}>
                        <h2 className="text-xl font-bold mb-4" style={{ color: '#0081A7' }}>
                            Basic Trip Info
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1" style={{ color: '#0081A7' }}>
                                    What should we call this trip? *
                                </label>
                                <input
                                    type="text"
                                    name="tripTitle"
                                    value={formData.tripTitle}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. Sarah's European Adventure"
                                    className="w-full px-3 py-2 rounded border"
                                    style={{ borderColor: '#00AFB9', color: '#0081A7' }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1" style={{ color: '#0081A7' }}>
                                    Client
                                </label>
                                <select
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 rounded border"
                                    style={{ borderColor: '#00AFB9', color: '#0081A7' }}
                                >
                                    <option value="">-- Choose a client --</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={`${client.firstName} ${client.lastName}`}>
                                            {client.firstName} {client.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1" style={{ color: '#0081A7' }}>
                                    Destination *
                                </label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Paris, France"
                                    className="w-full px-3 py-2 rounded border"
                                    style={{ borderColor: '#00AFB9', color: '#0081A7' }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1" style={{ color: '#0081A7' }}>
                                    Type of Trip
                                </label>
                                <select
                                    name="tripType"
                                    value={formData.tripType}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 rounded border"
                                    style={{ borderColor: '#00AFB9', color: '#0081A7' }}
                                >
                                    <option value="">Select one...</option>
                                    {TRIP_TYPES.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1" style={{ color: '#0081A7' }}>
                                    Departure Date *
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 rounded border"
                                    style={{ borderColor: '#00AFB9', color: '#0081A7' }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1" style={{ color: '#0081A7' }}>
                                    Return Date *
                                </label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 rounded border"
                                    style={{ borderColor: '#00AFB9', color: '#0081A7' }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1" style={{ color: '#0081A7' }}>
                                    Number of Travelers
                                </label>
                                <input
                                    type="number"
                                    name="numberOfTravelers"
                                    value={formData.numberOfTravelers}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="20"
                                    className="w-full px-3 py-2 rounded border"
                                    style={{ borderColor: '#00AFB9', color: '#0081A7' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Daily itinerary section */}
                    <div className="p-4 rounded-lg border-2" style={{ borderColor: '#00AFB9', backgroundColor: '#FDFCDC' }}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold" style={{ color: '#0081A7' }}>
                                Day-by-Day Plans
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={getWeatherData}
                                    disabled={isLoadingWeather}
                                    className="px-4 py-2 rounded text-white font-semibold hover:opacity-90 disabled:opacity-50"
                                    style={{ backgroundColor: '#00AFB9' }}
                                >
                                    {isLoadingWeather ? 'Getting weather...' : 'Load Weather'}
                                </button>
                                <button
                                    type="button"
                                    onClick={addNewDay}
                                    className="px-4 py-2 rounded text-white font-semibold hover:opacity-90"
                                    style={{ backgroundColor: '#F07167' }}
                                >
                                    Add Another Day
                                </button>
                            </div>
                        </div>

                        {formData.dailyPlans.map((dayPlan, idx) => (
                            <div key={idx} className="mb-4 p-3 rounded border-2" style={{ borderColor: '#FED9B7', backgroundColor: '#FED9B7' }}>
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold" style={{ color: '#0081A7' }}>
                                        Day #{idx + 1}
                                    </h3>
                                    {formData.dailyPlans.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeDayPlan(idx)}
                                            className="px-2 py-1 rounded text-white text-sm hover:opacity-80"
                                            style={{ backgroundColor: '#F07167' }}
                                            title="Remove this day"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1" style={{ color: '#0081A7' }}>
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            value={dayPlan.date}
                                            onChange={(e) => updateDayPlan(idx, 'date', e.target.value)}
                                            className="w-full px-2 py-1 rounded border"
                                            style={{ borderColor: '#00AFB9', color: '#0081A7' }}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold mb-1" style={{ color: '#0081A7' }}>
                                            Expected Weather
                                        </label>
                                        <input
                                            type="text"
                                            value={dayPlan.weather}
                                            onChange={(e) => updateDayPlan(idx, 'weather', e.target.value)}
                                            placeholder="75°F - Partly cloudy"
                                            className="w-full px-2 py-1 rounded border"
                                            style={{ borderColor: '#00AFB9', color: '#0081A7' }}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold mb-1" style={{ color: '#0081A7' }}>
                                            Planned Activities
                                        </label>
                                        <textarea
                                            value={dayPlan.activities}
                                            onChange={(e) => updateDayPlan(idx, 'activities', e.target.value)}
                                            placeholder="Morning: Visit Eiffel Tower&#10;Afternoon: Louvre Museum&#10;Evening: Seine River cruise"
                                            rows={2}
                                            className="w-full px-2 py-1 rounded border resize-none"
                                            style={{ borderColor: '#00AFB9', color: '#0081A7' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional notes */}
                    <div className="p-4 rounded-lg border-2" style={{ borderColor: '#00AFB9', backgroundColor: '#FDFCDC' }}>
                        <h2 className="text-xl font-bold mb-4" style={{ color: '#0081A7' }}>
                            Additional Notes & Special Requests
                        </h2>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Any dietary restrictions, accessibility needs, special occasions, or other important details..."
                            className="w-full px-3 py-2 rounded border"
                            style={{ borderColor: '#00AFB9', color: '#0081A7' }}
                        />
                    </div>

                    {/* Form actions */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 rounded text-white font-semibold hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: '#00AFB9' }}
                        >
                            {itinerary ? 'Update This Trip' : 'Save New Trip'}
                        </button>
                        
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-6 py-3 rounded font-semibold hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: '#FED9B7', color: '#0081A7' }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
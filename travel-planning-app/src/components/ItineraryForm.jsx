import { useState } from 'react';
import { ChevronDownIcon, CalendarIcon, MapIcon, CloudIcon, PaperAirplaneIcon, TrashIcon, WeatherIcon } from '../components/Icons';
import { getWeatherForecast } from '../services/weatherAPI';

export default function ItineraryForm({ itinerary = null, onSave, onCancel }) {
    const [clients] = useState([
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' }
    ]);

    const [formData, setFormData] = useState({
        tripTitle: itinerary?.tripTitle || '',
        clientId: itinerary?.clientId || '',
        destination: itinerary?.destination || '',
        startDate: itinerary?.startDate || '',
        endDate: itinerary?.endDate || '',
        numberOfTravelers: itinerary?.numberOfTravelers || 1,
        tripType: itinerary?.tripType || '',
        departureAirport: itinerary?.departureAirport || '',
        arrivalAirport: itinerary?.arrivalAirport || '',
        outboundFlight: itinerary?.outboundFlight || '',
        returnFlight: itinerary?.returnFlight || '',
        hotelName: itinerary?.hotelName || '',
        hotelAddress: itinerary?.hotelAddress || '',
        checkInDate: itinerary?.checkInDate || '',
        checkOutDate: itinerary?.checkOutDate || '',
        roomType: itinerary?.roomType || '',
        dailyItinerary: itinerary?.dailyItinerary || [
            {
                date: '',
                weather: {
                    temperature: '',
                    conditions: '',
                    precipitation: ''
                },
                activities: [
                    {
                        time: '',
                        activity: '',
                        location: '',
                        notes: ''
                    }
                ]
            }
        ],
        specialRequests: itinerary?.specialRequests || '',
        emergencyContacts: itinerary?.emergencyContacts || '',
        totalCost: itinerary?.totalCost || '',
        notes: itinerary?.notes || ''
    });

    const [weatherLoading, setWeatherLoading] = useState(false);
    const [automationErrors, setAutomationErrors] = useState({});

    const tripTypes = [
        'Leisure', 'Business', 'Adventure', 'Cultural', 'Romantic', 'Family', 'Group'
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleClientSelect = (clientId) => {
        setFormData(prev => ({
            ...prev,
            clientId: clientId
        }));
    };

    const fetchWeatherForAllDays = async () => {
        if (!formData.destination || !formData.startDate || !formData.endDate) {
            setAutomationErrors(prev => ({
                ...prev,
                weather: 'Please enter destination, start date, and end date first'
            }));
            return;
        }

        setWeatherLoading(true);
        setAutomationErrors(prev => ({ ...prev, weather: null }));

        try {
            const weatherData = await getWeatherForecast(
                formData.destination,
                formData.startDate,
                formData.endDate
            );

            if (weatherData && weatherData.days && weatherData.days.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    dailyItinerary: weatherData.days.map((day, index) => {
                        const existingDay = prev.dailyItinerary[index] || {
                            activities: [{ time: '', activity: '', location: '', notes: '' }]
                        };
                        
                        return {
                            ...existingDay,
                            date: day.date || '',
                            weather: {
                                temperature: day.temp ? `${Math.round(day.temp)}°F` : '',
                                conditions: day.conditions || '',
                                precipitation: day.humidity ? `${Math.round(day.humidity)}%` : ''
                            }
                        };
                    })
                }));
            }
        } catch (error) {
            setAutomationErrors(prev => ({
                ...prev,
                weather: `Failed to fetch weather: ${error.message}`
            }));
        } finally {
            setWeatherLoading(false);
        }
    };

    const addDayToItinerary = () => {
        setFormData(prev => ({
            ...prev,
            dailyItinerary: [...prev.dailyItinerary, {
                date: '',
                weather: { temperature: '', conditions: '', precipitation: '' },
                activities: [{ time: '', activity: '', location: '', notes: '' }]
            }]
        }));
    };

    const removeDayFromItinerary = (dayIndex) => {
        if (formData.dailyItinerary.length > 1) {
            setFormData(prev => ({
                ...prev,
                dailyItinerary: prev.dailyItinerary.filter((_, index) => index !== dayIndex)
            }));
        }
    };

    const addActivityToDay = (dayIndex) => {
        setFormData(prev => {
            const newItinerary = [...prev.dailyItinerary];
            newItinerary[dayIndex].activities.push({
                time: '', activity: '', location: '', notes: ''
            });
            return { ...prev, dailyItinerary: newItinerary };
        });
    };

    const removeActivityFromDay = (dayIndex, activityIndex) => {
        setFormData(prev => {
            const newItinerary = [...prev.dailyItinerary];
            if (newItinerary[dayIndex].activities.length > 1) {
                newItinerary[dayIndex].activities = newItinerary[dayIndex].activities.filter((_, index) => index !== activityIndex);
            }
            return { ...prev, dailyItinerary: newItinerary };
        });
    };

    const updateDayData = (dayIndex, field, value) => {
        setFormData(prev => {
            const newItinerary = [...prev.dailyItinerary];
            if (field.startsWith('weather.')) {
                const weatherField = field.split('.')[1];
                newItinerary[dayIndex].weather[weatherField] = value;
            } else {
                newItinerary[dayIndex][field] = value;
            }
            return { ...prev, dailyItinerary: newItinerary };
        });
    };

    const updateActivityData = (dayIndex, activityIndex, field, value) => {
        setFormData(prev => {
            const newItinerary = [...prev.dailyItinerary];
            newItinerary[dayIndex].activities[activityIndex][field] = value;
            return { ...prev, dailyItinerary: newItinerary };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="min-h-screen px-6 py-24 sm:py-32 lg:px-8" style={{ backgroundColor: '#FDFCDC' }}>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                    style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        background: 'linear-gradient(to top right, #F07167, #00AFB9)'
                    }}
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[72.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-20 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-tight" style={{ color: '#0081A7' }}>
                        {itinerary ? 'Edit Travel Itinerary' : 'Create Travel Itinerary'}
                    </h1>
                    <p className="mt-2 text-lg" style={{ color: '#F07167' }}>
                        Create detailed travel itineraries with automated weather forecasting
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Trip Basic Information */}
                    <div className="p-6 rounded-xl border-2 shadow-lg" style={{ borderColor: '#00AFB9', backgroundColor: '#FDFCDC' }}>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#0081A7' }}>
                            <PaperAirplaneIcon />
                            Trip Information
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Trip Title *
                                </label>
                                <input
                                    type="text"
                                    name="tripTitle"
                                    value={formData.tripTitle}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g., Paris Adventure 2024"
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Select Client *
                                </label>
                                <div className="relative">
                                    <select
                                        name="clientId"
                                        value={formData.clientId}
                                        onChange={(e) => handleClientSelect(e.target.value)}
                                        required
                                        className="w-full appearance-none px-4 py-2 pr-10 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                        style={{ 
                                            backgroundColor: '#FDFCDC',
                                            borderColor: '#00AFB9',
                                            outlineColor: '#00AFB9',
                                            color: '#0081A7'
                                        }}
                                    >
                                        <option value="">Choose a client</option>
                                        {clients.map(client => (
                                            <option key={client.id} value={client.id}>
                                                {client.firstName} {client.lastName}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" style={{ color: '#00AFB9' }} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Trip Type
                                </label>
                                <div className="relative">
                                    <select
                                        name="tripType"
                                        value={formData.tripType}
                                        onChange={handleInputChange}
                                        className="w-full appearance-none px-4 py-2 pr-10 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                        style={{ 
                                            backgroundColor: '#FDFCDC',
                                            borderColor: '#00AFB9',
                                            outlineColor: '#00AFB9',
                                            color: '#0081A7'
                                        }}
                                    >
                                        <option value="">Select type</option>
                                        {tripTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" style={{ color: '#00AFB9' }} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Destination *
                                </label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Paris, France"
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Number of Travelers
                                </label>
                                <input
                                    type="number"
                                    name="numberOfTravelers"
                                    value={formData.numberOfTravelers}
                                    onChange={handleInputChange}
                                    min="1"
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Start Date *
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    End Date *
                                </label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
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

                    {/* Flight Information */}
                    <div className="p-6 rounded-xl border-2 shadow-lg" style={{ borderColor: '#00AFB9', backgroundColor: '#FDFCDC' }}>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#0081A7' }}>
                            <PaperAirplaneIcon />
                            Flight Information
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Departure Airport
                                </label>
                                <input
                                    type="text"
                                    name="departureAirport"
                                    value={formData.departureAirport}
                                    onChange={handleInputChange}
                                    placeholder="e.g., OKC - Oklahoma City"
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Arrival Airport
                                </label>
                                <input
                                    type="text"
                                    name="arrivalAirport"
                                    value={formData.arrivalAirport}
                                    onChange={handleInputChange}
                                    placeholder="e.g., CDG - Paris Charles de Gaulle"
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Outbound Flight Details
                                </label>
                                <textarea
                                    name="outboundFlight"
                                    value={formData.outboundFlight}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="Flight number, departure time, arrival time, etc."
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Return Flight Details
                                </label>
                                <textarea
                                    name="returnFlight"
                                    value={formData.returnFlight}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="Flight number, departure time, arrival time, etc."
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
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

                    {/* Accommodation */}
                    <div className="p-6 rounded-xl border-2 shadow-lg" style={{ borderColor: '#00AFB9', backgroundColor: '#FDFCDC' }}>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#0081A7' }}>
                            <MapIcon />
                            Accommodation
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Hotel Name
                                </label>
                                <input
                                    type="text"
                                    name="hotelName"
                                    value={formData.hotelName}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Hotel Eiffel Tower"
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Room Type
                                </label>
                                <input
                                    type="text"
                                    name="roomType"
                                    value={formData.roomType}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Deluxe Double Room"
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Hotel Address
                                </label>
                                <input
                                    type="text"
                                    name="hotelAddress"
                                    value={formData.hotelAddress}
                                    onChange={handleInputChange}
                                    placeholder="Full hotel address"
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Check-in Date
                                </label>
                                <input
                                    type="date"
                                    name="checkInDate"
                                    value={formData.checkInDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Check-out Date
                                </label>
                                <input
                                    type="date"
                                    name="checkOutDate"
                                    value={formData.checkOutDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
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

                    {/* Daily Itinerary with Weather Automation */}
                    <div className="p-6 rounded-xl border-2 shadow-lg" style={{ borderColor: '#00AFB9', backgroundColor: '#FDFCDC' }}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: '#0081A7' }}>
                                <CalendarIcon />
                                Daily Itinerary
                            </h2>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={fetchWeatherForAllDays}
                                    disabled={weatherLoading}
                                    className="flex items-center gap-2 px-4 py-2 rounded-md text-white font-semibold shadow-lg hover:opacity-90 transition-all disabled:opacity-50"
                                    style={{ backgroundColor: '#00AFB9' }}
                                >
                                    {weatherLoading ? (
                                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                    ) : (
                                        <WeatherIcon />
                                    )}
                                    Auto Populate Weather
                                </button>
                                <button
                                    type="button"
                                    onClick={addDayToItinerary}
                                    className="px-4 py-2 rounded-md text-white font-semibold shadow-lg hover:opacity-90 transition-all"
                                    style={{ backgroundColor: '#00AFB9' }}
                                >
                                    Add Day
                                </button>
                            </div>
                        </div>

                        {/* Weather Error Display */}
                        {automationErrors.weather && (
                            <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#FED9B7', border: '1px solid #F07167' }}>
                                <p className="text-sm" style={{ color: '#0081A7' }}>
                                    ⚠️ {automationErrors.weather}
                                </p>
                            </div>
                        )}

                        {formData.dailyItinerary.map((day, dayIndex) => (
                            <div key={dayIndex} className="mb-8 p-4 rounded-lg border-2" style={{ borderColor: '#FED9B7', backgroundColor: '#FED9B7' }}>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold" style={{ color: '#0081A7' }}>
                                        Day {dayIndex + 1}
                                    </h3>
                                    {formData.dailyItinerary.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeDayFromItinerary(dayIndex)}
                                            className="p-2 rounded-full hover:bg-opacity-80 transition-colors"
                                            style={{ backgroundColor: '#F07167', color: 'white' }}
                                            title="Remove this day"
                                        >
                                            <TrashIcon />
                                        </button>
                                    )}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            value={day.date}
                                            onChange={(e) => updateDayData(dayIndex, 'date', e.target.value)}
                                            className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                            style={{ 
                                                backgroundColor: '#FDFCDC',
                                                borderColor: '#00AFB9',
                                                outlineColor: '#00AFB9',
                                                color: '#0081A7'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Weather Section */}
                                <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: '#FDFCDC' }}>
                                    <h4 className="text-md font-semibold mb-3 flex items-center gap-2" style={{ color: '#0081A7' }}>
                                        <CloudIcon />
                                        Weather
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1" style={{ color: '#0081A7' }}>
                                                Temperature
                                            </label>
                                            <input
                                                type="text"
                                                value={day.weather.temperature}
                                                onChange={(e) => updateDayData(dayIndex, 'weather.temperature', e.target.value)}
                                                placeholder="e.g., 72°F / 22°C"
                                                className="w-full px-3 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                                style={{ 
                                                    backgroundColor: '#FDFCDC',
                                                    borderColor: '#00AFB9',
                                                    outlineColor: '#00AFB9',
                                                    color: '#0081A7'
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1" style={{ color: '#0081A7' }}>
                                                Conditions
                                            </label>
                                            <input
                                                type="text"
                                                value={day.weather.conditions}
                                                onChange={(e) => updateDayData(dayIndex, 'weather.conditions', e.target.value)}
                                                placeholder="e.g., Sunny, Cloudy, Rainy"
                                                className="w-full px-3 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                                style={{ 
                                                    backgroundColor: '#FDFCDC',
                                                    borderColor: '#00AFB9',
                                                    outlineColor: '#00AFB9',
                                                    color: '#0081A7'
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1" style={{ color: '#0081A7' }}>
                                                Precipitation
                                            </label>
                                            <input
                                                type="text"
                                                value={day.weather.precipitation}
                                                onChange={(e) => updateDayData(dayIndex, 'weather.precipitation', e.target.value)}
                                                placeholder="e.g., 0%, 20%"
                                                className="w-full px-3 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
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

                                {/* Activities Section */}
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-md font-semibold flex items-center gap-2" style={{ color: '#0081A7' }}>
                                            Activities
                                        </h4>
                                        <button
                                            type="button"
                                            onClick={() => addActivityToDay(dayIndex)}
                                            className="px-3 py-1 rounded-md text-white text-sm font-semibold hover:opacity-90 transition-all"
                                            style={{ backgroundColor: '#F07167' }}
                                        >
                                            Add Activity
                                        </button>
                                    </div>
                                    
                                    {day.activities.map((activity, activityIndex) => (
                                        <div key={activityIndex} className="mb-4 p-3 rounded-lg relative" style={{ backgroundColor: '#FDFCDC' }}>
                                            {/* Delete button for activity */}
                                            {day.activities.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeActivityFromDay(dayIndex, activityIndex)}
                                                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-opacity-80 transition-colors"
                                                    style={{ backgroundColor: '#F07167', color: 'white' }}
                                                    title="Remove this activity"
                                                >
                                                    <TrashIcon />
                                                </button>
                                            )}
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                                                <div>
                                                    <label className="block text-sm font-medium mb-1" style={{ color: '#0081A7' }}>
                                                        Time
                                                    </label>
                                                    <input
                                                        type="time"
                                                        value={activity.time}
                                                        onChange={(e) => updateActivityData(dayIndex, activityIndex, 'time', e.target.value)}
                                                        className="w-full px-3 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                                        style={{ 
                                                            backgroundColor: '#FDFCDC',
                                                            borderColor: '#00AFB9',
                                                            outlineColor: '#00AFB9',
                                                            color: '#0081A7'
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-1" style={{ color: '#0081A7' }}>
                                                        Location
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={activity.location}
                                                        onChange={(e) => updateActivityData(dayIndex, activityIndex, 'location', e.target.value)}
                                                        placeholder="e.g., Eiffel Tower"
                                                        className="w-full px-3 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                                        style={{ 
                                                            backgroundColor: '#FDFCDC',
                                                            borderColor: '#00AFB9',
                                                            outlineColor: '#00AFB9',
                                                            color: '#0081A7'
                                                        }}
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium mb-1" style={{ color: '#0081A7' }}>
                                                        Activity Description
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={activity.activity}
                                                        onChange={(e) => updateActivityData(dayIndex, activityIndex, 'activity', e.target.value)}
                                                        placeholder="e.g., Visit Eiffel Tower and take photos"
                                                        className="w-full px-3 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                                        style={{ 
                                                            backgroundColor: '#FDFCDC',
                                                            borderColor: '#00AFB9',
                                                            outlineColor: '#00AFB9',
                                                            color: '#0081A7'
                                                        }}
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium mb-1" style={{ color: '#0081A7' }}>
                                                        Notes
                                                    </label>
                                                    <textarea
                                                        value={activity.notes}
                                                        onChange={(e) => updateActivityData(dayIndex, activityIndex, 'notes', e.target.value)}
                                                        placeholder="Additional notes, reservations, contact info, etc."
                                                        rows={2}
                                                        className="w-full px-3 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
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
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Information */}
                    <div className="p-6 rounded-xl border-2 shadow-lg" style={{ borderColor: '#00AFB9', backgroundColor: '#FDFCDC' }}>
                        <h2 className="text-2xl font-bold mb-6" style={{ color: '#0081A7' }}>
                            Additional Information
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Total Trip Cost
                                </label>
                                <input
                                    type="text"
                                    name="totalCost"
                                    value={formData.totalCost}
                                    onChange={handleInputChange}
                                    placeholder="e.g., $3,500"
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Emergency Contacts
                                </label>
                                <textarea
                                    name="emergencyContacts"
                                    value={formData.emergencyContacts}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="Emergency contact names and phone numbers"
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Special Requests & Notes
                                </label>
                                <textarea
                                    name="specialRequests"
                                    value={formData.specialRequests}
                                    onChange={handleInputChange}
                                    rows={4}
                                    placeholder="Dietary restrictions, accessibility needs, special occasions, etc."
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
                                    style={{ 
                                        backgroundColor: '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        outlineColor: '#00AFB9',
                                        color: '#0081A7'
                                    }}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                                    Internal Notes
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="Internal notes for travel planning team"
                                    className="w-full px-4 py-2 rounded-md border focus:outline-2 focus:-outline-offset-2"
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

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-6">
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 rounded-md text-white font-semibold shadow-lg hover:opacity-90 transition-all"
                            style={{ backgroundColor: '#00AFB9' }}
                        >
                            {itinerary ? 'Update Itinerary' : 'Save Itinerary'}
                        </button>
                        
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-6 py-3 rounded-md font-semibold shadow-lg hover:opacity-90 transition-all"
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
import { useState } from 'react';
import WeatherDisplay from '../components/WeatherDisplay';

export default function Weather() {
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [temperatureUnit, setTemperatureUnit] = useState('F'); // F or C

    const calculateDays = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    };

    const days = calculateDays();

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6" style={{ color: '#0081A7' }}>
                Weather Forecasts
            </h1>
            
            {/* API Usage Notice */}
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: '#FED9B7', borderColor: '#F07167' }}>
                <div className="flex items-center mb-2">
                    <span className="text-lg mr-2">💡</span>
                    <span className="font-medium text-sm" style={{ color: '#0081A7' }}>
                        API Usage Notice
                    </span>
                </div>
                <p className="text-xs" style={{ color: '#0081A7' }}>
                    Each daily forecast uses 1 API call (~75 free queries per day). 
                    {days > 0 && (
                        <span className="font-medium">
                            {' '}This {days}-day forecast will use {days} query/queries.
                        </span>
                    )}
                </p>
            </div>

            <div className="mb-6 p-6 rounded-lg" style={{ backgroundColor: '#FDFCDC' }}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                            Destination
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter city or location"
                            className="w-full p-3 rounded-md border"
                            style={{ borderColor: '#00AFB9' }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-3 rounded-md border"
                            style={{ borderColor: '#00AFB9' }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                            End Date
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-3 rounded-md border"
                            style={{ borderColor: '#00AFB9' }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                            Temperature Unit
                        </label>
                        <select
                            value={temperatureUnit}
                            onChange={(e) => setTemperatureUnit(e.target.value)}
                            className="w-full p-3 rounded-md border"
                            style={{ borderColor: '#00AFB9' }}
                        >
                            <option value="F">Fahrenheit (°F)</option>
                            <option value="C">Celsius (°C)</option>
                        </select>
                    </div>
                </div>
            </div>

            <WeatherDisplay 
                location={location}
                startDate={startDate}
                endDate={endDate}
                temperatureUnit={temperatureUnit}
            />
        </div>
    );
}
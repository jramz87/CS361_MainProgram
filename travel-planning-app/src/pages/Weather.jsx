import { useState } from 'react';
import WeatherDisplay from '../components/WeatherDisplay';

export default function Weather() {
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    return (
        <div className="p-6">
        <h1 className="text-3xl font-bold mb-6" style={{ color: '#0081A7' }}>
            Weather Forecasts
        </h1>
        
        <div className="mb-6 p-6 rounded-lg" style={{ backgroundColor: '#FDFCDC' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>
        </div>

        <WeatherDisplay 
            location={location}
            startDate={startDate}
            endDate={endDate}
        />
        </div>
    );
}
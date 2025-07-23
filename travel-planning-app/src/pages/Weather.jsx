// weather forescast display page

import { useState } from 'react';
import WeatherDisplay from '../components/WeatherDisplay';

export default function Weather() {
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tempUnit, setTempUnit] = useState('F');
    const [fetchTrigger, setFetchTrigger] = useState(0);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6" style={{ color: '#0081A7' }}>
                Weather Forecast
            </h1>
            
            {/* API Usage Notice */}
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: '#FED9B7', borderColor: '#F07167' }}>
                <p className="text-xs" style={{ color: '#0081A7' }}>
                    Each single day weather forecast uses 1 API call. You get about 75 free calls per day.
                </p>
            </div>

            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FDFCDC' }}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                            Where to?
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Paris, France"
                            className="w-full p-3 rounded border"
                            style={{ borderColor: '#00AFB9', color: '#0081A7' }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                            From
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-3 rounded border"
                            style={{ borderColor: '#00AFB9', color: '#0081A7' }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                            To
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-3 rounded border"
                            style={{ borderColor: '#00AFB9', color: '#0081A7' }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: '#0081A7' }}>
                            Temperature
                        </label>
                        <select
                            value={tempUnit}
                            onChange={(e) => setTempUnit(e.target.value)}
                            className="w-full p-3 rounded border"
                            style={{ borderColor: '#00AFB9', color: '#0081A7' }}
                        >
                            <option value="F">°F</option>
                            <option value="C">°C</option>
                        </select>
                    </div>
                </div>
                
                <div className="mt-4">
                    <button
                        onClick={() => setFetchTrigger(prev => prev + 1)}
                        disabled={!location || !startDate || !endDate}
                        className="px-6 py-3 rounded text-white font-semibold hover:opacity-90 disabled:opacity-50"
                        style={{ backgroundColor: '#00AFB9' }}
                    >
                        Get Weather
                    </button>
                </div>
            </div>

            <WeatherDisplay 
                location={location}
                startDate={startDate}
                endDate={endDate}
                tempUnit={tempUnit}
                fetchTrigger={fetchTrigger}
            />
        </div>
    );
}
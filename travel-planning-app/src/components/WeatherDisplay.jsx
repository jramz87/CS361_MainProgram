import { useState, useEffect } from 'react';
import { getWeatherForecast } from '../services/weatherAPI';

export default function WeatherDisplay({ location, startDate, endDate }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location && startDate && endDate) {
        fetchWeather();
        }
    }, [location, startDate, endDate]);

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        
        try {
        const data = await getWeatherForecast(location, startDate, endDate);
        setWeather(data);
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    if (loading) {
        return (
        <div className="p-6 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-2" style={{ color: '#0081A7' }}>Loading weather forecast...</p>
        </div>
        );
    }

    if (error) {
        return (
        <div className="p-6 text-center">
            <p style={{ color: '#F07167' }}>Error loading weather: {error}</p>
            <button 
            onClick={fetchWeather}
            className="mt-2 px-4 py-2 rounded-md text-white"
            style={{ backgroundColor: '#00AFB9' }}
            >
            Retry
            </button>
        </div>
        );
    }

    if (!weather) {
        return (
        <div className="p-6 text-center" style={{ color: '#0081A7' }}>
            Enter location and dates to see weather forecast
        </div>
        );
    }

    return (
        <div className="p-6" style={{ backgroundColor: '#FDFCDC' }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#0081A7' }}>
            Weather Forecast for {location}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weather.days?.map((day, index) => (
            <div 
                key={index}
                className="p-4 rounded-md border"
                style={{ backgroundColor: '#FED9B7', borderColor: '#00AFB9' }}
            >
                <div className="font-medium" style={{ color: '#0081A7' }}>
                {new Date(day.date).toLocaleDateString()}
                </div>
                <div className="text-2xl font-bold" style={{ color: '#F07167' }}>
                {Math.round(day.temp)}°F
                </div>
                <div className="text-sm" style={{ color: '#0081A7' }}>
                {day.conditions}
                </div>
                <div className="text-xs mt-1" style={{ color: '#0081A7' }}>
                H: {Math.round(day.tempmax)}° L: {Math.round(day.tempmin)}°
                </div>
            </div>
            )) || (
            <div style={{ color: '#0081A7' }}>Weather data not available</div>
            )}
        </div>
        </div>
    );
}
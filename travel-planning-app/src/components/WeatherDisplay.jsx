import { useState, useEffect } from 'react';
import { getWeatherForecast } from '../services/weatherAPI';
import { getActivityRecommendations, getTemperatureDisplay } from '../services/activityRecommendations';

export default function WeatherDisplay({ location, startDate, endDate, temperatureUnit }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);

    useEffect(() => {
        if (location && startDate && endDate) {
            fetchWeather();
        } else {
            setWeather(null);
            setError(null);
            setSelectedDay(null);
        }
    }, [location, startDate, endDate]);

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        setSelectedDay(null);
        
        try {
            const data = await getWeatherForecast(location, startDate, endDate);
            setWeather(data);
        } catch (err) {
            setError(err.message);
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    const handleDayClick = (day, index) => {
        setSelectedDay({ ...day, index });
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
                <div className="mb-4">
                    <span className="text-4xl">⚠️</span>
                </div>
                <p className="mb-4 text-lg font-medium" style={{ color: '#F07167' }}>
                    Unable to load weather data
                </p>
                <p className="mb-4 text-sm" style={{ color: '#0081A7' }}>
                    {error}
                </p>
                <button 
                    onClick={fetchWeather}
                    className="px-6 py-2 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#00AFB9' }}
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!weather) {
        return (
            <div className="p-6 text-center" style={{ color: '#0081A7' }}>
                <div className="mb-4">
                    <span className="text-6xl">🌤️</span>
                </div>
                <p className="text-lg">Enter location and dates to see weather forecast</p>
                <p className="text-sm mt-2 opacity-75">
                    Get simple activity recommendations based on weather conditions
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 rounded-lg" style={{ backgroundColor: '#FDFCDC' }}>
            <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#0081A7' }}>
                    Weather Forecast for {weather.resolvedAddress || location}
                </h3>
                <p className="text-sm opacity-75" style={{ color: '#0081A7' }}>
                    Click on any day to see activity recommendations • Showing temperatures in °{temperatureUnit}
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                {weather.days?.map((day, index) => {
                    const activityRec = getActivityRecommendations(day);
                    const isSelected = selectedDay?.index === index;
                    
                    return (
                        <div 
                            key={index}
                            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                                isSelected ? 'ring-2 shadow-lg transform scale-105' : 'hover:shadow-md'
                            }`}
                            style={{ 
                                backgroundColor: isSelected ? '#E6F3FF' : '#FED9B7', 
                                borderColor: '#00AFB9',
                                ringColor: isSelected ? '#0081A7' : 'transparent'
                            }}
                            onClick={() => handleDayClick(day, index)}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="font-medium text-sm" style={{ color: '#0081A7' }}>
                                    {new Date(day.date).toLocaleDateString('en-US', { 
                                        weekday: 'short', 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })}
                                </div>
                                <div className="text-2xl">
                                    {activityRec.icon}
                                </div>
                            </div>
                            
                            <div className="text-3xl font-bold mb-1" style={{ color: '#F07167' }}>
                                {getTemperatureDisplay(day.temp, temperatureUnit)}
                            </div>
                            
                            <div className="text-sm mb-2" style={{ color: '#0081A7' }}>
                                {day.conditions}
                            </div>
                            
                            <div className="text-xs mb-2" style={{ color: '#0081A7' }}>
                                H: {getTemperatureDisplay(day.tempmax, temperatureUnit)} • 
                                L: {getTemperatureDisplay(day.tempmin, temperatureUnit)}
                            </div>

                            <div 
                                className="text-xs font-medium px-2 py-1 rounded text-center"
                                style={{ 
                                    backgroundColor: activityRec.color,
                                    color: 'white'
                                }}
                            >
                                {activityRec.message}
                            </div>
                        </div>
                    );
                }) || (
                    <div className="col-span-full text-center py-8" style={{ color: '#0081A7' }}>
                        <span className="text-4xl mb-2 block">📊</span>
                        Weather data not available for the selected dates
                    </div>
                )}
            </div>

            {/* Simplified Activity Recommendation Panel */}
            {selectedDay && (
                <div className="mt-6 p-6 rounded-lg border-2" style={{ backgroundColor: '#FFF', borderColor: '#00AFB9' }}>
                    <div className="flex items-center mb-4">
                        <span className="text-4xl mr-4">
                            {getActivityRecommendations(selectedDay).icon}
                        </span>
                        <div>
                            <h4 className="text-xl font-bold" style={{ color: '#0081A7' }}>
                                {new Date(selectedDay.date).toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </h4>
                            <p className="text-lg font-medium" style={{ color: getActivityRecommendations(selectedDay).color }}>
                                {getActivityRecommendations(selectedDay).message}
                            </p>
                            <p className="text-sm" style={{ color: '#0081A7' }}>
                                {getActivityRecommendations(selectedDay).reason}
                            </p>
                        </div>
                    </div>

                    {/* Weather Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-3 rounded" style={{ backgroundColor: '#F0F4FF' }}>
                            <div className="text-xs" style={{ color: '#0081A7' }}>Temperature</div>
                            <div className="font-bold text-lg" style={{ color: '#F07167' }}>
                                {getTemperatureDisplay(selectedDay.temp, temperatureUnit)}
                            </div>
                            <div className="text-xs" style={{ color: '#0081A7' }}>
                                {getTemperatureDisplay(selectedDay.tempmin, temperatureUnit)} - {getTemperatureDisplay(selectedDay.tempmax, temperatureUnit)}
                            </div>
                        </div>

                        {selectedDay.humidity && (
                            <div className="p-3 rounded" style={{ backgroundColor: '#F0F4FF' }}>
                                <div className="text-xs" style={{ color: '#0081A7' }}>Humidity</div>
                                <div className="font-bold text-lg" style={{ color: '#0081A7' }}>
                                    {Math.round(selectedDay.humidity)}%
                                </div>
                            </div>
                        )}

                        {selectedDay.windspeed && (
                            <div className="p-3 rounded" style={{ backgroundColor: '#F0F4FF' }}>
                                <div className="text-xs" style={{ color: '#0081A7' }}>Wind Speed</div>
                                <div className="font-bold text-lg" style={{ color: '#0081A7' }}>
                                    {Math.round(selectedDay.windspeed)} mph
                                </div>
                            </div>
                        )}

                        {selectedDay.uvindex && (
                            <div className="p-3 rounded" style={{ backgroundColor: '#F0F4FF' }}>
                                <div className="text-xs" style={{ color: '#0081A7' }}>UV Index</div>
                                <div className="font-bold text-lg" style={{ color: '#0081A7' }}>
                                    {Math.round(selectedDay.uvindex)}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Conditions */}
                    <div className="mt-4 p-3 rounded text-center" style={{ backgroundColor: '#F8F9FA' }}>
                        <div className="text-sm font-medium" style={{ color: '#0081A7' }}>Conditions</div>
                        <div className="text-lg" style={{ color: '#0081A7' }}>{selectedDay.conditions}</div>
                        {selectedDay.description && (
                            <div className="text-sm opacity-75" style={{ color: '#0081A7' }}>
                                {selectedDay.description}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {weather.description && (
                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#FFF', borderColor: '#00AFB9' }}>
                    <h4 className="font-medium mb-2" style={{ color: '#0081A7' }}>
                        Weather Summary
                    </h4>
                    <p className="text-sm" style={{ color: '#0081A7' }}>
                        {weather.description}
                    </p>
                </div>
            )}
        </div>
    );
}
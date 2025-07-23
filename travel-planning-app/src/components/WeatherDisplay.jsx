// defines layout of weather forescast cards displayed on weather page

import { useState, useEffect } from 'react';

export default function WeatherDisplay({ location, startDate, endDate, tempUnit = 'F', fetchTrigger }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);

    // keep this here?
    function convertTemp(tempF) {
        if (tempUnit === 'C') {
            return Math.round((tempF - 32) * 5/9);
        }
        return Math.round(tempF);
    }

    const tempSymbol = tempUnit === 'C' ? '°C' : '°F';

    useEffect(() => {
        if (location && startDate && endDate && fetchTrigger > 0) {
            fetchWeather();
        }
    }, [fetchTrigger]);

    async function fetchWeather() {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`http://localhost:3001/api/weather/forecast?location=${location}&startDate=${startDate}&endDate=${endDate}`);
            const data = await response.json();
            
            if (response.ok) {
                setWeather(data);
            } else {
                setError(data.error || 'Could not get weather data');
            }
        } catch (err) {
            console.log('fetch failed:', err);
            setError('Something went wrong');
        }
        setLoading(false);
    }

    if (loading) {
        return (
            <div className="p-6 text-center">
                <p style={{ color: '#0081A7' }}>Getting weather...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center">
                <p className="mb-4" style={{ color: '#F07167' }}>
                    Couldn't get weather data
                </p>
                <p className="mb-4 text-sm" style={{ color: '#0081A7' }}>
                    {error}
                </p>
                <button
                    onClick={fetchWeather}
                    className="px-4 py-2 rounded text-white hover:opacity-90"
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
                <p>Enter a location and dates to check the weather</p>
            </div>
        );
    }

    return (
        <div className="p-6 rounded-lg" style={{ backgroundColor: '#FDFCDC' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#0081A7' }}>
                Weather for {location}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weather.days?.map((day, index) => {
                    // format the date
                    let displayDate = day.datetime;
                    if (day.datetime) {
                        let parts = day.datetime.split('-');
                        if (parts.length === 3) {
                            displayDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
                        }
                    }
                    
                    return (
                        <div 
                            key={index}
                            className="p-4 rounded-lg border cursor-pointer hover:shadow-md"
                            style={{ borderColor: '#00AFB9' }}
                            onClick={() => setSelectedDay(selectedDay === index ? null : index)}
                        >
                            <div className="font-semibold text-sm mb-2" style={{ color: '#0081A7' }}>
                                {displayDate}
                            </div>
                            
                            <div className="text-2xl font-bold mb-1" style={{ color: '#F07167' }}>
                                {convertTemp(day.temp)}{tempSymbol}
                            </div>
                            
                            <div className="text-sm" style={{ color: '#0081A7' }}>
                                {day.conditions}
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedDay !== null && weather.days[selectedDay] && (
                <div className="mt-6 p-4 rounded-lg border-2" style={{ backgroundColor: '#FFF', borderColor: '#00AFB9' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#0081A7' }}>
                        {weather.days[selectedDay].datetime}
                    </h4>
                    
                    {/* temp details */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="p-3 rounded text-center" style={{ backgroundColor: '#F0F4FF' }}>
                            <div className="text-xs" style={{ color: '#0081A7' }}>High</div>
                            <div className="font-bold" style={{ color: '#F07167' }}>
                                {convertTemp(weather.days[selectedDay].tempmax)}{tempSymbol}
                            </div>
                        </div>

                        <div className="p-3 rounded text-center" style={{ backgroundColor: '#F0F4FF' }}>
                            <div className="text-xs" style={{ color: '#0081A7' }}>Low</div>
                            <div className="font-bold" style={{ color: '#0081A7' }}>
                                {convertTemp(weather.days[selectedDay].tempmin)}{tempSymbol}
                            </div>
                        </div>

                        <div className="p-3 rounded text-center" style={{ backgroundColor: '#F0F4FF' }}>
                            <div className="text-xs" style={{ color: '#0081A7' }}>Humidity</div>
                            <div className="font-bold" style={{ color: '#0081A7' }}>
                                {Math.round(weather.days[selectedDay].humidity)}%
                            </div>
                        </div>
                    </div>

                    {weather.days[selectedDay].description && (
                        <div className="p-3 rounded mb-3" style={{ backgroundColor: '#F8F9FA' }}>
                            <div className="text-sm" style={{ color: '#0081A7' }}>
                                {weather.days[selectedDay].description}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {weather.description && (
                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#FFF', border: '1px solid #00AFB9' }}>
                    <p className="text-sm" style={{ color: '#0081A7' }}>
                        {weather.description}
                    </p>
                </div>
            )}
        </div>
    );
}
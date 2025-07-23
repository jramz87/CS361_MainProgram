export const getWeatherForecast = async (location, startDate, endDate) => {
    const response = await fetch(`http://localhost:3001/api/weather/forecast?location=${location}&startDate=${startDate}&endDate=${endDate}`);
    
    if (!response.ok) {
        throw new Error('Could not get weather data');
    }
    
    return await response.json();
};

export const getCurrentWeather = async (location) => {
    const response = await fetch(`http://localhost:3001/api/weather/current?location=${location}`);
    
    if (!response.ok) {
        throw new Error('Could not get current weather');
    }
    
    return await response.json();
};
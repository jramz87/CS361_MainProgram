const WEATHER_API_BASE = 'http://localhost:5000/api';

export const getWeatherForecast = async (location, startDate, endDate) => {
    try {
        const response = await fetch(
        `${WEATHER_API_BASE}/weather/${location}?start=${startDate}&end=${endDate}`
        );
        if (!response.ok) throw new Error('Weather API request failed');
        return await response.json();
    } catch (error) {
        console.error('Weather API Error:', error);
        throw error;
    }
};

export const getLocationSuggestions = async (query) => {
    try {
        const response = await fetch(`${WEATHER_API_BASE}/locations?q=${query}`);
        if (!response.ok) throw new Error('Location search failed');
        return await response.json();
    } catch (error) {
        console.error('Location API Error:', error);
        throw error;
    }
};
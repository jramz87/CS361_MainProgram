const API_BASE_URL = 'http://localhost:3001/api';

export const getWeatherForecast = async (location, startDate, endDate) => {
    if (!location || !startDate || !endDate) {
        throw new Error('Location, start date, and end date are required');
    }

    const params = new URLSearchParams({
        location: location.trim(),
        startDate,
        endDate
    });

    try {
        const response = await fetch(`${API_BASE_URL}/weather/forecast?${params}`);
        
        if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to weather service');
        }
        throw error;
    }
};

export const getCurrentWeather = async (location) => {
    if (!location) {
        throw new Error('Location is required');
    }

    const params = new URLSearchParams({
        location: location.trim()
    });

    try {
        const response = await fetch(`${API_BASE_URL}/weather/current?${params}`);
        
        if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to weather service');
        }
        throw error;
    }
};
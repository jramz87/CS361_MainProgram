const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Fetches weather forecast data from your backend API
 * @param {string} location - The location to get weather for
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {Promise<Object>} Weather data object
 */
export const getWeatherForecast = async (location, startDate, endDate) => {
    if (!location || !startDate || !endDate) {
        throw new Error('Location, start date, and end date are required');
    }

  // Validate date format (basic check)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
        throw new Error('Dates must be in YYYY-MM-DD format');
    }

  // Check if start date is before end date
    if (new Date(startDate) > new Date(endDate)) {
        throw new Error('Start date must be before end date');
    }

    try {
        const params = new URLSearchParams({
        location: location.trim(),
        startDate,
        endDate
    });

    const response = await fetch(`${API_BASE_URL}/weather/forecast?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include' // Include cookies if needed for authentication
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 429) {
            throw new Error('Too many requests. Please try again later.');
        } else if (response.status === 400) {
            throw new Error(errorData.message || 'Invalid request. Please check your input.');
        } else if (response.status >= 500) {
            throw new Error('Weather service is temporarily unavailable. Please try again later.');
        } else {
            throw new Error(errorData.message || `Request failed with status: ${response.status}`);
        }
    }

    const result = await response.json();
    return result.data;

    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to weather service. Please check your internet connection.');
        }
        throw error;
    }
};

/**
 * Get current weather for a location
 * @param {string} location - The location to get weather for
 * @returns {Promise<Object>} Current weather data
 */
export const getCurrentWeather = async (location) => {
    if (!location) {
        throw new Error('Location is required');
    }

    try {
        const params = new URLSearchParams({
        location: location.trim()
    });

    const response = await fetch(`${API_BASE_URL}/weather/current?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;

    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Unable to connect to weather service. Please check your internet connection.');
        } throw error;
    }
};

/**
 * Get cache statistics (useful for debugging)
 * @returns {Promise<Object>} Cache statistics
 */
export const getCacheStats = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/weather/cache-stats`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        });

        if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();

    } catch (error) {
        console.error('Failed to get cache stats:', error);
        throw error;
    }
};
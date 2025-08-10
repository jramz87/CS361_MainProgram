// services/activityAPI.js - all API calls used to communication with activity microservice

const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3002/api'  // microservice
    : '/api';

// main function for exploring destinations
export const exploreDestination = async (explorationData, explorationPreferences) => {
    try {
        const response = await fetch(`${API_BASE_URL}/explore-destination`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                destination: explorationData.location,
                timeOfYear: explorationPreferences.timeOfYear,
                clientPreferences: explorationPreferences.clientPreferences || {}
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            
            if (response.status === 429) {
                throw new Error('Daily limit reached - try again tomorrow');
            } else if (response.status >= 500) {
                throw new Error('Service temporarily unavailable');
            } else {
                throw new Error(errorData.message || 'Failed to get destination info');
            }
        }

        const result = await response.json();
        return result.data;

    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Connection failed');
        }
        throw error;
    }
};

// weather-based activity recommendations
export const getActivityRecommendations = async (weatherData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/weather-recommendations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ weatherData })
        });

        if (!response.ok) {
            throw new Error('Failed to get weather recommendations');
        }

        const result = await response.json();
        return result.data;

    } catch (error) {
        console.error('Weather recommendations error:', error);
        throw error;
    }
};

// temperature conversion
export const convertTemperature = async (tempF, unit) => {
    try {
        const response = await fetch(`${API_BASE_URL}/convert-temperature`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ temp: tempF, unit })
        });

        if (!response.ok) {
            throw new Error('Failed to convert temperature');
        }

        const result = await response.json();
        return result.data.converted;

    } catch (error) {
        console.error('Temperature conversion error:', error);
        throw error;
    }
};

export const getTemperatureDisplay = async (temp, unit) => {
    try {
        const response = await fetch(`${API_BASE_URL}/convert-temperature`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ temp, unit })
        });

        if (!response.ok) {
            throw new Error('Failed to get temperature display');
        }

        const result = await response.json();
        return result.data.display;

    } catch (error) {
        console.error('Temperature display error:', error);
        throw error;
    }
};
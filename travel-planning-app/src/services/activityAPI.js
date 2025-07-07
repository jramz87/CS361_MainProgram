const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : '/api';

export const exploreDestination = async (explorationData, explorationPreferences) => {
    try {
        const response = await fetch(`${API_BASE_URL}/explore-destination`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                destination: explorationData.location,
                timeOfYear: explorationPreferences.timeOfYear
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            
            if (response.status === 429) {
                throw new Error('Too many requests. Please try again later.');
            } else if (response.status >= 500) {
                throw new Error('Destination exploration service is temporarily unavailable.');
            } else {
                throw new Error(errorData.message || 'Failed to explore destination');
            }
        }

        const result = await response.json();
        return result.data;

    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Unable to connect to destination exploration service');
        }
        throw error;
    }
};
const API_BASE_URL = 'http://localhost:3001/api';

export const getAIRecommendations = async (weatherData, userPreferences = {}) => {
    if (!weatherData || !weatherData.days) {
        throw new Error('Weather data is required');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/weather/ai-recommendations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            weatherData,
            userPreferences
        })
        });

        if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 429) {
            throw new Error('AI service is busy. Please try again in a moment.');
        } else if (response.status >= 500) {
            throw new Error('AI recommendation service is temporarily unavailable.');
        } else {
            throw new Error(errorData.message || 'Failed to get AI recommendations');
        }
        }

        const result = await response.json();
        return result.data;

    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to AI recommendation service');
        }
        throw error;
    }
};

export const validateUserPreferences = (preferences) => {
    const validActivityTypes = [
        'outdoor', 'indoor', 'cultural', 'adventure', 'relaxation', 
        'food', 'sports', 'entertainment', 'shopping', 'nature'
    ];
    
    const validGroupSizes = ['solo', 'couple', 'small group', 'large group', 'family'];
    const validBudgets = ['low', 'medium', 'high'];
    const validMobility = ['limited', 'normal', 'high'];

    return {
        activityTypes: preferences.activityTypes?.filter(type => 
        validActivityTypes.includes(type)
        ) || [],
        groupSize: validGroupSizes.includes(preferences.groupSize) ? 
        preferences.groupSize : 'solo',
        budget: validBudgets.includes(preferences.budget) ? 
        preferences.budget : 'medium',
        mobility: validMobility.includes(preferences.mobility) ? 
        preferences.mobility : 'normal',
        interests: preferences.interests || []
    };
};
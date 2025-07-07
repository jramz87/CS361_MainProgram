export const getActivityRecommendations = (weatherData) => {
    const { temp, conditions, windspeed, uvindex } = weatherData;
    
    // Weather condition checks
    const lowerConditions = conditions?.toLowerCase() || '';
    const isBadWeather = lowerConditions.includes('rain') || 
                        lowerConditions.includes('storm') || 
                        lowerConditions.includes('thunderstorm') ||
                        lowerConditions.includes('snow');
    
    const isVeryWindy = windspeed > 25;
    const isVeryHot = temp > 95;
    const isVeryCold = temp < 25;
    const isHighUV = uvindex > 8;

    // Simple decision logic
    if (isBadWeather) {
        return {
        recommendation: 'stay-indoors',
        icon: '🏠',
        message: 'Stay indoors',
        reason: 'Poor weather conditions',
        color: '#F57C00'
        };
    }

    if (isVeryWindy) {
        return {
        recommendation: 'stay-indoors',
        icon: '💨',
        message: 'Stay indoors',
        reason: 'Very windy conditions',
        color: '#F57C00'
        };
    }

    if (isVeryHot) {
        return {
        recommendation: 'limited-outdoor',
        icon: '🌡️',
        message: 'Limited outdoor time',
        reason: 'Extreme heat - stay hydrated',
        color: '#FF5722'
        };
    }

    if (isVeryCold) {
        return {
        recommendation: 'limited-outdoor',
        icon: '🥶',
        message: 'Limited outdoor time',
        reason: 'Extreme cold - dress warmly',
        color: '#2196F3'
        };
    }

    if (temp >= 70 && temp <= 85 && !isHighUV) {
        return {
        recommendation: 'perfect-outdoor',
        icon: '🌟',
        message: 'Perfect for outdoor activities',
        reason: 'Ideal weather conditions',
        color: '#4CAF50'
        };
    }

    if (temp >= 60 && temp <= 90) {
        return {
        recommendation: 'good-outdoor',
        icon: '🌤️',
        message: 'Great for outdoor activities',
        reason: isHighUV ? 'Good weather - use sun protection' : 'Good weather conditions',
        color: '#4CAF50'
        };
    }

    // Default case - moderate outdoor
    return {
        recommendation: 'moderate-outdoor',
        icon: '⛅',
        message: 'Moderate outdoor conditions',
        reason: 'Fair weather for outdoor activities',
        color: '#FF9800'
    };
    };

export const convertTemperature = (tempF, unit) => {
    if (unit === 'C') {
        return Math.round((tempF - 32) * 5/9);
    }
    return Math.round(tempF);
};

export const getTemperatureDisplay = (temp, unit) => {
    const convertedTemp = convertTemperature(temp, unit);
    return `${convertedTemp}°${unit}`;
};
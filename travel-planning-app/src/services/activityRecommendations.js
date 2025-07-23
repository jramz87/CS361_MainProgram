// weather-based activity recommendations, 
// TODO: figure out how to integrate with weather display

export const getActivityRecommendations = (weatherData) => {
    const { temp, conditions, windspeed, uvindex } = weatherData;
    
    const lowerConditions = conditions?.toLowerCase() || '';
    
    // check for bad weather conditions
    const isBadWeather = lowerConditions.includes('rain') || 
                        lowerConditions.includes('storm') || 
                        lowerConditions.includes('snow');
    
    const isVeryWindy = windspeed > 25;
    const isVeryHot = temp > 95;
    const isVeryCold = temp < 25;
    const isHighUV = uvindex > 8;

    // decision logic - probably could use a lookup table ?
    if (isBadWeather) {
        return {
            recommendation: 'stay-indoors',
            message: 'Stay indoors',
            reason: 'Poor weather conditions',
            color: '#F57C00'
        };
    }

    if (isVeryWindy) {
        return {
            recommendation: 'stay-indoors',
            message: 'Stay indoors', 
            reason: 'Very windy',
            color: '#F57C00'
        };
    }

    if (isVeryHot) {
        return {
            recommendation: 'limited-outdoor',
            message: 'Limited outdoor time',
            reason: 'Extreme heat - stay hydrated',
            color: '#FF5722'
        };
    }

    if (isVeryCold) {
        return {
            recommendation: 'limited-outdoor',
            message: 'Limited outdoor time',
            reason: 'Extreme cold - dress warmly',
            color: '#2196F3'
        };
    }

    if (temp >= 70 && temp <= 85 && !isHighUV) {
        return {
            recommendation: 'perfect-outdoor',
            message: 'Perfect for outdoor activities',
            reason: 'Ideal conditions',
            color: '#4CAF50'
        };
    }

    if (temp >= 60 && temp <= 90) {
        return {
            recommendation: 'good-outdoor',
            message: 'Great for outdoor activities',
            reason: isHighUV ? 'Good weather - use sun protection' : 'Good conditions',
            color: '#4CAF50'
        };
    }

    // default case
    return {
        recommendation: 'moderate-outdoor',
        message: 'Moderate outdoor conditions',
        reason: 'Fair weather',
        color: '#FF9800'
    };
};

// temp conversion utilities
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
export class GenAIRecommendationService {
    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY;
        this.baseUrl = 'https://api.openai.com/v1/chat/completions';
    }

    async getAIRecommendations(weatherData, userPreferences = {}) {
        if (!this.apiKey) {
            throw new Error('AI_API_NOT_CONFIGURED');
        }

        try {
            const prompt = this.buildPrompt(weatherData, userPreferences);
            
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: this.getSystemPrompt(userPreferences.explorationType)
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 1000,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                if (response.status === 429) {
                    throw new Error('AI_RATE_LIMIT_EXCEEDED');
                } else if (response.status === 401) {
                    throw new Error('AI_API_AUTH_ERROR');
                }
                throw new Error(`AI_API_ERROR_${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.choices[0]?.message?.content;

            if (!aiResponse) {
                throw new Error('AI_EMPTY_RESPONSE');
            }

            return this.parseAIResponse(aiResponse, weatherData, userPreferences.explorationType);

        } catch (error) {
            console.error('GenAI API Error:', error);
            throw error;
        }
    }

    getSystemPrompt(explorationType) {
        if (explorationType === 'destination-overview') {
            return `You are a knowledgeable travel guide specializing in destination overviews. Provide engaging, practical information about destinations including top attractions, activities, local culture, food, neighborhoods, seasonal considerations, transportation tips, and budget-friendly options. Keep responses informative but concise. Write in a friendly, enthusiastic tone that inspires travel.`;
        }

        // Default system prompt for complex itinerary planning
        return `You are an expert travel advisor and activity recommendation specialist. Provide detailed, practical, and personalized recommendations that consider weather conditions, client preferences, budget, and group dynamics. Always prioritize safety and cultural sensitivity in your suggestions.`;
    }

    buildPrompt(weatherData, userPreferences) {
        const { location, days } = weatherData;
        const { timeOfYear, explorationType } = userPreferences;

        // Simple destination exploration
        if (explorationType === 'destination-overview') {
            let prompt = `Tell me about visiting ${location}`;
            
            if (timeOfYear) {
                prompt += ` in ${timeOfYear}`;
            }
            
            prompt += `.\n\nI'd like to know:\n`;
            prompt += `- What are the top attractions and must-see places?\n`;
            prompt += `- What activities and experiences should I consider?\n`;
            prompt += `- What's the local culture and food scene like?\n`;
            prompt += `- What are the best areas/neighborhoods to explore?\n`;
            
            if (timeOfYear) {
                prompt += `- What's special about visiting in ${timeOfYear}?\n`;
                prompt += `- What's the weather typically like in ${timeOfYear}?\n`;
            }
            
            prompt += `- Any local customs or etiquette I should know?\n`;
            prompt += `- Transportation and getting around tips?\n`;
            prompt += `- Budget-friendly recommendations?\n`;
            prompt += `- Any hidden gems or local favorites?\n\n`;
            
            prompt += `Please provide a comprehensive but engaging overview that would help someone plan their visit. Write in a conversational, enthusiastic tone.`;
            
            return prompt;
        }

        // Complex itinerary planning (for future use)
        return this.buildDetailedPrompt(weatherData, userPreferences);
    }

    buildDetailedPrompt(weatherData, userPreferences) {
        const { location, days } = weatherData;
        const { 
            activityTypes = [],
            groupSize = 'solo',
            budget = 'medium',
            tripType = 'leisure',
            clientPreferences,
            additionalNotes
        } = userPreferences;

        let prompt = `I'm planning a ${tripType} trip to ${location}.\n\n`;

        // Weather information
        if (days && days.length > 0) {
            prompt += `Weather forecast:\n`;
            days.forEach((day, index) => {
                prompt += `Day ${index + 1} (${day.date}): ${day.temp}°F, ${day.conditions}`;
                if (day.humidity) prompt += `, ${day.humidity}% humidity`;
                if (day.windspeed) prompt += `, ${day.windspeed} mph wind`;
                prompt += '\n';
            });
            prompt += '\n';
        }

        // Client information (only if provided)
        const hasPreferences = groupSize !== 'solo' || budget !== 'medium' || 
                                activityTypes.length > 0 || clientPreferences || additionalNotes;
        
        if (hasPreferences) {
            prompt += `Preferences:\n`;
            if (groupSize !== 'solo') prompt += `- Group size: ${groupSize}\n`;
            if (budget !== 'medium') prompt += `- Budget level: ${budget}\n`;
            if (activityTypes.length > 0) prompt += `- Preferred activities: ${activityTypes.join(', ')}\n`;
            if (clientPreferences) prompt += `- Client notes: ${clientPreferences}\n`;
            if (additionalNotes) prompt += `- Trip notes: ${additionalNotes}\n`;
            prompt += '\n';
        }

        // Request structure for detailed planning
        if (days && days.length > 0) {
            prompt += `Please provide specific recommendations for each day including activities, dining, and weather considerations.

Format as JSON:
{
    "days": [
        {
        "dayNumber": 1,
        "date": "date",
        "overallRecommendation": "brief summary",
        "morningActivities": ["activity 1", "activity 2"],
        "afternoonActivities": ["activity 1", "activity 2"],
        "eveningActivities": ["activity 1", "activity 2"],
        "diningRecommendations": ["restaurant 1", "restaurant 2"]
        }
    ],
    "generalTips": ["tip 1", "tip 2"]
}`;
        } else {
            prompt += `Please provide destination recommendations including attractions, activities, dining, and cultural experiences.`;
        }

        return prompt;
    }

    parseAIResponse(aiResponse, weatherData, explorationType) {
        // For simple destination exploration, return the raw response
        if (explorationType === 'destination-overview') {
            return {
                success: true,
                recommendations: {
                    generalTips: this.extractKeyPoints(aiResponse),
                    destinationOverview: true
                },
                rawResponse: aiResponse
            };
        }

        // For complex planning, try to parse JSON
        try {
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                return {
                    success: true,
                    recommendations: parsed,
                    rawResponse: aiResponse
                };
            } else {
                return {
                    success: true,
                    recommendations: this.parseTextResponse(aiResponse, weatherData),
                    rawResponse: aiResponse
                };
            }
        } catch (error) {
            console.error('Failed to parse AI response:', error);
            return {
                success: false,
                recommendations: this.getFallbackRecommendations(weatherData),
                rawResponse: aiResponse,
                error: 'Failed to parse AI response'
            };
        }
    }

    extractKeyPoints(response) {
        // Extract key bullet points or highlights from the response
        const lines = response.split('\n');
        const highlights = [];
        
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
                highlights.push(trimmed.substring(1).trim());
            } else if (trimmed.includes('must') || trimmed.includes('popular') || trimmed.includes('best')) {
                highlights.push(trimmed);
            }
        }
        
        // If no highlights found, create some from the first few sentences
        if (highlights.length === 0) {
            const sentences = response.split('.').slice(0, 5);
            return sentences.map(s => s.trim()).filter(s => s.length > 10);
        }
        
        return highlights.slice(0, 8); // Limit to 8 key points
    }

    parseTextResponse(textResponse, weatherData) {
        const { days } = weatherData;
        
        return {
            days: days?.map((day, index) => ({
                dayNumber: index + 1,
                date: day.date,
                overallRecommendation: `See full AI response for details`,
                morningActivities: ['Check complete response'],
                afternoonActivities: ['View full recommendations'],
                eveningActivities: ['See AI response'],
                diningRecommendations: ['Restaurant suggestions available']
            })) || [],
            generalTips: ['Check the detailed AI response for recommendations'],
            textResponse: textResponse
        };
    }

    getFallbackRecommendations(weatherData) {
        const { location } = weatherData;
        
        return {
            generalTips: [
                `Explore the top attractions in ${location}`,
                'Try local cuisine and specialties',
                'Visit popular neighborhoods',
                'Consider guided tours for cultural insights',
                'Check local events and festivals'
            ],
            fallback: true
        };
    }
}

export default GenAIRecommendationService;
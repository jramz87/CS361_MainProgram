// AI recommendation service
// handles OpenAI API calls and response parsing

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
            console.log('ai api error:', error);
            throw error;
        }
    }

    getSystemPrompt(explorationType) {
        if (explorationType === 'destination-overview') {
            return `From the perspective of a travel guide, give practical info about destinations, including top attractions, activities, culture, food, neighborhoods, transportation, and budget tips. Sound travel inspiring but concise.`;
        }

        // default for detailed planning
        return `From the perspective of a travel guide: give detailed, practical recommendations considering weather, preferences, budget, and group needs. Prioritize safety and cultural sensitivity.`;
    }

    buildPrompt(weatherData, userPreferences) {
        const { location, days } = weatherData;
        const { timeOfYear, explorationType } = userPreferences;

        // simple destination exploration, on activites page
        if (explorationType === 'destination-overview') {
            let prompt = `Tell me about visiting ${location}`;
            
            if (timeOfYear) {
                prompt += ` in ${timeOfYear}`;
            }
            
            prompt += `.\n\nI want to know:\n`;
            prompt += `/ Top attractions and must-see places\n`;
            prompt += `/ Activities and experiences\n`;
            prompt += `/ Local culture and food\n`;
            prompt += `/ Best local neighborhoods\n`;
            
            if (timeOfYear) {
                prompt += `/ What's special about ${timeOfYear}\n`;
                prompt += `/ Typical weather in ${timeOfYear}\n`;
            }
            
            prompt += `/ Local customs\n`;
            prompt += `/ Transportation tips\n`;
            prompt += `/ Budget options\n`;
            prompt += `/ Hidden gems\n\n`;
            
            prompt += `Give me an engaging overview thats written conversationally.`;
            
            return prompt;
        }

        // detailed itinerary planning, on itineraries page
        // TODO: this is still in progress, figure out how to integrate with itineraries
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

        let prompt = `Planning a ${tripType} trip to ${location}.\n\n`;

        // add weather forecast if available
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

        // client preferences, from their saved profile
        const hasPreferences = groupSize !== 'solo' || budget !== 'medium' || 
                                activityTypes.length > 0 || clientPreferences || additionalNotes;
        
        if (hasPreferences) {
            prompt += `Trip details:\n`;
            if (groupSize !== 'solo') prompt += `- Group size: ${groupSize}\n`;
            if (budget !== 'medium') prompt += `- Budget level: ${budget}\n`;
            if (activityTypes.length > 0) prompt += `- Preferred activities: ${activityTypes.join(', ')}\n`;
            if (clientPreferences) prompt += `- Client notes: ${clientPreferences}\n`;
            if (additionalNotes) prompt += `- Additional notes: ${additionalNotes}\n`;
            prompt += '\n';
        }

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

        return prompt; // prompt feed to the OpenAI api for activity recommendations in itineraries page
    }

    parseAIResponse(aiResponse, weatherData, explorationType) {
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

        // try to parse as JSON for detailed planning
        try {
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);  // parse via regex
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
            console.log('failed to parse ai response:', error);
            return {
                success: false,
                recommendations: this.getFallbackRecommendations(weatherData),
                rawResponse: aiResponse,
                error: 'Failed to parse response'
            };
        }
    }

    extractKeyPoints(response) {
        // extract bullet points and key info from response
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
        
        // fallback - use first few sentences if no bullets found
        if (highlights.length === 0) {
            const sentences = response.split('.').slice(0, 5);
            return sentences.map(s => s.trim()).filter(s => s.length > 10);
        }
        
        return highlights.slice(0, 8); // limit to 8 'key points'
    }

    parseTextResponse(textResponse, weatherData) {
        const { days } = weatherData;
        
        return {
            days: days?.map((day, index) => ({
                dayNumber: index + 1,
                date: day.date,
                overallRecommendation: `See full AI response for details`,
                morningActivities: ['Check complete recommendations'],
                afternoonActivities: ['View full AI response'],
                eveningActivities: ['See detailed suggestions'],
                diningRecommendations: ['Restaurant recommendations available']
            })) || [],
            generalTips: ['Check the detailed AI response for recommendations'],
            textResponse: textResponse
        };
    }

    getFallbackRecommendations(weatherData) {
        const { location } = weatherData;
        
        return {
            generalTips: [
                `Explore top attractions in ${location}`,
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
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import rateLimit from 'express-rate-limit';
import { GenAIRecommendationService } from './services/genAIRecommendations.js';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://cs361mainprogram-production.up.railway.app/',
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rate limiting - more lenient for production
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 200 : 100, // Higher limit in production
    message: { error: 'Rate limit exceeded. Please try again later.' }
});
app.use('/api/', limiter);

// Weather API configuration
const VISUAL_CROSSING_API_KEY = process.env.VISUAL_CROSSING_API_KEY;
const WEATHER_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

// Initialize GenAI service
const genAIService = new GenAIRecommendationService();

// Health check with detailed status
app.get('/health', (req, res) => {
    const status = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        services: {
            weather: !!VISUAL_CROSSING_API_KEY ? 'Available' : 'Not configured',
            ai: !!process.env.OPENAI_API_KEY ? 'Available' : 'Not configured'
        },
        cors: {
            allowedOrigins: [
                'http://localhost:3000',
                'https://cs361mainprogram-production.up.railway.app/',
                process.env.FRONTEND_URL
            ].filter(Boolean)
        }
    };
    res.json(status);
});

app.use(express.static(path.join(__dirname, '../travel-planning-app/build')));

app.get('*', (req, res) => {
  // Don't serve index.html for API routes
    if (req.path.startsWith('/api/') || req.path.startsWith('/health')) {
        return res.status(404).json({ 
        error: 'API route not found',
        message: `Route ${req.method} ${req.originalUrl} not found`
        });
    }
    
    res.sendFile(path.join(__dirname, '../travel-planning-app/build/index.html'));
});

// Weather forecast endpoint with better error handling
app.get('/api/weather/forecast', async (req, res) => {
    try {
        const { location, startDate, endDate } = req.query;
        
        if (!location || !startDate || !endDate) {
            return res.status(400).json({ 
                error: 'Missing required parameters: location, startDate, endDate' 
            });
        }

        if (!VISUAL_CROSSING_API_KEY) {
            console.error('Visual Crossing API key not configured');
            return res.status(500).json({ 
                error: 'Weather service not configured' 
            });
        }

        const url = `${WEATHER_BASE_URL}/${encodeURIComponent(location)}/${startDate}/${endDate}`;
        
        const params = {
            key: VISUAL_CROSSING_API_KEY,
            unitGroup: 'us',
            include: 'days',
            elements: 'datetime,tempmax,tempmin,temp,conditions,description,humidity,windspeed,visibility,uvindex,icon'
        };

        console.log(`Fetching weather for: ${location} (${startDate} to ${endDate})`);

        // Add timeout and better error handling
        const response = await axios.get(url, { 
            params,
            timeout: 10000, // 10 second timeout
            headers: {
                'User-Agent': 'Weather-App/1.0',
                'Accept': 'application/json'
            }
        });
        
        // Transform data for frontend
        const transformedData = {
            ...response.data,
            days: response.data.days?.map(day => ({
                date: day.datetime,
                temp: day.temp,
                tempmax: day.tempmax,
                tempmin: day.tempmin,
                conditions: day.conditions,
                description: day.description,
                humidity: day.humidity,
                windspeed: day.windspeed,
                visibility: day.visibility,
                uvindex: day.uvindex,
                icon: day.icon
            }))
        };

        console.log(`Weather data fetched successfully for ${location}`);
        res.json(transformedData);

    } catch (error) {
        console.error('Weather API Error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            url: error.config?.url
        });
        
        if (error.code === 'ECONNABORTED') {
            return res.status(408).json({ error: 'Weather service timeout. Please try again.' });
        }
        
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 401:
                    return res.status(500).json({ error: 'Weather service authentication failed' });
                case 429:
                    return res.status(429).json({ error: 'Weather service rate limit exceeded. Please try again later.' });
                case 400:
                    return res.status(400).json({ error: 'Invalid location or date parameters' });
                //case 404:
                //    return res.status(404).json({ error: 'Location not found. Please check the location name.' });
                default:
                    return res.status(500).json({ error: `Weather service error (${status})` });
            }
        }

        if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
            return res.status(503).json({ error: 'Weather service is temporarily unavailable' });
        }

        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

// Current weather endpoint
app.get('/api/weather/current', async (req, res) => {
    try {
        const { location } = req.query;
        
        if (!location) {
            return res.status(400).json({ error: 'Location parameter is required' });
        }

        const url = `${WEATHER_BASE_URL}/${encodeURIComponent(location)}/today`;
        
        const params = {
            key: VISUAL_CROSSING_API_KEY,
            unitGroup: 'us',
            include: 'current',
            elements: 'datetime,temp,conditions,description,humidity,windspeed,visibility,uvindex,icon'
        };

        const response = await axios.get(url, { 
            params,
            timeout: 10000,
            headers: {
                'User-Agent': 'Weather-App/1.0',
                'Accept': 'application/json'
            }
        });
        
        res.json(response.data);

    } catch (error) {
        console.error('Current Weather Error:', error.message);
        res.status(500).json({ error: 'Unable to fetch current weather' });
    }
});

// AI Recommendations endpoint (for complex weather-based itineraries)
app.post('/api/weather/ai-recommendations', async (req, res) => {
    try {
        const { weatherData, userPreferences } = req.body;
        
        if (!weatherData) {
            return res.status(400).json({ 
                error: 'Weather data is required',
                message: 'Please provide weather data'
            });
        }

        const result = await genAIService.getAIRecommendations(weatherData, userPreferences);
        
        res.json({
            success: true,
            data: result,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('AI Recommendations Error:', error.message);
        
        // Handle specific AI API errors
        switch (error.message) {
            case 'AI_API_NOT_CONFIGURED':
                return res.status(500).json({
                    error: 'AI service not configured',
                    message: 'AI recommendation service is not available'
                });
            
            case 'AI_RATE_LIMIT_EXCEEDED':
                return res.status(429).json({
                    error: 'AI rate limit exceeded',
                    message: 'Too many AI requests. Please try again later.'
                });
            
            case 'AI_API_AUTH_ERROR':
                return res.status(500).json({
                    error: 'AI service authentication failed',
                    message: 'AI service is temporarily unavailable'
                });
            
            default:
                // Provide fallback recommendations
                try {
                    const fallbackResult = genAIService.getFallbackRecommendations(req.body.weatherData);
                    return res.json({
                        success: true,
                        data: {
                            success: false,
                            recommendations: fallbackResult,
                            fallback: true,
                            error: 'AI service unavailable, showing basic recommendations'
                        },
                        timestamp: new Date().toISOString()
                    });
                } catch (fallbackError) {
                    return res.status(500).json({
                        error: 'Unable to generate recommendations',
                        message: 'Both AI and fallback services failed'
                    });
                }
        }
    }
});

// Destination Exploration endpoint (for simple destination exploration)
app.post('/api/explore-destination', async (req, res) => {
    try {
        const { destination, timeOfYear } = req.body;
        
        if (!destination) {
            return res.status(400).json({ 
                error: 'Destination is required',
                message: 'Please provide a destination to explore'
            });
        }

        console.log(`Exploring destination: ${destination}${timeOfYear ? ` in ${timeOfYear}` : ''}`);

        // Create exploration data
        const explorationData = {
            location: destination,
            days: [] // Empty for general destination exploration
        };

        const explorationPreferences = {
            timeOfYear: timeOfYear,
            explorationType: 'destination-overview'
        };

        const result = await genAIService.getAIRecommendations(explorationData, explorationPreferences);
        
        console.log(`Destination exploration completed for ${destination}`);
        
        res.json({
            success: true,
            data: result,
            timestamp: new Date().toISOString(),
            destination: destination,
            timeOfYear: timeOfYear || null
        });

    } catch (error) {
        console.error('Destination Exploration Error:', error.message);
        
        // Handle specific AI API errors
        switch (error.message) {
            case 'AI_API_NOT_CONFIGURED':
                return res.status(500).json({
                    error: 'AI service not configured',
                    message: 'AI exploration service is not available'
                });
            
            case 'AI_RATE_LIMIT_EXCEEDED':
                return res.status(429).json({
                    error: 'AI rate limit exceeded',
                    message: 'Too many requests. Please try again later.'
                });
            
            case 'AI_API_AUTH_ERROR':
                return res.status(500).json({
                    error: 'AI service authentication failed',
                    message: 'AI service is temporarily unavailable'
                });
            
            default:
                // Provide fallback recommendations
                return res.json({
                    success: true,
                    data: {
                        success: false,
                        recommendations: {
                            generalTips: [
                                `${req.body.destination} is a wonderful destination to explore`,
                                'Visit popular attractions and landmarks',
                                'Try local cuisine and specialties',
                                'Explore different neighborhoods',
                                'Consider guided tours for cultural insights'
                            ],
                            fallback: true
                        },
                        rawResponse: `AI service temporarily unavailable. ${req.body.destination} offers many attractions, cultural experiences, and local cuisine worth exploring.`,
                        error: 'AI service unavailable, showing basic recommendations'
                    },
                    timestamp: new Date().toISOString(),
                    destination: req.body.destination,
                    timeOfYear: req.body.timeOfYear || null
                });
        }
    }
});

// Mock clients endpoint (replace with actual database later)
let clients = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        budget: '3500-4500',
        activities: ['Beach and water', 'Adventure activities'],
        preferences: 'Loves outdoor activities and trying local cuisine',
        departureCity: 'Oklahoma City (OKC)'
    },
    {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@email.com',
        budget: '5000-6500',
        activities: ['Arts and theater', 'Food Tour'],
        preferences: 'Interested in cultural experiences and fine dining',
        departureCity: 'Dallas (DFW)'
    }
];

// Clients CRUD endpoints
app.get('/api/clients', (req, res) => {
    res.json(clients);
});

app.get('/api/clients/:id', (req, res) => {
    const client = clients.find(c => c.id === req.params.id);
    if (!client) {
        return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
});

app.post('/api/clients', (req, res) => {
    const newClient = {
        id: Date.now().toString(),
        ...req.body
    };
    clients.push(newClient);
    res.status(201).json(newClient);
});

app.put('/api/clients/:id', (req, res) => {
    const index = clients.findIndex(c => c.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Client not found' });
    }
    clients[index] = { ...clients[index], ...req.body };
    res.json(clients[index]);
});

app.delete('/api/clients/:id', (req, res) => {
    const index = clients.findIndex(c => c.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Client not found' });
    }
    clients.splice(index, 1);
    res.json({ message: 'Client deleted' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        message: `Route ${req.method} ${req.originalUrl} not found`,
        availableRoutes: [
            'GET /health',
            'GET /api/weather/forecast',
            'GET /api/weather/current',
            'POST /api/weather/ai-recommendations',
            'POST /api/explore-destination',
            'GET /api/clients'
        ]
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global Error:', err.stack);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Weather API: ${VISUAL_CROSSING_API_KEY ? 'Configured' : 'Missing'}`);
    console.log(`OpenAI API: ${process.env.OPENAI_API_KEY ? 'Configured' : 'Missing'}`);
});
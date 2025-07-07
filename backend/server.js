// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500
});
app.use('/api/', limiter);

// Weather API configuration
const VISUAL_CROSSING_API_KEY = process.env.VISUAL_CROSSING_API_KEY;
const WEATHER_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

// GET /api/weather/forecast
app.get('/api/weather/forecast', async (req, res) => {
    try {
        const { location, startDate, endDate } = req.query;
        
        if (!location || !startDate || !endDate) {
        return res.status(400).json({ 
            error: 'Missing required parameters: location, startDate, endDate' 
        });
        }

        if (!VISUAL_CROSSING_API_KEY) {
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

        const response = await axios.get(url, { params });
        
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

        res.json(transformedData);

    } catch (error) {
        console.error('Weather API Error:', error.message);
        
        if (error.response) {
        const status = error.response.status;
        switch (status) {
            case 401:
            return res.status(500).json({ error: 'Weather service authentication failed' });
            case 429:
            return res.status(429).json({ error: 'Too many requests. Please try again later.' });
            case 400:
            return res.status(400).json({ error: 'Invalid location or date parameters' });
            default:
            return res.status(500).json({ error: 'Weather service error' });
        }
        }

        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

// GET /api/weather/current
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

    const response = await axios.get(url, { params });
    res.json(response.data);

    } catch (error) {
        console.error('Current Weather Error:', error.message);
        res.status(500).json({ error: 'Unable to fetch current weather' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
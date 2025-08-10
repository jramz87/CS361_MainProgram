import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

const clientsFile = './clients.json';
const itinerariesFile = './itineraries.json';

// Visual Crossing API key
const WEATHER_API_KEY = process.env.VISUAL_CROSSING_API_KEY;

// Get clients
app.get('/api/clients', (req, res) => {
    let data = fs.readFileSync(clientsFile, 'utf8');
    res.json(JSON.parse(data));
});

// Add a client
app.post('/api/clients', (req, res) => {
    let clients = JSON.parse(fs.readFileSync(clientsFile, 'utf8'));
    let newClient = req.body;
    newClient.id = Date.now().toString();
    clients.push(newClient);
    fs.writeFileSync(clientsFile, JSON.stringify(clients, null, 2));
    res.json(newClient);
});

// Update a client
app.put('/api/clients/:id', (req, res) => {
    let clients = JSON.parse(fs.readFileSync(clientsFile, 'utf8'));
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id === req.params.id) {
            clients[i] = { ...clients[i], ...req.body };
            fs.writeFileSync(clientsFile, JSON.stringify(clients, null, 2));
            return res.json(clients[i]);
        }
    }
    res.status(404).json({ error: 'Not found' });
});

// Delete a client  
app.delete('/api/clients/:id', (req, res) => {
    let clients = JSON.parse(fs.readFileSync(clientsFile, 'utf8'));
    clients = clients.filter(c => c.id !== req.params.id);
    fs.writeFileSync(clientsFile, JSON.stringify(clients, null, 2));
    res.json({ message: 'Deleted' });
});

// get itineraries
app.get('/api/itineraries', (req, res) => {
    let data = fs.readFileSync(itinerariesFile, 'utf8');
    res.json(JSON.parse(data));
});

// create an itinerary
app.post('/api/itineraries', (req, res) => {
    let itineraries = JSON.parse(fs.readFileSync(itinerariesFile, 'utf8'));
    let newItinerary = req.body;
    newItinerary.id = Date.now().toString();
    itineraries.push(newItinerary);
    fs.writeFileSync(itinerariesFile, JSON.stringify(itineraries, null, 2));
    res.json(newItinerary);
});

// edit an itinerary
app.put('/api/itineraries/:id', (req, res) => {
    let itineraries = JSON.parse(fs.readFileSync(itinerariesFile, 'utf8'));
    for (let i = 0; i < itineraries.length; i++) {
        if (itineraries[i].id === req.params.id) {
            itineraries[i] = { ...itineraries[i], ...req.body };
            fs.writeFileSync(itinerariesFile, JSON.stringify(itineraries, null, 2));
            return res.json(itineraries[i]);
        }
    }
    res.status(404).json({ error: 'Not found' });
});

// delete itinerary
app.delete('/api/itineraries/:id', (req, res) => {
    let itineraries = JSON.parse(fs.readFileSync(itinerariesFile, 'utf8'));
    itineraries = itineraries.filter(i => i.id !== req.params.id);
    fs.writeFileSync(itinerariesFile, JSON.stringify(itineraries, null, 2));
    res.json({ message: 'Deleted' });
});

// weather forecast
app.get('/api/weather/forecast', async (req, res) => {
    const { location, startDate, endDate } = req.query;
    
    if (!location || !startDate || !endDate) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?key=${WEATHER_API_KEY}&unitGroup=us&include=days&elements=datetime,tempmax,tempmin,temp,conditions,description,humidity`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            return res.status(500).json({ error: 'Weather API error' });
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.log('Weather error:', error);
        res.status(500).json({ error: 'Could not get weather' });
    }
});

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});
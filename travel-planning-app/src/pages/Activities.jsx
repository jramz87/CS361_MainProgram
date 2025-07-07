import { useState } from 'react';
import { getAIRecommendations } from '../services/genAIService';

export default function Activities() {
    const [destination, setDestination] = useState('');
    const [timeOfYear, setTimeOfYear] = useState('');
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const monthOptions = [
        { value: 'january', label: 'January' },
        { value: 'february', label: 'February' },
        { value: 'march', label: 'March' },
        { value: 'april', label: 'April' },
        { value: 'may', label: 'May' },
        { value: 'june', label: 'June' },
        { value: 'july', label: 'July' },
        { value: 'august', label: 'August' },
        { value: 'september', label: 'September' },
        { value: 'october', label: 'October' },
        { value: 'november', label: 'November' },
        { value: 'december', label: 'December' }
    ];

    const exploreActivities = async () => {
        if (!destination) {
            setError('Please enter a destination');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Create a simple weather-less request for destination exploration
            const explorationData = {
                location: destination,
                days: [] // Empty for general destination exploration
            };

            const explorationPreferences = {
                timeOfYear: timeOfYear,
                explorationType: 'destination-overview',
                interests: ['general exploration', 'popular attractions', 'local culture']
            };

            const result = await getAIRecommendations(explorationData, explorationPreferences);
            setRecommendations(result);

        } catch (err) {
            setError('Failed to get activity suggestions: ' + err.message);
            console.error('Activity exploration error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            exploreActivities();
        }
    };

    return (
        <div className="p-6" style={{ backgroundColor: '#FDFCDC', minHeight: '100vh' }}>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6" style={{ color: '#0081A7' }}>
                    Activity Suggestions
                </h1>
                <p className="mb-8" style={{ color: '#F07167' }}>
                    Explore activities and attractions for any destination. Get AI-powered suggestions for what to do and see.
                </p>

                {/* Simple Exploration Form */}
                <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: '#FFF', border: '1px solid #00AFB9' }}>
                    <h2 className="text-xl font-bold mb-4" style={{ color: '#0081A7' }}>
                        Explore a Destination
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                                Destination *
                            </label>
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="e.g., Paris, Tokyo, New York City, Bali..."
                                className="w-full p-3 rounded-md border"
                                style={{ 
                                    backgroundColor: '#FDFCDC',
                                    borderColor: '#00AFB9',
                                    color: '#0081A7'
                                }}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                                Time of Year (Optional)
                            </label>
                            <select
                                value={timeOfYear}
                                onChange={(e) => setTimeOfYear(e.target.value)}
                                className="w-full p-3 rounded-md border"
                                style={{ 
                                    backgroundColor: '#FDFCDC',
                                    borderColor: '#00AFB9',
                                    color: '#0081A7'
                                }}
                            >
                                <option value="">Any time</option>
                                {monthOptions.map(month => (
                                    <option key={month.value} value={month.value}>
                                        {month.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={exploreActivities}
                        disabled={!destination || loading}
                        className="w-full md:w-auto px-8 py-3 rounded-md text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#00AFB9' }}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                Exploring...
                            </>
                        ) : (
                            'Explore Activities'
                        )}
                    </button>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FFF3CD', border: '1px solid #FFE082' }}>
                        <p style={{ color: '#F57C00' }}>
                            ⚠️ {error}
                        </p>
                    </div>
                )}

                {/* Recommendations Display */}
                {recommendations && (
                    <div className="space-y-6">
                        {/* Main Recommendations */}
                        <div className="p-6 rounded-lg" style={{ backgroundColor: '#FFF', border: '1px solid #00AFB9' }}>
                            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0081A7' }}>
                                Activities in {destination}
                                {timeOfYear && <span className="text-lg font-normal"> • {timeOfYear.charAt(0).toUpperCase() + timeOfYear.slice(1)}</span>}
                            </h2>
                            
                            {/* General Tips */}
                            {recommendations.recommendations?.generalTips && (
                                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#E8F5E8' }}>
                                    <h3 className="font-bold mb-3" style={{ color: '#2E7D32' }}>
                                        Top Recommendations
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {recommendations.recommendations.generalTips.map((tip, index) => (
                                            <div key={index} className="text-sm" style={{ color: '#2E7D32' }}>
                                                • {tip}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Raw AI Response for Destination Exploration */}
                            {recommendations.rawResponse && (
                                <div className="prose max-w-none">
                                    <div className="text-sm whitespace-pre-wrap" style={{ color: '#0081A7', lineHeight: '1.6' }}>
                                        {recommendations.rawResponse}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Itinerary Creation Suggestion */}
                        <div className="p-6 rounded-lg" style={{ backgroundColor: '#FFF3E0', border: '2px solid #FF9800' }}>
                            <div className="flex items-start">
                                <div>
                                    <h3 className="text-xl font-bold mb-2" style={{ color: '#F57C00' }}>
                                        Want a Detailed Itinerary?
                                    </h3>
                                    <p className="mb-4" style={{ color: '#F57C00' }}>
                                        For personalized day-by-day recommendations based on specific client preferences, weather forecasts, and travel dates, create a custom itinerary.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* API Usage Info */}
                        <div className="p-4 rounded-lg text-center" style={{ backgroundColor: '#F8F9FA', border: '1px solid #dee2e6' }}>
                            <p className="text-sm" style={{ color: '#6c757d' }}>
                                💡 This exploration uses 1 AI query. More detailed itineraries with weather data use additional queries.
                            </p>
                        </div>
                    </div>
                )}

                {/* Getting Started Helper */}
                {!recommendations && !loading && !error && (
                    <div className="p-6 rounded-lg text-center" style={{ backgroundColor: '#E3F2FD', border: '1px solid #2196F3' }}>
                        <div className="text-6xl mb-4">🗺️</div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: '#1976D2' }}>
                            Discover What to Do Anywhere
                        </h3>
                        <p style={{ color: '#1976D2' }}>
                            Enter any destination to get AI-powered activity suggestions. Perfect for initial trip planning and client discussions.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
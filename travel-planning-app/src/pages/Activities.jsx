// activities page

import { useState } from 'react';
import { exploreDestination } from '../services/activityAPI';

export default function Activities() {
    const [destination, setDestination] = useState('');
    const [timeOfYear, setTimeOfYear] = useState('');
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // move this?
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
            const explorationData = {
                location: destination
            };

            const explorationPreferences = {
                timeOfYear: timeOfYear
            };

            const result = await exploreDestination(explorationData, explorationPreferences);
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

    return (  // using tailwind components below
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6" style={{ color: '#0081A7' }}>
                Activity Suggestions
            </h1>
            
            {/* API Usage Notice */}
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: '#FED9B7', borderColor: '#F07167' }}>
                <div className="flex items-center mb-2">
                    <span className="font-medium text-sm" style={{ color: '#0081A7' }}>
                        API Usage Notice
                    </span>
                </div>
                <p className="text-xs" style={{ color: '#0081A7' }}>
                    Each destination exploration uses 1 AI query (~60 free queries per day). Please allow up to 30 seconds for a response to be generated.
                </p>
            </div>

            {/* Main Form */}
            <div className="mb-6 p-6 rounded-lg" style={{ backgroundColor: '#FDFCDC' }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                            Destination
                        </label>
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter city or location"
                            className="w-full p-3 rounded-md border"
                            style={{ borderColor: '#00AFB9' }}
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
                            style={{ borderColor: '#00AFB9' }}
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
                
                <div className="mt-4">
                    <button
                        onClick={exploreActivities}
                        disabled={!destination || loading}
                        className="px-6 py-2 rounded-md text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
            </div>

            {/* Error Display */}
            {error && (
                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FED9B7', border: '1px solid #F07167' }}>
                    <p style={{ color: '#0081A7' }}>
                        {error}
                    </p>
                </div>
            )}

            {/* Results Display */}
            {recommendations && (
                <div className="p-6 rounded-lg" style={{ backgroundColor: '#FDFCDC' }}>
                    <h3 className="text-xl font-bold mb-4" style={{ color: '#0081A7' }}>
                        Activities in {destination}
                        {timeOfYear && <span className="text-lg font-normal"> • {timeOfYear.charAt(0).toUpperCase() + timeOfYear.slice(1)}</span>}
                    </h3>
                    
                    {/* General Tips */}
                    {recommendations.recommendations?.generalTips && (
                        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FED9B7', border: '1px solid #00AFB9' }}>
                            <h4 className="font-bold mb-3" style={{ color: '#0081A7' }}>
                                Top Recommendations
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {recommendations.recommendations.generalTips.map((tip, index) => (
                                    <div key={index} className="text-sm" style={{ color: '#0081A7' }}>
                                        • {tip}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Raw AI Response */}
                    {recommendations.rawResponse && (
                        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FED9B7', border: '1px solid #00AFB9' }}>
                            <h4 className="font-medium mb-2" style={{ color: '#0081A7' }}>
                                Detailed Recommendations
                            </h4>
                            <div className="text-sm whitespace-pre-wrap" style={{ color: '#0081A7', lineHeight: '1.6' }}>
                                {recommendations.rawResponse}
                            </div>
                        </div>
                    )}

                    {/* Itinerary Suggestion */}
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#FED9B7', border: '1px solid #00AFB9' }}>
                        <h4 className="font-bold mb-2" style={{ color: '#0081A7' }}>
                            Want a Detailed Itinerary?
                        </h4>
                        <p className="text-sm" style={{ color: '#0081A7' }}>
                            For personalized day-by-day recommndations based on specific client preferences, weather forecasts, and travel dates, create a custom itinerary in the planning section.
                        </p>
                    </div>
                </div>
            )}

            {/* Getting Started */}
            {!recommendations && !loading && !error && (
                <div className="p-6 rounded-lg text-center" style={{ backgroundColor: '#FDFCDC' }}>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#0081A7' }}>
                        Discover What to Do Anywhere
                    </h3>
                    <p style={{ color: '#F07167' }}>
                        Enter any destination to get activity suggestions. Perfect for initial trip planning and client discussions.
                    </p>
                </div>
            )}
        </div>
    );
}
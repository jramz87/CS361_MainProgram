import { useState } from 'react';

export default function ShareTrips() {
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [clientEmail, setClientEmail] = useState('');
    const [customMessage, setCustomMessage] = useState('');
    const [isSharing, setIsSharing] = useState(false);
    const [shareSuccess, setShareSuccess] = useState(false);

    // Mock saved itineraries
    const savedItineraries = [
        {
            id: '1',
            title: 'Paris Romantic Getaway',
            destination: 'Paris, France',
            dates: 'July 15-20, 2025',
            client: 'John & Sarah Doe',
            days: 5,
            status: 'completed',
            highlights: ['Eiffel Tower Visit', 'Seine River Cruise', 'Louvre Museum', 'Montmartre Walking Tour']
        },
        {
            id: '2',
            title: 'Tokyo Adventure',
            destination: 'Tokyo, Japan',
            dates: 'August 10-17, 2025',
            client: 'Jane Smith',
            days: 7,
            status: 'completed',
            highlights: ['Shibuya Crossing', 'Traditional Tea Ceremony', 'Mount Fuji Day Trip', 'Tsukiji Fish Market']
        },
        {
            id: '3',
            title: 'Bali Wellness Retreat',
            destination: 'Bali, Indonesia',
            dates: 'September 5-12, 2025',
            client: 'Michael Johnson',
            days: 7,
            status: 'draft',
            highlights: ['Yoga Sessions', 'Rice Terrace Tours', 'Temple Visits', 'Spa Treatments']
        }
    ];

    const handleEmailShare = async () => {
        if (!selectedItinerary) {
            alert('Please select an itinerary to share');
            return;
        }

        if (!clientEmail) {
            alert('Please enter client email address');
            return;
        }

        setIsSharing(true);
        
        // Simulate email sending
        setTimeout(() => {
            setIsSharing(false);
            setShareSuccess(true);
            
            // Reset form after success
            setTimeout(() => {
                setShareSuccess(false);
                setSelectedItinerary(null);
                setClientEmail('');
                setCustomMessage('');
            }, 3000);
        }, 2000);
    };

    const getStatusColor = (status) => {
        return status === 'completed' ? '#00AFB9' : '#F07167';
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold" style={{ color: '#0081A7' }}>
                        Share Trips
                    </h1>
                    <p className="mt-2 text-lg" style={{ color: '#F07167' }}>
                        Select a completed itinerary and send it directly to your client's email with a personal message.
                    </p>
                </div>
            </div>

            <div className="mb-6 p-6 rounded-lg" style={{ backgroundColor: '#FDFCDC' }}>
                
                {/* Itinerary Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-3" style={{ color: '#0081A7' }}>
                        Choose Itinerary to Share
                    </label>
                    <div className="space-y-3">
                        {savedItineraries.map((itinerary) => (
                            <div 
                                key={itinerary.id}
                                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                    selectedItinerary?.id === itinerary.id ? 'ring-2' : ''
                                }`}
                                style={{ 
                                    backgroundColor: selectedItinerary?.id === itinerary.id ? '#FED9B7' : '#FDFCDC',
                                    borderColor: '#00AFB9',
                                    ringColor: selectedItinerary?.id === itinerary.id ? '#00AFB9' : 'transparent'
                                }}
                                onClick={() => setSelectedItinerary(itinerary)}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold" style={{ color: '#0081A7' }}>
                                        {itinerary.title}
                                    </h3>
                                    <span 
                                        className="px-2 py-1 rounded text-xs font-medium text-white"
                                        style={{ backgroundColor: getStatusColor(itinerary.status) }}
                                    >
                                        {itinerary.status.charAt(0).toUpperCase() + itinerary.status.slice(1)}
                                    </span>
                                </div>
                                <div className="text-sm" style={{ color: '#0081A7' }}>
                                    {itinerary.destination} • {itinerary.dates} • {itinerary.days} days
                                </div>
                                <div className="text-xs mt-1" style={{ color: '#0081A7', opacity: 0.7 }}>
                                    Client: {itinerary.client}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Email Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                            Client Email Address *
                        </label>
                        <input
                            type="email"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            placeholder="client@example.com"
                            className="w-full p-3 rounded-md border"
                            style={{ borderColor: '#00AFB9' }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                            Custom Message (Optional)
                        </label>
                        <textarea
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            rows={3}
                            placeholder="Add a personal message..."
                            className="w-full p-3 rounded-md border"
                            style={{ borderColor: '#00AFB9' }}
                        />
                    </div>
                </div>

                {/* Send Button */}
                <div className="mt-6">
                    <button
                        onClick={handleEmailShare}
                        disabled={!selectedItinerary || !clientEmail || isSharing}
                        className="px-6 py-3 rounded-md text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#00AFB9' }}
                    >
                        {isSharing ? (
                            <>
                                <div className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                Sending Email...
                            </>
                        ) : (
                            'Send Itinerary via Email'
                        )}
                    </button>
                </div>
            </div>

            {/* Success Message */}
            {shareSuccess && (
                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FED9B7', border: '1px solid #00AFB9' }}>
                    <div className="flex items-center">
                        <span className="text-2xl mr-3">✅</span>
                        <div>
                            <h3 className="font-bold" style={{ color: '#0081A7' }}>
                                Email Sent Successfully!
                            </h3>
                            <p className="text-sm" style={{ color: '#0081A7' }}>
                                Your itinerary has been sent to {clientEmail}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Section */}
            {selectedItinerary && (
                <div className="p-6 rounded-lg" style={{ backgroundColor: '#FDFCDC' }}>
                    <h2 className="text-xl font-bold mb-4" style={{ color: '#0081A7' }}>
                        Email Preview
                    </h2>
                    
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#FED9B7', border: '1px solid #00AFB9' }}>
                        <h3 className="font-bold mb-3" style={{ color: '#0081A7' }}>
                            Subject: Your {selectedItinerary.title} Itinerary
                        </h3>
                        
                        <div className="text-sm space-y-2" style={{ color: '#0081A7' }}>
                            <p>Dear {selectedItinerary.client.split(' ')[0]},</p>
                            
                            {customMessage && (
                                <p className="italic">"{customMessage}"</p>
                            )}
                            
                            <p>Please find your detailed travel itinerary below:</p>
                            
                            <div className="my-3 p-3 rounded" style={{ backgroundColor: '#FDFCDC' }}>
                                <div><strong>Trip:</strong> {selectedItinerary.title}</div>
                                <div><strong>Destination:</strong> {selectedItinerary.destination}</div>
                                <div><strong>Dates:</strong> {selectedItinerary.dates}</div>
                                <div><strong>Duration:</strong> {selectedItinerary.days} days</div>
                                <div className="mt-2">
                                    <strong>Highlights:</strong>
                                    <ul className="ml-4 mt-1">
                                        {selectedItinerary.highlights.map((highlight, index) => (
                                            <li key={index}>• {highlight}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            
                            <p>If you have any questions, please don't hesitate to contact me.</p>
                            <p>Best regards,<br/>Experience Travel by Gigi</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
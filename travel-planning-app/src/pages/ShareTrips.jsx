// share trips page, utilizing same style cards as in itineraries and some tailwind components

import { useState, useEffect } from 'react';

export default function ShareTrips() {
    const [trips, setTrips] = useState([]);
    const [selected, setSelected] = useState(null);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTrips();
    }, []);

    async function loadTrips() {
        try {
            // load from the microservice instead of main backend
            const res = await fetch('http://localhost:3004/api/itineraries');
            const data = await res.json();
            setTrips(data);
        } catch (err) {
            console.error('Failed to load trips:', err);
            setError('Failed to load trips');
        }
        setLoading(false);
    }

    async function sendEmail() {
        if (!selected || !email) {
            setError('Please select a trip and enter email');
            return;
        }

        setSending(true);
        setError(null);
        
        try {
            const response = await fetch('http://localhost:3004/api/share-itinerary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itineraryId: selected.id,
                    email: email,
                    customMessage: message
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send email');
            }

            setSuccess(true);
            
            // reset form after success
            setTimeout(() => {
                setSuccess(false);
                setSelected(null);
                setEmail('');
                setMessage('');
            }, 3000);

        } catch (err) {
            console.error('Send email error:', err);
            setError(err.message);
        } finally {
            setSending(false);
        }
    }

    if (loading) {
        return <div className="p-6">Loading trips...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#0081A7' }}>
                Share Trips
            </h1>
            <p className="mb-6" style={{ color: '#F07167' }}>
                Send itineraries to clients via email
            </p>

            <div className="mb-6 p-6 rounded-lg" style={{ backgroundColor: '#FDFCDC' }}>
                
                {/* trip selection */}
                <div className="mb-6">
                    <h3 className="font-medium mb-3" style={{ color: '#0081A7' }}>
                        Pick a trip
                    </h3>

                    {trips.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-semibold mb-2" style={{ color: '#0081A7' }}>
                                No trips yet
                            </h3>
                            <p style={{ color: '#F07167' }}>
                                Create your first itinerary to get started
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {trips.map((trip) => (
                                <div 
                                    key={trip.id}
                                    className={`p-4 rounded border cursor-pointer ${
                                        selected?.id === trip.id ? 'ring-2' : ''
                                    }`}
                                    style={{ 
                                        backgroundColor: selected?.id === trip.id ? '#FED9B7' : '#FDFCDC',
                                        borderColor: '#00AFB9',
                                        ringColor: selected?.id === trip.id ? '#00AFB9' : 'transparent'
                                    }}
                                    onClick={() => setSelected(trip)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg mb-1" style={{ color: '#0081A7' }}>
                                                {trip.tripTitle || 'Untitled Trip'}
                                            </h3>
                                            
                                            <div className="flex gap-2 mb-3">
                                                <span 
                                                    className="px-2 py-1 rounded text-xs text-white"
                                                    style={{ backgroundColor: trip.status === 'Confirmed' ? '#00AFB9' : '#F07167' }}
                                                >
                                                    {trip.status || 'Planning'}
                                                </span>
                                                {trip.tripType && (
                                                    <span 
                                                        className="px-2 py-1 rounded text-xs"
                                                        style={{ backgroundColor: '#FED9B7', color: '#0081A7' }}
                                                    >
                                                        {trip.tripType}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="space-y-1 text-sm" style={{ color: '#0081A7' }}>
                                                {trip.clientName && <p>Client: {trip.clientName}</p>}
                                                <p>Destination: {trip.destination}</p>
                                                {trip.startDate && trip.endDate && (
                                                    <p>Dates: {trip.startDate} - {trip.endDate}</p>
                                                )}
                                                {trip.numberOfTravelers && (
                                                    <p>Travelers: {trip.numberOfTravelers}</p>
                                                )}
                                            </div>
                                        </div>

                                        {selected?.id === trip.id && (
                                            <div className="text-right">
                                                <span className="text-sm font-medium" style={{ color: '#00AFB9' }}>
                                                    Selected
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* email form */}
                <div className="mb-6">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Client email"
                        className="w-full p-3 mb-3 rounded border"
                        style={{ borderColor: '#00AFB9' }}
                    />
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Optional personal message for the client"
                        rows={3}
                        className="w-full p-3 rounded border"
                        style={{ borderColor: '#00AFB9' }}
                    />
                </div>

                <button
                    onClick={sendEmail}
                    disabled={!selected || !email || sending}
                    className="px-6 py-2 rounded text-white disabled:opacity-50"
                    style={{ backgroundColor: '#00AFB9' }}
                >
                    {sending ? 'Sending Email...' : 'Send Itinerary'}
                </button>
            </div>

            {/* Error Display */}
            {error && (
                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FED9B7', border: '1px solid #F07167' }}>
                    <p style={{ color: '#0081A7' }}>
                        Error: {error}
                    </p>
                </div>
            )}

            {/* Success Display */}
            {success && (
                <div className="p-4 mb-6 rounded" style={{ backgroundColor: '#FED9B7', border: '1px solid #00AFB9' }}>
                    <p style={{ color: '#0081A7' }}>
                        ✓ Itinerary sent to {email}!
                    </p>
                </div>
            )}

            {/* preview */}
            {selected && (
                <div className="p-6 rounded" style={{ backgroundColor: '#FDFCDC' }}>
                    <h3 className="font-bold mb-4" style={{ color: '#0081A7' }}>
                        Email Preview
                    </h3>
                    
                    <div className="p-4 rounded" style={{ backgroundColor: '#FED9B7' }}>
                        <p className="font-bold mb-2">Subject: Your {selected.tripTitle} Itinerary</p>
                        
                        <div className="text-sm space-y-2">
                            <p>Dear {selected.clientName?.split(' ')[0] || 'Traveler'},</p>
                            
                            {message && (
                                <div className="p-2 bg-white rounded border-l-4" style={{ borderColor: '#F07167' }}>
                                    <p><strong>Personal Message:</strong></p>
                                    <p>"{message}"</p>
                                </div>
                            )}
                            
                            <p>Here are the details for your upcoming trip:</p>
                            
                            <div className="p-3 my-3 rounded" style={{ backgroundColor: 'white' }}>
                                <p><strong>Trip:</strong> {selected.tripTitle}</p>
                                <p><strong>Destination:</strong> {selected.destination}</p>
                                <p><strong>Dates:</strong> {selected.startDate} - {selected.endDate}</p>
                                <p><strong>Travelers:</strong> {selected.numberOfTravelers}</p>
                                {selected.tripType && <p><strong>Type:</strong> {selected.tripType}</p>}
                                {selected.status && <p><strong>Status:</strong> {selected.status}</p>}
                            </div>
                            
                            <p>If you have any questions or would like to make changes, please don't hesitate to reach out!</p>
                            <p>Best regards,<br/>Your Travel Agent</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
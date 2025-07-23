// homepage

import { useState } from 'react';
import Contact from './Contact';
import FeaturesSection from '../components/FeatureSection';
//import banner from '../assets/banner.png';

export default function HomePage() {
    const [showModal, setShowModal] = useState(false);

    const steps = [
        'Add Client Information - Start by creating a client profile with contact details and travel preferences.',
        'Create New Itinerary - Set up basic trip details including destination, dates, and traveler count.',
        'Check Weather Forecast - View weather conditions to plan activities and packing recommendations.',
        'Get Activity Suggestions - Use AI to discover popular attractions and activities for your destination.',
        'Finalize & Share - Complete your itinerary and share it directly with your client via email.'
    ];

    return (    // using a tailwind page template
        <div>
            {/* Hero section */}
            <div className="relative px-6 pt-14 lg:px-8">
                {/*TODO: Background image */}
                <div 
                    //className="absolute inset-0 -z-20 bg-cover bg-center opacity-30"
                    //style={{ backgroundImage: ??? }}
                />
                
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-10" style={{ color: '#0081A7' }}>
                            Create Perfect Travel Itineraries
                        </h1>
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm leading-6 ring-1 hover:ring-opacity-80 transition-all" style={{ color: '#F07167', backgroundColor: '#FED9B7', borderColor: '#00AFB9' }}>
                                Combining weather forecasts with AI-powered recommendations to plan unforgettable trips.
                            </div>
                        </div>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button
                                onClick={() => setShowModal(true)}
                                className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-all"
                                style={{ backgroundColor: '#00AFB9' }}
                            >
                                First time user?
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* First Time User? */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setShowModal(false)}
                    />
                    
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative w-full max-w-md rounded-lg p-6 shadow-xl" style={{ backgroundColor: '#FDFCDC' }}>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold" style={{ color: '#0081A7' }}>
                                    How to Create Your First Itinerary
                                </h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="rounded-md p-1 hover:bg-opacity-20 transition-colors"
                                    style={{ color: '#F07167' }}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* How to steps list */}
                            <div className="space-y-4">
                                {steps.map((step, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3" style={{ backgroundColor: '#00AFB9' }}>
                                            {index + 1}
                                        </div>
                                        <div className="text-sm" style={{ color: '#0081A7' }}>
                                            {step}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-all"
                                    style={{ backgroundColor: '#00AFB9' }}
                                >
                                    Got it! Let's get started.
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <FeaturesSection />
            <Contact />
        </div>
    );
}
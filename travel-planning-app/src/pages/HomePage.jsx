import { useState } from 'react';
import { ChevronDownIcon } from '../components/Icons';
import Contact from './Contact';
import FeaturesSection from '../components/FeatureSection';
import banner from '../assets/banner.png';

// Mock CheckIcon component
const CheckIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

// Mock XMarkIcon component
const XMarkIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const steps = [
    { 
        name: 'Add Client Information', 
        description: 'Start by creating a client profile with contact details and travel preferences.',
        status: 'complete' 
    },
    {
        name: 'Create New Itinerary',
        description: 'Set up basic trip details including destination, dates, and traveler count.',
        status: 'current',
    },
    { 
        name: 'Check Weather Forecast', 
        description: 'View weather conditions to plan activities and packing recommendations.',
        status: 'upcoming' 
    },
    { 
        name: 'Get Activity Suggestions', 
        description: 'Use AI to discover popular attractions and activities for your destination.',
        status: 'upcoming' 
    },
    { 
        name: 'Finalize & Share', 
        description: 'Complete your itinerary and share it directly with your client via email.',
        status: 'upcoming' 
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function HomePage() {
    const [showStepsModal, setShowStepsModal] = useState(false);

    return (
        <>
            {/* Hero section with background banner */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                {/* Background banner with transparency */}
                <div 
                    className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-30"
                    style={{
                        backgroundImage: `url(${banner})`,
                    }}
                />
                
                {/* Original gradient backgrounds - keep these for the colorful effects */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                </div>
                
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    {/* Your existing hero content */}
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
                                onClick={() => setShowStepsModal(true)}
                                className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-all"
                                style={{ backgroundColor: '#00AFB9' }}
                            >
                                First time user?
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Keep the bottom gradient too */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                        style={{
                            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            background: `linear-gradient(to top right, #F07167, #FED9B7)`,
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    />
                </div>
            </div>

            {/* Steps Modal */}
            {showStepsModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                        onClick={() => setShowStepsModal(false)}
                    />
                    
                    {/* Modal */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div 
                            className="relative w-full max-w-md transform overflow-hidden rounded-lg p-6 shadow-xl transition-all"
                            style={{ backgroundColor: '#FDFCDC' }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold" style={{ color: '#0081A7' }}>
                                    How to Create Your First Itinerary
                                </h3>
                                <button
                                    onClick={() => setShowStepsModal(false)}
                                    className="rounded-md p-1 hover:bg-opacity-20 transition-colors"
                                    style={{ color: '#F07167' }}
                                >
                                    <XMarkIcon />
                                </button>
                            </div>

                            {/* Steps */}
                            <nav aria-label="Progress">
                                <ol role="list" className="overflow-hidden">
                                    {steps.map((step, stepIdx) => (
                                        <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pb-8' : '', 'relative')}>
                                            {step.status === 'complete' ? (
                                                <>
                                                    {stepIdx !== steps.length - 1 ? (
                                                        <div aria-hidden="true" className="absolute top-4 left-4 mt-0.5 -ml-px h-full w-0.5" style={{ backgroundColor: '#00AFB9' }} />
                                                    ) : null}
                                                    <div className="group relative flex items-start">
                                                        <span className="flex h-9 items-center">
                                                            <span className="relative z-10 flex size-8 items-center justify-center rounded-full text-sm font-semibold text-white" style={{ backgroundColor: '#00AFB9' }}>
                                                                {stepIdx + 1}
                                                            </span>
                                                        </span>
                                                        <span className="ml-4 flex min-w-0 flex-col">
                                                            <span className="text-sm font-medium" style={{ color: '#0081A7' }}>{step.name}</span>
                                                            <span className="text-sm" style={{ color: '#F07167' }}>{step.description}</span>
                                                        </span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    {stepIdx !== steps.length - 1 ? (
                                                        <div aria-hidden="true" className="absolute top-4 left-4 mt-0.5 -ml-px h-full w-0.5 bg-gray-300" />
                                                    ) : null}
                                                    <div className="group relative flex items-start">
                                                        <span aria-hidden="true" className="flex h-9 items-center">
                                                            <span className="relative z-10 flex size-8 items-center justify-center rounded-full border-2 bg-white text-sm font-semibold" style={{ borderColor: '#00AFB9', color: '#00AFB9' }}>
                                                                {stepIdx + 1}
                                                            </span>
                                                        </span>
                                                        <span className="ml-4 flex min-w-0 flex-col">
                                                            <span className="text-sm font-medium" style={{ color: '#0081A7' }}>{step.name}</span>
                                                            <span className="text-sm" style={{ color: '#F07167' }}>{step.description}</span>
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ol>
                            </nav>

                            {/* Footer */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => setShowStepsModal(false)}
                                    className="w-full rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-all"
                                    style={{ backgroundColor: '#00AFB9' }}
                                >
                                    Got it! Let's start
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Features Section */}
            <FeaturesSection />

            {/* Contact Section */}
            <Contact />
        </>
    );
}
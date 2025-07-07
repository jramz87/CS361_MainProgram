import { ChevronDownIcon } from '../components/Icons';
import Contact from './Contact';
import FeaturesSection from '../components/FeatureSection';
import banner from '../assets/banner.png';

export default function HomePage() {
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

        {/* Features Section */}
        <FeaturesSection />

        {/* Contact Section */}
        <Contact />
        </>
    )
}
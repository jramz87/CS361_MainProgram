// displayed on HomePage

export default function FeaturesSection() {
    const features = [
        {
            name: 'Weather Integration',
            description: 'Get accurate weather forecasts for any destination to help plan the perfect trip.',
            href: '/weather',
        },
        {
            name: 'Smart Suggestions',
            description: 'Use GenAI to generate activity ideas and recommendations to optimize travel plans.',
            href: '/activities',
        },
        {
            name: 'Client Management',
            description: 'Easily store and organize client profiles and travel preferences for ease of data access.',
            href: '/clients',
        },
    ];

    return (    // using tailwind components below
        <div className="py-24 sm:py-32" style={{ backgroundColor: '#0081A7' }}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7" style={{ color: '#FED9B7' }}>
                        Professional Tools
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#FDFCDC' }}>
                        Everything you need for travel planning
                    </p>
                    <p className="mt-6 text-lg leading-8" style={{ color: '#FED9B7' }}>
                        Combine weather data, AI recommendations, and client management into one powerful platform designed for travel professionals.
                    </p>
                </div>
                
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div key={feature.name} className="flex flex-col">
                                <div className="flex items-center gap-x-3 text-base font-semibold leading-7" style={{ color: '#FDFCDC' }}>
                                    {/* Simple inline icons */}
                                    {index === 0 && (
                                        <svg className="h-5 w-5 flex-none" style={{ color: '#00AFB9' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {index === 1 && (
                                        <svg className="h-5 w-5 flex-none" style={{ color: '#00AFB9' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {index === 2 && (
                                        <svg className="h-5 w-5 flex-none" style={{ color: '#00AFB9' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                        </svg>
                                    )}
                                    {feature.name}
                                </div>
                                <div className="mt-4 flex flex-auto flex-col text-base leading-7" style={{ color: '#FED9B7' }}>
                                    <p className="flex-auto">{feature.description}</p>
                                    <p className="mt-6">
                                        <a href={feature.href} className="text-sm font-semibold hover:opacity-80" style={{ color: '#00AFB9' }}>
                                            Take me there <span aria-hidden="true">→</span>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
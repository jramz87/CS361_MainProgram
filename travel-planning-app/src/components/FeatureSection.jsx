import { WeatherIcon, AIIcon, UsersIcon } from './Icons';

const features = [
    {
        name: 'Weather Integration',
        description: 'Get accurate weather forecasts for any destination to help plan the perfect trip timing and activities.',
        href: '/weather',
        icon: WeatherIcon,
    },
    {
        name: 'AI-Powered Recommendations',
        description: 'Leverage artificial intelligence to suggest personalized activities and experiences based on client preferences.',
        href: '/activities',
        icon: AIIcon,
    },
    {
        name: 'Client Management',
        description: 'Easily store and organize client profiles and travel preferences for workflow efficiency.',
        href: '/clients',
        icon: UsersIcon,
    },
]

export default function FeaturesSection() {
    return (
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
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7" style={{ color: '#FDFCDC' }}>
                    <feature.icon aria-hidden="true" className="h-5 w-5 flex-none" style={{ color: '#00AFB9' }} />
                    {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7" style={{ color: '#FED9B7' }}>
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                        <a href={feature.href} className="text-sm font-semibold hover:opacity-80" style={{ color: '#00AFB9' }}>
                        Take me there <span aria-hidden="true">→</span>
                        </a>
                    </p>
                    </dd>
                </div>
                ))}
            </dl>
            </div>
        </div>
        </div>
    )
}
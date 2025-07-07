import { useState } from 'react';
import { ChevronDownIcon } from '../components/Icons';

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        agreeToPolicy: false
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
    }

    return (
        <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0081A7' }}>
            Contact Form
            </h2>
            <p className="mt-2 text-lg leading-8" style={{ color: '#F07167' }}>
                Questions? Feedback? Please reach out to us!
            </p>
        </div>
        <div className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6" style={{ color: '#0081A7' }}>
                First name
                </label>
                <div className="mt-2.5">
                <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-sm shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all"
                    style={{ 
                    backgroundColor: '#FDFCDC', 
                    color: '#0081A7',
                    '--tw-ring-color': '#00AFB9'
                    }}
                />
                </div>
            </div>
            <div>
                <label htmlFor="last-name" className="block text-sm font-semibold leading-6" style={{ color: '#0081A7' }}>
                Last name
                </label>
                <div className="mt-2.5">
                <input
                    type="text"
                    name="lastName"
                    id="last-name"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-sm shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all"
                    style={{ 
                    backgroundColor: '#FDFCDC', 
                    color: '#0081A7',
                    '--tw-ring-color': '#00AFB9'
                    }}
                />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="company" className="block text-sm font-semibold leading-6" style={{ color: '#0081A7' }}>
                Travel Agency
                </label>
                <div className="mt-2.5">
                <input
                    type="text"
                    name="company"
                    id="company"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-sm shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all"
                    style={{ 
                    backgroundColor: '#FDFCDC', 
                    color: '#0081A7',
                    '--tw-ring-color': '#00AFB9'
                    }}
                />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6" style={{ color: '#0081A7' }}>
                Email
                </label>
                <div className="mt-2.5">
                <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-sm shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all"
                    style={{ 
                    backgroundColor: '#FDFCDC', 
                    color: '#0081A7',
                    '--tw-ring-color': '#00AFB9'
                    }}
                />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6" style={{ color: '#0081A7' }}>
                Message
                </label>
                <div className="mt-2.5">
                <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-sm shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all"
                    style={{ 
                    backgroundColor: '#FDFCDC', 
                    color: '#0081A7',
                    '--tw-ring-color': '#00AFB9'
                    }}
                />
                </div>
            </div>
            <div className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                <input
                    id="agree-to-policies"
                    name="agreeToPolicy"
                    type="checkbox"
                    checked={formData.agreeToPolicy}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-inset"
                    style={{ 
                    accentColor: '#00AFB9',
                    '--tw-ring-color': '#00AFB9'
                    }}
                />
                </div>
                <label htmlFor="agree-to-policies" className="text-sm leading-6" style={{ color: '#0081A7' }}>
                By selecting this, you agree to our{' '}
                <a href="#" className="font-semibold" style={{ color: '#F07167' }}>
                    privacy policy
                </a>
                .
                </label>
            </div>
            </div>
            <div className="mt-10">
            <button
                type="button"
                onClick={handleSubmit}
                className="block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-all"
                style={{ backgroundColor: '#00AFB9' }}
            >
                Get Started
            </button>
            </div>
        </div>
        </div>
    )
}
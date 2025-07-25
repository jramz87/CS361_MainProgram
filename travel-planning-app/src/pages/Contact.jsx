// contact us page

import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (    // using a tailwind form
        <div className="px-6 py-24 sm:py-32 lg:px-8" style={{ backgroundColor: '#FDFCDC' }}>
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        background: 'linear-gradient(to top right, #F07167, #00AFB9)'
                    }}
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[72.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />
            </div>

            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0081A7' }}>
                    Contact Form
                </h2>
                <p className="mt-2 text-lg leading-8" style={{ color: '#F07167' }}>
                    Questions? Feedback? Please reach out to us!
                </p>
            </div>
            
            <div className="mx-auto mt-16 max-w-xl sm:mt-20">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-semibold leading-6" style={{ color: '#0081A7' }}>
                                First name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-sm shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    style={{ 
                                        backgroundColor: '#FDFCDC', 
                                        color: '#0081A7',
                                        '--tw-ring-color': '#00AFB9'
                                    }}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-semibold leading-6" style={{ color: '#0081A7' }}>
                                Last name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-sm shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-sm shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-sm shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-sm shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    style={{ 
                                        backgroundColor: '#FDFCDC', 
                                        color: '#0081A7',
                                        '--tw-ring-color': '#00AFB9'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:opacity-90"
                            style={{ backgroundColor: '#00AFB9' }}
                        >
                            Get Started
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
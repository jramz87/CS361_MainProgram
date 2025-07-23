// itineraries page

import { useState, useEffect } from 'react';
import ItineraryForm from '../components/ItineraryForm';

export default function Itineraries() {
    const [showForm, setShowForm] = useState(false);
    const [editingItinerary, setEditingItinerary] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [itineraries, setItineraries] = useState([]);

    useEffect(() => {
        loadItineraries();
    }, []);

    const loadItineraries = async () => {
        const response = await fetch('/api/itineraries');
        const data = await response.json();
        setItineraries(data);
    };

    const handleAddItinerary = () => {
        setEditingItinerary(null);
        setShowForm(true);
    };

    const handleEditItinerary = (itinerary) => {
        setEditingItinerary(itinerary);
        setShowForm(true);
    };

    const handleDeleteItinerary = (itineraryId) => {
        let itinerary = itineraries.find(item => item.id === itineraryId);
        setDeleteConfirm(itinerary);
    };

    const confirmDelete = async () => {
        if (deleteConfirm) {
            await fetch(`/api/itineraries/${deleteConfirm.id}`, {
                method: 'DELETE'
            });
            setDeleteConfirm(null);
            loadItineraries();
        }
    };

    const handleSaveItinerary = async (itineraryData) => {
        // update existing itinerariy
        if (editingItinerary) {
            await fetch(`/api/itineraries/${editingItinerary.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itineraryData)
            });
         // create a itinerary
        } else {
            await fetch('/api/itineraries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...itineraryData,
                    status: 'Planning'
                })
            });
        }
        
        setShowForm(false);
        setEditingItinerary(null);
        loadItineraries();
    };

    if (showForm) {
        return (
            <ItineraryForm 
                itinerary={editingItinerary}
                onSave={handleSaveItinerary}
                onCancel={() => {
                    setShowForm(false);
                    setEditingItinerary(null);
                }}
            />
        );
    }

    return (    // tailwind classes used for layout
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold" style={{ color: '#0081A7' }}>
                        Travel Itineraries
                    </h1>
                    <p className="mt-2 text-lg" style={{ color: '#F07167' }}>
                        Create and manage travel itineraries
                    </p>
                </div>
                <button
                    onClick={handleAddItinerary}
                    className="flex items-center gap-2 px-6 py-3 rounded-md text-white font-semibold shadow-lg hover:opacity-90"
                    style={{ backgroundColor: '#00AFB9' }}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Add New Itinerary
                </button>
            </div>

            {deleteConfirm && (
                <div className="mb-6 rounded-md p-4" style={{ backgroundColor: '#FED9B7', border: '2px solid #F07167' }}>
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium" style={{ color: '#0081A7' }}>
                                Delete Itinerary
                            </h3>
                            <div className="mt-2 text-sm" style={{ color: '#0081A7' }}>
                                <p>
                                    Are you sure you want to delete "{deleteConfirm.tripTitle}"? This cannot be undone.
                                </p>
                            </div>
                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={confirmDelete}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-80"
                                    style={{ backgroundColor: '#F07167' }}
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-80"
                                    style={{ backgroundColor: '#00AFB9' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {itineraries.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="mt-2 text-sm font-semibold" style={{ color: '#0081A7' }}>
                        No itineraries yet
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: '#F07167' }}>
                        Get started by creating your first travel itinerary.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {itineraries.map(itinerary => (
                        <div 
                            key={itinerary.id} 
                            className="relative group p-6 rounded-xl shadow-lg border hover:shadow-xl"
                            style={{ 
                                backgroundColor: '#FDFCDC', 
                                borderColor: '#00AFB9',
                                borderWidth: '2px'
                            }}
                        >
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100">
                                <button
                                    onClick={() => handleEditItinerary(itinerary)}
                                    className="p-2 rounded-full hover:opacity-80"
                                    style={{ backgroundColor: '#00AFB9', color: 'white' }}
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleDeleteItinerary(itinerary.id)}
                                    className="p-2 rounded-full hover:opacity-80"
                                    style={{ backgroundColor: '#F07167', color: 'white' }}
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2" style={{ color: '#0081A7' }}>
                                    {itinerary.tripTitle}
                                </h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <span 
                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
                                        style={{ backgroundColor: itinerary.status === 'Confirmed' ? '#00AFB9' : '#F07167' }}
                                    >
                                        {itinerary.status || 'Planning'}
                                    </span>
                                    {itinerary.tripType && (
                                        <span 
                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                                            style={{ backgroundColor: '#FED9B7', color: '#0081A7' }}
                                        >
                                            {itinerary.tripType}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {itinerary.clientName && (
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5" style={{ color: '#00AFB9' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                        </svg>
                                        <span className="text-sm" style={{ color: '#F07167' }}>
                                            {itinerary.clientName}
                                        </span>
                                    </div>
                                )}
                                
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5" style={{ color: '#00AFB9' }} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm" style={{ color: '#F07167' }}>
                                        {itinerary.destination}
                                    </span>
                                </div>
                                
                                {itinerary.startDate && itinerary.endDate && (
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5" style={{ color: '#00AFB9' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm" style={{ color: '#F07167' }}>
                                            {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                                
                                {itinerary.numberOfTravelers && (
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5" style={{ color: '#00AFB9' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                        </svg>
                                        <span className="text-sm" style={{ color: '#F07167' }}>
                                            {itinerary.numberOfTravelers} {itinerary.numberOfTravelers === 1 ? 'Traveler' : 'Travelers'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
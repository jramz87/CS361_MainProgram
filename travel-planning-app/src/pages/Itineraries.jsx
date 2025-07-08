import { useState } from 'react';
import { PencilIcon, TrashIcon, CalendarIcon, MapIcon, UsersIcon, ExclamationTriangleIcon } from '../components/Icons';
import ItineraryForm from '../components/ItineraryForm';

export default function Itineraries() {
    const [showForm, setShowForm] = useState(false);
    const [editingItinerary, setEditingItinerary] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [itineraries, setItineraries] = useState([
        {
            id: 1,
            tripTitle: 'Paris Adventure 2024',
            clientName: 'John Doe',
            destination: 'Paris, France',
            startDate: '2024-08-15',
            endDate: '2024-08-22',
            numberOfTravelers: 2,
            tripType: 'Leisure',
            status: 'Planning'
        },
        {
            id: 2,
            tripTitle: 'Tokyo Business Trip',
            clientName: 'Jane Smith',
            destination: 'Tokyo, Japan',
            startDate: '2024-09-01',
            endDate: '2024-09-05',
            numberOfTravelers: 1,
            tripType: 'Business',
            status: 'Confirmed'
        }
    ]);

    const handleAddItinerary = () => {
        setEditingItinerary(null);
        setShowForm(true);
    };

    const handleEditItinerary = (itinerary) => {
        setEditingItinerary(itinerary);
        setShowForm(true);
    };

    const handleDeleteItinerary = (itineraryId) => {
        const itinerary = itineraries.find(item => item.id === itineraryId);
        setDeleteConfirmation(itinerary);
    };

    const confirmDelete = () => {
        if (deleteConfirmation) {
            setItineraries(itineraries.filter(itinerary => itinerary.id !== deleteConfirmation.id));
            setDeleteConfirmation(null);
        }
    };

    const cancelDelete = () => {
        setDeleteConfirmation(null);
    };

    const handleSaveItinerary = (itineraryData) => {
        if (editingItinerary) {
            // Update existing itinerary
            setItineraries(itineraries.map(itinerary => 
                itinerary.id === editingItinerary.id 
                    ? { ...itinerary, ...itineraryData }
                    : itinerary
            ));
        } else {
            // Add new itinerary
            const newItinerary = {
                ...itineraryData,
                id: Math.max(...itineraries.map(i => i.id), 0) + 1,
                status: 'Planning',
                clientName: 'Client Name' // This would come from the selected client
            };
            setItineraries([...itineraries, newItinerary]);
        }
        setShowForm(false);
        setEditingItinerary(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed': return '#00AFB9';
            case 'Planning': return '#F07167';
            case 'Completed': return '#0081A7';
            default: return '#F07167';
        }
    };

    const getClientName = (clientId) => {
        // This should match the clients array in ItineraryForm, to be made dynamic
        const clients = [
            { id: 1, firstName: 'John', lastName: 'Doe' },
            { id: 2, firstName: 'Jane', lastName: 'Smith' }
        ];
        const client = clients.find(c => c.id === parseInt(clientId));
        return client ? `${client.firstName} ${client.lastName}` : 'Unknown Client';
    };

    const formatDateRange = (startDate, endDate) => {
        if (!startDate || !endDate) return 'Dates TBD';
        const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return `${start} - ${end}`;
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

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold" style={{ color: '#0081A7' }}>
                        Travel Itineraries
                    </h1>
                    <p className="mt-2 text-lg" style={{ color: '#F07167' }}>
                        Create and manage detailed travel itineraries for your clients
                    </p>
                </div>
                <button
                    onClick={handleAddItinerary}
                    className="flex items-center gap-2 px-6 py-3 rounded-md text-white font-semibold shadow-lg hover:opacity-90 transition-all"
                    style={{ backgroundColor: '#00AFB9' }}
                >
                    <CalendarIcon />
                    Add New Itinerary
                </button>
            </div>

            {/* Delete Confirmation */}
            {deleteConfirmation && (
                <div className="mb-6 rounded-md p-4" style={{ backgroundColor: '#FED9B7', border: '2px solid #F07167' }}>
                    <div className="flex">
                        <div className="shrink-0">
                            <ExclamationTriangleIcon aria-hidden="true" className="size-5" style={{ color: '#F07167' }} />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium" style={{ color: '#0081A7' }}>
                                Delete Itinerary
                            </h3>
                            <div className="mt-2 text-sm" style={{ color: '#0081A7' }}>
                                <p>
                                    Are you sure you want to delete "{deleteConfirmation.tripTitle}"? This action cannot be undone.
                                </p>
                            </div>
                            <div className="mt-4">
                                <div className="-mx-2 -my-1.5 flex">
                                    <button
                                        type="button"
                                        onClick={confirmDelete}
                                        className="rounded-md px-2 py-1.5 text-sm font-medium hover:opacity-80 focus:ring-2 focus:ring-offset-2 focus:outline-hidden transition-all"
                                        style={{ 
                                            backgroundColor: '#F07167', 
                                            color: 'white',
                                            '--tw-ring-color': '#F07167',
                                            '--tw-ring-offset-color': '#FED9B7'
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        onClick={cancelDelete}
                                        className="ml-3 rounded-md px-2 py-1.5 text-sm font-medium hover:opacity-80 focus:ring-2 focus:ring-offset-2 focus:outline-hidden transition-all"
                                        style={{ 
                                            backgroundColor: '#00AFB9', 
                                            color: 'white',
                                            '--tw-ring-color': '#00AFB9',
                                            '--tw-ring-offset-color': '#FED9B7'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {itineraries.length === 0 ? (
                <div className="text-center py-12">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                        <CalendarIcon />
                    </div>
                    <h3 className="mt-2 text-sm font-semibold" style={{ color: '#0081A7' }}>
                        No itineraries yet
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: '#F07167' }}>
                        Get started by creating your first travel itinerary.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={handleAddItinerary}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
                            style={{ backgroundColor: '#00AFB9' }}
                        >
                            <div className="-ml-1 mr-2">
                                <CalendarIcon />
                            </div>
                            Create Itinerary
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {itineraries.map(itinerary => (
                        <div 
                            key={itinerary.id} 
                            className="relative group p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-200"
                            style={{ 
                                backgroundColor: '#FDFCDC', 
                                borderColor: '#00AFB9',
                                borderWidth: '2px'
                            }}
                        >
                            {/* Action buttons */}
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEditItinerary(itinerary)}
                                    className="p-2 rounded-full hover:bg-opacity-80 transition-colors"
                                    style={{ backgroundColor: '#00AFB9', color: 'white' }}
                                    title="Edit itinerary"
                                >
                                    <PencilIcon />
                                </button>
                                <button
                                    onClick={() => handleDeleteItinerary(itinerary.id)}
                                    className="p-2 rounded-full hover:bg-opacity-80 transition-colors"
                                    style={{ backgroundColor: '#F07167', color: 'white' }}
                                    title="Delete itinerary"
                                >
                                    <TrashIcon />
                                </button>
                            </div>

                            {/* Itinerary info */}
                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2" style={{ color: '#0081A7' }}>
                                    {itinerary.tripTitle}
                                </h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <span 
                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                                        style={{ 
                                            backgroundColor: getStatusColor(itinerary.status),
                                            color: 'white'
                                        }}
                                    >
                                        {itinerary.status}
                                    </span>
                                    <span 
                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                                        style={{ 
                                            backgroundColor: '#FED9B7',
                                            color: '#0081A7'
                                        }}
                                    >
                                        {itinerary.tripType}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div style={{ color: '#00AFB9' }}>
                                        <UsersIcon />
                                    </div>
                                    <span className="text-sm" style={{ color: '#F07167' }}>
                                        {itinerary.clientName}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <div style={{ color: '#00AFB9' }}>
                                        <MapIcon />
                                    </div>
                                    <span className="text-sm" style={{ color: '#F07167' }}>
                                        {itinerary.destination}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <div style={{ color: '#00AFB9' }}>
                                        <CalendarIcon />
                                    </div>
                                    <span className="text-sm" style={{ color: '#F07167' }}>
                                        {formatDateRange(itinerary.startDate, itinerary.endDate)}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <div style={{ color: '#00AFB9' }}>
                                        <UsersIcon />
                                    </div>
                                    <span className="text-sm" style={{ color: '#F07167' }}>
                                        {itinerary.numberOfTravelers} {itinerary.numberOfTravelers === 1 ? 'Traveler' : 'Travelers'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
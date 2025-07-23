// clients page

import { useState, useEffect } from 'react';
import ClientForm from '../components/ClientForm';
import { getAllClients, deleteClient, createClient, updateClient } from '../services/clientAPI';

export default function Clients() {
    const [showForm, setShowForm] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        setLoading(true);
        try {
            const clientsData = await getAllClients();
            setClients(clientsData);
        } catch (error) {
            console.error('Error loading clients:', error);
        }
        setLoading(false);
    };

    const handleAddClient = () => {
        setEditingClient(null);
        setShowForm(true);
    };

    const handleEditClient = (client) => {
        setEditingClient(client);
        setShowForm(true);
    };

    const handleDeleteClient = (clientId) => {
        const client = clients.find(c => c.id === clientId);
        setDeleteConfirm(client);
    };

    const confirmDelete = async () => {
        if (deleteConfirm) {
            try {
                await deleteClient(deleteConfirm.id);
                setClients(clients.filter(c => c.id !== deleteConfirm.id));
                setDeleteConfirm(null);
            } catch (error) {
                alert("ERror, couldn't delete client");
            }
        }
    };

    const handleSaveClient = async (clientData) => {
        try {
            if (editingClient) {
                // update current client
                await updateClient(editingClient.id, clientData);
            } else {
                // create a new client
                await createClient(clientData);
            }
            await loadClients();
            setShowForm(false);
            setEditingClient(null);
        } catch (error) {
            console.log('Error saving client:', error);
        }
    };

    if (showForm) {
        return (
            <ClientForm 
                client={editingClient}
                onSave={handleSaveClient}
                onCancel={() => {
                    setShowForm(false);
                    setEditingClient(null);
                }}
            />
        );
    }

    return (    // Used tailwind components below
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold" style={{ color: '#0081A7' }}>
                        Client Profiles
                    </h1>
                    <p className="mt-2 text-lg" style={{ color: '#F07167' }}>
                        Manage your client information
                    </p>
                </div>
                <button
                    onClick={handleAddClient}
                    className="flex items-center gap-2 px-6 py-3 rounded-md text-white font-semibold shadow-lg hover:opacity-90"
                    style={{ backgroundColor: '#00AFB9' }}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                    Add New Client
                </button>
            </div>

            {/* Delete? */}
            {deleteConfirm && (
                <div className="mb-6 rounded-md p-4" style={{ backgroundColor: '#FED9B7', border: '2px solid #F07167' }}>
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium" style={{ color: '#0081A7' }}>
                                Delete Client
                            </h3>
                            <div className="mt-2 text-sm" style={{ color: '#0081A7' }}>
                                <p>
                                    Are you sure you want to delete "{deleteConfirm.firstName} {deleteConfirm.lastName}"? This cannot be undone.
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

            {/* Loading */}
            {loading && (
                <div className="text-center py-12">
                    <p style={{ color: '#0081A7' }}>Loading clients...</p>
                </div>
            )}

            {/* No Clients Yet */}
            {!loading && clients.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="mt-2 text-sm font-semibold" style={{ color: '#0081A7' }}>
                        No clients yet
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: '#F07167' }}>
                        Get started by adding your first client.
                    </p>
                </div>
            ) : (
                !loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clients.map(client => (
                            <div 
                                key={client.id} 
                                className="relative group p-6 rounded-xl shadow-lg border hover:shadow-xl"
                                style={{ 
                                    backgroundColor: '#FDFCDC', 
                                    borderColor: '#00AFB9',
                                    borderWidth: '2px'
                                }}
                            >
                                {/* Action buttons */}
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100">
                                    <button
                                        onClick={() => handleEditClient(client)}
                                        className="p-2 rounded-full hover:opacity-80"
                                        style={{ backgroundColor: '#00AFB9', color: 'white' }}
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClient(client.id)}
                                        className="p-2 rounded-full hover:opacity-80"
                                        style={{ backgroundColor: '#F07167', color: 'white' }}
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Client info */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold mb-1" style={{ color: '#0081A7' }}>
                                        {client.firstName} {client.lastName}
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5" style={{ color: '#00AFB9' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        <span className="text-sm" style={{ color: '#F07167' }}>
                                            {client.email}
                                        </span>
                                    </div>
                                    
                                    {client.phone && (
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5" style={{ color: '#00AFB9' }} fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                            <span className="text-sm" style={{ color: '#F07167' }}>
                                                {client.phone}
                                            </span>
                                        </div>
                                    )}

                                    {client.budget && (
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5" style={{ color: '#00AFB9' }} fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm" style={{ color: '#F07167' }}>
                                                {client.budget}
                                            </span>
                                        </div>
                                    )}

                                    {client.activities && client.activities.length > 0 && (
                                        <div>
                                            <p className="text-xs font-semibold mb-1" style={{ color: '#0081A7' }}>
                                                Interests:
                                            </p>
                                            <div className="flex flex-wrap gap-1">
                                                {client.activities.slice(0, 3).map(activity => (
                                                    <span 
                                                        key={activity}
                                                        className="px-2 py-1 text-xs rounded"
                                                        style={{ backgroundColor: '#00AFB9', color: 'white' }}
                                                    >
                                                        {activity}
                                                    </span>
                                                ))}
                                                {client.activities.length > 3 && (
                                                    <span className="text-xs" style={{ color: '#F07167' }}>
                                                        +{client.activities.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}
import { useState } from 'react';
import { PencilIcon, TrashIcon, UserPlusIcon, MailIcon, PhoneIcon, LocationIcon, CakeIcon, HomeIcon, ExclamationTriangleIcon } from '../components/Icons';
import ClientForm from '../components/ClientForm';

export default function Clients() {
    const [showForm, setShowForm] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [clients, setClients] = useState([
        { 
            id: 1, 
            firstName: 'John', 
            lastName: 'Doe', 
            email: 'john.doe@email.com',
            phone: '555-0123',
            birthday: '1985-06-15',
            citizenship: 'United States',
            departureCity: 'Oklahoma City, OK',
            preferredCommunication: 'email'
        },
        { 
            id: 2, 
            firstName: 'Jane', 
            lastName: 'Smith', 
            email: 'jane.smith@email.com',
            phone: '555-0456',
            birthday: '1990-03-22',
            citizenship: 'Canada',
            departureCity: 'Toronto, ON',
            preferredCommunication: 'phone'
        },
    ]);

    const handleAddClient = () => {
        setEditingClient(null);
        setShowForm(true);
    };

    const handleEditClient = (client) => {
        setEditingClient(client);
        setShowForm(true);
    };

    const handleDeleteClient = (clientId) => {
        const client = clients.find(item => item.id === clientId);
        setDeleteConfirmation(client);
    };

    const confirmDelete = () => {
        if (deleteConfirmation) {
            setClients(clients.filter(client => client.id !== deleteConfirmation.id));
            setDeleteConfirmation(null);
        }
    };

    const cancelDelete = () => {
        setDeleteConfirmation(null);
    };

    const handleSaveClient = (clientData) => {
        if (editingClient) {
            // Update existing client
            setClients(clients.map(client => 
                client.id === editingClient.id 
                    ? { ...client, ...clientData }
                    : client
            ));
        } else {
            // Add new client
            const newClient = {
                ...clientData,
                id: Math.max(...clients.map(c => c.id), 0) + 1
            };
            setClients([...clients, newClient]);
        }
        setShowForm(false);
        setEditingClient(null);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const calculateAge = (birthday) => {
        if (!birthday) return '';
        const today = new Date();
        const birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
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

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold" style={{ color: '#0081A7' }}>
                        Client Profiles
                    </h1>
                    <p className="mt-2 text-lg" style={{ color: '#F07167' }}>
                        Manage your client contact information and travel preferences
                    </p>
                </div>
                <button
                    onClick={handleAddClient}
                    className="flex items-center gap-2 px-6 py-3 rounded-md text-white font-semibold shadow-lg hover:opacity-90 transition-all"
                    style={{ backgroundColor: '#00AFB9' }}
                >
                    <UserPlusIcon />
                    Add New Client
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
                                Delete Client
                            </h3>
                            <div className="mt-2 text-sm" style={{ color: '#0081A7' }}>
                                <p>
                                    Are you sure you want to delete "{deleteConfirmation.firstName} {deleteConfirmation.lastName}"? This action cannot be undone.
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

            {clients.length === 0 ? (
                <div className="text-center py-12">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                        <UserPlusIcon />
                    </div>
                    <h3 className="mt-2 text-sm font-semibold" style={{ color: '#0081A7' }}>
                        No clients yet
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: '#F07167' }}>
                        Get started by adding your first client profile.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={handleAddClient}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
                            style={{ backgroundColor: '#00AFB9' }}
                        >
                            <div className="-ml-1 mr-2">
                                <UserPlusIcon />
                            </div>
                            Add Client
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients.map(client => (
                        <div 
                            key={client.id} 
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
                                    onClick={() => handleEditClient(client)}
                                    className="p-2 rounded-full hover:bg-opacity-80 transition-colors"
                                    style={{ backgroundColor: '#00AFB9', color: 'white' }}
                                    title="Edit client"
                                >
                                    <PencilIcon />
                                </button>
                                <button
                                    onClick={() => handleDeleteClient(client.id)}
                                    className="p-2 rounded-full hover:bg-opacity-80 transition-colors"
                                    style={{ backgroundColor: '#F07167', color: 'white' }}
                                    title="Delete client"
                                >
                                    <TrashIcon />
                                </button>
                            </div>

                            {/* Client info */}
                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-1" style={{ color: '#0081A7' }}>
                                    {client.firstName} {client.lastName}
                                </h3>
                                {client.preferredName && (
                                    <p className="text-sm" style={{ color: '#F07167' }}>
                                        Prefers: {client.preferredName}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div style={{ color: '#00AFB9' }}>
                                        <MailIcon />
                                    </div>
                                    <span className="text-sm" style={{ color: '#F07167' }}>
                                        {client.email}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <div style={{ color: '#00AFB9' }}>
                                        <PhoneIcon />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm" style={{ color: '#F07167' }}>
                                            {client.phone}
                                        </span>
                                        {client.preferredCommunication && (
                                            <span className="text-xs" style={{ color: '#0081A7' }}>
                                                Prefers {client.preferredCommunication}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {client.birthday && (
                                    <div className="flex items-center gap-3">
                                        <div style={{ color: '#00AFB9' }}>
                                            <CakeIcon />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm" style={{ color: '#F07167' }}>
                                                {formatDate(client.birthday)}
                                            </span>
                                            <span className="text-xs" style={{ color: '#0081A7' }}>
                                                Age: {calculateAge(client.birthday)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {client.departureCity && (
                                    <div className="flex items-center gap-3">
                                        <div style={{ color: '#00AFB9' }}>
                                            <HomeIcon />
                                        </div>
                                        <span className="text-sm" style={{ color: '#F07167' }}>
                                            {client.departureCity}
                                        </span>
                                    </div>
                                )}
                                
                                {client.citizenship && (
                                    <div className="flex items-center gap-3">
                                        <div style={{ color: '#00AFB9' }}>
                                            <LocationIcon />
                                        </div>
                                        <span className="text-sm" style={{ color: '#F07167' }}>
                                            {client.citizenship}
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
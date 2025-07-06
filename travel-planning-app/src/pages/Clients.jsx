import { useState } from 'react';
import ClientForm from '../components/ClientForm';

export default function Clients() {
    const [showForm, setShowForm] = useState(false);
    const [clients, setClients] = useState([
        { id: 1, name: 'John Doe', destination: 'Paris', startDate: '2024-08-15', status: 'Planning' },
        { id: 2, name: 'Jane Smith', destination: 'Tokyo', startDate: '2024-09-01', status: 'Confirmed' },
    ]);

    const handleAddClient = () => {
        setShowForm(true);
    };

    const handleSaveClient = () => {
        setShowForm(false);
        // Refresh clients list
    };

    if (showForm) {
        return (
        <ClientForm 
            onSave={handleSaveClient}
            onCancel={() => setShowForm(false)}
        />
        );
    }

    return (
        <div className="p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold" style={{ color: '#0081A7' }}>
            Client Profiles
            </h1>
            <button
            onClick={handleAddClient}
            className="px-4 py-2 rounded-md text-white font-medium"
            style={{ backgroundColor: '#00AFB9' }}
            >
            Add New Client
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map(client => (
            <div key={client.id} className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#FDFCDC', borderColor: '#00AFB9', borderWidth: '1px' }}>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#0081A7' }}>
                {client.name}
                </h3>
                <p style={{ color: '#F07167' }}>Destination: {client.destination}</p>
                <p style={{ color: '#F07167' }}>Travel Date: {client.startDate}</p>
                <p style={{ color: '#F07167' }}>Status: {client.status}</p>
            </div>
            ))}
        </div>
        </div>
    );
}
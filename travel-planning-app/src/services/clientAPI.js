const API_BASE = 'http://localhost:3001/api';

export const getAllClients = async () => {
    try {
        const response = await fetch(`${API_BASE}/clients`);
        if (!response.ok) throw new Error('Failed to fetch clients');
        return await response.json();
    } catch (error) {
        console.error('Get Clients Error:', error);
        throw error;
    }
};

export const createClient = async (clientData) => {
    try {
        const response = await fetch(`${API_BASE}/clients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
        });
        if (!response.ok) throw new Error('Failed to create client');
        return await response.json();
    } catch (error) {
        console.error('Create Client Error:', error);
        throw error;
    }
};

export const updateClient = async (clientId, clientData) => {
    try {
        const response = await fetch(`${API_BASE}/clients/${clientId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
        });
        if (!response.ok) throw new Error('Failed to update client');
        return await response.json();
    } catch (error) {
        console.error('Update Client Error:', error);
        throw error;
    }
};

export const deleteClient = async (clientId) => {
    try {
        const response = await fetch(`${API_BASE}/clients/${clientId}`, {
        method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete client');
        return await response.json();
    } catch (error) {
        console.error('Delete Client Error:', error);
        throw error;
    }
};
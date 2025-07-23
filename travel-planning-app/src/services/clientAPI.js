// store client info as server side json files

export const getAllClients = async () => {
    const response = await fetch('http://localhost:3001/api/clients');
    return await response.json();
};

export const createClient = async (clientData) => {
    const response = await fetch('http://localhost:3001/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
    });
    return await response.json();
};

export const updateClient = async (clientId, clientData) => {
    const response = await fetch(`http://localhost:3001/api/clients/${clientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
    });
    return await response.json();
};

export const deleteClient = async (clientId) => {
    const response = await fetch(`http://localhost:3001/api/clients/${clientId}`, {
        method: 'DELETE'
    });
    return await response.json();
};
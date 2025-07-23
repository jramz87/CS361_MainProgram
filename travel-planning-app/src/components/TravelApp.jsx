// This component is used to define the general layout of the travel app
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';

export default function TravelApp() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FDFCDC' }}>
            <Sidebar 
                isOpen={sidebarOpen} 
                onClose={() => setSidebarOpen(false)}
            />
            <div className="lg:pl-72 flex flex-col min-h-screen">
                <Topbar onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}
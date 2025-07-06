// This component is used to set the site layout
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function TravelApp() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#FDFCDC' }}>
        <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
        />
        <div className="lg:pl-72">
            <TopBar onMenuClick={() => setSidebarOpen(true)} />
            <main>
            <Outlet />
            </main>
        </div>
        </div>
    )
}
import { Link, useLocation } from 'react-router-dom'
import { XMarkIcon } from './Icons'
import { navigation } from '../config/navigation'

export default function Sidebar({ isOpen, onClose }) {
    const location = useLocation()

    return (
        <>
        {/* Mobile sidebar overlay */} 
        {isOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
            <div 
                className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300"
                onClick={onClose}
            />
            
            <div className="fixed inset-y-0 left-0 flex w-full max-w-xs">
                <div className="flex grow flex-col overflow-y-auto px-6 pb-4" style={{ backgroundColor: '#0081A7' }}>
                <div className="flex justify-between items-start py-6">
                    <div className="flex justify-center flex-1">
                        <img 
                            src="/src/assets/Canva_Design.png" 
                            alt="Logo" 
                            style={{ 
                                height: '180px',
                                width: '180px',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                    <button 
                    onClick={onClose} 
                    className="p-2 rounded-md"
                    style={{ color: '#FDFCDC' }}
                    >
                    <XMarkIcon />
                    </button>
                </div>
                
                {/* Navigation section */}
                <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    onClick={onClose}
                                    className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold transition-colors w-full block"
                                    style={{ 
                                    backgroundColor: location.pathname === item.href ? '#00AFB9' : 'transparent',
                                    color: location.pathname === item.href ? '#FDFCDC' : '#FED9B7',
                                    textDecoration: 'none'
                                    }}
                                >
                                    <item.icon />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        </ul>
                    </li>
                    </ul>
                </nav>
                </div>
            </div>
            </div>
        )}

        {/* Desktop sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div className="flex grow flex-col overflow-y-auto px-6 pb-4" style={{ backgroundColor: '#0081A7' }}>
                <div className="flex justify-center py-6">
                    <img 
                        src="/src/assets/Canva_Design.png" 
                        alt="Logo" 
                        style={{ 
                            height: '240px', 
                            width: '240px',
                            objectFit: 'contain'
                        }}
                    />
                </div>
                
                {/* Navigation section */}
                <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold transition-colors hover:text-white w-full block"
                                    style={{ 
                                    backgroundColor: location.pathname === item.href ? '#00AFB9' : 'transparent',
                                    color: location.pathname === item.href ? '#FDFCDC' : '#FED9B7',
                                    textDecoration: 'none'
                                    }}
                                >
                                    <item.icon />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        </ul>
                    </li>
                    </ul>
                </nav>
            </div>
        </div>
        </>
    )
}
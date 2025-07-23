import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Canva_Design.png';

export default function Sidebar() {
    const location = useLocation();

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Clients', href: '/clients' },
        { name: 'Itineraries', href: '/itineraries' },
        { name: 'Weather', href: '/weather' },
        { name: 'Activities', href: '/activities' },
        { name: 'Share Trips', href: '/share-trips'},
        { name: 'Contact', href: '/contact' }
    ];

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div className="flex grow flex-col overflow-y-auto px-6 pb-4" style={{ backgroundColor: '#0081A7' }}>
                <div className="flex justify-center py-6">
                    <img 
                        src={logo}
                        alt="Logo" 
                        style={{ 
                            height: '240px', 
                            width: '240px',
                            objectFit: 'contain'
                        }}
                    />
                </div>
                
                <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul className="-mx-2 space-y-1">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.href}
                                            className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold hover:text-white w-full block"
                                            style={{ 
                                                backgroundColor: location.pathname === item.href ? '#00AFB9' : 'transparent',
                                                color: location.pathname === item.href ? '#FDFCDC' : '#FED9B7',
                                                textDecoration: 'none'
                                            }}
                                        >
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
    );
}
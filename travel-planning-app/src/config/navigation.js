import { 
    GlobeIcon, 
    UsersIcon, 
    MapIcon, 
    PaperAirplaneIcon, 
    CloudIcon, 
    CalendarIcon, 
    PhoneIcon 
} from '../components/Icons'

export const navigation = [
    { name: 'Home', href: '/', icon: GlobeIcon },
    { name: 'Clients', href: '/clients', icon: UsersIcon },
    { name: 'Itineraries', href: '/itineraries', icon: MapIcon },
    { name: 'Share Trips', href: '/share-trips', icon: PaperAirplaneIcon },
    { name: 'Weather', href: '/weather', icon: CloudIcon },
    { name: 'Activities', href: '/activities', icon: CalendarIcon },
    { name: 'Contact Us', href: '/contact', icon: PhoneIcon },
]
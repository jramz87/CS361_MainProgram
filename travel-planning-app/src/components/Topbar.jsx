import { BarsIcon } from './Icons'

export default function TopBar({ onMenuClick }) {
    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8" style={{ backgroundColor: '#FDFCDC', borderColor: '#00AFB9' }}>
        <button 
            type="button" 
            onClick={onMenuClick} 
            className="-m-2.5 p-2.5 lg:hidden" 
            style={{ color: '#0081A7' }}
        >
            <span className="sr-only">Open sidebar</span>
            <BarsIcon />
        </button>
        <div className="flex flex-1 justify-end">
            <span className="text-sm font-medium" style={{ color: '#0081A7' }}>Welcome back, Travel Agent!</span>
                </div>
                </div>
            )
}
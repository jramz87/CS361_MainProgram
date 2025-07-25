// adapted tailwind component for footer

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#0081A7' }}>
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center items-center gap-x-8 md:order-2">
            
            {/* Icon Links */}
            <div className="flex gap-x-6">
                {/* Facebook */}
                <a 
                href="https://www.facebook.com/experiencetravelbygigi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                style={{ color: '#FDFCDC' }}
                >
                <span className="sr-only">Facebook</span>
                <svg fill="currentColor" viewBox="0 0 24 24" className="size-6">
                    <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                    />
                </svg>
                </a>

                {/* Instagram */}
                <a 
                href="https://www.instagram.com/experiencetravelbygigi/?igsh=MWwwZ2V2NmlieXpudw%3D%3D#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                style={{ color: '#FDFCDC' }}
                >
                <span className="sr-only">Instagram</span>
                <svg fill="currentColor" viewBox="0 0 24 24" className="size-6">
                    <path
                    fillRule="evenodd"
                    d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.084 5.451.204 4.889.389a7.9 7.9 0 0 0-2.835 1.845A7.9 7.9 0 0 0 .389 4.889C.204 5.451.084 6.094.048 7.041.013 7.989 0 8.396 0 12.017c0 3.624.013 4.09.048 5.076.036.947.156 1.59.341 2.152a7.9 7.9 0 0 0 1.845 2.835 7.9 7.9 0 0 0 2.835 1.845c.562.185 1.205.305 2.152.341.986.035 1.452.048 5.076.048 3.624 0 4.09-.013 5.076-.048.947-.036 1.59-.156 2.152-.341a7.9 7.9 0 0 0 2.835-1.845 7.9 7.9 0 0 0 1.845-2.835c.185-.562.305-1.205.341-2.152.035-.986.048-1.452.048-5.076 0-3.624-.013-4.09-.048-5.076-.036-.947-.156-1.59-.341-2.152a7.9 7.9 0 0 0-1.845-2.835A7.9 7.9 0 0 0 19.259.389c-.562-.185-1.205-.305-2.152-.341C16.121.013 15.624 0 12.017 0Zm0 2.164c3.557 0 3.98.013 5.385.048.829.036 1.28.166 1.579.276.397.154.68.338.977.635.297.297.481.58.635.977.11.299.24.75.276 1.579.035 1.405.048 1.828.048 5.385 0 3.557-.013 3.98-.048 5.385-.036.829-.166 1.28-.276 1.579-.154.397-.338.68-.635.977-.297.297-.58.481-.977.635-.299.11-.75.24-1.579.276-1.405.035-1.828.048-5.385.048-3.557 0-3.98-.013-5.385-.048-.829-.036-1.28-.166-1.579-.276a2.58 2.58 0 0 1-.977-.635 2.58 2.58 0 0 1-.635-.977c-.11-.299-.24-.75-.276-1.579-.035-1.405-.048-1.828-.048-5.385 0-3.557.013-3.98.048-5.385.036-.829.166-1.28.276-1.579.154-.397.338-.68.635-.977.297-.297.58-.481.977-.635.299-.11.75-.24 1.579-.276 1.405-.035 1.828-.048 5.385-.048ZM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 1 0 2.881 1.44 1.44 0 0 1 0-2.881Z"
                    clipRule="evenodd"
                    />
                </svg>
                </a>

                {/* Email */}
                <a 
                href="mailto:experiencetravelbygigi@gmail.com"
                className="hover:opacity-80 transition-opacity"
                style={{ color: '#FDFCDC' }}
                >
                <span className="sr-only">Email</span>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 21.75 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                </a>

                {/* Linktree */}
                <a 
                href="https://linktr.ee/experiencetravelbygigi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                style={{ color: '#FDFCDC' }}
                >
                <span className="sr-only">Linktree</span>
                <svg fill="currentColor" viewBox="0 0 24 24" className="size-6">
                    <path d="M7.953 15.066c-.08 0-.152-.016-.215-.049a.515.515 0 01-.176-.134.514.514 0 01-.119-.2.62.62 0 01-.044-.225V9.485a.62.62 0 01.044-.225.514.514 0 01.119-.199.515.515 0 01.176-.135.456.456 0 01.215-.048c.08 0 .152.016.215.048a.515.515 0 01.176.135.514.514 0 01.119.199.62.62 0 01.044.225v4.973a.62.62 0 01-.044.225.514.514 0 01-.119.2.515.515 0 01-.176.134.456.456 0 01-.215.049zm8.094 0c-.08 0-.152-.016-.215-.049a.515.515 0 01-.176-.134.514.514 0 01-.119-.2.62.62 0 01-.044-.225V9.485a.62.62 0 01.044-.225.514.514 0 01.119-.199.515.515 0 01.176-.135.456.456 0 01.215-.048c.08 0 .152.016.215.048a.515.515 0 01.176.135.514.514 0 01.119.199.62.62 0 01.044.225v4.973a.62.62 0 01-.044.225.514.514 0 01-.119.2.515.515 0 01-.176.134.456.456 0 01-.215.049zm-4.047 7.861c-.08 0-.152-.016-.215-.049a.515.515 0 01-.176-.134.514.514 0 01-.119-.2.62.62 0 01-.044-.225v-4.973a.62.62 0 01.044-.225.514.514 0 01.119-.199.515.515 0 01.176-.135.456.456 0 01.215-.048c.08 0 .152.016.215.048a.515.515 0 01.176.135.514.514 0 01.119.199.62.62 0 01.044.225v4.973a.62.62 0 01-.044.225.514.514 0 01-.119.2.515.515 0 01-.176.134.456.456 0 01-.215.049zm0-15.622c-.08 0-.152-.016-.215-.049a.515.515 0 01-.176-.134.514.514 0 01-.119-.2.62.62 0 01-.044-.225V1.724a.62.62 0 01.044-.225.514.514 0 01.119-.199A.515.515 0 0111.785 1.15a.456.456 0 01.215-.048c.08 0 .152.016.215.048a.515.515 0 01.176.135.514.514 0 01.119.199.62.62 0 01.044.225v4.973a.62.62 0 01-.044.225.514.514 0 01-.119.2.515.515 0 01-.176.134.456.456 0 01-.215.049z"/>
                </svg>
                </a>
            </div>
            </div>
            
            <p className="mt-8 text-center text-sm/6 md:order-1 md:mt-0" style={{ color: '#FDFCDC' }}>
            &copy; 2025 Experience Travel by Gigi. Website design by Jessica Ramirez. All rights reserved.
            </p>
        </div>
        </footer>
    )
}
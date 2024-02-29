import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-white text-lg font-semibold">MC Mod Scanner</div>

                {/* Navigation Links */}
                <div className="space-x-4">
                    <a href="/" className="text-white hover:text-gray-300">
                        Home
                    </a>
                    <a href="/about" className="text-white hover:text-gray-300">
                        About
                    </a>
                    <a href="/info" className="text-white hover:text-gray-300">
                        Info
                    </a>
                    <a href="/placeholder" className="text-white hover:text-gray-300">
                        Source Code
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
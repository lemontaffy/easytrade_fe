"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import {  useSelector } from "react-redux";
import { RootState } from "@/app/store/store";


const Navbar: React.FC = () => {
    const { isLoggedIn, profilePhoto } = useSelector((state: RootState) => state.settings.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50">
            <div className="flex justify-between items-center px-4 py-3">
                {/* Logo */}
                <h1 className="text-xl font-bold">
                    <Link href="/">My Trade Site</Link>
                </h1>

                {/* Hamburger Menu for Mobile */}
                <button
                    className="text-2xl md:hidden p-2 focus:outline-none active:scale-100"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    <FontAwesomeIcon
                        icon={isMenuOpen ? "times" : "bars"}
                        className="text-base"
                        fixedWidth
                    />
                </button>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center space-x-6">
                    {/* Home */}
                    <Link
                        href="/"
                        className="hover:text-gray-300 flex items-center space-x-1 no-underline"
                    >
                        <FontAwesomeIcon icon="home" className="text-base" fixedWidth />
                        <span>Home</span>
                    </Link>

                    {/* Make Purchase as a Yellow Button */}
                    <Link
                        href="/purchase"
                        className="flex items-center px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg shadow hover:bg-yellow-400 transition duration-300"
                    >
                        <FontAwesomeIcon icon="shopping-cart" className="text-base" fixedWidth />
                        <span className="ml-2">Make Purchase</span>
                    </Link>

                    {/* Detail Lists */}
                    <Link
                        href="/detail"
                        className="hover:text-gray-300 flex items-center space-x-1 no-underline"
                    >
                        <FontAwesomeIcon icon="credit-card" className="text-base" fixedWidth />
                        <span>Detail Lists</span>
                    </Link>

                    {/* My Page or Login */}
                    {isLoggedIn ? (
                        <Link
                            href="/settings"
                            className="hover:text-gray-300 flex items-center space-x-2 no-underline"
                        >
                            {profilePhoto ? (
                                <img
                                    src={profilePhoto}
                                    alt="Profile"
                                    className="w-11 h-11 rounded-full border-2 border-gray-300 shadow"
                                />
                            ) : (
                                <FontAwesomeIcon icon={faUserCircle} className="text-base" fixedWidth />
                            )}
                            <span>My Page</span>
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="flex items-center px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg shadow hover:bg-yellow-400 transition duration-300"
                        >
                            <FontAwesomeIcon icon="power-off" className="text-base" fixedWidth />
                            <span className="ml-2">Login</span>
                        </Link>
                    )}
                </nav>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <nav className="flex flex-col items-start space-y-2 p-4 bg-gray-700 md:hidden">
                    {/* Home */}
                    <Link
                        href="/"
                        className="block hover:text-gray-300 flex items-center space-x-1 no-underline"
                    >
                        <FontAwesomeIcon icon="home" className="text-base" fixedWidth />
                        <span>Home</span>
                    </Link>

                    {/* Make Purchase */}
                    <Link
                        href="/purchase"
                        className="block hover:text-gray-300 flex items-center space-x-1 no-underline"
                    >
                        <FontAwesomeIcon icon="shopping-cart" className="text-base" fixedWidth />
                        <span>Make Purchase</span>
                    </Link>

                    {/* Detail Lists */}
                    <Link
                        href="/detail"
                        className="block hover:text-gray-300 flex items-center space-x-1 no-underline"
                    >
                        <FontAwesomeIcon icon="list" className="text-base" fixedWidth />
                        <span>Detail Lists</span>
                    </Link>

                      {/* My Page or Login */}
                      {isLoggedIn ? (
                        <Link
                            href="/settings"
                            className="block flex items-center space-x-2 no-underline hover:text-gray-300"
                        >
                            {profilePhoto ? (
                                <img
                                    src={profilePhoto}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full border-2 border-gray-300 shadow"
                                />
                            ) : (
                                <FontAwesomeIcon icon={faUserCircle} className="text-base" fixedWidth />
                            )}
                            <span>My Page</span>
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="block hover:text-gray-300 flex items-center space-x-1 no-underline"
                        >
                            <FontAwesomeIcon icon={faPowerOff} className="text-base" fixedWidth />
                            <span>Login</span>
                        </Link>
                    )}
                </nav>
            )}
        </header>
    );
};

export default Navbar;

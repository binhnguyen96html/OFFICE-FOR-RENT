import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <nav className="fixed w-full z-50 top-0 start-0">
                <div className="md:grid grid-cols-4 items-center justify-start gap-4 px-8 py-2 border-b shadow-sm bg-white">
                    <div className="col-span-1">
                        <Link
                            to="/"
                            className="flex items-center space-x-3 rtl:space-x-reverse"
                        >
                            <img
                                src="/img/rent_logo.png"
                                className="h-14"
                                alt="cooking Logo"
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap">
                                Office For Rent
                            </span>
                        </Link>
                    </div>

                    <div
                        className="col-span-3 md:flex items-center md:justify-center gap-8 mt-2 md:mt-0
                            text-cyan-800 font-semibold">
                        <Link to="/">
                            <p className="hover:text-cyan-500 duration-75 transition-colors">
                                Home
                            </p>
                        </Link>

                        <Link to="/building-management">
                            <p className="hover:text-cyan-500 duration-75 transition-colors">
                                Building Management
                            </p>
                        </Link>

                        <Link to="/customer-management">
                            <p className="hover:text-cyan-500 duration-75 transition-colors">
                                Customer Management
                            </p>
                        </Link>
                    </div>

                    <div className="col-span-1"></div>
                </div>
            </nav>
        </>
    );
};

export default Header;
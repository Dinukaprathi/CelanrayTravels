"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import NavigationMenu from "./Menu";
import { usePathname } from "next/navigation";

const services = [
    {
        name:'Book Hotels',
        slug:'book-hotels',
    },
    {
        name:'Air Ticket Booking',
        slug:'book-air-tickets',
    }
]

const links = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about-us" },
    { name: "Packages", href: "/packages" },
    { name: "Destinations", href: "/destinations" },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showServices, setShowServices] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const servicesRef = useRef(null);
    const closeDropdownTimeout = useRef();

    const pathname = usePathname();
    useEffect(() => {
        setIsOpen(false);
        console.log(pathname);
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (servicesRef.current && !servicesRef.current.contains(event.target)) {
                setShowServices(false);

                console.log("clicked outside", { showServices });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showServices]);

    const handleDropdownClick = () => {
        setIsClicked(!isClicked);
    };

    const handleShowServices = (show) => {
        console.log({ show, isClicked });
        if (!show && isClicked) {
            return;
        }

        setShowServices(show);
    };

    return (
        <header className="w-full bg-white shadow-md flex items-center px-6 py-2">
            <Link href="/" className="flex items-center mr-8">
                <img
                    loading="lazy"
                    src="/common/company-logo.webp"
                    alt="Company Logo"
                    className="object-contain w-24 h-auto"
                />
            </Link>
            <nav className="flex gap-8 items-center flex-1">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-gray-800 hover:text-primary transition-colors"
                    >
                        {link.name}
                    </Link>
                ))}
                <div 
                    className="relative group" 
                    ref={servicesRef}
                    onMouseEnter={() => {
                        if (closeDropdownTimeout.current) clearTimeout(closeDropdownTimeout.current);
                        setShowServices(true);
                    }}
                    onMouseLeave={() => {
                        closeDropdownTimeout.current = setTimeout(() => setShowServices(false), 120);
                    }}
                >
                    <button 
                        className="text-gray-800 hover:text-primary flex items-center gap-1"
                        tabIndex={0}
                    >
                        Services <span className="text-gray-400">&#9662;</span>
                    </button>
                    {showServices && (
                        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                            {services.map((service) => (
                                <Link
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary transition-colors"
                                    onClick={() => setShowServices(false)}
                                >
                                    {service.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
            <Link
                href="/contact-us"
                className="ml-auto px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold rounded-md shadow hover:from-blue-500 hover:to-blue-400 transition"
            >
                Contact us
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden text-[#463f5e]" onClick={() => setIsOpen(!isOpen)}>
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white/90 backdrop-blur-lg w-full py-6 pb-12 px-6 rounded-b-2xl shadow-xl">
                    {links.map((link) => (
                        <Link key={link.name} href={link.href} className="block font-bold text-lg text-[#463f5e] py-3 hover:text-[#C46DD6] transition-colors">
                            {link.name}
                        </Link>
                    ))}

                    {/* Mobile Services Menu */}
                    <div className="py-2 ">
                        <button className="flex items-center font-bold text-lg text-[#463f5e] py-3 hover:text-[#C46DD6] transition-colors" onClick={() => setShowServices(!showServices)}>
                            Services
                        </button>

                        <div className="pl-4 mt-4 space-y-2 border-l border-[#C46DD6]">
                            {services.map((service) => (
                                <Link key={service.slug} href={`/services/${service.slug}`} className="block text-base text-[#463f5e] hover:text-[#C46DD6] transition-colors">
                                    {service.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Link
                        href="/contact-us"
                        className="mt-6 block px-8 py-3 bg-gradient-to-r from-[#6EC1FF] to-[#6A82FB] text-white font-bold text-lg rounded-xl shadow-lg hover:from-[#6A82FB] hover:to-[#6EC1FF] transition-all duration-300 focus:ring-2 focus:outline-none"
                    >
                        Contact us
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;

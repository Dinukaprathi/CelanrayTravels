"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import NavigationMenu from "./Menu";
import { usePathname } from "next/navigation";

const services = [
    {
        name:'Book Hotels',
        slug:'book-hotels',
    }
]

const links = [
    { name: "Home", href: "/home" },
    { name: "About us", href: "/about-us" },
    { name: "Packages", href: "/packages" },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showServices, setShowServices] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const servicesRef = useRef(null);

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
        <div className="flex z-50 flex-wrap gap-10 justify-between items-center py-2 max-[1560px]:px-2 rounded-lg max-w-[1560px] w-full md:w-full mx-auto">
            {/* Logo Only */}
            <div className="flex items-center px-4 my-auto">
                <Link href="/" className="flex flex-col justify-center items-center self-stretch rounded max-sm:-translate-x-3 max-sm:w-[120px] w-[150px]">
                    <img
                        loading="lazy"
                        src="/common/company-logo.webp"
                        alt="Company Logo"
                        className="object-contain aspect-[2.69] w-[120px]"
                    />
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden   md:flex  justify-center items-center self-stretch py-1 pr-1 pl-5 my-auto rounded-lg min-w-[240px] w-[405px]">
                <div className="flex gap-[70px] items-center justify-center self-stretch my-auto min-w-[240px]">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="hover:opacity-85 duration-300 flex p-small text-black gap-2 justify-center items-center self-stretch my-auto hover:text-black whitespace-nowrap"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Services Dropdown */}
                    <div className="relative" ref={servicesRef}>
                        <button
                            className="flex gap-2 text-black  p-small hover:opacity-85 duration-300 justify-center  items-center self-stretch my-auto hover:text-black"
                            onMouseEnter={() => handleShowServices(true)}
                            onTouchStart={() => handleDropdownClick()}
                            onMouseLeave={() => handleShowServices(false)}
                        >
                            Services
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/935d5e75ee5a4268ad77a2a950f96b2a/9205da58238dc10feb1d764300b28e746b64324706dc8e263b8d5348a7fbfedd?apiKey=935d5e75ee5a4268ad77a2a950f96b2a&"
                                alt=""
                                className={`object-contain aspect-[2.25] stroke-[1.872px] stroke-stone-300 w-[9px] transition-transform ${showServices ? "rotate-180" : ""}`}
                            />
                        </button>

                        {/* Dropdown menu */}
                        {showServices && (
                            <div onMouseEnter={() => handleShowServices(true)} onMouseLeave={() => handleShowServices(false)} className="absolute w-[300px] top-5 pt-6">
                                <NavigationMenu />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Contact Button */}
            <Link
                href="/contact-us"
                className="gap-2.5 hidden md:block hover:opacity-85 duration-300 p-small text-black self-stretch px-4 py-2 my-auto border border-gray-100    rounded  focus:ring-2  focus:outline-none hover:text-black"
            >
                Contact us
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden  bg-white  w-full py-4 pb-10 px-4">
                    {links.map((link) => (
                        <Link key={link.name} href={link.href} className="block p-small py-2 text-black hover:text-black transition-colors">
                            {link.name}
                        </Link>
                    ))}

                    {/* Mobile Services Menu */}
                    <div className="py-2 ">
                        <button className="flex items-center p-small text-black hover:text-black transition-colors" onClick={() => setShowServices(!showServices)}>
                            Services
                        </button>

                        <div className="pl-4 mt-4 space-y-2  border-l border-gray-700">
                            {services.map((service) => (
                                <Link key={service.slug} href={`/services/${service.slug}`} className="block p-small text-black hover:text-black transition-colors">
                                    {service.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Link
                        href="/contact-us"
                        className="gap-2.5 mt-5 block hover:opacity-85 duration-300 p-small text-black self-stretch px-4 py-2 my-auto   border border-gray-100 focus:ring-2 rounded focus:outline-none hover:text-black"
                    >
                        Contact us
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;

'use client'
import {  Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = {
  Company: [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Package", href: "/package" },
    { name: "Promotion", href: "/promotion" },
    { name: "Hotels", href: "/hotels" },
  ],
};

export const Footer = ({hasCta = false}:{hasCta?:boolean}) => {

  const pathname = usePathname();
   hasCta = pathname === '/contact-us' ? false : hasCta;

  return (
    <footer className={`bg-[#463f5e] text-white relative ${hasCta ? 'pt-[260px]' : 'pt-8'}`}>
      <div className="max-w-[1560px] mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center max-md:justify-items-start">
          {/* Brand Section */}
          <div className="space-y-4">
            <Image
                src="/common/company-logo.webp"
                alt="Ceylanray Logo"
                width={120}
                height={45}
                className="object-contain"
            />
            <p className="text-white/80 text-sm max-w-xs pl-2 border-l border-[#5a5078]">
              At Ceylanray, we believe that every journey is an opportunity for adventure, discovery, and unforgettable experiences
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="p-large">Explore</h3>
            <ul className="space-y-2">
              {navigation.Company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-100 p-small hover:text-white transition-colors "
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="p-large">Address</h3>
            <div className="flex items-start gap-2  text-gray-100">
              <p className="p-small">
                58/1/C<br />
                Wikramaarachchi road,<br />
                Yakkala
                Sri lanka<br />
                21000
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="p-large">Contact</h3>
            <div className="space-y-2 p-small">
              <a 
                href="mailto:Ceylanray.com" 
                className="flex items-center gap-2  text-gray-100 hover:text-white transition-colors"
              >
                <Mail size={20} />
                info@ceylanray.com
              </a>
              <a 
                href="tel:+94708184477" 
                className="flex items-center gap-2  text-gray-100 hover:text-white transition-colors"
              >
                <Phone size={20} />
                +94 76 669 9477
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 p-small pt-4 border-t border-white/10 text-center text-sm text-white/60">
          ©2024 - All Rights Reserved | Developed by{' '}
          <a
            href="https://vebula.global"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 transition-colors"
          >
            Vebula
          </a>
          {' '} & {' '}
          <a
            href="https://thaprolabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 transition-colors"
          >
            Thaprolabs
          </a>
        </div>
      </div>
    </footer>
  );
};

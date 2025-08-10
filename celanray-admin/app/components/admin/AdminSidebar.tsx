import React from "react";
import { LogOut, Luggage, Globe, Calendar, Building, Mail, MapPin, Plane } from "lucide-react";
import { FaHotel } from 'react-icons/fa';
import Link from "next/link";

interface AdminSidebarProps {
  onLogout: () => void;
}

const links = [
  { name: "Manage Packages", href: "/admin/dashboard/packages", icon: <Luggage className="w-5 h-5" /> },
  { name: "View Packages", href: "/admin/dashboard/view-packages", icon: <Globe className="w-5 h-5" /> },
  { name: "View Package Bookings", href: "/admin/dashboard/bookings", icon: <Calendar className="w-5 h-5" /> },
  { name: "Manage Hotels", href: "/admin/dashboard/hotels", icon: <FaHotel className="w-5 h-5" /> },
  { name: "View Hotel Bookings", href: "/admin/dashboard/hotel-bookings", icon: <Building className="w-5 h-5" /> },
  { name: "Manage Destinations", href: "/admin/dashboard/destinations", icon: <MapPin className="w-5 h-5" /> },
  { name: "Air Ticket Bookings", href: "/admin/dashboard/air-ticket-bookings", icon: <Plane className="w-5 h-5" /> },
  { 
    name: "View Mails", 
    href: "https://mail.google.com", 
    icon: <Mail className="w-5 h-5" />,
    external: true 
  },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogout }) => (
  <aside className="h-full w-56 bg-[#463f5e] backdrop-blur-md border-r border-[#eae6f7] flex flex-col py-8 px-4 shadow-xl">
    <nav className="flex-1 space-y-2">
      {links.map(link => (
        link.external ? (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white font-medium hover:bg-[#5a5078] hover:text-white transition"
          >
            {link.icon}
            {link.name}
          </a>
        ) : (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white font-medium hover:bg-[#5a5078] hover:text-white transition"
          >
            {link.icon}
            {link.name}
          </Link>
        )
      ))}
    </nav>
    <button
      onClick={onLogout}
      className="flex items-center gap-2 px-3 py-2 mt-auto rounded-lg text-red-500 font-medium hover:bg-red-50 transition"
    >
      <LogOut className="w-5 h-5" />
      Logout
    </button>
  </aside>
); 
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container-max py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">CodeHelp Hub</h3>
            <p>Your trusted platform for academic help and coding solutions.</p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition">Services</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><Mail size={18} /> support@codehelpub.com</li>
              <li className="flex items-center gap-2"><Phone size={18} /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-2"><MapPin size={18} /> Online Platform</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p>&copy; 2024 CodeHelp Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

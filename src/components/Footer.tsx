import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Github, Twitter, Linkedin, Mail, 
  ArrowUpRight, Heart 
} from 'lucide-react';
import { Button } from './ui/button';
import Logo from './Logo';

export const Footer = () => {
  const links = {
    product: [
      { label: 'Features', href: '/features' },
      { label: 'Challenges', href: '/challenges' },
      { label: 'Enterprise', href: '/enterprise' },
      { label: 'Partners', href: '/partners' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    resources: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'Community', href: '/community' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Logo />
            <p className="text-gray-600 text-sm leading-relaxed">
              Empowering innovation and collaboration across East Africa through our 
              cutting-edge challenge platform.
            </p>
            <div className="flex items-center space-x-4">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="p-2 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="font-semibold text-gray-900 mb-6 uppercase text-sm tracking-wider">
                {title}
              </h3>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-gray-600 hover:text-primary transition-colors inline-flex items-center group"
                    >
                      {item.label}
                      <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> in Kigali
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
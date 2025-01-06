import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Globe, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['About Us', 'Explore Challenges', 'Host a Hackathon', 'Blog', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:translate-x-1" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Highlights */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Community Highlights</h3>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <h4 className="font-medium mb-2">Latest Winner</h4>
                <p className="text-sm text-gray-300">Team RwandaTech - Smart Cities Challenge</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <h4 className="font-medium mb-2">Top Contributor</h4>
                <p className="text-sm text-gray-300">Jean Paul K. - 5 Projects</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <a href="mailto:support@qiesto.com" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
                <Mail className="h-5 w-5 mr-3" />
                support@qiesto.com
              </a>
              <a href="tel:+250780000000" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
                <Phone className="h-5 w-5 mr-3" />
                +250 780 000 000
              </a>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-3" />
                Kigali, Rwanda
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-300 mb-4">Get the latest hackathons and innovations directly to your inbox.</p>
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="w-full bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="flex items-center text-sm text-gray-300">
                <Globe className="h-4 w-4 mr-2" />
                <select className="bg-transparent border-none focus:ring-0 cursor-pointer">
                  <option value="en">English</option>
                  <option value="rw">Kinyarwanda</option>
                  <option value="fr">French</option>
                  <option value="sw">Swahili</option>
                </select>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Instagram, href: '#' }
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Qiesto. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
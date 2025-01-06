import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Globe, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white pt-24 pb-12 overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Newsletter Section - Moved to Top */}
        <div className="max-w-xl mx-auto text-center mb-20">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Join Our Innovation Community
          </h2>
          <p className="text-gray-400 mb-6">
            Stay ahead with the latest hackathons, tech trends, and innovation opportunities.
          </p>
          <div className="flex space-x-2">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary/50 transition-colors"
            />
            <Button className="bg-primary hover:bg-primary/90 transition-colors">
              Subscribe
            </Button>
          </div>
        </div>

        <Separator className="bg-white/10 mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['About Us', 'Explore Challenges', 'Host a Hackathon', 'Blog', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-all duration-200 flex items-center group text-sm">
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Highlights */}
          <div>
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Community Highlights
            </h3>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
                <h4 className="font-medium mb-2 text-sm text-primary">Latest Winner</h4>
                <p className="text-sm text-gray-400">Team RwandaTech - Smart Cities Challenge</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
                <h4 className="font-medium mb-2 text-sm text-primary">Top Contributor</h4>
                <p className="text-sm text-gray-400">Jean Paul K. - 5 Projects</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Contact Us
            </h3>
            <div className="space-y-4">
              {[
                { icon: Mail, text: 'support@qiesto.com', href: 'mailto:support@qiesto.com' },
                { icon: Phone, text: '+250 780 000 000', href: 'tel:+250780000000' },
                { icon: MapPin, text: 'Kigali, Rwanda' }
              ].map(({ icon: Icon, text, href }) => (
                <a 
                  key={text}
                  href={href}
                  className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <div className="bg-white/5 p-2 rounded-lg group-hover:bg-white/10 transition-colors mr-3">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Connect With Us
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Facebook, label: 'Facebook', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Instagram, label: 'Instagram', href: '#' }
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center bg-white/5 hover:bg-white/10 p-3 rounded-lg transition-colors group"
                >
                  <Icon className="h-4 w-4 mr-2 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <Globe className="h-4 w-4" />
            <select className="bg-transparent border-none focus:ring-0 cursor-pointer text-sm">
              <option value="en">English</option>
              <option value="rw">Kinyarwanda</option>
              <option value="fr">French</option>
              <option value="sw">Swahili</option>
            </select>
          </div>

          <div className="text-center">
            © {new Date().getFullYear()} Qiesto. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
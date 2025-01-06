import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Qiesto
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Product', 'Hackathons', 'Projects', 'Blog'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-600 hover:text-primary relative group py-2"
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="hover:bg-primary/10 text-gray-600 hover:text-primary transition-colors"
            >
              Host a hackathon
            </Button>
            <Button 
              variant="ghost"
              className="hover:bg-primary/10"
            >
              Log in
            </Button>
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity">
              Sign up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {['Product', 'Hackathons', 'Projects', 'Blog'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-600 hover:text-primary px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-100">
                <Button variant="ghost" className="justify-start">
                  Host a hackathon
                </Button>
                <Button variant="ghost" className="justify-start">
                  Log in
                </Button>
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity justify-start">
                  Sign up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
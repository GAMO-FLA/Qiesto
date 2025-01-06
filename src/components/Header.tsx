import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <a href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            Qiesto
          </a>
          <nav className="hidden md:flex space-x-6">
            {['Product', 'Hackathons', 'Projects', 'Blog'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-600 hover:text-primary relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-primary hidden md:inline transition-colors">
            Host a hackathon
          </a>
          <Button 
            variant="ghost" 
            className="hidden md:inline hover:bg-primary/10"
          >
            Log in
          </Button>
          <Button className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity">
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};
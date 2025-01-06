import React from 'react';
import { Button } from './ui/button';

export const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <a href="/" className="text-2xl font-bold text-primary">DEVPOST</a>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary">Product</a>
            <a href="#" className="text-gray-600 hover:text-primary">Hackathons</a>
            <a href="#" className="text-gray-600 hover:text-primary">Projects</a>
            <a href="#" className="text-gray-600 hover:text-primary">Blog</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-primary hidden md:inline">Host a hackathon</a>
          <Button variant="ghost" className="hidden md:inline">Log in</Button>
          <Button>Sign up</Button>
        </div>
      </div>
    </header>
  );
};
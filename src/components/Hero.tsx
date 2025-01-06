import React from 'react';
import { Button } from './ui/button';

export const Hero = () => {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/e2721391-268f-467e-a649-b1423b9e99d5.png" 
          alt="Kigali Innovation City at night" 
          className="w-full h-full object-cover brightness-50"
        />
      </div>
      
      {/* Content Overlay */}
      <div className="relative h-full">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Gateway to Innovation in Rwanda
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Connect with leading organizations, showcase your skills, and build innovative solutions for real-world challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6">
                Find Hackathons
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent text-white border-white hover:bg-white/10">
                Host a Challenge
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
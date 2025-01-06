import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative min-h-[600px] w-full overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <img 
          src="/lovable-uploads/e2721391-268f-467e-a649-b1423b9e99d5.png" 
          alt="Kigali Innovation City at night" 
          className="w-full h-full object-cover animate-ken-burns"
        />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-20 h-full">
        <div className="container mx-auto px-4 h-full flex items-center py-20">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Your Gateway to Innovation in Rwanda
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Connect with leading organizations, showcase your skills, and build innovative solutions for real-world challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity group"
              >
                Find Hackathons
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 bg-white/10 text-white border-white hover:bg-white/20 backdrop-blur-sm transition-colors"
              >
                Host a Challenge
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
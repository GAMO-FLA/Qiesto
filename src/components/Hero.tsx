import React from 'react';
import { Button } from './ui/button';

export const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The home for hackathons
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Where organizations and developers come together to build, inspire, and innovate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full sm:w-auto">
              For organizers
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              For participants
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img 
            src="/lovable-uploads/07443171-fea8-4535-8518-89558ed2a9e6.png" 
            alt="Hackathon illustration" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};
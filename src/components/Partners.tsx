import React from 'react';

export const Partners = () => {
  const partners = ['Microsoft', 'Google', 'Meta', 'AWS', 'Okta', 'Square', 'Atlassian'];
  
  return (
    <div className="bg-white py-12 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold tracking-wider text-gray-500 mb-8">
          TRUSTED BY THE WORLD'S LEADING ORGANIZATIONS
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {partners.map((partner) => (
            <div 
              key={partner} 
              className="text-2xl font-bold bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent hover:from-primary hover:to-primary/80 transition-all duration-300"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
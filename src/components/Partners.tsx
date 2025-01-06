import React from 'react';

export const Partners = () => {
  const partners = [
    'Bank of Kigali',
    'MTN Rwanda',
    'Kigali Innovation City',
    'AC Group',
    'Inkomoko Entrepreneur Development',
    'BK Tech House',
    'Zipline Rwanda'
  ];
  
  return (
    <div className="bg-white py-16 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold tracking-wider text-gray-500 mb-12">
          TRUSTED BY RWANDA'S LEADING ORGANIZATIONS
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
          {partners.map((partner) => (
            <div 
              key={partner} 
              className="text-lg md:text-xl font-bold bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent hover:from-primary hover:to-primary/80 transition-all duration-300 text-center"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
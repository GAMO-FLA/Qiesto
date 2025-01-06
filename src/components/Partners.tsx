import React from 'react';

export const Partners = () => {
  const partners = ['Microsoft', 'Google', 'Meta', 'AWS', 'Okta', 'Square', 'Atlassian'];
  
  return (
    <div className="bg-white py-8 border-t border-b border-gray-200">
      <div className="container mx-auto px-4">
        <p className="text-sm text-gray-500 text-center mb-6">
          TRUSTED BY THE WORLD'S LEADING ORGANIZATIONS
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div key={partner} className="text-gray-400 font-semibold text-lg">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
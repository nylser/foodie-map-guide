
import React from 'react';
import { MapPin } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <MapPin className="h-6 w-6 text-gray-900 mr-2" />
          <h1 className="text-xl font-medium">Office Food Guide</h1>
        </div>
        <div className="text-sm text-gray-500">
          Nearby dining options
        </div>
      </div>
    </header>
  );
};

export default Navbar;

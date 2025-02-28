
import React, { useState } from 'react';
import { restaurants, categoryMap, getOfficeCoordinates } from '../data/restaurants';
import { Restaurant } from '../types/restaurant';
import CategorySection from '../components/CategorySection';
import MapView from '../components/MapView';
import Navbar from '../components/Navbar';

const Index: React.FC = () => {
  const [highlightedRestaurant, setHighlightedRestaurant] = useState<Restaurant | null>(null);
  const officeCoordinates = getOfficeCoordinates();
  
  // Group restaurants by category
  const restaurantsByCategory = Object.entries(categoryMap).map(([category, info]) => {
    return {
      category,
      ...info,
      restaurants: restaurants.filter(r => r.category === category)
    };
  });

  const handleRestaurantHover = (restaurant: Restaurant | null) => {
    setHighlightedRestaurant(restaurant);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 animate-fadeIn">
            <div className="mb-6">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">My Favorites Near the Office</span>
              <h1 className="text-3xl font-medium mt-1 text-gray-800">Food & Drink Guide</h1>
              <p className="text-gray-600 mt-2">
                A curated selection of the best dining options within walking distance from our office.
              </p>
            </div>
            
            {restaurantsByCategory.map(({ category, label, icon, restaurants, color }) => (
              <CategorySection
                key={category}
                title={label}
                icon={icon}
                restaurants={restaurants}
                categoryColor={color}
                onHover={handleRestaurantHover}
              />
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1 h-[600px] lg:h-auto sticky top-8">
          <MapView 
            restaurants={restaurants} 
            officeLocation={officeCoordinates}
            highlightedRestaurant={highlightedRestaurant} 
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

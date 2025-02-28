
import React from 'react';
import { Restaurant } from '../types/restaurant';
import RestaurantCard from './RestaurantCard';

interface CategorySectionProps {
  title: string;
  icon: string;
  restaurants: Restaurant[];
  categoryColor: string;
  onHover: (restaurant: Restaurant | null) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  title, 
  icon, 
  restaurants,
  categoryColor,
  onHover
}) => {
  return (
    <div className="mb-10 animate-fadeIn">
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 rounded-full ${categoryColor.split(' ')[0]} flex items-center justify-center mr-3`}>
          <i className={`fas fa-${icon}`}></i>
        </div>
        <h2 className="text-2xl font-medium">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {restaurants.map((restaurant, index) => (
          <div 
            key={restaurant.id}
            className="animate-fadeIn"
          >
            <RestaurantCard 
              restaurant={restaurant} 
              categoryColor={categoryColor} 
              index={index}
              onHover={onHover}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

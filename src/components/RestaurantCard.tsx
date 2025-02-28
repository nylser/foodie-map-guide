
import React from 'react';
import { Restaurant } from '../types/restaurant';
import { ExternalLink, MapPin } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  categoryColor: string;
  index: number;
  onHover: (restaurant: Restaurant | null) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ 
  restaurant, 
  categoryColor,
  index,
  onHover
}) => {
  return (
    <div 
      className="restaurant-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
      style={{ 
        animationDelay: `${index * 50}ms`, 
        animationFillMode: 'both' 
      }}
      onMouseEnter={() => onHover(restaurant)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-lg text-gray-800">{restaurant.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${categoryColor}`}>
            {restaurant.category}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin size={16} className="mr-1.5" />
          <span className="text-balance truncate">View on Google Maps</span>
        </div>
        
        <div className="mt-auto pt-3">
          <a 
            href={restaurant.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-800"
          >
            <ExternalLink size={16} className="mr-2" />
            Open in Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

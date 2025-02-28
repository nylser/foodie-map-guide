
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Restaurant } from '../types/restaurant';
import { categoryMap } from '../data/restaurants';

interface MapViewProps {
  restaurants: Restaurant[];
  officeLocation: { lat: number; lng: number };
  highlightedRestaurant: Restaurant | null;
}

const MapView: React.FC<MapViewProps> = ({ 
  restaurants,
  officeLocation,
  highlightedRestaurant
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{[key: string]: L.Marker}>({});
  
  // Initialize the map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create the map instance
    const map = L.map(mapRef.current, {
      center: [officeLocation.lat, officeLocation.lng],
      zoom: 15,
      zoomControl: false
    });

    // Add zoom control to top-right
    L.control.zoom({
      position: 'topright'
    }).addTo(map);

    // Add the tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // Save the map instance
    mapInstanceRef.current = map;

    // Create office marker icon
    const officeIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white;"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    // Add office marker
    L.marker([officeLocation.lat, officeLocation.lng], {
      icon: officeIcon,
      title: 'Office',
      zIndexOffset: 1000
    }).addTo(map);

    // Add restaurant markers
    restaurants.forEach(restaurant => {
      const category = categoryMap[restaurant.category];
      
      // Create marker
      const marker = L.marker([restaurant.coordinates.lat, restaurant.coordinates.lng], {
        title: restaurant.name
      }).addTo(map);
      
      // Add popup
      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-medium">${restaurant.name}</h3>
          <p class="text-sm text-gray-500">${restaurant.address}</p>
          <a href="${restaurant.mapUrl}" target="_blank" class="text-blue-500 text-sm">Open in Google Maps</a>
        </div>
      `);
      
      // Store marker reference
      markersRef.current[restaurant.id] = marker;
    });

    setMapLoaded(true);

    // Cleanup function
    return () => {
      if (map) {
        map.remove();
        mapInstanceRef.current = null;
        markersRef.current = {};
      }
    };
  }, [restaurants, officeLocation]);

  // Handle highlighted restaurant changes
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !highlightedRestaurant) return;

    // Get the highlighted marker
    const marker = markersRef.current[highlightedRestaurant.id];
    
    if (marker) {
      // Center map on the marker
      mapInstanceRef.current.panTo(
        new L.LatLng(
          highlightedRestaurant.coordinates.lat,
          highlightedRestaurant.coordinates.lng
        )
      );
      
      // Open popup
      marker.openPopup();
    }
  }, [highlightedRestaurant, mapLoaded]);

  return (
    <div className="map-container w-full h-full relative rounded-lg overflow-hidden shadow-md animate-scaleIn">
      <div ref={mapRef} className="w-full h-full"></div>
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="shimmer w-full h-full"></div>
        </div>
      )}
    </div>
  );
};

export default MapView;


import React, { useEffect, useRef, useState } from 'react';
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
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<{[key: string]: google.maps.Marker}>({});
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  // Load Google Maps
  useEffect(() => {
    const loadGoogleMaps = () => {
      // Check if Google Maps API is already loaded
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      // Load Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initGoogleMap`;
      script.async = true;
      script.defer = true;

      window.initGoogleMap = () => {
        initMap();
      };

      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current) return;

      // Create the map
      const mapOptions: google.maps.MapOptions = {
        center: officeLocation,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      };

      mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);
      infoWindowRef.current = new google.maps.InfoWindow();

      // Add office marker
      new google.maps.Marker({
        position: officeLocation,
        map: mapInstanceRef.current,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#3b82f6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
        },
        title: 'Office',
        zIndex: 1000
      });

      // Add restaurant markers
      restaurants.forEach(restaurant => {
        const category = categoryMap[restaurant.category];
        const marker = new google.maps.Marker({
          position: restaurant.coordinates,
          map: mapInstanceRef.current,
          title: restaurant.name,
          animation: google.maps.Animation.DROP
        });

        markersRef.current[restaurant.id] = marker;

        marker.addListener('click', () => {
          if (infoWindowRef.current) {
            infoWindowRef.current.setContent(`
              <div class="p-2">
                <h3 class="font-medium">${restaurant.name}</h3>
                <p class="text-sm text-gray-500">${category.label}</p>
                <a href="${restaurant.mapUrl}" target="_blank" class="text-blue-500 text-sm">Open in Google Maps</a>
              </div>
            `);
            infoWindowRef.current.open(mapInstanceRef.current, marker);
          }
        });
      });

      setMapLoaded(true);
    };

    loadGoogleMaps();

    return () => {
      // Cleanup
      if (window.google && window.google.maps) {
        Object.values(markersRef.current).forEach(marker => {
          marker.setMap(null);
        });
        markersRef.current = {};
      }
      
      // Remove callback
      if (window.initGoogleMap) {
        delete window.initGoogleMap;
      }
    };
  }, [restaurants, officeLocation]);

  // Handle highlighted restaurant changes
  useEffect(() => {
    if (!mapLoaded || !highlightedRestaurant) return;

    Object.values(markersRef.current).forEach(marker => {
      marker.setAnimation(null);
    });

    const marker = markersRef.current[highlightedRestaurant.id];
    if (marker) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo(marker.getPosition() as google.maps.LatLng);
      }

      // Stop animation after 2 seconds
      setTimeout(() => {
        marker.setAnimation(null);
      }, 2000);
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

// Add the window augmentation for TypeScript
declare global {
  interface Window {
    initGoogleMap: () => void;
    google: any;
  }
}

export default MapView;

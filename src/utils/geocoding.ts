import { Restaurant } from '../types/restaurant';
import { GOOGLE_MAPS_API_KEY, USE_GOOGLE_MAPS } from '../config/maps';

interface NominatimResponse {
  lat: string;
  lon: string;
}

interface GoogleGeocodingResult {
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      }
    }
  }>;
  status: string;
}

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
  try {
    const encodedAddress = encodeURIComponent(address);
    
    // Try OpenStreetMap Nominatim API first (unless Google is preferred)
    if (!USE_GOOGLE_MAPS) {
      try {
        const response = await fetch(`/nominatim/search?q=${encodedAddress}&format=json&limit=1`);
        
        if (response.ok) {
          const data = await response.json() as NominatimResponse[];
          
          if (data.length > 0) {
            return {
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon)
            };
          }
        }
      } catch (nominatimError) {
        console.warn('Nominatim geocoding failed, falling back to Google:', nominatimError);
      }
    }
    
    // Use Google Maps Geocoding API if preferred or as fallback
    if (USE_GOOGLE_MAPS || GOOGLE_MAPS_API_KEY) {
      const apiKeyParam = GOOGLE_MAPS_API_KEY ? `&key=${GOOGLE_MAPS_API_KEY}` : '';
      const googleResponse = await fetch(`/geocoding/json?address=${encodedAddress}${apiKeyParam}`);
      
      if (!googleResponse.ok) {
        throw new Error('Failed to geocode address with Google Maps API');
      }
      
      const googleData = await googleResponse.json() as GoogleGeocodingResult;
      
      if (googleData.status !== 'OK' || !googleData.results.length) {
        throw new Error('No results found for address with Google Maps API');
      }
      
      return googleData.results[0].geometry.location;
    }
    
    throw new Error('No geocoding service available');
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
}

export async function geocodeRestaurant(restaurant: Omit<Restaurant, 'coordinates'>): Promise<Restaurant> {
  const coordinates = await geocodeAddress(restaurant.address);
  return {
    ...restaurant,
    coordinates
  };
} 

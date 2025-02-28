import { Restaurant } from '../types/restaurant';
import { GOOGLE_MAPS_API_KEY, USE_GOOGLE_MAPS } from '../config/maps';
import { getFromCache, addToCache } from './geocodingCache';

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
    // Check cache first
    const cachedCoordinates = getFromCache(address);
    if (cachedCoordinates) {
      console.log('Using cached coordinates for:', address);
      return cachedCoordinates;
    }

    const encodedAddress = encodeURIComponent(address);
    let coordinates: { lat: number; lng: number } | null = null;
    
    // Try OpenStreetMap Nominatim API first (unless Google is preferred)
    if (!USE_GOOGLE_MAPS) {
      try {
        const response = await fetch(`/nominatim/search?q=${encodedAddress}&format=json&limit=1`);
        
        if (response.ok) {
          const data = await response.json() as NominatimResponse[];
          
          if (data.length > 0) {
            coordinates = {
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
    if (!coordinates && (USE_GOOGLE_MAPS || GOOGLE_MAPS_API_KEY)) {
      const apiKeyParam = GOOGLE_MAPS_API_KEY ? `&key=${GOOGLE_MAPS_API_KEY}` : '';
      const googleResponse = await fetch(`/geocoding/json?address=${encodedAddress}${apiKeyParam}`);
      
      if (googleResponse.ok) {
        const googleData = await googleResponse.json() as GoogleGeocodingResult;
        
        if (googleData.status === 'OK' && googleData.results.length > 0) {
          coordinates = googleData.results[0].geometry.location;
        }
      }
    }
    
    if (!coordinates) {
      throw new Error('Failed to geocode address with available services');
    }
    
    // Cache the result
    addToCache(address, coordinates);
    
    return coordinates;
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

// Batch geocode multiple restaurants with concurrency control
export async function batchGeocodeRestaurants(
  restaurants: Array<Omit<Restaurant, 'coordinates'>>,
  concurrency = 3
): Promise<Restaurant[]> {
  const results: Restaurant[] = [];
  const queue = [...restaurants];
  
  async function processQueue() {
    while (queue.length > 0) {
      const restaurant = queue.shift();
      if (!restaurant) continue;
      
      try {
        const geocodedRestaurant = await geocodeRestaurant(restaurant);
        results.push(geocodedRestaurant);
      } catch (error) {
        console.error(`Failed to geocode restaurant ${restaurant.name}:`, error);
        // Add with empty coordinates to avoid breaking the UI
        results.push({
          ...restaurant,
          coordinates: { lat: 0, lng: 0 }
        });
      }
    }
  }
  
  // Start multiple geocoding processes in parallel
  const processors = Array(Math.min(concurrency, restaurants.length))
    .fill(null)
    .map(() => processQueue());
  
  // Wait for all processors to complete
  await Promise.all(processors);
  
  return results;
}

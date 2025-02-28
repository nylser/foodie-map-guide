import { Restaurant } from '../types/restaurant';

interface NominatimResponse {
  lat: string;
  lon: string;
}

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(`/api/geocode?address=${encodedAddress}`);

    if (!response.ok) {
      throw new Error('Failed to geocode address');
    }

    const data = await response.json() as NominatimResponse[];
    
    if (!data.length) {
      throw new Error('No results found for address');
    }

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    };
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
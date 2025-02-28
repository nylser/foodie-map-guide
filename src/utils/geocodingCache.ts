interface GeocodingCacheEntry {
  lat: number;
  lng: number;
  timestamp: number;
}

// Cache expiration time in milliseconds (7 days)
const CACHE_EXPIRATION = 7 * 24 * 60 * 60 * 1000;

// Local storage key for the geocoding cache
const GEOCODING_CACHE_KEY = 'geocoding_cache';

/**
 * Get the geocoding cache from local storage
 */
export function getGeocodingCache(): Record<string, GeocodingCacheEntry> {
  try {
    const cacheJson = localStorage.getItem(GEOCODING_CACHE_KEY);
    return cacheJson ? JSON.parse(cacheJson) : {};
  } catch (error) {
    console.error('Error reading geocoding cache:', error);
    return {};
  }
}

/**
 * Save the geocoding cache to local storage
 */
export function saveGeocodingCache(cache: Record<string, GeocodingCacheEntry>): void {
  try {
    localStorage.setItem(GEOCODING_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error saving geocoding cache:', error);
  }
}

/**
 * Get coordinates from cache if available and not expired
 */
export function getFromCache(address: string): { lat: number; lng: number } | null {
  const cache = getGeocodingCache();
  const entry = cache[address];
  
  if (!entry) {
    return null;
  }
  
  // Check if the cache entry has expired
  const now = Date.now();
  if (now - entry.timestamp > CACHE_EXPIRATION) {
    // Remove expired entry
    delete cache[address];
    saveGeocodingCache(cache);
    return null;
  }
  
  return { lat: entry.lat, lng: entry.lng };
}

/**
 * Add coordinates to cache
 */
export function addToCache(address: string, coordinates: { lat: number; lng: number }): void {
  const cache = getGeocodingCache();
  
  cache[address] = {
    ...coordinates,
    timestamp: Date.now()
  };
  
  saveGeocodingCache(cache);
}

/**
 * Clear the entire geocoding cache
 */
export function clearGeocodingCache(): void {
  localStorage.removeItem(GEOCODING_CACHE_KEY);
}

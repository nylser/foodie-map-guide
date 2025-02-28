// Add your Google Maps API key here if you're using the Google Geocoding API
export const GOOGLE_MAPS_API_KEY = '';

// Set to true to use Google Maps API, false to use OpenStreetMap only
export const USE_GOOGLE_MAPS = false;

// Debug mode for geocoding
export const DEBUG_GEOCODING = true;

// Default coordinates to use when geocoding fails (to avoid breaking the UI)
// These are the coordinates for San Francisco
export const DEFAULT_COORDINATES = { lat: 37.7749, lng: -122.4194 };

// Maximum number of concurrent geocoding requests
export const MAX_CONCURRENT_GEOCODING = 3;

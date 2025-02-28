import { Restaurant, RestaurantCategoryMap } from '../types/restaurant';
import { geocodeRestaurant } from '../utils/geocoding';

const restaurantsData: Omit<Restaurant, 'coordinates'>[] = [
  {
    id: '1',
    name: 'La Commedia',
    mapUrl: 'https://maps.app.goo.gl/rqWrNF4K7AnfSyz6A',
    category: 'restaurant',
    address: 'Gögginger Str. 49, 86159 Augsburg'
  },
  {
    id: '2',
    name: 'Restaurant Doruk',
    mapUrl: 'https://maps.app.goo.gl/LhcqGRe1t3tWVMLj8',
    category: 'restaurant',
    address: 'Gögginger Str. 50, 86159 Augsburg'
  },
  {
    id: '3',
    name: 'Anh Thu',
    mapUrl: 'https://maps.app.goo.gl/q3qMSLR8voZyUG9v8',
    category: 'restaurant',
    address: 'Gögginger Str. 70, 86159 Augsburg'
  },
  {
    id: '4',
    name: 'Restaurant Antons',
    mapUrl: 'https://maps.app.goo.gl/uJv6BRFNKvoUBDXV7',
    category: 'restaurant',
    address: 'Sulzerstraße 20, 86159 Augsburg'
  },
  {
    id: '5',
    name: 'tegut',
    mapUrl: 'https://maps.app.goo.gl/L5BgxEfeWRxAyYnR7',
    category: 'grocery',
    address: 'Eichleitnerstraße 14, 86199 Augsburg'
  },
  {
    id: '6',
    name: 'Lidl',
    mapUrl: 'https://maps.app.goo.gl/5Lyfd5zYRKpRfmZn7',
    category: 'grocery',
    address: 'Eichleitnerstraße 10, 86199 Augsburg'
  },
  {
    id: '7',
    name: 'Drini market',
    mapUrl: 'https://maps.app.goo.gl/QoaTAeWt2SN7ECkB8',
    category: 'grocery',
    address: 'Gögginger Str. 91, 86199 Augsburg'
  },
  {
    id: '8',
    name: 'Schneider bakery',
    mapUrl: 'https://maps.app.goo.gl/ZXWfYGQNWNXPZR7B7',
    category: 'bakery',
    address: 'Gögginger Str. 93, 86199 Augsburg'
  },
  {
    id: '9',
    name: 'Wolf bakery',
    mapUrl: 'https://maps.app.goo.gl/CqZxabXMb2Uf1unS9',
    category: 'bakery',
    address: 'Schertlinstraße 19, 86159 Augsburg'
  },
  {
    id: '10',
    name: 'Café Cabresso',
    mapUrl: 'https://maps.app.goo.gl/izfYeqfG4MRPcUdj9',
    category: 'cafe',
    address: 'Gögginger Str. 90, 86199 Augsburg'
  },
  {
    id: '11',
    name: 'Dersim bakery',
    mapUrl: 'https://maps.app.goo.gl/572FxAtYUknuE2yr9',
    category: 'bakery',
    address: 'Gögginger Str. 35, 86159 Augsburg'
  },
  {
    id: '12',
    name: 'Cafè Cappuccin',
    mapUrl: 'https://maps.app.goo.gl/GbyG7Fa5kgh36Yz18',
    category: 'cafe',
    address: 'Gögginger Str. 104, 86199 Augsburg'
  }
];

export let restaurants: Restaurant[] = [];

export async function loadRestaurants(): Promise<Restaurant[]> {
  try {
    const geocodedRestaurants = await Promise.all(
      restaurantsData.map(restaurant => geocodeRestaurant(restaurant))
    );
    restaurants = geocodedRestaurants;
    return geocodedRestaurants;
  } catch (error) {
    console.error('Error loading restaurants:', error);
    throw error;
  }
}

export const categoryMap: RestaurantCategoryMap = {
  restaurant: {
    label: 'Restaurants',
    icon: 'utensils',
    color: 'bg-amber-100 text-amber-800'
  },
  grocery: {
    label: 'Grocery Stores',
    icon: 'shopping-cart',
    color: 'bg-emerald-100 text-emerald-800'
  },
  bakery: {
    label: 'Bakeries',
    icon: 'bread-slice',
    color: 'bg-orange-100 text-orange-800'
  },
  cafe: {
    label: 'Cafés',
    icon: 'coffee',
    color: 'bg-sky-100 text-sky-800'
  }
};

export const getCategoryRestaurants = (category: string) => {
  return restaurants.filter(r => r.category === category);
};

export const getOfficeCoordinates = () => ({
  lat: 48.3550,  // Center of the Augsburg area with our locations
  lng: 10.8857   // Center of the Augsburg area with our locations
});


import { Restaurant, RestaurantCategoryMap } from '../types/restaurant';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'La Commedia',
    mapUrl: 'https://maps.app.goo.gl/rqWrNF4K7AnfSyz6A',
    category: 'restaurant',
    address: 'Gögginger Str. 49, 86159 Augsburg',
    coordinates: {
      lat: 48.3558, 
      lng: 10.8868
    }
  },
  {
    id: '2',
    name: 'Restaurant Doruk',
    mapUrl: 'https://maps.app.goo.gl/LhcqGRe1t3tWVMLj8',
    category: 'restaurant',
    address: 'Gögginger Str. 50, 86159 Augsburg',
    coordinates: {
      lat: 48.3559, 
      lng: 10.8865
    }
  },
  {
    id: '3',
    name: 'Anh Thu',
    mapUrl: 'https://maps.app.goo.gl/q3qMSLR8voZyUG9v8',
    category: 'restaurant',
    address: 'Gögginger Str. 70, 86159 Augsburg',
    coordinates: {
      lat: 48.3545, 
      lng: 10.8852
    }
  },
  {
    id: '4',
    name: 'Restaurant Antons',
    mapUrl: 'https://maps.app.goo.gl/uJv6BRFNKvoUBDXV7',
    category: 'restaurant',
    address: 'Sulzerstraße 20, 86159 Augsburg',
    coordinates: {
      lat: 48.3563, 
      lng: 10.8859
    }
  },
  {
    id: '5',
    name: 'tegut',
    mapUrl: 'https://maps.app.goo.gl/L5BgxEfeWRxAyYnR7',
    category: 'grocery',
    address: 'Eichleitnerstraße 14, 86199 Augsburg',
    coordinates: {
      lat: 48.3522, 
      lng: 10.8858
    }
  },
  {
    id: '6',
    name: 'Lidl',
    mapUrl: 'https://maps.app.goo.gl/5Lyfd5zYRKpRfmZn7',
    category: 'grocery',
    address: 'Eichleitnerstraße 10, 86199 Augsburg',
    coordinates: {
      lat: 48.3520, 
      lng: 10.8861
    }
  },
  {
    id: '7',
    name: 'Drini market',
    mapUrl: 'https://maps.app.goo.gl/QoaTAeWt2SN7ECkB8',
    category: 'grocery',
    address: 'Gögginger Str. 91, 86199 Augsburg',
    coordinates: {
      lat: 48.3531, 
      lng: 10.8845
    }
  },
  {
    id: '8',
    name: 'Schneider bakery',
    mapUrl: 'https://maps.app.goo.gl/ZXWfYGQNWNXPZR7B7',
    category: 'bakery',
    address: 'Gögginger Str. 93, 86199 Augsburg',
    coordinates: {
      lat: 48.3529, 
      lng: 10.8844
    }
  },
  {
    id: '9',
    name: 'Wolf bakery',
    mapUrl: 'https://maps.app.goo.gl/CqZxabXMb2Uf1unS9',
    category: 'bakery',
    address: 'Schertlinstraße 19, 86159 Augsburg',
    coordinates: {
      lat: 48.3568, 
      lng: 10.8876
    }
  },
  {
    id: '10',
    name: 'Café Cabresso',
    mapUrl: 'https://maps.app.goo.gl/izfYeqfG4MRPcUdj9',
    category: 'cafe',
    address: 'Gögginger Str. 90, 86199 Augsburg',
    coordinates: {
      lat: 48.3532, 
      lng: 10.8846
    }
  },
  {
    id: '11',
    name: 'Dersim bakery',
    mapUrl: 'https://maps.app.goo.gl/572FxAtYUknuE2yr9',
    category: 'bakery',
    address: 'Gögginger Str. 35, 86159 Augsburg',
    coordinates: {
      lat: 48.3566, 
      lng: 10.8875
    }
  },
  {
    id: '12',
    name: 'Cafè Cappuccin',
    mapUrl: 'https://maps.app.goo.gl/GbyG7Fa5kgh36Yz18',
    category: 'cafe',
    address: 'Gögginger Str. 104, 86199 Augsburg',
    coordinates: {
      lat: 48.3520, 
      lng: 10.8839
    }
  }
];

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

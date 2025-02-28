
import { Restaurant, RestaurantCategoryMap } from '../types/restaurant';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'La Commedia',
    mapUrl: 'https://maps.app.goo.gl/rqWrNF4K7AnfSyz6A',
    category: 'restaurant',
    coordinates: {
      lat: 50.1112, 
      lng: 8.6837
    }
  },
  {
    id: '2',
    name: 'Restaurant Doruk',
    mapUrl: 'https://maps.app.goo.gl/LhcqGRe1t3tWVMLj8',
    category: 'restaurant',
    coordinates: {
      lat: 50.1089, 
      lng: 8.6860
    }
  },
  {
    id: '3',
    name: 'Anh Thu',
    mapUrl: 'https://maps.app.goo.gl/q3qMSLR8voZyUG9v8',
    category: 'restaurant',
    coordinates: {
      lat: 50.1092, 
      lng: 8.6826
    }
  },
  {
    id: '4',
    name: 'Restaurant Antons',
    mapUrl: 'https://maps.app.goo.gl/uJv6BRFNKvoUBDXV7',
    category: 'restaurant',
    coordinates: {
      lat: 50.1099, 
      lng: 8.6850
    }
  },
  {
    id: '5',
    name: 'tegut',
    mapUrl: 'https://maps.app.goo.gl/L5BgxEfeWRxAyYnR7',
    category: 'grocery',
    coordinates: {
      lat: 50.1079, 
      lng: 8.6845
    }
  },
  {
    id: '6',
    name: 'Lidl',
    mapUrl: 'https://maps.app.goo.gl/5Lyfd5zYRKpRfmZn7',
    category: 'grocery',
    coordinates: {
      lat: 50.1073, 
      lng: 8.6875
    }
  },
  {
    id: '7',
    name: 'Drini market',
    mapUrl: 'https://maps.app.goo.gl/QoaTAeWt2SN7ECkB8',
    category: 'grocery',
    coordinates: {
      lat: 50.1083, 
      lng: 8.6834
    }
  },
  {
    id: '8',
    name: 'Schneider bakery',
    mapUrl: 'https://maps.app.goo.gl/ZXWfYGQNWNXPZR7B7',
    category: 'bakery',
    coordinates: {
      lat: 50.1097, 
      lng: 8.6867
    }
  },
  {
    id: '9',
    name: 'Wolf backery',
    mapUrl: 'https://maps.app.goo.gl/CqZxabXMb2Uf1unS9',
    category: 'bakery',
    coordinates: {
      lat: 50.1086, 
      lng: 8.6843
    }
  },
  {
    id: '10',
    name: 'Café Cabresso',
    mapUrl: 'https://maps.app.goo.gl/izfYeqfG4MRPcUdj9',
    category: 'cafe',
    coordinates: {
      lat: 50.1101, 
      lng: 8.6832
    }
  },
  {
    id: '11',
    name: 'Dersim backery',
    mapUrl: 'https://maps.app.goo.gl/572FxAtYUknuE2yr9',
    category: 'bakery',
    coordinates: {
      lat: 50.1091, 
      lng: 8.6855
    }
  },
  {
    id: '12',
    name: 'Cafè Cappuccin',
    mapUrl: 'https://maps.app.goo.gl/GbyG7Fa5kgh36Yz18',
    category: 'cafe',
    coordinates: {
      lat: 50.1088, 
      lng: 8.6829
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
  lat: 50.1091,
  lng: 8.6844
});

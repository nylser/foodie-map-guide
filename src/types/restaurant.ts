
export interface Restaurant {
  id: string;
  name: string;
  mapUrl: string;
  category: 'restaurant' | 'grocery' | 'bakery' | 'cafe';
  coordinates: {
    lat: number;
    lng: number;
  };
  image?: string;
}

export interface RestaurantCategoryMap {
  [key: string]: {
    label: string;
    icon: string;
    color: string;
  };
}

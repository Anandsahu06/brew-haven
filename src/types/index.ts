export type CoffeeCategory = 'espresso' | 'pour-over' | 'cold-crafts' | 'artisan-bakery' | 'beans-merch' | 'signature-latte';

export interface MenuItem {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  price: number;
  category: CoffeeCategory;
  origin?: string;
  roastLevel?: 'Light' | 'Medium' | 'Dark' | 'Omni Roast';
  tags: string[];
  image: string;
  calories?: number;
  prepTime?: string;
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
}

export interface TasteProfile {
  body: number; // 1-100
  acidity: number;
  sweetness: number;
  aroma: number;
}

export interface CustomBrew {
  id: string;
  name: string;
  beanOrigin: string;
  roastLevel: string;
  grindSize: string;
  brewMethod: string;
  milkType: string;
  sweetener: string;
  addIns: string[];
  tasteProfile: TasteProfile;
  price: number;
}

export interface CartItem {
  cartId: string;
  item: MenuItem | CustomBrew;
  itemType: 'menu' | 'custom';
  quantity: number;
  formattedOptions?: string[];
  price: number;
}

export interface BeanOrigin {
  id: string;
  country: string;
  region: string;
  farm: string;
  altitude: string;
  cuppingScore: number;
  processMethod: string;
  notes: string[];
  tasteProfile: TasteProfile;
  roastingCurveData: { time: string; temp: number }[];
  description: string;
  image: string;
  coordinates: { x: number; y: number }; // Percentage offset for map node
}

export interface CafeLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  isOpenNow: boolean;
  seatingCapacity: number;
  currentOccupancy: number; // e.g. 68% full
  image: string;
  features: string[];
  coordinates: { lat: number; lng: number };
}

export interface ReservationData {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Window Bar' | 'Cozy Lounge' | 'Patio Garden' | 'Private Tasting Pod';
  specialRequests?: string;
  confirmationCode?: string;
}

export interface PaymentDetails {
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'applepay';
  cardName?: string;
  cardNumber?: string;
  upiId?: string;
}

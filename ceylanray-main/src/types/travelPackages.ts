// src/types/travelPackage.ts

export interface Offer {
    endDate: string;
    priceWithOffer: string;
    priceWithoutOffer: string;
  }
  
  export interface TravelPackage {
    id: string;
    name?: string;
    title?: string;
    description: string;
    price: string | number;
    duration: string;
    imageUrl?: string;
    category: string;
    inclusions?: string[] | string;
    interests?: string[] | string;
    inclutions?: string[] | string;
    offers?: Offer[];
    type?: 'with-offer' | 'without-offer';
  }
  
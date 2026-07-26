export interface MomoVariety {
  id: string;
  name: string;
  category: 'Veg' | 'Chicken' | 'Specialty';
  pricePerPcWholesale: number;
  recommendedRetailPrice: number;
  ingredients: string;
  packagingSize: string; // e.g. "Packet of 50 Pcs"
  image: string;
  isPopular?: boolean;
}

export interface QuoteRequest {
  name: string;
  whatsapp: string;
  businessName: string;
  location: string;
  shopType: 'Momo Stall' | 'Cafe' | 'Restaurant' | 'Cloud Kitchen' | 'Catering' | 'Other';
  requirements: string;
}

export interface VisitorProfile {
  businessName: string;
  contactName: string;
  phone: string;
  address: string;
  brandColor: string; // Hex code, e.g., '#dc2626'
  submittedAt: number | null; // Timestamp when submitted
}

export interface Order {
  id: string;
  createdAt: string;
  businessName: string;
  contactName: string;
  phone: string;
  location: string;
  shopType: string;
  requirements: string;
  estimatedTotal?: number;
  status: 'New' | 'Confirmed' | 'Out for Delivery' | 'Completed';
}

export interface SiteSettings {
  companyName: string;
  phone: string;
  address: string;
  fssaiNumber: string;
  defaultBrandColor: string;
  supportEmail: string;
}

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

export interface Testimonial {
  name: string;
  businessType: string;
  location: string;
  rating: number;
  quote: string;
  monthlySavings: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}


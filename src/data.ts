import { MomoVariety, Testimonial, FAQItem } from './types';

export const MOMO_VARIETIES: MomoVariety[] = [
  {
    id: 'veg-steamed',
    name: 'Classic Veg Steamed Momo',
    category: 'Veg',
    pricePerPcWholesale: 4.00,
    recommendedRetailPrice: 10.00,
    ingredients: 'Freshly minced cabbage, carrots, spring onions, and seasoned ginger-garlic paste.',
    packagingSize: 'Packet of 50 Pcs',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
    isPopular: true
  },
  {
    id: 'chicken-steamed',
    name: 'Premium Chicken Steamed Momo',
    category: 'Chicken',
    pricePerPcWholesale: 5.00,
    recommendedRetailPrice: 12.00,
    ingredients: 'Juicy minced chicken breast, light soy sauce, coriander, and native spices.',
    packagingSize: 'Packet of 50 Pcs',
    image: 'https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&q=80&w=600',
    isPopular: true
  },
  {
    id: 'paneer-steamed',
    name: 'Rich Paneer Steamed Momo',
    category: 'Veg',
    pricePerPcWholesale: 5.00,
    recommendedRetailPrice: 12.00,
    ingredients: 'Premium crumbled paneer, capsicum, mild spices, and freshly ground black pepper.',
    packagingSize: 'Packet of 50 Pcs',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=600',
    isPopular: false
  },
  {
    id: 'gondhoraj-chicken',
    name: 'Gondhoraj Lime Chicken Momo',
    category: 'Chicken',
    pricePerPcWholesale: 6.00,
    recommendedRetailPrice: 15.00,
    ingredients: 'A Kolkata favorite! Minced chicken infused with the aromatic juice and zest of Gondhoraj Lime.',
    packagingSize: 'Packet of 50 Pcs',
    image: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&q=80&w=600',
    isPopular: true
  },
  {
    id: 'cheese-corn-veg',
    name: 'Sweet Corn & Cheese Momo',
    category: 'Veg',
    pricePerPcWholesale: 6.00,
    recommendedRetailPrice: 15.00,
    ingredients: 'Mozzarella and cheddar cheese blend with sweet American golden corn kernels.',
    packagingSize: 'Packet of 50 Pcs',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600',
    isPopular: true
  },
  {
    id: 'schezwan-chicken',
    name: 'Hot Schezwan Chicken Momo',
    category: 'Chicken',
    pricePerPcWholesale: 5.50,
    recommendedRetailPrice: 14.00,
    ingredients: 'Spicy minced chicken cooked in mouth-numbing Schezwan sauce with red chillies.',
    packagingSize: 'Packet of 50 Pcs',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600',
    isPopular: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Abhijit Das',
    businessType: 'Momo Stall Owner',
    location: 'Gariahat, Kolkata',
    rating: 5,
    quote: 'Selling momos used to be stressful due to preparation time. Since partnering with TrySS, I get fresh raw momos delivered to my stall every morning. My sales have doubled and margins are excellent!',
    monthlySavings: '₹18,500'
  },
  {
    name: 'Priyanka Sen',
    businessType: 'Cafe Owner',
    location: 'Salt Lake Sector 5, Kolkata',
    rating: 5,
    quote: 'The Gondhoraj Lime Chicken momos from TrySS are an absolute hit among techies! Their consistency in size, shape, and taste is flawless. Highly recommend their wholesale supply service.',
    monthlySavings: '₹24,000'
  },
  {
    name: 'Rahul Shaw',
    businessType: 'Cloud Kitchen Operator',
    location: 'Howrah Maidan, Howrah',
    rating: 5,
    quote: 'Unbeatable pricing. Getting premium chicken momos at ₹5 wholesale allows us to run amazing combos on Zomato and Swiggy while maintaining a healthy 60%+ profit margin.',
    monthlySavings: '₹32,000'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'What is the minimum order quantity (MOQ) for wholesale delivery?',
    answer: 'Our standard minimum order is just 200 pieces (mix and match of any varieties). This is perfect for daily operations of stalls, small cafes, and food carts.'
  },
  {
    question: 'How do you ensure food safety and hygiene?',
    answer: 'Hygiene is our highest priority. All TrySS momos are prepared in an FSSAI-licensed, automated manufacturing unit. Our staff complies with strict sanitization protocols, and momos are blast-frozen immediately after molding to preserve absolute freshness.'
  },
  {
    question: 'Is delivery really free? Which areas do you cover?',
    answer: 'Yes, delivery is 100% free with no hidden charges. We currently deliver daily across Kolkata (Garia, Tolleygunge, Salt Lake, New Town, Behala, Dum Dum, North Kolkata) and Howrah (Howrah Maidan, Liluah, Shibpur, Salkia).'
  },
  {
    question: 'How are the momos delivered? Do I need high-end storage?',
    answer: 'We deliver momos in raw, frozen condition packed securely in food-grade insulation boxes with dry ice. You only need a standard domestic or commercial deep freezer to store them. They stay perfect for up to 30 days.'
  },
  {
    question: 'Can you manufacture custom momo recipes for my restaurant chain?',
    answer: 'Yes! For large volume clients and franchise networks (ordering >2000 pieces daily), we offer custom recipe formulation, custom weights (e.g. 20g vs 25g), and customized packaging.'
  },
  {
    question: 'What are the payment terms for regular partners?',
    answer: 'For your first few orders, we operate on Cash on Delivery (COD) or UPI on Delivery. For verified long-term partners who order daily, we offer weekly billing and line-of-credit facility.'
  }
];

export const SUPPORTED_AREAS = [
  'Salt Lake (Sec 1 to 5)',
  'New Town & Rajarhat',
  'Gariahat & Ballygunge',
  'Behala & Jadavpur',
  'Tollygunge & Garia',
  'Park Street & central Business District',
  'Dum Dum & Lake Town',
  'Howrah Maidan & Shibpur',
  'Liluah & Belur',
  'Salkia & Uttarpara'
];

// Colors
export const COLORS = {
  primary: '#1A73E8',
  secondary: '#34A853',
  accent: '#FBBC04',
  background: '#F8F9FA',
  textDark: '#202124',
  textLight: '#5F6368',
};

// Tour categories
export const TOUR_CATEGORIES = [
  'Adventure',
  'Beach',
  'City',
  'Cultural',
  'Eco-tourism',
  'Family',
  'Food & Wine',
  'Hiking',
  'Historical',
  'Luxury',
  'Nature',
  'Relaxation',
];

// Popular destinations
export const POPULAR_DESTINATIONS = [
  'Bali',
  'Paris',
  'Tokyo',
  'New York',
  'Santorini',
  'Barcelona',
  'Cairo',
  'Sydney',
];

// Booking statuses
export const BOOKING_STATUSES = {
  CONFIRMED: 'confirmed',
  PENDING: 'pending',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

// Application routes
export const ROUTES = {
  HOME: '/',
  TOURS: '/tours',
  TOUR_DETAILS: (id: number | string) => `/tours/${id}`,
  AUTH: '/auth',
  PROFILE: '/profile',
  BOOKINGS: '/bookings',
  DESTINATIONS: '/destinations',
  ABOUT: '/about',
  CONTACT: '/contact',
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  USERNAME_MIN_LENGTH: 'Username must be at least 3 characters',
  PHONE_INVALID: 'Please enter a valid phone number',
};

// Tour sorting options
export const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Duration: Shortest', value: 'duration-short' },
  { label: 'Duration: Longest', value: 'duration-long' },
  { label: 'Highest Rated', value: 'rating' },
];

// Number of travelers options
export const TRAVELERS_OPTIONS = [
  { label: '1 Adult', value: '1' },
  { label: '2 Adults', value: '2' },
  { label: '3 Adults', value: '3' },
  { label: '4 Adults', value: '4' },
  { label: '5 Adults', value: '5' },
  { label: '6+ Adults', value: '6' },
];

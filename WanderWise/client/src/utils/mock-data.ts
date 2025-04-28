// NOTE: This file is not used in production.
// The application uses real data from the API.
// This file is kept for reference purposes only.

import { 
  Tour,
  TourDate,
  Booking,
  Review,
  User
} from "@shared/schema";

// Sample tours data - NOT USED, actual data comes from API
export const SAMPLE_TOURS: Tour[] = [
  {
    id: 1,
    title: "Alpine Explorer: Swiss Alps Adventure",
    description: "Experience the breathtaking beauty of the Swiss Alps with guided hiking, cable car rides, and authentic local cuisine.",
    destination: "Switzerland",
    destinationCountry: "Switzerland",
    duration: 5,
    price: 1299,
    discountedPrice: 999,
    capacity: 12,
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80"
    ],
    transportation: "Train and private bus transfers",
    accommodation: "3-4 star alpine hotels",
    includesFood: true,
    itinerary: [
      "Day 1: Arrival in Zurich & Transfer to Interlaken. Welcome dinner with your tour group.",
      "Day 2: Cable car to Schilthorn summit (2,970m) for breathtaking views. Afternoon hike to Mürren village.",
      "Day 3: Alpine hiking and traditional Swiss cheese experience with fondue lunch.",
      "Day 4: Day trip to Lucerne. Explore medieval Old Town and boat cruise on Lake Lucerne.",
      "Day 5: Morning boat cruise on Lake Thun. Visit Thun Castle before departure."
    ],
    isAvailable: true,
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Bali Bliss: Island Paradise Tour",
    description: "Immerse yourself in Bali's beautiful beaches, ancient temples, and vibrant culture with our comprehensive island tour.",
    destination: "Bali",
    destinationCountry: "Indonesia",
    duration: 7,
    price: 1199,
    capacity: 15,
    featured: true,
    rating: 4.6,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80"
    ],
    transportation: "Private air-conditioned vehicle",
    accommodation: "4-star beach resorts",
    includesFood: true,
    itinerary: [
      "Day 1: Arrival in Denpasar. Transfer to Ubud with welcome dinner.",
      "Day 2: Explore Ubud's cultural sites, including Sacred Monkey Forest and Ubud Palace.",
      "Day 3: Visit Tegalalang Rice Terraces and local artisan villages.",
      "Day 4: Transfer to Seminyak beach area with afternoon at leisure.",
      "Day 5: Day trip to Uluwatu Temple and traditional Kecak fire dance performance.",
      "Day 6: Full day beach relaxation or optional water activities.",
      "Day 7: Morning visit to Tanah Lot temple before departure."
    ],
    isAvailable: true,
    createdAt: new Date()
  }
];

// Sample destinations data - NOT USED, actual data comes from API
export const SAMPLE_DESTINATIONS = [
  {
    destination: "Bali",
    country: "Indonesia",
    tourCount: 28,
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    rating: 4.8
  },
  {
    destination: "Paris",
    country: "France",
    tourCount: 42,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    rating: 4.7
  },
  {
    destination: "Santorini",
    country: "Greece",
    tourCount: 19,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    rating: 4.9
  },
  {
    destination: "Tokyo",
    country: "Japan",
    tourCount: 35,
    image: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    rating: 4.6
  }
];

// Sample tour dates - NOT USED, actual data comes from API
export const SAMPLE_TOUR_DATES: TourDate[] = [
  {
    id: 1,
    tourId: 1,
    startDate: new Date("2023-07-15"),
    endDate: new Date("2023-07-19"),
    availableSpots: 8,
    price: 1299,
    discountedPrice: 999
  },
  {
    id: 2,
    tourId: 1,
    startDate: new Date("2023-07-22"),
    endDate: new Date("2023-07-26"),
    availableSpots: 12,
    price: 1299,
    discountedPrice: 999
  },
  {
    id: 3,
    tourId: 1,
    startDate: new Date("2023-08-05"),
    endDate: new Date("2023-08-09"),
    availableSpots: 6,
    price: 1399,
    discountedPrice: 1099
  }
];

// Sample bookings - NOT USED, actual data comes from API
export const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 1,
    userId: 1,
    tourId: 1,
    tourDateId: 1,
    numberOfTravelers: 2,
    totalPrice: 1998,
    status: "confirmed",
    createdAt: new Date("2023-06-10")
  },
  {
    id: 2,
    userId: 1,
    tourId: 2,
    tourDateId: 3,
    numberOfTravelers: 1,
    totalPrice: 1199,
    status: "cancelled",
    createdAt: new Date("2023-05-22")
  }
];

// Sample reviews - NOT USED, actual data comes from API
export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 1,
    userId: 2,
    tourId: 1,
    rating: 5,
    comment: "Amazing experience! The views were breathtaking and our guide was very knowledgeable.",
    createdAt: new Date("2023-04-15")
  },
  {
    id: 2,
    userId: 3,
    tourId: 1,
    rating: 4,
    comment: "Great tour overall. The accommodations were excellent, though the schedule was a bit rushed.",
    createdAt: new Date("2023-03-22")
  }
];

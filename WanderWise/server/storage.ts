import { tours, users, bookings, reviews, tourDates } from "@shared/schema";
import type { 
  User, InsertUser, 
  Tour, InsertTour, 
  Booking, InsertBooking, 
  Review, InsertReview,
  TourDate, InsertTourDate
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Tour methods
  getTours(): Promise<Tour[]>;
  getTour(id: number): Promise<Tour | undefined>;
  searchTours(destination: string): Promise<Tour[]>;
  getFeaturedTours(): Promise<Tour[]>;
  getDestinations(): Promise<{ destination: string, country: string, tourCount: number, image: string, rating: number }[]>;
  
  // Tour dates methods
  getTourDates(tourId: number): Promise<TourDate[]>;
  getTourDate(id: number): Promise<TourDate | undefined>;
  
  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  // Review methods
  createReview(review: InsertReview): Promise<Review>;
  getReviewsByTour(tourId: number): Promise<Review[]>;
  
  // Session store for authentication
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tours: Map<number, Tour>;
  private tourDates: Map<number, TourDate>;
  private bookings: Map<number, Booking>;
  private reviews: Map<number, Review>;
  
  sessionStore: session.SessionStore;
  
  userIdCounter: number;
  tourIdCounter: number;
  tourDateIdCounter: number;
  bookingIdCounter: number;
  reviewIdCounter: number;

  constructor() {
    this.users = new Map();
    this.tours = new Map();
    this.tourDates = new Map();
    this.bookings = new Map();
    this.reviews = new Map();
    
    this.userIdCounter = 1;
    this.tourIdCounter = 1;
    this.tourDateIdCounter = 1;
    this.bookingIdCounter = 1;
    this.reviewIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // Clear expired sessions every 24h
    });
    
    // Initialize with some mock tour data
    this.initializeTours();
    this.initializeTourDates();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const createdAt = new Date();
    const user: User = { ...userData, id, createdAt };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Tour methods
  async getTours(): Promise<Tour[]> {
    return Array.from(this.tours.values());
  }
  
  async getTour(id: number): Promise<Tour | undefined> {
    return this.tours.get(id);
  }
  
  async searchTours(destination: string): Promise<Tour[]> {
    if (!destination) return this.getTours();
    
    return Array.from(this.tours.values()).filter(tour => 
      tour.destination.toLowerCase().includes(destination.toLowerCase()) || 
      tour.destinationCountry.toLowerCase().includes(destination.toLowerCase()) ||
      tour.title.toLowerCase().includes(destination.toLowerCase())
    );
  }
  
  async getFeaturedTours(): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(tour => tour.featured);
  }
  
  async getDestinations(): Promise<{ destination: string, country: string, tourCount: number, image: string, rating: number }[]> {
    const destinations = new Map<string, { 
      destination: string, 
      country: string, 
      tourCount: number, 
      image: string,
      rating: number
    }>();
    
    for (const tour of this.tours.values()) {
      const existingDestination = destinations.get(tour.destination);
      if (existingDestination) {
        existingDestination.tourCount++;
        // Update rating to be an average
        existingDestination.rating = (existingDestination.rating * (existingDestination.tourCount - 1) + (tour.rating || 0)) / existingDestination.tourCount;
      } else {
        destinations.set(tour.destination, {
          destination: tour.destination,
          country: tour.destinationCountry,
          tourCount: 1,
          image: tour.image,
          rating: tour.rating || 0
        });
      }
    }
    
    return Array.from(destinations.values());
  }
  
  // Tour dates methods
  async getTourDates(tourId: number): Promise<TourDate[]> {
    return Array.from(this.tourDates.values()).filter(
      (tourDate) => tourDate.tourId === tourId
    );
  }
  
  async getTourDate(id: number): Promise<TourDate | undefined> {
    return this.tourDates.get(id);
  }
  
  // Booking methods
  async createBooking(bookingData: InsertBooking): Promise<Booking> {
    const id = this.bookingIdCounter++;
    const createdAt = new Date();
    const booking: Booking = { ...bookingData, id, createdAt };
    this.bookings.set(id, booking);
    
    // Update available spots for the tour date
    const tourDate = await this.getTourDate(bookingData.tourDateId);
    if (tourDate) {
      tourDate.availableSpots -= bookingData.numberOfTravelers;
      this.tourDates.set(tourDate.id, tourDate);
    }
    
    return booking;
  }
  
  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }
  
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }
  
  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = await this.getBooking(id);
    if (!booking) return undefined;
    
    // If canceling a booking, increase available spots
    if (status === 'cancelled' && booking.status !== 'cancelled') {
      const tourDate = await this.getTourDate(booking.tourDateId);
      if (tourDate) {
        tourDate.availableSpots += booking.numberOfTravelers;
        this.tourDates.set(tourDate.id, tourDate);
      }
    }
    
    const updatedBooking = { ...booking, status };
    this.bookings.set(id, updatedBooking);
    
    return updatedBooking;
  }
  
  // Review methods
  async createReview(reviewData: InsertReview): Promise<Review> {
    const id = this.reviewIdCounter++;
    const createdAt = new Date();
    const review: Review = { ...reviewData, id, createdAt };
    this.reviews.set(id, review);
    
    // Update tour rating
    const tour = await this.getTour(reviewData.tourId);
    if (tour) {
      const reviews = await this.getReviewsByTour(reviewData.tourId);
      const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
      tour.rating = totalRating / reviews.length;
      tour.reviewCount = reviews.length;
      this.tours.set(tour.id, tour);
    }
    
    return review;
  }
  
  async getReviewsByTour(tourId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.tourId === tourId
    );
  }
  
  // Initial data setup
  private initializeTours() {
    const toursData: InsertTour[] = [
      {
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
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
          "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80"
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
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
          "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80"
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
      },
      {
        title: "Japan Heritage: Cultural Discovery",
        description: "Explore the perfect blend of ancient traditions and modern innovations across Tokyo, Kyoto, and rural Japan.",
        destination: "Tokyo",
        destinationCountry: "Japan",
        duration: 10,
        price: 2299,
        capacity: 14,
        featured: true,
        rating: 4.9,
        reviewCount: 76,
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
        galleryImages: [
          "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80",
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
          "https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
          "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80"
        ],
        transportation: "Bullet train (Shinkansen) and public transportation",
        accommodation: "Mix of traditional ryokans and modern hotels",
        includesFood: true,
        itinerary: [
          "Day 1-3: Tokyo exploration including Asakusa, Meiji Shrine, and modern districts.",
          "Day 4: Day trip to Mount Fuji and Hakone region.",
          "Day 5-7: Kyoto's temples, gardens, and traditional experiences.",
          "Day 8: Day trip to historic Nara.",
          "Day 9: Rural experience in Arashiyama bamboo forest.",
          "Day 10: Return to Tokyo for departure."
        ],
        isAvailable: true,
        createdAt: new Date()
      },
      {
        title: "Greek Island Hopping Adventure",
        description: "Discover the magic of the Greek islands with this perfect blend of history, cuisine, and stunning Mediterranean seascapes.",
        destination: "Santorini",
        destinationCountry: "Greece",
        duration: 8,
        price: 1599,
        capacity: 16,
        featured: false,
        rating: 4.7,
        reviewCount: 87,
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
        galleryImages: [
          "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80",
          "https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
          "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80"
        ],
        transportation: "Ferry transfers between islands",
        accommodation: "3-4 star island hotels with sea views",
        includesFood: true,
        itinerary: [
          "Day 1: Athens arrival and Acropolis visit.",
          "Day 2-3: Mykonos beaches and nightlife.",
          "Day 4-5: Santorini's famous caldera views and sunset in Oia.",
          "Day 6-7: Crete's historic sites and local cuisine.",
          "Day 8: Return to Athens for departure."
        ],
        isAvailable: true,
        createdAt: new Date()
      },
      {
        title: "Parisian Elegance: City of Lights Tour",
        description: "Immerse yourself in the elegance and romance of Paris with guided tours of iconic landmarks, art museums, and authentic French cuisine.",
        destination: "Paris",
        destinationCountry: "France",
        duration: 5,
        price: 1299,
        capacity: 20,
        featured: false,
        rating: 4.7,
        reviewCount: 112,
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
        galleryImages: [
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80",
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
          "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80"
        ],
        transportation: "Metro passes and walking tours",
        accommodation: "Charming Parisian hotels in central arrondissements",
        includesFood: true,
        itinerary: [
          "Day 1: Arrival and Seine River dinner cruise.",
          "Day 2: Eiffel Tower, Arc de Triomphe, and Champs-Élysées.",
          "Day 3: Louvre Museum and Montmartre walking tour.",
          "Day 4: Versailles Palace day trip.",
          "Day 5: Notre Dame area and Latin Quarter before departure."
        ],
        isAvailable: true,
        createdAt: new Date()
      },
      {
        title: "Thai Paradise: Bangkok & Beach Getaway",
        description: "Experience the best of Thailand with this perfect combination of Bangkok's vibrant city life and Phuket's tropical beaches.",
        destination: "Bangkok",
        destinationCountry: "Thailand",
        duration: 9,
        price: 1499,
        capacity: 18,
        featured: false,
        rating: 4.5,
        reviewCount: 92,
        image: "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
        galleryImages: [
          "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80",
          "https://images.unsplash.com/photo-1554194973-d1f1f360f3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
          "https://images.unsplash.com/photo-1546368399-42c67b42edb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80"
        ],
        transportation: "Internal flight and private transfers",
        accommodation: "4-star city hotel and beach resort",
        includesFood: true,
        itinerary: [
          "Day 1-3: Bangkok's Grand Palace, temples, and floating markets.",
          "Day 4-8: Phuket beaches, island hopping, and water activities.",
          "Day 9: Return to Bangkok for departure."
        ],
        isAvailable: true,
        createdAt: new Date()
      }
    ];
    
    toursData.forEach(tour => {
      const id = this.tourIdCounter++;
      const newTour: Tour = { ...tour, id };
      this.tours.set(id, newTour);
    });
  }
  
  private initializeTourDates() {
    const now = new Date();
    const tourDateData: InsertTourDate[] = [];
    
    // For each tour, create 4 future tour dates
    for (let i = 1; i <= this.tourIdCounter - 1; i++) {
      const tour = this.tours.get(i);
      if (!tour) continue;
      
      for (let j = 0; j < 4; j++) {
        const startDate = new Date(now);
        startDate.setDate(startDate.getDate() + 14 + (j * 7)); // Start in 2 weeks, then weekly
        
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + tour.duration);
        
        tourDateData.push({
          tourId: i,
          startDate,
          endDate,
          availableSpots: tour.capacity,
          price: tour.price,
          discountedPrice: tour.discountedPrice
        });
      }
    }
    
    tourDateData.forEach(tourDate => {
      const id = this.tourDateIdCounter++;
      const newTourDate: TourDate = { ...tourDate, id };
      this.tourDates.set(id, newTourDate);
    });
  }
}

export const storage = new MemStorage();

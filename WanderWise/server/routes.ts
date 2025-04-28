import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertBookingSchema, insertReviewSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Get all tours
  app.get("/api/tours", async (req: Request, res: Response) => {
    try {
      const tours = await storage.getTours();
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tours" });
    }
  });

  // Search tours
  app.get("/api/tours/search", async (req: Request, res: Response) => {
    try {
      const { destination } = req.query;
      const tours = await storage.searchTours(destination as string);
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to search tours" });
    }
  });

  // Get featured tours
  app.get("/api/tours/featured", async (req: Request, res: Response) => {
    try {
      const tours = await storage.getFeaturedTours();
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured tours" });
    }
  });

  // Get popular destinations
  app.get("/api/destinations", async (req: Request, res: Response) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });

  // Get single tour
  app.get("/api/tours/:id", async (req: Request, res: Response) => {
    try {
      const tour = await storage.getTour(parseInt(req.params.id, 10));
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }
      res.json(tour);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tour" });
    }
  });

  // Get tour dates for a tour
  app.get("/api/tours/:id/dates", async (req: Request, res: Response) => {
    try {
      const tourDates = await storage.getTourDates(parseInt(req.params.id, 10));
      res.json(tourDates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tour dates" });
    }
  });

  // Get reviews for a tour
  app.get("/api/tours/:id/reviews", async (req: Request, res: Response) => {
    try {
      const reviews = await storage.getReviewsByTour(parseInt(req.params.id, 10));
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  // Create a booking (protected)
  app.post("/api/bookings", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to book a tour" });
    }

    try {
      const bookingData = insertBookingSchema.parse({
        ...req.body,
        userId: req.user?.id
      });

      // Check if tour date exists and has enough spots
      const tourDate = await storage.getTourDate(bookingData.tourDateId);
      if (!tourDate) {
        return res.status(404).json({ message: "Tour date not found" });
      }

      if (tourDate.availableSpots < bookingData.numberOfTravelers) {
        return res.status(400).json({ message: "Not enough spots available" });
      }

      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  // Get user's bookings (protected)
  app.get("/api/bookings", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to view your bookings" });
    }

    try {
      const bookings = await storage.getBookingsByUser(req.user?.id);
      
      // Get tour info for each booking
      const enrichedBookings = await Promise.all(
        bookings.map(async (booking) => {
          const tour = await storage.getTour(booking.tourId);
          const tourDate = await storage.getTourDate(booking.tourDateId);
          return { ...booking, tour, tourDate };
        })
      );
      
      res.json(enrichedBookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  // Cancel a booking (protected)
  app.post("/api/bookings/:id/cancel", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to cancel a booking" });
    }

    try {
      const bookingId = parseInt(req.params.id, 10);
      const booking = await storage.getBooking(bookingId);

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      if (booking.userId !== req.user?.id) {
        return res.status(403).json({ message: "You can only cancel your own bookings" });
      }

      const updatedBooking = await storage.updateBookingStatus(bookingId, "cancelled");
      res.json(updatedBooking);
    } catch (error) {
      res.status(500).json({ message: "Failed to cancel booking" });
    }
  });

  // Add a review (protected)
  app.post("/api/tours/:id/reviews", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to leave a review" });
    }

    try {
      const tourId = parseInt(req.params.id, 10);
      const reviewData = insertReviewSchema.parse({
        ...req.body,
        userId: req.user?.id,
        tourId
      });

      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Update user profile (protected)
  app.put("/api/user/profile", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to update your profile" });
    }

    try {
      const { firstName, lastName, phoneNumber } = req.body;
      
      const updatedUser = await storage.updateUser(req.user?.id, {
        firstName,
        lastName,
        phoneNumber
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

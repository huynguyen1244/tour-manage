import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phoneNumber: text("phone_number"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  destination: text("destination").notNull(),
  destinationCountry: text("destination_country").notNull(),
  duration: integer("duration").notNull(), // in days
  price: doublePrecision("price").notNull(),
  discountedPrice: doublePrecision("discounted_price"),
  capacity: integer("capacity").notNull(),
  featured: boolean("featured").default(false),
  rating: doublePrecision("rating"),
  reviewCount: integer("review_count").default(0),
  image: text("image").notNull(),
  galleryImages: text("gallery_images").array(),
  transportation: text("transportation"),
  accommodation: text("accommodation"),
  includesFood: boolean("includes_food").default(false),
  itinerary: text("itinerary").array(),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tourDates = pgTable("tour_dates", {
  id: serial("id").primaryKey(),
  tourId: integer("tour_id").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  availableSpots: integer("available_spots").notNull(),
  price: doublePrecision("price").notNull(),
  discountedPrice: doublePrecision("discounted_price"),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  tourId: integer("tour_id").notNull(),
  tourDateId: integer("tour_date_id").notNull(),
  numberOfTravelers: integer("number_of_travelers").notNull(),
  totalPrice: doublePrecision("total_price").notNull(),
  status: text("status").notNull().default("confirmed"), // confirmed, cancelled, completed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  tourId: integer("tour_id").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  phoneNumber: true,
});

export const insertTourSchema = createInsertSchema(tours);
export const insertTourDateSchema = createInsertSchema(tourDates);
export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});
export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Tour = typeof tours.$inferSelect;
export type InsertTour = z.infer<typeof insertTourSchema>;

export type TourDate = typeof tourDates.$inferSelect;
export type InsertTourDate = z.infer<typeof insertTourDateSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

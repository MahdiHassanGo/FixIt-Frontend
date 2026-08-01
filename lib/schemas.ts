import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  location: z.string().optional(),
  role: z.enum(["CUSTOMER", "TECHNICIAN"]),
});

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  location: z.string().optional(),
});

export const bookingSchema = z.object({
  serviceId: z.string().uuid(),
  scheduledAt: z.string().datetime("Choose a valid date and time"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  note: z.string().optional(),
});

export const reviewSchema = z.object({
  bookingId: z.string().uuid(),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

export const technicianProfileSchema = z.object({
  bio: z.string().max(1500).optional(),
  skills: z.string().min(2, "Enter at least one skill"),
  experienceYears: z.coerce.number().int().nonnegative(),
  pricePerHour: z.coerce.number().nonnegative(),
  location: z.string().optional(),
});

export const serviceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(1, "Price must be at least 1"),
  location: z.string().optional(),
  categoryId: z.string().uuid("Select a category"),
  isActive: z.boolean().optional(),
});

export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
});


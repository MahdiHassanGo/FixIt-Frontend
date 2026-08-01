import type { LucideIcon } from "lucide-react";

export type Role = "CUSTOMER" | "TECHNICIAN" | "ADMIN";
export type ActiveStatus = "ACTIVE" | "BLOCKED";
export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
export type DayOfWeek =
  | "SATURDAY"
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY";

export type ApiMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type ApiResponse<T> = {
  success: boolean;
  statusCode?: number;
  message: string;
  data: T;
  meta?: ApiMeta;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errorDetails?: unknown;
};

export type TechnicianProfile = {
  id: string;
  userId: string;
  bio: string | null;
  skills: string[];
  experienceYears: number;
  pricePerHour: string | number;
  location: string | null;
  rating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  user?: UserSummary;
  services?: Service[];
  availability?: Availability[];
  reviews?: Review[];
};

export type UserSummary = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  activeStatus?: ActiveStatus;
};

export type User = UserSummary & {
  role: Role;
  activeStatus: ActiveStatus;
  createdAt: string;
  updatedAt: string;
  technicianProfile?: TechnicianProfile | null;
};

export type Category = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  price: string | number;
  location: string | null;
  isActive: boolean;
  categoryId: string;
  technicianId: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  technician?: TechnicianProfile;
};

export type Availability = {
  id: string;
  technicianId: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  customer?: Pick<UserSummary, "id" | "name">;
};

export type Payment = {
  id: string;
  bookingId: string;
  userId: string;
  transactionId: string;
  provider: "STRIPE";
  amount: string | number;
  currency: string;
  status: PaymentStatus;
  stripeSessionId: string | null;
  checkoutUrl: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  booking?: Booking;
  user?: UserSummary;
};

export type Booking = {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  scheduledAt: string;
  address: string;
  note: string | null;
  status: BookingStatus;
  totalAmount: string | number;
  createdAt: string;
  updatedAt: string;
  customer?: UserSummary;
  technician?: TechnicianProfile;
  service?: Service;
  payment?: Payment | null;
  review?: Review | null;
};

export type ActionState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
  checkoutUrl?: string;
} | null;

export type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};


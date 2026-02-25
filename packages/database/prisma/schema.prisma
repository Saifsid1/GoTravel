generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  USER
  ADMIN
  SUPER_ADMIN
}

enum PackageType {
  GROUP
  FIT
  CUSTOM
}

enum FITAddOnCategory {
  ACTIVITY
  TRANSPORT
  ACCOMMODATION
  MEAL
  EXPERIENCE
}

enum BookingStatus {
  ENQUIRY
  CONFIRMED
  PAID
  CANCELLED
  COMPLETED
}

enum LeadStatus {
  NEW
  CONTACTED
  CONVERTED
  LOST
}

enum VendorType {
  HOTEL
  TRANSPORT
  ACTIVITY
  RESTAURANT
  GUIDE
}

enum ContractStatus {
  ACTIVE
  INACTIVE
  PENDING
}

enum VendorSource {
  MANUAL
  SCRAPED_GOOGLE
}

enum NotificationType {
  LEAD
  BOOKING
  PAYMENT
  ENQUIRY
}

model User {
  id          String   @id @default(cuid())
  email       String   @unique
  phone       String?
  name        String?
  avatar      String?
  role        UserRole @default(USER)
  googleId    String?  @unique
  password    String?
  preferences Json?
  utmSource   String?
  utmMedium   String?
  utmCampaign String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  bookings      Booking[]
  leads         Lead[]
  blogPosts     BlogPost[]
  notifications AdminNotification[] @relation("RelatedUser")
}

model Destination {
  id               String   @id @default(cuid())
  slug             String   @unique
  name             String
  state            String
  city             String
  country          String   @default("India")
  description      String
  shortDescription String
  heroImage        String
  galleryImages    String[]
  latitude         Float?
  longitude        Float?
  bestTimeToVisit  String?
  weatherInfo      String?
  tags             String[]
  categories       String[]
  basePricePerPerson Int
  isFeatured       Boolean  @default(false)
  isActive         Boolean  @default(true)
  seoTitle         String?
  seoDescription   String?
  seoKeywords      String[]
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  packages   Package[]
  fitAddOns  FITAddOn[]
  leads      Lead[]
  vendors    Vendor[]
}

model Package {
  id              String      @id @default(cuid())
  destinationId   String
  name            String
  slug            String      @unique
  type            PackageType @default(GROUP)
  durationDays    Int
  durationNights  Int
  basePrice       Int
  discountedPrice Int?
  inclusions      String[]
  exclusions      String[]
  highlights      String[]
  maxGroupSize    Int?
  minGroupSize    Int?
  difficultyLevel String?
  isActive        Boolean     @default(true)
  isFeatured      Boolean     @default(false)
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  destination Destination  @relation(fields: [destinationId], references: [id])
  itineraries Itinerary[]
  bookings    Booking[]
}

model Itinerary {
  id                 String   @id @default(cuid())
  packageId          String
  dayNumber          Int
  title              String
  description        String
  activities         Json
  mealsIncluded      String[]
  accommodationType  String?
  distanceKm         Float?
  images             String[]

  package Package @relation(fields: [packageId], references: [id])
}

model FITAddOn {
  id            String           @id @default(cuid())
  destinationId String
  name          String
  description   String
  category      FITAddOnCategory
  pricePerPerson Int
  durationHours Float?
  images        String[]
  locationName  String?
  latitude      Float?
  longitude     Float?
  aiTags        String[]
  isAvailable   Boolean          @default(true)
  isPopular     Boolean          @default(false)
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt

  destination Destination @relation(fields: [destinationId], references: [id])
}

model Booking {
  id                 String        @id @default(cuid())
  userId             String
  packageId          String
  bookingRef         String        @unique @default(cuid())
  status             BookingStatus @default(ENQUIRY)
  travelDate         DateTime
  returnDate         DateTime?
  numAdults          Int           @default(1)
  numChildren        Int           @default(0)
  totalAmount        Int
  paidAmount         Int           @default(0)
  selectedFitAddons  Json?
  specialRequests    String?
  assignedAgentId    String?
  createdAt          DateTime      @default(now())
  updatedAt          DateTime      @updatedAt

  user     User      @relation(fields: [userId], references: [id])
  package  Package   @relation(fields: [packageId], references: [id])
  payments Payment[]
  notifications AdminNotification[] @relation("RelatedBooking")
}

model Payment {
  id                String   @id @default(cuid())
  bookingId         String
  razorpayOrderId   String?
  razorpayPaymentId String?
  amount            Int
  currency          String   @default("INR")
  status            String
  paymentMethod     String?
  createdAt         DateTime @default(now())

  booking Booking @relation(fields: [bookingId], references: [id])
}

model Lead {
  id            String     @id @default(cuid())
  userId        String?
  destinationId String?
  sourcePage    String?
  utmSource     String?
  utmMedium     String?
  userName      String
  userEmail     String
  userPhone     String?
  message       String?
  status        LeadStatus @default(NEW)
  assignedTo    String?
  notifiedAt    DateTime?
  contactedAt   DateTime?
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt

  user        User?        @relation(fields: [userId], references: [id])
  destination Destination? @relation(fields: [destinationId], references: [id])
}

model Vendor {
  id                  String         @id @default(cuid())
  name                String
  type                VendorType
  destinationId       String?
  address             String?
  city                String?
  state               String?
  phone               String?
  email               String?
  website             String?
  googleMapsUrl       String?
  googlePlaceId       String?
  rating              Float?
  reviewCount         Int?
  priceRange          String?
  contactPersonName   String?
  contactPersonPhone  String?
  contractStatus      ContractStatus @default(PENDING)
  notes               String?
  source              VendorSource   @default(MANUAL)
  createdAt           DateTime       @default(now())
  updatedAt           DateTime       @updatedAt

  destination Destination? @relation(fields: [destinationId], references: [id])
}

model AdminNotification {
  id               String           @id @default(cuid())
  type             NotificationType
  title            String
  message          String
  data             Json?
  isRead           Boolean          @default(false)
  createdAt        DateTime         @default(now())
  relatedUserId    String?
  relatedBookingId String?

  relatedUser    User?    @relation("RelatedUser", fields: [relatedUserId], references: [id])
  relatedBooking Booking? @relation("RelatedBooking", fields: [relatedBookingId], references: [id])
}

model BlogPost {
  id             String    @id @default(cuid())
  slug           String    @unique
  title          String
  content        String
  excerpt        String?
  featuredImage  String?
  tags           String[]
  seoTitle       String?
  seoDescription String?
  isPublished    Boolean   @default(false)
  publishedAt    DateTime?
  authorId       String
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  author User @relation(fields: [authorId], references: [id])
}

model Testimonial {
  id          String   @id @default(cuid())
  userName    String
  userAvatar  String?
  rating      Int
  review      String
  destination String?
  createdAt   DateTime @default(now())
  isActive    Boolean  @default(true)
}

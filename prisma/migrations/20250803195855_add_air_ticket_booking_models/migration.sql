-- CreateTable
CREATE TABLE "AirTicketBooking" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bookingMode" TEXT NOT NULL,
    "tripType" TEXT NOT NULL,
    "flightClass" TEXT NOT NULL,
    "departureCity" TEXT NOT NULL,
    "arrivalCity" TEXT NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3),
    "adults" INTEGER NOT NULL DEFAULT 1,
    "children" INTEGER NOT NULL DEFAULT 0,
    "totalPassengers" INTEGER NOT NULL,
    "specialAssistance" TEXT,
    "mealPreference" TEXT,

    CONSTRAINT "AirTicketBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passenger" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "passport" TEXT NOT NULL,
    "airTicketBookingId" TEXT NOT NULL,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Passenger" ADD CONSTRAINT "Passenger_airTicketBookingId_fkey" FOREIGN KEY ("airTicketBookingId") REFERENCES "AirTicketBooking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "PackageWithoutOffers" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "interests" TEXT[],
    "inclusions" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackageWithoutOffers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageBooking" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT,
    "packageId" TEXT NOT NULL,
    "packageWithOffersId" TEXT,

    CONSTRAINT "PackageBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL,
    "destination_id" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "destination_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotelBooking" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "hotel_name" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "roomType" TEXT NOT NULL,
    "numGuests" TEXT NOT NULL,
    "specialRequests" TEXT,

    CONSTRAINT "HotelBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "image" TEXT,
    "roomType" TEXT,
    "starRating" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "price" DOUBLE PRECISION,
    "hotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageWithOffers" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priceWithOffer" TEXT NOT NULL,
    "priceWithoutOffer" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "duration" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "interests" TEXT NOT NULL,
    "inclutions" TEXT NOT NULL,

    CONSTRAINT "PackageWithOffers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllPackages" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "packageWithOffersId" TEXT,
    "packageWithoutOffersId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AllPackages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Destination_destination_id_key" ON "Destination"("destination_id");

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_name_key" ON "Hotel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "PackageBooking" ADD CONSTRAINT "PackageBooking_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "PackageWithoutOffers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageBooking" ADD CONSTRAINT "PackageBooking_packageWithOffersId_fkey" FOREIGN KEY ("packageWithOffersId") REFERENCES "PackageWithOffers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllPackages" ADD CONSTRAINT "AllPackages_packageWithOffersId_fkey" FOREIGN KEY ("packageWithOffersId") REFERENCES "PackageWithOffers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllPackages" ADD CONSTRAINT "AllPackages_packageWithoutOffersId_fkey" FOREIGN KEY ("packageWithoutOffersId") REFERENCES "PackageWithoutOffers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

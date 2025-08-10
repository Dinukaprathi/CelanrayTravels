-- AlterTable
ALTER TABLE "AirTicketBooking" ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "HotelBooking" ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PackageBooking" ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

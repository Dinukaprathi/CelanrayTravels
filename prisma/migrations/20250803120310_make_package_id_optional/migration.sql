-- DropForeignKey
ALTER TABLE "PackageBooking" DROP CONSTRAINT "PackageBooking_packageId_fkey";

-- AlterTable
ALTER TABLE "PackageBooking" ALTER COLUMN "packageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PackageBooking" ADD CONSTRAINT "PackageBooking_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "PackageWithoutOffers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

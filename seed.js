const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🧹 Clearing existing data...');
  await prisma.passenger.deleteMany();
  await prisma.airTicketBooking.deleteMany();
  await prisma.packageBooking.deleteMany();
  await prisma.allPackages.deleteMany();
  await prisma.packageWithOffers.deleteMany();
  await prisma.packageWithoutOffers.deleteMany();
  await prisma.room.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.hotelBooking.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.admin.deleteMany();

  console.log('✅ Database cleared');

  // Create Admin - Use environment variables for security
  console.log('👤 Creating admin user...');
  const adminEmail = process.env.ADMIN_EMAIL || 'lahirumanchanayake@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Lahiru@123';
  const adminName = process.env.ADMIN_NAME || 'Celanray Admin';
  
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const admin = await prisma.admin.create({
    data: {
      id: 'admin-001',
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
      updatedAt: new Date(),
    },
  });
  console.log('✅ Admin created:', admin.email);
  console.log('⚠️  Remember to change the default password in production!');

  // Create Destinations
  console.log('🗺️ Creating destinations...');
  const destinations = await Promise.all([
    prisma.destination.create({
      data: {
        destination_id: 'D001',
        destination: 'Central Province, Matale District',
        destination_name: 'Sigiriya',
        description: 'Sigiriya, also known as Lion Rock, is an ancient palace and fortress complex built on top of a massive rock. This UNESCO World Heritage site offers breathtaking views and fascinating ancient architecture.',
        image_url: '/home/recommended/sigiriya.webp',
      },
    }),
    prisma.destination.create({
      data: {
        destination_id: 'D002',
        destination: 'Uva Province, Badulla District',
        destination_name: 'Ella',
        description: 'Ella is a serene mountain gem nestled amidst mist-shrouded peaks and lush tea estates, offering travelers a breathtaking blend of nature and culture.',
        image_url: 'https://images.unsplash.com/photo-1580794749460-76f97b7180d8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    }),
    prisma.destination.create({
      data: {
        destination_id: 'D003',
        destination: 'Southern Province, Hambantota District',
        destination_name: 'Yala',
        description: 'Yala National Park beckons with wildlife adventures through its varied landscapes of dry forest, wetlands, and coastline.',
        image_url: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    }),
    prisma.destination.create({
      data: {
        destination_id: 'D004',
        destination: 'Southern Province, Matara District',
        destination_name: 'Mirissa',
        description: 'Mirissa Beach is a tropical sanctuary where golden sands softly meet the turquoise expanse, and vibrant marine life beckons just offshore.',
        image_url: 'https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    }),
    prisma.destination.create({
      data: {
        destination_id: 'D005',
        destination: 'Central Province, Kandy District',
        destination_name: 'Temple of Sacred Tooth Relic',
        description: 'The Temple of the Sacred Tooth Relic is the spiritual heartbeat of Kandy, housing a revered relic believed to be a tooth of the Buddha.',
        image_url: 'https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    }),
  ]);
  console.log('✅ Created', destinations.length, 'destinations');

  // Create Hotels
  console.log('🏨 Creating hotels...');
  const hotels = await Promise.all([
    prisma.hotel.create({
      data: {
        name: 'Cinnamon Grand Colombo',
        location: 'Colombo, Western Province',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        roomType: 'Luxury',
        starRating: '5',
        roomTypes: ['Deluxe', 'Suite', 'Presidential Suite'],
      },
    }),
    prisma.hotel.create({
      data: {
        name: 'Heritance Kandalama',
        location: 'Dambulla, Central Province',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        roomType: 'Eco-Luxury',
        starRating: '5',
        roomTypes: ['Garden View', 'Lake View', 'Suite'],
      },
    }),
    prisma.hotel.create({
      data: {
        name: 'Jetwing Yala',
        location: 'Yala, Southern Province',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        roomType: 'Wildlife Lodge',
        starRating: '4',
        roomTypes: ['Standard', 'Deluxe', 'Family Suite'],
      },
    }),
  ]);
  console.log('✅ Created', hotels.length, 'hotels');

  // Create Rooms for each hotel
  console.log('🛏️ Creating rooms...');
  const rooms = [];
  for (const hotel of hotels) {
    const hotelRooms = await Promise.all([
      prisma.room.create({
        data: {
          name: 'Standard Room',
          type: 'Standard',
          price: 150.00,
          hotelId: hotel.id,
        },
      }),
      prisma.room.create({
        data: {
          name: 'Deluxe Room',
          type: 'Deluxe',
          price: 250.00,
          hotelId: hotel.id,
        },
      }),
      prisma.room.create({
        data: {
          name: 'Suite',
          type: 'Suite',
          price: 450.00,
          hotelId: hotel.id,
        },
      }),
    ]);
    rooms.push(...hotelRooms);
  }
  console.log('✅ Created', rooms.length, 'rooms');

  // Create PackageWithoutOffers
  console.log('📦 Creating packages without offers...');
  const packagesWithoutOffers = await Promise.all([
    prisma.packageWithoutOffers.create({
      data: {
        title: 'Cultural Heritage Tour',
        description: 'Explore the ancient cities and temples of Sri Lanka',
        image: 'https://images.unsplash.com/photo-1621393614326-2f9ed389ce02?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: '$899',
        duration: '7 days',
        category: 'Cultural',
        interests: ['History', 'Architecture', 'Religion'],
        inclusions: ['Accommodation', 'Transport', 'Guide', 'Meals'],
      },
    }),
    prisma.packageWithoutOffers.create({
      data: {
        title: 'Wildlife Safari Adventure',
        description: 'Experience the diverse wildlife of Sri Lanka\'s national parks',
        image: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: '$699',
        duration: '5 days',
        category: 'Wildlife',
        interests: ['Wildlife', 'Nature', 'Photography'],
        inclusions: ['Safari Tours', 'Accommodation', 'Transport', 'Guide'],
      },
    }),
  ]);
  console.log('✅ Created', packagesWithoutOffers.length, 'packages without offers');

  // Create PackageWithOffers
  console.log('🎯 Creating packages with offers...');
  const packagesWithOffers = await Promise.all([
    prisma.packageWithOffers.create({
      data: {
        title: 'Beach Paradise Package',
        description: 'Relax on pristine beaches with luxury accommodation',
        priceWithOffer: '$799',
        priceWithoutOffer: '$999',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-12-31'),
        duration: '6 days',
        imageURL: 'https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Beach',
        interests: 'Relaxation',
        inclutions: 'All Inclusive',
      },
    }),
    prisma.packageWithOffers.create({
      data: {
        title: 'Tea Country Experience',
        description: 'Discover the world-famous Ceylon tea plantations',
        priceWithOffer: '$599',
        priceWithoutOffer: '$749',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-12-31'),
        duration: '4 days',
        imageURL: 'https://images.unsplash.com/photo-1586193804147-64d5c02ef9c1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Cultural',
        interests: 'Tea Culture',
        inclutions: 'Half Board',
      },
    }),
  ]);
  console.log('✅ Created', packagesWithOffers.length, 'packages with offers');

  // Create AllPackages
  console.log('📋 Creating all packages...');
  const allPackages = await Promise.all([
    prisma.allPackages.create({
      data: {
        title: 'Cultural Heritage Tour',
        description: 'Explore the ancient cities and temples of Sri Lanka',
        type: 'Cultural',
        packageWithoutOffersId: packagesWithoutOffers[0].id,
      },
    }),
    prisma.allPackages.create({
      data: {
        title: 'Wildlife Safari Adventure',
        description: 'Experience the diverse wildlife of Sri Lanka\'s national parks',
        type: 'Wildlife',
        packageWithoutOffersId: packagesWithoutOffers[1].id,
      },
    }),
    prisma.allPackages.create({
      data: {
        title: 'Beach Paradise Package',
        description: 'Relax on pristine beaches with luxury accommodation',
        type: 'Beach',
        packageWithOffersId: packagesWithOffers[0].id,
      },
    }),
    prisma.allPackages.create({
      data: {
        title: 'Tea Country Experience',
        description: 'Discover the world-famous Ceylon tea plantations',
        type: 'Cultural',
        packageWithOffersId: packagesWithOffers[1].id,
      },
    }),
  ]);
  console.log('✅ Created', allPackages.length, 'all packages');

  // Create Sample Bookings
  console.log('📝 Creating sample bookings...');
  const bookings = await Promise.all([
    prisma.packageBooking.create({
      data: {
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1-555-0123',
        message: 'Interested in the cultural tour',
        packageId: packagesWithoutOffers[0].id,
      },
    }),
    prisma.hotelBooking.create({
      data: {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1-555-0456',
        hotel_name: 'Cinnamon Grand Colombo',
        checkIn: new Date('2025-02-15'),
        checkOut: new Date('2025-02-18'),
        roomType: 'Deluxe',
        numGuests: '2',
        specialRequests: 'High floor room with city view',
      },
    }),
    prisma.airTicketBooking.create({
      data: {
        bookingMode: 'Online',
        tripType: 'Round Trip',
        flightClass: 'Economy',
        departureCity: 'Colombo',
        arrivalCity: 'London',
        departureDate: new Date('2025-03-01'),
        returnDate: new Date('2025-03-15'),
        adults: 2,
        children: 1,
        totalPassengers: 3,
        specialAssistance: 'Wheelchair assistance needed',
        mealPreference: 'Vegetarian',
      },
    }),
  ]);
  console.log('✅ Created', bookings.length, 'sample bookings');

  // Create Passengers for the air ticket booking
  console.log('👥 Creating passengers...');
  const passengers = await Promise.all([
    prisma.passenger.create({
      data: {
        fullName: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1-555-0123',
        passport: 'US123456789',
        airTicketBookingId: bookings[2].id,
      },
    }),
    prisma.passenger.create({
      data: {
        fullName: 'Sarah Smith',
        email: 'sarah.smith@email.com',
        phone: '+1-555-0124',
        passport: 'US123456790',
        airTicketBookingId: bookings[2].id,
      },
    }),
    prisma.passenger.create({
      data: {
        fullName: 'Emma Smith',
        email: 'emma.smith@email.com',
        phone: '+1-555-0125',
        passport: 'US123456791',
        airTicketBookingId: bookings[2].id,
      },
    }),
  ]);
  console.log('✅ Created', passengers.length, 'passengers');

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   👤 Admin: 1`);
  console.log(`   🗺️ Destinations: ${destinations.length}`);
  console.log(`   🏨 Hotels: ${hotels.length}`);
  console.log(`   🛏️ Rooms: ${rooms.length}`);
  console.log(`   📦 Packages (No Offers): ${packagesWithoutOffers.length}`);
  console.log(`   🎯 Packages (With Offers): ${packagesWithOffers.length}`);
  console.log(`   📋 All Packages: ${allPackages.length}`);
  console.log(`   📝 Bookings: ${bookings.length}`);
  console.log(`   👥 Passengers: ${passengers.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
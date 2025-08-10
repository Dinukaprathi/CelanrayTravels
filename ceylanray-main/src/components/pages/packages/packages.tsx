"use client";
import React, { useState, useMemo, useEffect } from 'react';
import PackageGrid from './PackageGrid';
import PackageFilters from './PackageFilters';
import { toast, Toaster } from 'react-hot-toast';
import { PageLoading } from '@/components/ui/loading';

const teaPlantationImage = '/home/homeServices/packages.webp';
const templeImage = '/home/homeAboutFirst/homeAboutFirst-1.webp';
const beachImage = '/home/beach-homepage.jpg';

// Define and export a basic Package type
export interface Package {
  id: string;
  name?: string;
  title?: string;
  description: string;
  price: string;
  imageUrl: string;
  offers?: Array<{
    startDate: string;
    endDate: string;
    priceWithoutOffer: string;
    priceWithOffer: string;
  }>;
  category: string;
  interests: string[];
  duration: string;
  location?: string;
  maxGroup?: number;
  rating?: number;
  inclusions: string[];
  type: 'with-offer' | 'without-offer';
  inclutions?: string[];
}

interface PackagesProps {
  packages?: Package[];
}

// Mock data for demonstration (fallback)
const mockPackages: Package[] = [
  {
    id: '1',
    name: 'Golden Triangle Cultural Tour',
    description: 'Explore the ancient kingdoms of Kandy, Anuradhapura, and Polonnaruwa. Discover centuries-old temples, royal palaces, and sacred relics.',
    price: '$899',
    imageUrl: templeImage,
    category: 'Cultural',
    duration: '7 days',
    location: 'Central & North Central Province',
    maxGroup: 12,
    rating: 4.8,
    interests: ['History', 'Culture', 'Photography', 'Architecture'],
    inclusions: [
      'Accommodation in 4-star hotels',
      'All meals included',
      'Professional tour guide',
      'Transportation',
      'Entrance fees to attractions'
    ],
    type: 'without-offer'
  },
  {
    id: '2',
    name: 'Ceylon Tea Trail Experience',
    description: 'Journey through the misty hill country, visit working tea plantations, and stay in converted tea estate bungalows.',
    price: '$1299',
    imageUrl: teaPlantationImage,
    category: 'Adventure',
    duration: '5 days',
    location: 'Nuwara Eliya & Ella',
    maxGroup: 8,
    rating: 4.9,
    interests: ['Nature', 'Tea Culture', 'Hiking', 'Scenic Views'],
    inclusions: [
      'Tea estate bungalow accommodation',
      'Tea tasting sessions',
      'Guided plantation walks',
      'Train ride to Ella',
      'All meals and transfers'
    ],
    offers: [
      {
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        priceWithoutOffer: '$1299',
        priceWithOffer: '$999',
      }
    ],
    type: 'with-offer'
  },
  {
    id: '3',
    name: 'Pristine Beach Paradise',
    description: 'Relax on untouched beaches, enjoy water sports, and explore coastal villages along Sri Lanka\'s stunning coastline.',
    price: '$699',
    imageUrl: beachImage,
    category: 'Beach',
    duration: '4 days',
    location: 'South Coast',
    maxGroup: 15,
    rating: 4.7,
    interests: ['Beach', 'Water Sports', 'Relaxation', 'Seafood'],
    inclusions: [
      'Beachfront resort accommodation',
      'Water sports equipment',
      'Sunset boat cruise',
      'Seafood dinner',
      'Airport transfers'
    ],
    offers: [
      {
        startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        priceWithoutOffer: '$699',
        priceWithOffer: '$549',
      }
    ],
    type: 'with-offer'
  },
  {
    id: '4',
    name: 'Wildlife Safari Adventure',
    description: 'Experience the thrill of spotting leopards, elephants, and exotic birds in their natural habitat at Yala National Park.',
    price: '$899',
    imageUrl: '/home/recommended/yala.webp',
    category: 'Wildlife',
    duration: '3 days',
    location: 'Yala National Park',
    maxGroup: 6,
    rating: 4.9,
    interests: ['Wildlife', 'Photography', 'Nature', 'Adventure'],
    inclusions: [
      'Safari lodge accommodation',
      'Professional safari guide',
      'Multiple game drives',
      'All meals included',
      'Park entrance fees'
    ],
    type: 'without-offer'
  }
];

const Packages: React.FC<PackagesProps> = ({ packages: propPackages }) => {
  const [packages, setPackages] = useState<Package[]>(mockPackages);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/packages');
        const data = await response.json();
        
        // Combine packages with and without offers
        const allPackages = [
          ...data.packagesWithoutOffers,
          ...data.packagesWithOffers
        ];
        
        console.log('Fetched packages:', allPackages);
        setPackages(allPackages);
      } catch (error) {
        console.error('Error fetching packages:', error);
        // Fallback to mock data
        setPackages(mockPackages);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Extract unique categories as objects with id and name
  const categories = useMemo(() => {
    const cats = packages.map(pkg => pkg.category);
    const uniqueCats = Array.from(new Set(cats));
    return uniqueCats.map(cat => ({ id: cat.toLowerCase().replace(/\s+/g, '-'), name: cat }));
  }, [packages]);

  // Filter packages based on search and filters
  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        pkg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.interests.some((interest: string) => 
          interest.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Category filter
      const matchesCategory = selectedCategory === 'all' || 
        pkg.category === selectedCategory;

      // Price filter
      const matchesPrice = priceRange === 'all' || (() => {
        const price = parseInt(pkg.price.replace(/[^0-9]/g, ''));
        switch (priceRange) {
          case '0-500':
            return price <= 500;
          case '500-1000':
            return price > 500 && price <= 1000;
          case '1000-2000':
            return price > 1000 && price <= 2000;
          case '2000+':
            return price > 2000;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [packages, searchTerm, selectedCategory, priceRange]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategory !== 'all') count++;
    if (priceRange !== 'all') count++;
    return count;
  }, [searchTerm, selectedCategory, priceRange]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange('all');
  };

  const handleBookNow = (pkg: Package) => {
    toast(`Booking Initiated: Starting booking process for ${pkg.name || pkg.title}`);
    // Navigate to booking page or open booking modal
  };

  const handleViewDetails = (pkg: Package) => {
    toast(`Package Details: Viewing details for ${pkg.name || pkg.title}`);
    // Navigate to package detail page
  };

  // Correctly type the interest parameter
  const handleInterest = (interest: string) => {
    // Handle interest logic here
  };

  if (loading) {
    return <PageLoading text="Loading packages..." />;
  }

  return (
    <div className="min-h-screen bg-tourism-background">
      <Toaster position="top-right" />
      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1509982724584-2ce0d4366d8b?q=80&w=1230&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover the Magic of{' '}
              <span className="text-tourism-secondary-light">Ceylon</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Embark on unforgettable journeys through Sri Lanka's ancient temples, 
              lush tea plantations, and pristine beaches
            </p>
            <div className="flex justify-center">
              <div className="w-32 h-1 bg-tourism-secondary-light rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🏛️</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🌿</div>
        <div className="absolute top-1/2 right-20 text-4xl opacity-20 animate-float" style={{ animationDelay: '4s' }}>🏖️</div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 space-y-12">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2 p-6 bg-tourism-card rounded-2xl shadow-elegant">
              <div className="text-3xl font-bold text-tourism-primary">{packages.length}</div>
              <div className="text-tourism-text-muted">Packages Available</div>
                </div>
            <div className="text-center space-y-2 p-6 bg-tourism-card rounded-2xl shadow-elegant">
              <div className="text-3xl font-bold text-tourism-primary">{categories.length}</div>
              <div className="text-tourism-text-muted">Categories</div>
              </div>
            <div className="text-center space-y-2 p-6 bg-tourism-card rounded-2xl shadow-elegant">
              <div className="text-3xl font-bold text-tourism-primary">4.8</div>
              <div className="text-tourism-text-muted">Average Rating</div>
          </div>
            <div className="text-center space-y-2 p-6 bg-tourism-card rounded-2xl shadow-elegant">
              <div className="text-3xl font-bold text-tourism-primary">1000+</div>
              <div className="text-tourism-text-muted">Happy Travelers</div>
            </div>
          </div>

          {/* Filters */}
          <PackageFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            categories={categories}
            activeFiltersCount={activeFiltersCount}
            onClearFilters={handleClearFilters}
          />

          {/* Results Count */}
          <div className="text-center">
            <p className="text-tourism-text-muted">
              Showing {filteredPackages.length} of {packages.length} packages
            </p>
          </div>

          {/* Package Grid */}
          <PackageGrid
            packages={filteredPackages}
          />
        </div>
      </section>
    </div>
  );
};

export default Packages; 
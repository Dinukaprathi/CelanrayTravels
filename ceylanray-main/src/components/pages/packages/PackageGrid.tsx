import React from 'react';
import PackageCard from './PackageCard';
import Badge from '@/components/ui/badge';
import { Package } from './packages';

interface PackageGridProps {
  packages: Package[];
}

const PackageGrid: React.FC<PackageGridProps> = ({ 
  packages
}) => {
  // Separate packages with and without offers
  const packagesWithOffers = packages.filter(pkg => 
    pkg.offers && pkg.offers.length > 0
  );
  const packagesWithoutOffers = packages.filter(pkg => 
    !pkg.offers || pkg.offers.length === 0
  );

  return (
    <div className="space-y-12">
      {/* Special Offers Section */}
      {packagesWithOffers.length > 0 && (
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-tourism-text">
              🌟 Special Offers
            </h2>
            <p className="text-tourism-text-muted max-w-2xl mx-auto">
              Limited time deals on our most popular Ceylon tourism experiences
            </p>
            <div className="w-24 h-1 bg-gradient-primary rounded-full mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packagesWithOffers.map((pkg) => (
              <div key={pkg.id} className="animate-slide-up">
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Regular Packages Section */}
      {packagesWithoutOffers.length > 0 && (
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-tourism-text">
              🏝️ Discover Ceylon
            </h2>
            <p className="text-tourism-text-muted max-w-2xl mx-auto">
              Explore the pearl of the Indian Ocean with our carefully curated packages
            </p>
            <div className="w-24 h-1 bg-gradient-secondary rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packagesWithoutOffers.map((pkg) => (
              <div key={pkg.id} className="animate-slide-up">
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {packages.length === 0 && (
        <div className="text-center py-16 space-y-4">
          <div className="text-6xl">🏝️</div>
          <h3 className="text-2xl font-bold text-tourism-text">No packages available</h3>
          <p className="text-tourism-text-muted">Check back soon for amazing Ceylon tourism experiences!</p>
        </div>
      )}
    </div>
  );
};

export default PackageGrid; 
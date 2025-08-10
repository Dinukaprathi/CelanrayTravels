import React from 'react';
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PackageFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
  categories: Array<{ id: string; name: string }>;
  activeFiltersCount: number;
  onClearFilters: () => void;
}

const PackageFilters: React.FC<PackageFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  categories,
  activeFiltersCount,
  onClearFilters
}) => {
  return (
    <div className="bg-tourism-card border border-tourism-secondary-light rounded-2xl p-6 shadow-elegant">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search Input */}
        <div className="w-full lg:w-96">
          <Input
            type="text"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-tourism-secondary-light focus:border-tourism-primary"
          />
        </div>

        {/* Category Select */}
        <div className="w-full lg:w-48">
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border-tourism-secondary-light focus:border-tourism-primary"
          >
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="budget">Budget</SelectItem>
            <SelectItem value="semi-luxury">Semi-Luxury</SelectItem>
            <SelectItem value="luxury">Luxury</SelectItem>
          </Select>
        </div>

        {/* Price Range Select */}
        <div className="w-full lg:w-48">
          <Select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="border-tourism-secondary-light focus:border-tourism-primary"
          >
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="0-500">$0 - $500</SelectItem>
            <SelectItem value="500-1000">$500 - $1000</SelectItem>
            <SelectItem value="1000-2000">$1000 - $2000</SelectItem>
            <SelectItem value="2000+">$2000+</SelectItem>
          </Select>
        </div>

        {/* Clear Filters Button */}
        {activeFiltersCount > 0 && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="w-full lg:w-auto border-tourism-secondary-light hover:bg-tourism-primary hover:text-white"
          >
            Clear Filters ({activeFiltersCount})
          </Button>
        )}
      </div>
    </div>
  );
};

export default PackageFilters;
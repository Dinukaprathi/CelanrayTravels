import Packages, { Package } from '@/components/pages/packages/packages';
import { headers } from 'next/headers';

async function getPackages(baseUrl: string): Promise<Package[]> {
  const res = await fetch(`${baseUrl}/api/packages`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  // Merge and tag packages
  const withoutOffers = (data.packagesWithoutOffers || []).map((pkg: any) => ({ ...pkg, type: 'without-offer', offers: [], interests: pkg.interests ?? [], inclutions: pkg.inclusions ?? [] }));
  const withOffers = (data.packagesWithOffers || []).map((pkg: any) => ({
    ...pkg,
    type: 'with-offer',
    offers: [pkg],
    interests: typeof pkg.interests === 'string' ? pkg.interests : '',
    inclutions: typeof pkg.inclutions === 'string' ? pkg.inclutions : '',
  }));
  return [...withoutOffers, ...withOffers];
}

export default async function PackagesPage() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  const packages = await getPackages(baseUrl);
  return <Packages packages={packages} />;
} 
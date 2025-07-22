import BestEvent from "@/components/pages/home/BestEvent";
import HomeAboutFirst from "@/components/pages/home/HomeAboutFirst";
import HomeHero from "@/components/pages/home/HomeHero";
import HomeIntroduction from '@/components/pages/home/HomeIntroduction';
import HomeServices from "@/components/pages/home/HomeServices";
import HomeRecommended from "@/components/pages/home/HomeRecommended";
import Testimonials from "@/components/pages/home/Testimonials";
import { Cta } from "@/components/common/Cta";
import OfferDisplay from "@/components/common/OfferDisplay";

export default function Home() {
  return (
    <div>
      <OfferDisplay />
      <HomeHero />
      <HomeAboutFirst />
      <HomeIntroduction />
      <HomeServices />
      <BestEvent />
      <HomeRecommended />
      <Testimonials />
      <Cta />
    </div>
  );
}

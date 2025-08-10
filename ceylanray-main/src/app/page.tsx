import OfferDisplay from "@/components/common/OfferDisplay";
import HomeHero from "@/components/pages/home/HomeHero";
import BestEvent from "@/components/pages/home/BestEvent";
import HomeAboutFirst from "@/components/pages/home/HomeAboutFirst";
import HomeIntroduction from "@/components/pages/home/HomeIntroduction";
import HomeRecommended from "@/components/pages/home/HomeRecommended";
import HomeServices from "@/components/pages/home/HomeServices";

export default function Home() {
  return (
    <div>
      <OfferDisplay />
      <HomeHero />
      <HomeAboutFirst />
      <BestEvent />
      <HomeServices />
      <HomeIntroduction />
      <HomeRecommended />
    </div>
  );
}

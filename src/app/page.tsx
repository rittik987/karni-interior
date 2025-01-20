import FeaturesSection from "@/components/Features";
import Hero from "../components/Hero"
import Services from "../components/Services";
import Portfolio from "@/components/PortfolioH";
import Reviews from "@/components/Reviews";
import UploadReview from "@/components/UploadReview";
export default function Home() {
  return (
   <>
   <Hero/>
   <Services/>
   <FeaturesSection/>
   <Portfolio/>
   <Reviews/>
   <UploadReview/>
   </>
  );
}

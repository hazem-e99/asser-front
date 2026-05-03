import {
  Navbar,
  Footer,
  HeroBanner,
  ServicesSection,
  ToursSection,
  BikesSection,
  AboutSection,
  ReviewsSection,
  Divider,
  WhatsAppBtn,
  ScrollToTop,
} from "../components";
import MarketingScripts from "../components/MarketingScripts.jsx";
import EditModeBanner from "../admin/EditModeBanner.jsx";

export default function PublicHome() {
  return (
    <>
      <MarketingScripts />
      <EditModeBanner />
      <Navbar />
      <HeroBanner />
      <ServicesSection />
      <Divider />
      <ToursSection />
      <Divider />
      <BikesSection />
      <Divider />
      <AboutSection />
      <Divider />
      <ReviewsSection />
      <Footer />
      <WhatsAppBtn />
      <ScrollToTop />
    </>
  );
}

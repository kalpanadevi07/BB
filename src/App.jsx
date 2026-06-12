import "./App.css";
import HeroPage from "./HeroPage";
import LogoMarqueeSection from "./LogoMarqueeSection";
import CombinedSection from "./CombinedSection";
import WhyBrandingBeezSection from "./WhyBrandingBeezSection";
import PricingSection from "./PricingSection";
import TeamBuilderSection from "./TeamBuilderSection";
import RealResultsSection from "./RealResultsSection";
import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";
import FooterSection from "./Footer";

export default function App() {
  return (
    <>
      <HeroPage />
      <LogoMarqueeSection />
      <CombinedSection />
      <WhyBrandingBeezSection />
      <PricingSection />
      <TeamBuilderSection />
      <RealResultsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <FooterSection/>
    </>
  );
}

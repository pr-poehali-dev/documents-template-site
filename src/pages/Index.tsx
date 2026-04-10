import { useState, useEffect, useRef } from "react";
import HeroSection from "./HeroSection";
import LibrarySection from "./LibrarySection";
import PricingSection from "./PricingSection";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("all");

  const heroSection = useInView(0.1);
  const painSection = useInView();
  const solutionSection = useInView();
  const librarySection = useInView();
  const howSection = useInView();
  const casesSection = useInView();
  const pricingSection = useInView();
  const faqSection = useInView();

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">
      <HeroSection
        heroRef={heroSection.ref}
        heroInView={heroSection.inView}
        painRef={painSection.ref}
        painInView={painSection.inView}
        solutionRef={solutionSection.ref}
        solutionInView={solutionSection.inView}
      />
      <LibrarySection
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        libraryRef={librarySection.ref}
        libraryInView={librarySection.inView}
        howRef={howSection.ref}
        howInView={howSection.inView}
        casesRef={casesSection.ref}
        casesInView={casesSection.inView}
      />
      <PricingSection
        pricingRef={pricingSection.ref}
        pricingInView={pricingSection.inView}
        faqRef={faqSection.ref}
        faqInView={faqSection.inView}
      />
    </div>
  );
}

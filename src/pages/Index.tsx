import { Footer } from '@/components/footer';
import { NavBar } from '@/components/nav-bar';
import { HeroSection } from '@/components/hero-section';
import { ProblemSection } from '@/components/problem-section';
import { SolutionSection } from '@/components/solution-section';
import { FeaturesSection } from '@/components/features-section';
import { PricingSection } from '@/components/pricing-section';
import { AnimatedSection } from '@/components/animated-section';
import { PageTransition } from '@/components/page-transition';

const Index = () => {
  return (
    <PageTransition className="min-h-screen flex flex-col">
      <AnimatedSection delay={0} direction="down" duration={0.4}>
        <NavBar />
      </AnimatedSection>
      <main className="flex-1">
        <HeroSection />
        <AnimatedSection delay={0.2} direction="up">
          <ProblemSection />
        </AnimatedSection>
        <AnimatedSection delay={0.3} direction="up">
          <SolutionSection />
        </AnimatedSection>
        <AnimatedSection delay={0.4} direction="up">
          <FeaturesSection />
        </AnimatedSection>
        <AnimatedSection delay={0.5} direction="up">
          <PricingSection />
        </AnimatedSection>
      </main>
      <AnimatedSection delay={0.6} direction="up">
        <Footer />
      </AnimatedSection>
    </PageTransition>
  );
};

export default Index;

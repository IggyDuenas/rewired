import HeroSection from '@/components/sections/HeroSection';
import StatBar from '@/components/sections/StatBar';
import WorkCarousel from '@/components/sections/WorkCarousel';
import ClosingCTA from '@/components/sections/ClosingCTA';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatBar />
      <WorkCarousel />
      <ClosingCTA />
    </main>
  );
}

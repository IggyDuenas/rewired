import HeroSection from '@/components/sections/HeroSection';
import StatBar from '@/components/sections/StatBar';
import PlatformTierList from '@/components/ui/PlatformTierList';
import WorkCarousel from '@/components/sections/WorkCarousel';
import ClosingCTA from '@/components/sections/ClosingCTA';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatBar />
      <div
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          width: '100%',
        }}
      >
        <PlatformTierList />
      </div>
      <WorkCarousel />
      <ClosingCTA />
    </main>
  );
}

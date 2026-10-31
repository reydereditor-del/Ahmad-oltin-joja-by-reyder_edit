import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CartProvider } from './context/CartContext';
import { Scene3D } from './components/canvas/Scene3D';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/ui/HeroSection';
import { StorySection } from './components/ui/StorySection';
import { CraftStorySection } from './components/ui/CraftStorySection';
import { MenuSection } from './components/ui/MenuSection';
import { AtmosphereSection } from './components/ui/AtmosphereSection';
import { BranchesSection } from './components/ui/BranchesSection';
import { Footer } from './components/ui/Footer';
import { CartDrawer } from './components/ui/CartDrawer';

export const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Ultra-smooth cinematic Lenis scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        setScrollProgress(progress);
      }
    };

    function raf(time: number) {
      lenis.raf(time);
      handleScroll();
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-[#070709] text-white selection:bg-gold-500 selection:text-black">
        {/* Cinematic 3D WebGL Canvas Layer */}
        <Scene3D scrollProgress={scrollProgress} />

        {/* User Interface Content Layers */}
        <div className="relative z-20">
          <Navbar />
          <HeroSection />
          <StorySection />
          <CraftStorySection />
          <MenuSection />
          <AtmosphereSection />
          <BranchesSection />
          <Footer />
        </div>

        {/* Global Slide-Over Cart Drawer */}
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default App;

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Page1 from '@/components/LandingText';
import Part2 from '@/components/LandingVideo';
import Page3 from '@/components/FeaturedWork';
import Page4 from '@/components/Backto';
import Page5 from '@/components/TextVidAnimation';
import Page6 from '@/components/SecondScroll';
import Page7 from '@/components/SizeLab';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#000000]"> {/* Set minimum height to full viewport and background color */}
      {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}
      <div className={`${isLoading ? 'hidden' : 'block'} min-h-screen`}>
        <Navbar />
        <Page1 />
        <Part2 />
        <Page3 />
        <Page4 />
        <Page5 />
        <Page6 />
        <Page7 />
        <Footer />
      </div>
    </div>
  );
}

export default Home;

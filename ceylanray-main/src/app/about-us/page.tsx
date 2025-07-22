'use client';

import { Cta } from '@/components/common/Cta';
import AboutAuthority from '@/components/pages/about/AboutAuthority';
import AboutHero from '@/components/pages/about/AboutHero';
import AboutTestimonials from '@/components/pages/about/AboutTestimonials';
import AboutVision from '@/components/pages/about/AboutVision';
import React from 'react';

const page = () => {
  return (
    <div>
      <AboutHero />
        <AboutVision />
        <AboutAuthority />
        <AboutTestimonials />
        <Cta />
    </div>
  );
};

export default page;
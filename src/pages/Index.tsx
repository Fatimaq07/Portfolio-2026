import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@/hooks/useLenis';
import { HeroSection } from '@/components/HeroSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { VideosSection } from '@/components/VideosSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ContactSection } from '@/components/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useLenis();

  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative bg-background overflow-x-hidden">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <VideosSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
};

export default Index;

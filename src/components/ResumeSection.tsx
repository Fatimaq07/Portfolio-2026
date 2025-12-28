import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, FileText } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export const ResumeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.resume-content',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating animation for icon
      gsap.to('.resume-icon', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="relative py-24 lg:py-32 bg-secondary/30 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="resume-content max-w-4xl mx-auto text-center">
          {/* Animated icon */}
          <div className="resume-icon inline-flex items-center justify-center w-24 h-24 rounded-full 
                         bg-primary/10 border border-primary/30 mb-8 animate-pulse-glow">
            <FileText className="w-10 h-10 text-primary" />
          </div>

          <h2 className="headline-md mb-6">
            Want the Full Picture<span className="text-primary">?</span>
          </h2>
          <p className="body-lg max-w-xl mx-auto mb-10">
            Download my resume for a comprehensive overview of my experience, 
            skills, and the impact I've made.
          </p>

          <MagneticButton className="gap-3">
            <Download className="w-5 h-5" />
            Download Resume
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

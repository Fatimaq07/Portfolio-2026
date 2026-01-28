import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { MessageCircle, Download, ArrowDownRight } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpg';
import heroBg1 from '@/assets/hero-bg-1.jpg';
import heroBg2 from '@/assets/hero-bg-2.png';

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Background fade
      tl.fromTo('.hero-bg-layer',
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.5 },
        0
      );

      // Staggered line reveals
      tl.fromTo('.hero-line', 
        { y: 120, opacity: 0, skewY: 7 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2, stagger: 0.12 },
        0.3
      );

      // Profile image
      tl.fromTo('.profile-editorial',
        { scale: 0.8, opacity: 0, rotate: -8 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.4, ease: 'elastic.out(1, 0.5)' },
        0.5
      );

      // Scattered elements
      tl.fromTo('.scatter-element', 
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(2)' },
        0.8
      );

      // Info blocks
      tl.fromTo('.info-block',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        1.0
      );

      // CTA
      tl.fromTo('.cta-editorial',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        1.3
      );

      // Continuous float for image
      gsap.to('.profile-editorial', {
        y: -12,
        rotation: 2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Moving circle animation - continuous path movement
      gsap.to('.moving-circle', {
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: 50, y: -30 },
            { x: 100, y: 0 },
            { x: 50, y: 30 },
            { x: 0, y: 0 }
          ],
          curviness: 1.5
        },
        duration: 8,
        repeat: -1,
        ease: 'none'
      });

      // Circle rotation
      gsap.to('.moving-circle', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

      // Inner text counter-rotation to keep text readable
      gsap.to('.circle-text', {
        rotation: -360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="h-screen flex items-center px-6 lg:px-16 relative overflow-hidden"
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        <img 
          src={heroBg1} 
          alt="" 
          className="hero-bg-layer absolute inset-0 w-full h-full object-cover"
        />
        <img 
          src={heroBg2} 
          alt="" 
          className="hero-bg-layer absolute inset-0 w-full h-full object-cover mix-blend-soft-light opacity-70"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1800px] mx-auto relative z-10">
        
        {/* Top Row - Name & Photo */}
        <div className="relative">
          
          {/* Issue Number - Scattered */}
          <div className="scatter-element absolute -top-8 left-0 lg:left-[5%]">
            <span className="text-xs tracking-[0.3em] text-white/70 uppercase">Portfolio</span>
            <span className="block text-4xl lg:text-5xl font-bold text-white font-serif">01</span>
          </div>

          {/* Main Name - Editorial Typography */}
          <div className="pt-16 lg:pt-8">
            <div className="overflow-hidden">
              <h1 className="hero-line text-[12vw] lg:text-[10vw] font-bold text-white leading-[0.85] tracking-tighter font-serif">
                FATIMA
              </h1>
            </div>
            <div className="overflow-hidden flex items-end gap-4 lg:gap-8">
              <h1 className="hero-line text-[12vw] lg:text-[10vw] font-bold text-blue-300 leading-[0.85] tracking-tighter font-serif">
                QURESHI
              </h1>
              <span className="hero-line text-2xl lg:text-4xl text-white/60 font-light mb-4 lg:mb-8">©2026</span>
            </div>
          </div>

          {/* Profile Photo - Asymmetric Position */}
          <div className="profile-editorial absolute -top-4 right-0 lg:right-[8%] w-32 h-40 md:w-48 md:h-60 lg:w-64 lg:h-80">
            <div className="relative w-full h-full">
              {/* Frame decoration */}
              <div className="absolute -inset-2 border border-white/40 rounded-sm" style={{ transform: 'rotate(3deg)' }} />
              
              <div className="relative w-full h-full overflow-hidden rounded-sm shadow-2xl">
                <img 
                  src={profilePhoto} 
                  alt="Fatima Qureshi" 
                  className="w-full h-full object-cover"
                />
                {/* Halftone overlay effect */}
                <div className="absolute inset-0 mix-blend-overlay opacity-20" 
                  style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '4px 4px'
                  }}
                />
              </div>

              {/* Photo label */}
              <div className="scatter-element absolute -bottom-6 -left-4 bg-white/10 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-white/80">Est. 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Info & CTA */}
        <div className="mt-12 lg:mt-16 grid grid-cols-12 gap-4 lg:gap-8">
          
          {/* Role Tag */}
          <div className="col-span-12 lg:col-span-3">
            <div className="info-block flex items-center gap-3">
              <ArrowDownRight className="w-5 h-5 text-blue-300" />
              <span className="text-sm uppercase tracking-[0.2em] text-white">Full Stack Developer</span>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-5">
            <p className="info-block text-base lg:text-lg text-white/70 leading-relaxed">
              Building digital experiences for startups. Specializing in <span className="text-white font-medium">MERN Stack</span>, <span className="text-white font-medium">AI Automation</span> & UI/UX Design.
            </p>
          </div>

          {/* Stats - Scattered */}
          <div className="col-span-12 lg:col-span-3 lg:col-start-10">
            <div className="info-block flex gap-8 lg:justify-end">
              <div>
                <span className="block text-3xl lg:text-4xl font-bold text-white font-serif">8+</span>
                <span className="text-xs text-white/60 uppercase tracking-wider">Projects</span>
              </div>
              <div>
                <span className="block text-3xl lg:text-4xl font-bold text-white font-serif">2+</span>
                <span className="text-xs text-white/60 uppercase tracking-wider">Years</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Row */}
        <div className="mt-12 lg:mt-16 flex flex-wrap items-center gap-4 lg:gap-6">
          <motion.a
            href="https://wa.me/919399723080"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-editorial group flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-blue-100 transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Hire Me</span>
          </motion.a>
          
          <motion.a
            href="/Fatima_Qureshi_Resume.pdf"
            download
            className="cta-editorial group flex items-center gap-3 border border-white/40 text-white px-8 py-4 rounded-full font-medium hover:border-white hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-5 h-5" />
            <span>Download CV</span>
          </motion.a>

          {/* Email floating */}
          <div className="cta-editorial ml-auto hidden lg:flex items-center gap-2 text-white/60">
            <span className="w-8 h-px bg-white/40" />
            <span className="text-sm">qfatima504@gmail.com</span>
          </div>
        </div>

        {/* Moving Circle with 2025 Passout */}
        <div className="moving-circle scatter-element absolute bottom-[15%] left-[5%] w-24 h-24 lg:w-32 lg:h-32 border-2 border-white/50 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/5">
          <div className="circle-text text-center">
            <span className="block text-xl lg:text-2xl font-bold text-white font-serif">2025</span>
            <span className="text-[8px] lg:text-[10px] uppercase tracking-[0.15em] text-white/70">Passout</span>
          </div>
        </div>
        
        {/* Other decorative elements */}
        <div className="scatter-element absolute top-[30%] right-[25%] w-3 h-3 bg-blue-300 rounded-full" />
        <div className="scatter-element absolute bottom-[25%] right-[15%]">
          <span className="text-6xl lg:text-8xl font-bold text-white/10 font-serif select-none">*</span>
        </div>
      </div>
    </section>
  );
};

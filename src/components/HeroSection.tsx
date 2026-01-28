import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { motion } from 'framer-motion';
import { MessageCircle, Download, ArrowDownRight } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpg';

gsap.registerPlugin(TextPlugin);

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

      // Text typing animation for role
      gsap.fromTo('.typing-text',
        { width: 0 },
        { width: 'auto', duration: 2, delay: 1.5, ease: 'steps(20)' }
      );


      // Letter spacing animation
      gsap.fromTo('.letter-animate',
        { letterSpacing: '0.5em', opacity: 0 },
        { letterSpacing: '0.2em', opacity: 1, duration: 1.5, delay: 0.5, ease: 'power3.out' }
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
      {/* Floating Objects Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
        {/* Floating geometric shapes */}
        <motion.div 
          className="floating-shape absolute top-[10%] left-[10%] w-20 h-20 border-2 border-primary/30 rounded-full"
          animate={{ y: [0, -30, 0], x: [0, 20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="floating-shape absolute top-[20%] right-[15%] w-16 h-16 bg-primary/10 backdrop-blur-sm"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          animate={{ y: [0, 40, 0], rotate: [0, -90, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="floating-shape absolute top-[60%] left-[8%] w-12 h-12 border border-blue-400/20 rotate-45"
          animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="floating-shape absolute bottom-[30%] right-[25%] w-24 h-24 border border-primary/20 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="floating-shape absolute top-[40%] left-[30%] w-8 h-8 bg-blue-500/15 rounded-full blur-sm"
          animate={{ y: [0, 60, 0], x: [0, -40, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="floating-shape absolute bottom-[20%] left-[20%] w-14 h-14 border-2 border-indigo-400/20"
          animate={{ rotate: [0, 360], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="floating-shape absolute top-[15%] left-[50%] w-6 h-6 bg-primary/20 rounded-full"
          animate={{ y: [0, 80, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="floating-shape absolute bottom-[40%] right-[10%] w-10 h-10 border border-primary/25 rounded-lg rotate-12"
          animate={{ y: [0, -35, 0], rotate: [12, 192, 12] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="floating-shape absolute top-[70%] right-[40%] w-5 h-5 bg-blue-400/20 rounded-full"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="floating-shape absolute top-[5%] right-[35%] w-16 h-16 border border-indigo-300/15"
          style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }}
          animate={{ rotate: [0, -180, -360], y: [0, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Soft glow spots */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1800px] mx-auto relative z-10">
        
        {/* Top Row - Name & Photo */}
        <div className="relative">
          
          {/* Issue Number - Scattered */}
          <div className="scatter-element absolute -top-8 left-0 lg:left-[5%]">
            <span className="text-xs tracking-[0.3em] text-slate-600 uppercase">Portfolio</span>
            <span className="block text-4xl lg:text-5xl font-bold text-slate-900 font-serif">01</span>
          </div>

          {/* Main Name - Editorial Typography */}
          <div className="pt-16 lg:pt-8">
            <div className="overflow-hidden">
              <h1 className="hero-line name-glow text-[12vw] lg:text-[10vw] font-bold text-slate-900 leading-[0.85] tracking-tighter font-serif">
                FATIMA
              </h1>
            </div>
            <div className="overflow-hidden flex items-end gap-4 lg:gap-8">
              <h1 className="hero-line name-glow text-[12vw] lg:text-[10vw] font-bold text-primary leading-[0.85] tracking-tighter font-serif">
                QURESHI
              </h1>
              <span className="hero-line letter-animate text-2xl lg:text-4xl text-slate-500 font-light mb-4 lg:mb-8">©2026</span>
            </div>
          </div>

          {/* Profile Photo - Asymmetric Position */}
          <div className="profile-editorial absolute -top-4 right-0 lg:right-[8%] w-32 h-40 md:w-48 md:h-60 lg:w-64 lg:h-80">
            <div className="relative w-full h-full">
              {/* Frame decoration */}
              <div className="absolute -inset-2 border border-primary/40 rounded-sm" style={{ transform: 'rotate(3deg)' }} />
              
              <div className="relative w-full h-full overflow-hidden rounded-sm shadow-2xl">
                <img 
                  src={profilePhoto} 
                  alt="Fatima Qureshi" 
                  className="w-full h-full object-cover"
                />
                {/* Halftone overlay effect */}
                <div className="absolute inset-0 mix-blend-overlay opacity-20" 
                  style={{
                    backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
                    backgroundSize: '4px 4px'
                  }}
                />
              </div>

              {/* Photo label */}
              <div className="scatter-element absolute -bottom-6 -left-4 bg-primary/10 backdrop-blur-md border border-primary/30 px-3 py-1.5 rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-slate-700">Est. 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Info & CTA */}
        <div className="mt-12 lg:mt-16 grid grid-cols-12 gap-4 lg:gap-8">
          
          {/* Role Tag */}
          <div className="col-span-12 lg:col-span-3">
            <div className="info-block flex items-center gap-3 overflow-hidden">
              <ArrowDownRight className="w-5 h-5 text-primary" />
              <span className="typing-text text-sm uppercase tracking-[0.2em] text-slate-800 whitespace-nowrap overflow-hidden">Full Stack Developer</span>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-5">
            <p className="info-block text-base lg:text-lg text-slate-600 leading-relaxed">
              Building digital experiences for startups. Specializing in <span className="text-slate-900 font-medium">MERN Stack</span>, <span className="text-slate-900 font-medium">AI Automation</span> & UI/UX Design.
            </p>
          </div>

          {/* Stats - Scattered */}
          <div className="col-span-12 lg:col-span-3 lg:col-start-10">
            <div className="info-block flex gap-8 lg:justify-end">
              <div>
                <span className="block text-3xl lg:text-4xl font-bold text-slate-900 font-serif">8+</span>
                <span className="text-xs text-slate-600 uppercase tracking-wider">Projects</span>
              </div>
              <div>
                <span className="block text-3xl lg:text-4xl font-bold text-slate-900 font-serif">2+</span>
                <span className="text-xs text-slate-600 uppercase tracking-wider">Years</span>
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
            className="cta-editorial group flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Hire Me</span>
          </motion.a>
          
          <motion.a
            href="/Fatima_Qureshi_Resume.pdf"
            download
            className="cta-editorial group flex items-center gap-3 border border-slate-400 text-slate-800 px-8 py-4 rounded-full font-medium hover:border-primary hover:bg-primary/10 transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-5 h-5" />
            <span>Download CV</span>
          </motion.a>

          {/* Email floating */}
          <div className="cta-editorial ml-auto hidden lg:flex items-center gap-2 text-slate-600">
            <span className="w-8 h-px bg-slate-400" />
            <span className="text-sm">qfatima504@gmail.com</span>
          </div>
        </div>

        {/* Moving Circle with 2025 Passout - Smaller size */}
        <div className="moving-circle scatter-element absolute bottom-[15%] left-[5%] w-16 h-16 lg:w-20 lg:h-20 border border-primary/50 rounded-full flex items-center justify-center backdrop-blur-sm bg-primary/5">
          <div className="circle-text text-center">
            <span className="block text-sm lg:text-base font-bold text-slate-900 font-serif">2025</span>
            <span className="text-[6px] lg:text-[8px] uppercase tracking-[0.1em] text-slate-600">Passout</span>
          </div>
        </div>
        
        {/* Other decorative elements */}
        <div className="scatter-element absolute top-[30%] right-[25%] w-3 h-3 bg-primary rounded-full" />
        <div className="scatter-element absolute bottom-[25%] right-[15%]">
          <span className="text-6xl lg:text-8xl font-bold text-slate-900/10 font-serif select-none">*</span>
        </div>
      </div>
    </section>
  );
};

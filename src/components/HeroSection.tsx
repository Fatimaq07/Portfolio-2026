import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { MessageCircle, Download } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpg';
import heroBg1 from '@/assets/hero-bg-1.jpg';
import heroBg2 from '@/assets/hero-bg-2.png';

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Background fade in
      tl.fromTo('.hero-bg-layer',
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 2, stagger: 0.3 },
        0
      );

      // Profile image entrance
      tl.fromTo('.profile-award',
        { scale: 0, opacity: 0, rotation: -15 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: 'elastic.out(1, 0.4)' },
        0.5
      );

      // Name letters stagger
      tl.fromTo('.name-char',
        { y: 150, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.05, ease: 'back.out(2)' },
        0.8
      );

      // Role text
      tl.fromTo('.role-text',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        1.5
      );

      // CTAs
      tl.fromTo('.cta-btn',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
        1.8
      );

      // Floating circle with continuous movement
      gsap.to('.moving-circle', {
        x: '+=100',
        y: '+=50',
        rotation: 360,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Additional floating animation for circle
      gsap.to('.moving-circle', {
        scale: 1.1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Profile float
      gsap.to('.profile-award', {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse follower for circle
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (circleRef.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * 100;
        const y = (e.clientY / window.innerHeight - 0.5) * 100;
        gsap.to(circleRef.current, {
          x: x,
          y: y,
          duration: 2,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const firstName = "FATIMA";
  const lastName = "QURESHI";

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Layered Background Images */}
      <div className="absolute inset-0">
        <img 
          src={heroBg1} 
          alt="" 
          className="hero-bg-layer absolute inset-0 w-full h-full object-cover opacity-0"
        />
        <img 
          src={heroBg2} 
          alt="" 
          className="hero-bg-layer absolute inset-0 w-full h-full object-cover opacity-0 mix-blend-soft-light"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
      </div>

      {/* Moving Circle with 2025 Passout */}
      <div 
        ref={circleRef}
        className="moving-circle absolute top-[15%] right-[20%] w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-white/60 flex items-center justify-center backdrop-blur-sm bg-white/10 z-20"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="text-center">
          <span className="block text-2xl md:text-3xl font-bold text-white font-serif">2025</span>
          <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/80">Passout</span>
        </div>
        {/* Rotating ring */}
        <div className="absolute inset-0 rounded-full border border-white/30 animate-spin" style={{ animationDuration: '10s' }} />
        <div className="absolute -inset-2 rounded-full border border-white/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        
        {/* Left - Profile Photo */}
        <div className="profile-award relative flex-shrink-0">
          {/* Decorative frame */}
          <div className="absolute -inset-4 md:-inset-6 border border-white/30 rounded-lg" style={{ transform: 'rotate(-3deg)' }} />
          <div className="absolute -inset-8 md:-inset-12 border border-white/10 rounded-lg" style={{ transform: 'rotate(3deg)' }} />
          
          {/* Main photo */}
          <div className="relative w-48 h-60 md:w-64 md:h-80 lg:w-80 lg:h-[400px] overflow-hidden rounded-lg shadow-2xl">
            <img 
              src={profilePhoto} 
              alt="Fatima Qureshi" 
              className="w-full h-full object-cover"
            />
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
          </div>

          {/* Badge */}
          <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-white">Full Stack Developer</span>
          </div>
        </div>

        {/* Right - Text Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Small intro */}
          <motion.p 
            className="role-text text-white/70 text-sm md:text-base uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Creative Developer & Designer
          </motion.p>

          {/* Name - First */}
          <div className="overflow-hidden mb-2">
            <h1 className="text-[14vw] md:text-[10vw] lg:text-[8vw] font-bold text-white leading-[0.9] tracking-tight font-serif">
              {firstName.split('').map((char, i) => (
                <span key={i} className="name-char inline-block" style={{ transformStyle: 'preserve-3d' }}>
                  {char}
                </span>
              ))}
            </h1>
          </div>

          {/* Name - Last */}
          <div className="overflow-hidden">
            <h1 className="text-[14vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.9] tracking-tight font-serif bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              {lastName.split('').map((char, i) => (
                <span key={i} className="name-char inline-block" style={{ transformStyle: 'preserve-3d' }}>
                  {char}
                </span>
              ))}
            </h1>
          </div>

          {/* Description */}
          <motion.p 
            className="role-text mt-6 md:mt-8 text-white/80 text-base md:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            Building exceptional digital experiences with 
            <span className="text-white font-medium"> MERN Stack</span>, 
            <span className="text-white font-medium"> AI Automation</span> & 
            <span className="text-white font-medium"> UI/UX Design</span>
          </motion.p>

          {/* Stats */}
          <div className="role-text flex justify-center lg:justify-start gap-8 mt-6 md:mt-8">
            <div>
              <span className="block text-3xl md:text-4xl font-bold text-white font-serif">8+</span>
              <span className="text-xs md:text-sm text-white/60 uppercase tracking-wider">Projects</span>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <span className="block text-3xl md:text-4xl font-bold text-white font-serif">2+</span>
              <span className="text-xs md:text-sm text-white/60 uppercase tracking-wider">Years Exp</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8 md:mt-10">
            <motion.a
              href="https://wa.me/919399723080"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn group flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/20"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Hire Me</span>
            </motion.a>
            
            <motion.a
              href="/Fatima_Qureshi_Resume.pdf"
              download
              className="cta-btn group flex items-center gap-3 border border-white/40 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </motion.a>
          </div>

          {/* Email */}
          <motion.p 
            className="role-text mt-8 text-white/50 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            qfatima504@gmail.com
          </motion.p>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-8 left-8 text-white/30 text-sm tracking-widest">
        <span>PORTFOLIO © 2025</span>
      </div>
      <div className="absolute bottom-8 right-8 text-white/30 text-sm tracking-widest">
        <span>SCROLL →</span>
      </div>
    </section>
  );
};

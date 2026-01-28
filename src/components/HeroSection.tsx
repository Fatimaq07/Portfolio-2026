import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { Mail, Download, MessageCircle, ArrowDown } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpg';

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Animate profile image
      tl.fromTo('.profile-image',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        0.2
      );

      // Animate name letters
      tl.fromTo('.name-letter', 
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.05 },
        0.4
      );

      // Animate role text
      tl.fromTo('.role-text',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.9
      );

      // Animate about section
      tl.fromTo('.about-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        1.1
      );

      // Animate CTA buttons
      tl.fromTo('.cta-btn',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        1.3
      );

      // Floating animation for decorative elements
      gsap.to('.float-element', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.3
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const firstName = "FATIMA";
  const lastName = "QURESHI";

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="min-h-screen flex flex-col justify-center px-6 lg:px-16 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)'
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="float-element absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl" />
        <div className="float-element absolute bottom-40 left-10 w-80 h-80 rounded-full bg-gradient-to-tr from-white/3 to-transparent blur-3xl" />
        <div className="float-element absolute top-1/2 right-1/4 w-40 h-40 rounded-full border border-white/5" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Profile Photo & Name */}
          <div className="space-y-8">
            
            {/* Profile Photo */}
            <div className="profile-image relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto lg:mx-0">
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-full border border-white/10 animate-pulse" />
              <div className="absolute -inset-8 rounded-full border border-white/5" />
              
              {/* Gradient glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-white/20 via-transparent to-white/10 rounded-full blur-xl" />
              
              {/* Photo container */}
              <motion.div 
                className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img 
                  src={profilePhoto} 
                  alt="Fatima Qureshi" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Status badge */}
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-neutral-900 animate-pulse" />
            </div>

            {/* Greeting */}
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg tracking-widest uppercase text-center lg:text-left"
            >
              Hello, I'm
            </motion.p>

            {/* Name - Large Typography */}
            <div className="space-y-2 text-center lg:text-left" style={{ perspective: '1000px' }}>
              <h1 className="overflow-hidden">
                <span className="flex justify-center lg:justify-start">
                  {firstName.split('').map((letter, i) => (
                    <span 
                      key={i} 
                      className="name-letter inline-block text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
                      style={{ fontFamily: 'serif' }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </h1>
              <h1 className="overflow-hidden">
                <span className="flex justify-center lg:justify-start">
                  {lastName.split('').map((letter, i) => (
                    <span 
                      key={i} 
                      className="name-letter inline-block text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 tracking-tight"
                      style={{ fontFamily: 'serif' }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </h1>
            </div>

            {/* Role */}
            <div className="role-text space-y-2 text-center lg:text-left">
              <p className="text-xl md:text-2xl text-white font-light">
                Full Stack Developer
              </p>
              <p className="text-gray-500 text-base">
                MERN Stack • AI Automation • UI/UX Design
              </p>
            </div>

            {/* Email */}
            <div className="role-text flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-400">qfatima504@gmail.com</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
              <motion.a
                href="https://wa.me/919399723080"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5" />
                Hire Me
              </motion.a>
              
              <motion.a
                href="/Fatima_Qureshi_Resume.pdf"
                download
                className="cta-btn group flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                Download CV
              </motion.a>
            </div>
          </div>

          {/* Right Side - About Me */}
          <div className="about-content space-y-8">
            
            {/* About Card */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-3xl blur-xl" />
              <div className="relative bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10">
                
                <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-6">About Me</h2>
                
                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-6">
                  I craft <span className="text-white font-semibold">digital experiences</span> that blend creativity with cutting-edge technology. Specializing in full-stack development and AI automation.
                </p>
                
                <p className="text-gray-400 leading-relaxed mb-8">
                  Building digital experiences for startups and businesses worldwide. From sleek web applications to intelligent AI solutions, I transform ideas into reality.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <span className="block text-3xl lg:text-4xl font-bold text-white">8+</span>
                    <span className="text-sm text-gray-500">Projects</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl lg:text-4xl font-bold text-white">AI</span>
                    <span className="text-sm text-gray-500">Automation</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl lg:text-4xl font-bold text-white">2+</span>
                    <span className="text-sm text-gray-500">Years Exp</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative text */}
            <div className="hidden lg:block text-right">
              <span className="text-[120px] font-bold text-white/[0.02] leading-none select-none">
                2026
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
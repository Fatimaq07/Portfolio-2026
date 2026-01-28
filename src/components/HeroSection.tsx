import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { Mail, Download, MessageCircle, ArrowDown, Sparkles } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpg';

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo('.profile-image',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        0.2
      );

      tl.fromTo('.name-letter', 
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.05 },
        0.4
      );

      tl.fromTo('.role-text',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.9
      );

      tl.fromTo('.about-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        1.1
      );

      tl.fromTo('.cta-btn',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        1.3
      );

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
        background: 'linear-gradient(135deg, #0d1f0d 0%, #1a2f1a 50%, #0f1f0f 100%)'
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="float-element absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-amber-500/10 to-transparent blur-3xl" />
        <div className="float-element absolute bottom-40 left-10 w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-500/10 to-transparent blur-3xl" />
        <div className="float-element absolute top-1/2 right-1/4 w-40 h-40 rounded-full border border-amber-500/10" />
        
        {/* Leaf pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Profile Photo & Name */}
          <div className="space-y-8">
            
            {/* Profile Photo */}
            <div className="profile-image relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto lg:mx-0">
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-full border border-amber-500/20 animate-pulse" />
              <div className="absolute -inset-8 rounded-full border border-emerald-500/10" />
              
              {/* Gold glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/30 via-transparent to-emerald-500/20 rounded-full blur-xl" />
              
              {/* Photo container */}
              <motion.div 
                className="relative w-full h-full rounded-full overflow-hidden border-2 border-amber-500/40"
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
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-emerald-900 animate-pulse" />
            </div>

            {/* Greeting */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-center lg:text-left justify-center lg:justify-start"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400/80 text-lg tracking-widest uppercase">Hello, I'm</span>
            </motion.div>

            {/* Name - Large Typography */}
            <div className="space-y-2 text-center lg:text-left" style={{ perspective: '1000px' }}>
              <h1 className="overflow-hidden">
                <span className="flex justify-center lg:justify-start">
                  {firstName.split('').map((letter, i) => (
                    <span 
                      key={i} 
                      className="name-letter inline-block text-5xl md:text-7xl lg:text-8xl font-bold text-amber-50 tracking-tight"
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
                      className="name-letter inline-block text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 tracking-tight"
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
              <p className="text-xl md:text-2xl text-amber-50 font-light">
                Full Stack Developer
              </p>
              <p className="text-emerald-400/70 text-base">
                MERN Stack • AI Automation • UI/UX Design
              </p>
            </div>

            {/* Email */}
            <div className="role-text flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-amber-100/60">qfatima504@gmail.com</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
              <motion.a
                href="https://wa.me/919399723080"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn group flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 px-8 py-4 rounded-full font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5" />
                Hire Me
              </motion.a>
              
              <motion.a
                href="/Fatima_Qureshi_Resume.pdf"
                download
                className="cta-btn group flex items-center gap-3 border border-amber-500/30 text-amber-100 px-8 py-4 rounded-full font-semibold hover:bg-amber-500/10 transition-all"
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
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-emerald-500/10 to-amber-500/20 rounded-3xl blur-xl" />
              <div className="relative bg-gradient-to-br from-emerald-950/80 to-emerald-900/60 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-amber-500/20">
                
                <h2 className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-6">About Me</h2>
                
                <p className="text-lg lg:text-xl text-amber-50/90 leading-relaxed mb-6">
                  I craft <span className="text-amber-400 font-semibold">digital experiences</span> that blend creativity with cutting-edge technology. Specializing in full-stack development and AI automation.
                </p>
                
                <p className="text-amber-100/50 leading-relaxed mb-8">
                  Building digital experiences for startups and businesses worldwide. From sleek web applications to intelligent AI solutions, I transform ideas into reality.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-amber-500/20">
                  <div className="text-center">
                    <span className="block text-3xl lg:text-4xl font-bold text-amber-400">8+</span>
                    <span className="text-sm text-emerald-400/60">Projects</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl lg:text-4xl font-bold text-amber-400">AI</span>
                    <span className="text-sm text-emerald-400/60">Automation</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl lg:text-4xl font-bold text-amber-400">2+</span>
                    <span className="text-sm text-emerald-400/60">Years Exp</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative text */}
            <div className="hidden lg:block text-right">
              <span className="text-[120px] font-bold text-amber-500/[0.03] leading-none select-none">
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
          <div className="flex flex-col items-center gap-2 text-amber-500/50">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
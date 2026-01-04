import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { Play, Mail, Settings, Download, MessageCircle } from 'lucide-react';

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo('.bento-card', 
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.08 },
        0.2
      );

      tl.fromTo('.hero-title',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        0.4
      );

      // Rotating badge
      gsap.to('.rotating-badge', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} id="hero" className="min-h-screen py-8 lg:py-12 px-4 lg:px-8 relative overflow-hidden bg-white">
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-gradient-to-tr from-cyan-500/10 to-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Bento Grid */}
        <div className="grid grid-cols-12 grid-rows-[auto_auto_auto] gap-4 lg:gap-5">
          
          {/* About Me Header */}
          <div className="col-span-12 flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <Settings className="w-4 h-4 text-slate-600" />
            </div>
            <span className="text-sm font-medium text-slate-600">About Me</span>
          </div>

          {/* Left Profile Card */}
          <div className="bento-card col-span-12 lg:col-span-5 row-span-2 bg-gradient-to-br from-slate-50 to-slate-100 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 relative overflow-hidden shadow-2xl border border-slate-200">
            
            {/* Vertical Nav - Left Side */}
            <div className="hidden lg:flex flex-col gap-6 absolute left-4 top-1/2 -translate-y-1/2">
              {['Clients', 'Research', 'Portfolio', 'Podcast'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-[11px] font-medium uppercase tracking-wider text-slate-400 hover:text-cyan-600 transition-colors"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Profile Content */}
            <div className="lg:ml-8">
              {/* Circular Profile Image */}
              <div className="relative w-48 h-48 lg:w-56 lg:h-56 mx-auto lg:mx-0 mb-6">
                <div className="absolute inset-0 rounded-full bg-cyan-500/30" />
                <div className="absolute inset-3 rounded-full bg-blue-500/40" />
                <div className="absolute inset-6 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                  <span className="text-7xl lg:text-8xl font-serif text-slate-500">F</span>
                </div>
              </div>

              {/* Name */}
              <div className="text-center lg:text-left">
                <p className="text-sm italic text-slate-500 mb-1">I'm,</p>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight font-serif">
                  Fatima
                  <br />
                  Qureshi
                </h1>
                
                {/* Role */}
                <p className="text-lg text-cyan-600 font-medium mt-2">Full Stack Developer</p>
                <p className="text-slate-500 text-sm mt-1">MERN | AI Automation | UI/UX</p>
                
                {/* Email */}
                <div className="flex items-center gap-2 mt-4 justify-center lg:justify-start">
                  <div className="w-6 h-6 rounded bg-cyan-500/20 flex items-center justify-center">
                    <Mail className="w-3 h-3 text-cyan-600" />
                  </div>
                  <span className="text-sm text-slate-500">qfatima504@gmail.com</span>
                </div>
              </div>

              {/* Rotating Badge */}
              <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 w-16 h-16 lg:w-20 lg:h-20">
                <div className="rotating-badge w-full h-full rounded-full bg-cyan-600 flex items-center justify-center relative">
                  <svg viewBox="0 0 100 100" className="absolute w-full h-full">
                    <defs>
                      <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                    </defs>
                    <text className="text-[8px] fill-white uppercase tracking-[0.15em]">
                      <textPath href="#circlePath">
                        • UX DESIGN PORTFOLIO 2024 •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Title */}
          <div className="bento-card col-span-12 lg:col-span-7 flex items-end pb-4">
            <h2 className="hero-title text-6xl md:text-7xl lg:text-[8rem] font-bold text-slate-800 leading-none font-serif tracking-tight">
              Portfolio<span className="text-cyan-600">'</span>
            </h2>
          </div>

          {/* Featured Video Card */}
          <motion.div 
            className="bento-card col-span-12 md:col-span-6 lg:col-span-4 aspect-[4/3] rounded-[2rem] overflow-hidden relative cursor-pointer group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-emerald-600 to-green-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Decorative tropical elements */}
              <div className="absolute inset-0 opacity-60">
                <div className="absolute top-4 left-4 w-20 h-32 bg-pink-400/30 rounded-full blur-xl" />
                <div className="absolute bottom-4 right-4 w-24 h-24 bg-orange-400/30 rounded-full blur-xl" />
              </div>
              {/* Play Button */}
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Play className="w-6 h-6 text-slate-800 ml-1" fill="currentColor" />
              </div>
            </div>
          </motion.div>

          {/* Stats Cards - Right Side */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 grid grid-rows-2 gap-4">
            {/* Projects Card */}
            <motion.div 
              className="bento-card rounded-[1.5rem] p-5 flex flex-col justify-center bg-gradient-to-br from-teal-500 to-cyan-600"
              whileHover={{ scale: 1.03 }}
            >
              <span className="text-4xl lg:text-5xl font-bold text-white">8+</span>
              <span className="text-sm font-medium text-white/80 mt-1">Projects</span>
            </motion.div>
            
            {/* AI Automations Card */}
            <motion.div 
              className="bento-card rounded-[1.5rem] p-5 flex flex-col justify-center bg-gradient-to-br from-purple-500 to-violet-600"
              whileHover={{ scale: 1.03 }}
            >
              <span className="text-4xl lg:text-5xl font-bold text-white">AI</span>
              <span className="text-sm font-medium text-white/80 mt-1">Automations</span>
            </motion.div>
          </div>

          {/* Clients Card with Info */}
          <motion.div 
            className="bento-card col-span-12 md:col-span-6 lg:col-span-4 rounded-[1.5rem] p-5 bg-gradient-to-br from-slate-50 to-slate-100 backdrop-blur-xl flex flex-col justify-center border border-slate-200"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <span className="text-lg font-semibold text-slate-700">Clients</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Building digital experiences for startups and businesses worldwide. Let's create something amazing together.
            </p>
          </motion.div>

          {/* Resume Download Card */}
          <motion.a
            href="/Fatima_Qureshi_Resume.pdf"
            download
            className="bento-card col-span-6 lg:col-span-2 rounded-[1.5rem] p-5 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center cursor-pointer border border-slate-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-8 h-8 text-white mb-2" />
            <span className="text-sm font-medium text-white">Resume</span>
            <span className="text-xs text-slate-400 mt-1">Download PDF</span>
          </motion.a>

          {/* Hire Me - WhatsApp */}
          <motion.a
            href="https://wa.me/919399723080"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card col-span-6 lg:col-span-2 rounded-[1.5rem] p-5 bg-gradient-to-br from-green-500 to-green-600 flex flex-col items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-8 h-8 text-white mb-2" />
            <span className="text-sm font-medium text-white">Hire Me</span>
            <span className="text-xs text-white/80 mt-1">WhatsApp</span>
          </motion.a>

          {/* MERN + React Card */}
          <motion.div 
            className="bento-card col-span-12 lg:col-span-3 rounded-[1.5rem] p-5 flex flex-col justify-center bg-gradient-to-br from-amber-500 to-orange-600"
            whileHover={{ scale: 1.03 }}
          >
            <span className="text-4xl lg:text-5xl font-bold text-white">MERN</span>
            <span className="text-sm font-medium text-white/80 mt-1">+ React Stack.</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
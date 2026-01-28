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

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const firstName = "FATIMA";
  const lastName = "QURESHI";

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="min-h-screen flex flex-col justify-center px-6 lg:px-16 relative overflow-hidden bg-background"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Profile Photo & Name */}
          <div className="space-y-8">
            
            {/* Profile Photo */}
            <div className="profile-image relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto lg:mx-0">
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-full border border-primary/30" />
              
              {/* Photo container */}
              <motion.div 
                className="relative w-full h-full rounded-full overflow-hidden border-2 border-border"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img 
                  src={profilePhoto} 
                  alt="Fatima Qureshi" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Status badge */}
              <div className="absolute -bottom-1 -right-1 bg-primary w-5 h-5 rounded-full border-3 border-background" />
            </div>

            {/* Greeting */}
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-base tracking-widest uppercase text-center lg:text-left"
            >
              Hello, I'm
            </motion.p>

            {/* Name - Large Typography */}
            <div className="space-y-1 text-center lg:text-left" style={{ perspective: '1000px' }}>
              <h1 className="overflow-hidden">
                <span className="flex justify-center lg:justify-start">
                  {firstName.split('').map((letter, i) => (
                    <span 
                      key={i} 
                      className="name-letter inline-block text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight"
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
                      className="name-letter inline-block text-5xl md:text-7xl lg:text-8xl font-bold text-primary tracking-tight"
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
              <p className="text-xl md:text-2xl text-foreground/80 font-light">
                Full Stack Developer
              </p>
              <p className="text-muted-foreground text-base">
                MERN Stack • AI Automation • UI/UX Design
              </p>
            </div>

            {/* Email */}
            <div className="role-text flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <span className="text-muted-foreground">qfatima504@gmail.com</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
              <motion.a
                href="https://wa.me/919399723080"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn group flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-foreground/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5" />
                Hire Me
              </motion.a>
              
              <motion.a
                href="/Fatima_Qureshi_Resume.pdf"
                download
                className="cta-btn group flex items-center gap-3 border border-border text-foreground px-8 py-4 rounded-full font-medium hover:bg-muted transition-colors"
                whileHover={{ scale: 1.02 }}
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
            <div className="relative bg-card/70 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-border">
              
              <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-6 font-medium">About Me</h2>
              
              <p className="text-lg lg:text-xl text-foreground/80 leading-relaxed mb-6">
                I craft <span className="text-primary font-medium">digital experiences</span> that blend creativity with cutting-edge technology. Specializing in full-stack development and AI automation.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                Building digital experiences for startups and businesses worldwide. From sleek web applications to intelligent AI solutions, I transform ideas into reality.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
                <div className="text-center">
                  <span className="block text-3xl lg:text-4xl font-bold text-foreground">8+</span>
                  <span className="text-sm text-muted-foreground">Projects</span>
                </div>
                <div className="text-center">
                  <span className="block text-3xl lg:text-4xl font-bold text-foreground">AI</span>
                  <span className="text-sm text-muted-foreground">Automation</span>
                </div>
                <div className="text-center">
                  <span className="block text-3xl lg:text-4xl font-bold text-foreground">2+</span>
                  <span className="text-sm text-muted-foreground">Years Exp</span>
                </div>
              </div>
            </div>

            {/* Decorative text */}
            <div className="hidden lg:block text-right">
              <span className="text-[120px] font-bold text-muted/50 leading-none select-none">
                2026
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
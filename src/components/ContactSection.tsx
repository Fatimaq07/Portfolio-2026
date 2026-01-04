import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Twitter, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  hoverText?: string;
  isClickable: boolean;
}

const socialLinks: SocialLink[] = [
  { 
    name: 'Phone', 
    icon: Phone, 
    href: 'tel:+919399723080',
    hoverText: '+91 9399723080',
    isClickable: false
  },
  { 
    name: 'Email', 
    icon: Mail, 
    href: 'mailto:qfatima504@gmail.com',
    hoverText: 'qfatima504@gmail.com',
    isClickable: true
  },
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    href: 'https://www.linkedin.com/in/fatima-qureshi-94a798230/',
    isClickable: true
  },
  { 
    name: 'Twitter', 
    icon: Twitter, 
    href: 'https://x.com/resilientfoxx',
    isClickable: true
  },
  { 
    name: 'GitHub', 
    icon: Github, 
    href: 'https://github.com/Fatimaq07',
    isClickable: true
  },
];

const HexagonIcon = ({ 
  social, 
  index, 
  isCenter = false 
}: { 
  social?: SocialLink; 
  index: number;
  isCenter?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (isCenter) {
    return (
      <motion.div
        className="hexagon-icon relative flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div 
          className="w-28 h-32 md:w-36 md:h-40 flex items-center justify-center relative z-10"
          style={{
            background: 'linear-gradient(145deg, rgb(6 182 212), rgb(59 130 246))',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            boxShadow: '0 10px 40px -10px rgba(6, 182, 212, 0.4)',
          }}
        >
          <span className="text-3xl md:text-4xl text-white font-bold">@</span>
        </div>
      </motion.div>
    );
  }

  if (!social) return null;

  const IconComponent = social.icon;

  const handleClick = () => {
    if (social.isClickable) {
      window.open(social.href, social.href.startsWith('mailto') ? '_self' : '_blank');
    }
  };

  return (
    <motion.div
      className="hexagon-icon relative flex items-center justify-center cursor-pointer group"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.1, y: -5 }}
    >
      <div 
        className="w-20 h-24 md:w-24 md:h-28 flex items-center justify-center relative transition-all duration-300"
        style={{
          background: isHovered 
            ? 'linear-gradient(145deg, rgb(6 182 212), rgb(59 130 246))' 
            : 'linear-gradient(145deg, rgb(51 65 85), rgb(30 41 59))',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          boxShadow: isHovered 
            ? '0 15px 40px -10px rgba(6, 182, 212, 0.4)' 
            : '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <IconComponent 
          className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-300 ${
            isHovered ? 'text-white' : 'text-slate-400'
          }`}
        />
        
        {/* Connection dots */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-600/50" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-600/50" />
      </div>

      {/* Hover tooltip */}
      {social.hoverText && isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-medium z-20"
        >
          {social.hoverText}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
        </motion.div>
      )}
    </motion.div>
  );
};

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-header', {
        y: 60,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      });

      gsap.fromTo('.hexagon-grid', {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hexagon-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative min-h-screen py-32 lg:py-48 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)'
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="contact-header text-center mb-20">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-serif mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Let's Connect<span className="text-gray-400">.</span>
            </motion.h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Have a project in mind? I'd love to collaborate with you.
            </p>
          </div>

          {/* Hexagon Grid */}
          <div className="hexagon-grid flex flex-col items-center gap-4 md:gap-6">
            {/* Top row - 2 hexagons */}
            <div className="flex gap-4 md:gap-6">
              <HexagonIcon social={socialLinks[0]} index={0} />
              <HexagonIcon social={socialLinks[1]} index={1} />
            </div>
            
            {/* Middle row - center icon + 2 side icons */}
            <div className="flex items-center gap-4 md:gap-6 -mt-4">
              <HexagonIcon social={socialLinks[2]} index={2} />
              <HexagonIcon index={0} isCenter />
              <HexagonIcon social={socialLinks[3]} index={3} />
            </div>
            
            {/* Bottom row - 2 hexagons */}
            <div className="flex gap-4 md:gap-6 -mt-4">
              <HexagonIcon social={socialLinks[4]} index={4} />
              {/* Empty hexagon for symmetry */}
              <div 
                className="w-20 h-24 md:w-24 md:h-28 flex items-center justify-center opacity-30"
                style={{
                  background: 'linear-gradient(145deg, rgb(51 65 85), rgb(30 41 59))',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              />
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-center text-lg md:text-xl text-slate-500 mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Verifying connections
          </motion.p>
        </div>
      </div>

      {/* Marquee Footer */}
      <div className="mt-32 overflow-hidden border-t border-slate-700/30 pt-8">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-6xl lg:text-8xl font-bold text-slate-800/30 mx-8">
              Available for Projects • Let's Collaborate • 
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
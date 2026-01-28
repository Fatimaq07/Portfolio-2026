import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { Phone, Mail, Linkedin, Twitter, Github } from 'lucide-react';

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  displayText?: string;
  position: 'left' | 'right' | 'center';
}

const contactItems: SocialLink[] = [
  { 
    name: 'Phone', 
    icon: Phone, 
    href: 'tel:+919399723080',
    displayText: '+91 9399723080',
    position: 'left'
  },
  { 
    name: 'Email', 
    icon: Mail, 
    href: 'mailto:qfatima504@gmail.com',
    displayText: 'qfatima504@gmail.com',
    position: 'right'
  },
];

const socialLinks: SocialLink[] = [
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    href: 'https://www.linkedin.com/in/fatima-qureshi-94a798230/',
    position: 'center'
  },
  { 
    name: 'Twitter', 
    icon: Twitter, 
    href: 'https://x.com/resilientfoxx',
    position: 'center'
  },
  { 
    name: 'GitHub', 
    icon: Github, 
    href: 'https://github.com/Fatimaq07',
    position: 'center'
  },
];

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.contact-title', {
        y: 80,
        opacity: 0,
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
      }, {
        y: 0,
        opacity: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1
      }, 0.2);

      tl.fromTo('.contact-subtitle', {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8
      }, 0.5);

      tl.fromTo('.contact-card', {
        y: 60,
        opacity: 0,
        scale: 0.9
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15
      }, 0.6);

      tl.fromTo('.social-icon', {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1
      }, 1.0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="h-screen flex flex-col justify-start pt-12 md:pt-16 lg:pt-20 px-6 lg:px-12 relative overflow-hidden bg-background"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground)) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="w-full max-w-5xl mx-auto relative z-10 flex-1 flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="overflow-hidden">
            <h2 className="contact-title text-4xl md:text-5xl lg:text-7xl font-bold text-foreground tracking-tight font-serif">
              Let's Connect<span className="text-primary">.</span>
            </h2>
          </div>
          <p className="contact-subtitle text-base lg:text-lg text-muted-foreground mt-3 lg:mt-4 max-w-md mx-auto">
            Have a project in mind? I'd love to collaborate with you.
          </p>
        </div>

        {/* Contact Cards - Phone Left, Email Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {contactItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                target={item.href.startsWith('tel') ? '_self' : '_self'}
                className="contact-card group relative bg-card/70 backdrop-blur-sm border border-border rounded-2xl p-5 lg:p-6 flex items-center gap-4 hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{item.name}</span>
                  <p className="text-base lg:text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.displayText}
                  </p>
                </div>
                
                {/* Arrow indicator */}
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-primary text-xl">→</span>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3 lg:gap-4 mb-8 lg:mb-10">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-12 h-12 lg:w-14 lg:h-14 rounded-xl border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 group"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 text-foreground group-hover:text-primary-foreground transition-colors" />
              </motion.a>
            );
          })}
        </div>

        {/* CTA Card */}
        <motion.div 
          className="contact-card bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border rounded-2xl p-6 lg:p-8 text-center max-w-lg mx-auto"
          whileHover={{ scale: 1.01 }}
        >
          <h3 className="text-xl lg:text-2xl font-bold text-foreground font-serif mb-2 lg:mb-3">
            Ready to start a project?
          </h3>
          <p className="text-muted-foreground text-sm lg:text-base mb-4 lg:mb-6">
            Let's create something amazing together.
          </p>
          <motion.a
            href="mailto:qfatima504@gmail.com"
            className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-foreground text-background rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
            Send an Email
          </motion.a>
        </motion.div>

        {/* Bottom Marquee */}
        <div className="mt-auto pb-4 overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 25,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-3xl md:text-4xl lg:text-5xl font-bold text-muted/30 mx-6 lg:mx-8 font-serif">
                Available for Projects • Let's Collaborate • 
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

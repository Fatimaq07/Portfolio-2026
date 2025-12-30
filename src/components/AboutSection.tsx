import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Activity, Cpu, Zap, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const insights = [
  { icon: Activity, label: 'System Status', value: 'Operational' },
  { icon: Cpu, label: 'Current Focus', value: 'AI Agents' },
  { icon: Zap, label: 'Response Time', value: '< 24hrs' },
  { icon: Code2, label: 'Code Quality', value: '99.9%' },
];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line-by-line text reveal
      gsap.fromTo('.about-line', {
        y: 80,
        opacity: 0,
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
      }, {
        y: 0,
        opacity: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      });

      // Insight panel fade in
      gsap.fromTo('.insight-panel', {
        opacity: 0,
        scale: 0.9,
        y: 40
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        }
      });

      // Insight items stagger
      gsap.fromTo('.insight-item', {
        x: 30,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.insight-panel',
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 lg:py-48 bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: About Text */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <div className="overflow-hidden">
                <span className="about-line block text-primary text-sm uppercase tracking-widest font-medium">
                  About Me
                </span>
              </div>
              <div className="overflow-hidden">
                <h2 className="about-line headline-lg">
                  Building digital products<span className="text-primary">.</span>
                </h2>
              </div>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden">
                <p className="about-line body-lg">
                  I'm a product-focused developer who believes great software should feel invisible. 
                  My work sits at the intersection of design precision and engineering excellence.
                </p>
              </div>
              
              <div className="overflow-hidden">
                <p className="about-line body-md">
                  With expertise spanning modern frontend frameworks, AI integration, and full-stack 
                  architecture, I transform complex requirements into elegant, user-centric solutions.
                </p>
              </div>

              <div className="overflow-hidden">
                <p className="about-line body-md">
                  Currently focused on building AI-powered applications that augment human capabilities,
                  from intelligent voice agents to automated workflow systems.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="overflow-hidden pt-8">
              <div className="about-line grid grid-cols-3 gap-8">
                <div>
                  <span className="text-4xl lg:text-5xl font-bold text-foreground">3+</span>
                  <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
                </div>
                <div>
                  <span className="text-4xl lg:text-5xl font-bold text-foreground">50+</span>
                  <p className="text-sm text-muted-foreground mt-1">Projects Delivered</p>
                </div>
                <div>
                  <span className="text-4xl lg:text-5xl font-bold text-foreground">20+</span>
                  <p className="text-sm text-muted-foreground mt-1">Happy Clients</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sticky Insight Panel */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <motion.div 
                className="insight-panel glass-card p-8 space-y-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Developer Insight</span>
                </div>

                <div className="space-y-4">
                  {insights.map((item) => (
                    <motion.div 
                      key={item.label}
                      className="insight-item flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/30"
                      whileHover={{ x: 4, backgroundColor: 'hsl(var(--muted) / 0.5)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.value}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border/30">
                  <p className="text-xs text-muted-foreground">
                    Available for new projects • Based in India
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers, BarChart3, Bell, Users, Shield, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Real-time metrics and insights with interactive charts and data visualization.',
    tech: ['React', 'D3.js', 'WebSocket'],
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'AI-powered notification system that learns user preferences and priorities.',
    tech: ['Node.js', 'Redis', 'ML'],
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Seamless real-time collaboration with presence indicators and live cursors.',
    tech: ['Socket.io', 'CRDT', 'React'],
  },
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'Enterprise-grade security with role-based access and audit logging.',
    tech: ['OAuth2', 'JWT', 'AES-256'],
  },
  {
    icon: Zap,
    title: 'Workflow Automation',
    description: 'Custom automation rules and integrations with 50+ third-party services.',
    tech: ['n8n', 'Zapier', 'API'],
  },
  {
    icon: Layers,
    title: 'Plugin System',
    description: 'Extensible architecture allowing custom plugins and white-label solutions.',
    tech: ['SDK', 'TypeScript', 'CLI'],
  },
];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.projects-header', {
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

      // Main product card
      gsap.fromTo('.main-product', {
        y: 80,
        opacity: 0,
        scale: 0.95
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.main-product',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      // Feature cards - alternating from left and right
      document.querySelectorAll('.feature-card').forEach((card, i) => {
        const direction = i % 2 === 0 ? -100 : 100;
        
        gsap.fromTo(card, {
          x: direction,
          opacity: 0,
          rotateY: direction > 0 ? -15 : 15
        }, {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 lg:py-48 bg-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="projects-header mb-20">
          <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
            Featured Work
          </span>
          <h2 className="headline-lg max-w-3xl">
            Crafting products that matter<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Main Product Showcase */}
        <motion.div 
          className="main-product glass-card p-8 lg:p-12 mb-16"
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  Flagship Product
                </span>
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Productivity Dashboard
              </h3>
              
              <p className="body-lg mb-8">
                A comprehensive productivity suite designed for modern teams. 
                Combines task management, real-time collaboration, and AI-powered 
                insights into one seamless experience.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {['React', 'Node.js', 'PostgreSQL', 'Redis', 'OpenAI'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-2 bg-muted/50 rounded-full text-sm text-foreground/80 border border-border/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <motion.a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium"
                whileHover={{ scale: 1.05, gap: '12px' }}
                whileTap={{ scale: 0.98 }}
              >
                View Case Study
                <ArrowUpRight className="w-5 h-5" />
              </motion.a>
            </div>

            <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border/30 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                  <span className="text-muted-foreground text-sm">Product Preview</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Modules */}
        <div className="space-y-6">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
            Core Modules
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="feature-card glass-card p-6 lg:p-8 perspective-1000"
                whileHover={{ 
                  y: -4,
                  boxShadow: '0 20px 40px -20px hsl(var(--primary) / 0.2)'
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <h5 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h5>
                    <p className="text-sm text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {feature.tech.map((t) => (
                        <span 
                          key={t}
                          className="px-2 py-1 bg-muted/30 rounded text-xs text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Palette, Eye, TrendingUp, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Palette,
    title: 'UI-UX CREATIVE DESIGN',
    description: 'Crafting intuitive interfaces that delight users and drive engagement.',
  },
  {
    icon: Eye,
    title: 'VISUAL GRAPHIC DESIGN',
    description: 'Creating stunning visuals that communicate your brand message effectively.',
  },
  {
    icon: TrendingUp,
    title: 'STRATEGY & DIGITAL MARKETING',
    description: 'Data-driven strategies to grow your digital presence and reach.',
  },
];

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image container animation
      gsap.fromTo('.services-image-container', {
        x: -100,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      });

      // Header animation
      gsap.fromTo('.services-header', {
        y: 60,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      });

      // Service cards stagger
      gsap.fromTo('.service-card', {
        y: 60,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="services-header flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <span className="text-muted-foreground text-sm uppercase tracking-widest font-medium block mb-4">
              MY SERVICES ?
            </span>
            <h2 className="headline-lg font-serif">
              WHAT I'M<br />
              <span className="text-primary">OFFERING</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="body-md max-w-md text-right hidden md:block">
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2 border border-primary text-primary rounded-full font-medium text-sm whitespace-nowrap"
              whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
              whileTap={{ scale: 0.98 }}
            >
              ALL SERVICE
            </motion.a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Scroll indicator and image */}
          <div className="lg:col-span-3 services-image-container">
            <div className="flex flex-col items-center gap-8">
              {/* Scroll indicator */}
              <motion.div
                className="flex flex-col items-center gap-3"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll Down</span>
                <div className="w-8 h-12 rounded-full border border-muted-foreground/30 flex items-start justify-center p-2">
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                    animate={{ y: [0, 16, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                </div>
              </motion.div>

              {/* Circular image with overlay */}
              <motion.div 
                className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-primary/30"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80"
                  alt="Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </motion.div>
            </div>
          </div>

          {/* Right: Services Grid */}
          <div className="lg:col-span-9">
            <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  className="service-card group glass-card p-6 md:p-8 flex flex-col items-center text-center hover:border-primary/50 transition-all duration-300"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-muted/30 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm font-bold text-foreground mb-3 tracking-wide">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Read More Link */}
                  <motion.a
                    href="#contact"
                    className="mt-auto inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ gap: '12px' }}
                  >
                    READ MORE
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
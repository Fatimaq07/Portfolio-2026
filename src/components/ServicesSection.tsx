import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Code2, Bot, Layers, ArrowUpRight, Smartphone, Zap, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'End-to-end web applications with modern frameworks and scalable architecture.',
    features: ['React/Next.js', 'Node.js APIs', 'Database Design', 'Cloud Deployment'],
  },
  {
    icon: Bot,
    title: 'AI Agent Development',
    description: 'Intelligent automation solutions that transform how businesses operate.',
    features: ['Custom AI Agents', 'Chatbots', 'Voice Assistants', 'Workflow Automation'],
  },
  {
    icon: Layers,
    title: 'Frontend Engineering',
    description: 'Pixel-perfect interfaces with smooth animations and optimal performance.',
    features: ['UI/UX Implementation', 'Animation Design', 'Responsive Layouts', 'Performance Optimization'],
  },
  {
    icon: Smartphone,
    title: 'Web Applications',
    description: 'Progressive web apps that work seamlessly across all devices.',
    features: ['PWA Development', 'Cross-platform', 'Offline Support', 'Push Notifications'],
  },
  {
    icon: Zap,
    title: 'API Integration',
    description: 'Connect your applications with third-party services and APIs.',
    features: ['REST APIs', 'GraphQL', 'Webhooks', 'Payment Integration'],
  },
  {
    icon: Database,
    title: 'Backend Solutions',
    description: 'Robust server-side architecture for your applications.',
    features: ['Supabase', 'Firebase', 'PostgreSQL', 'Real-time Data'],
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
        rotateX: 15,
      }, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.1,
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
    <section ref={sectionRef} id="services" className="relative py-24 lg:py-32 bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Creative Image Layout */}
          <div className="lg:col-span-5 services-image-container">
            <div className="relative">
              {/* Main large circle */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Background gradient blob */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl transform scale-110" />
                
                {/* Main image circle */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 w-3/4 h-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden border-4 border-primary/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-600880292203-757bb62b4baf?w=600&q=80"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Top left small circle */}
                <motion.div 
                  className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full overflow-hidden border-2 border-border/50"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&q=80"
                    alt="Developer working"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Bottom left circle */}
                <motion.div 
                  className="absolute bottom-4 left-4 w-1/4 h-1/4 rounded-full overflow-hidden border-2 border-primary/40"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&q=80"
                    alt="Team meeting"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Decorative text */}
                <motion.div 
                  className="absolute -right-4 top-1/2 -translate-y-1/2 text-right"
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <p className="text-sm text-muted-foreground max-w-[200px] leading-relaxed">
                    <span className="font-semibold text-foreground">Helping you stay Consistent,</span> save time, and grow faster.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right: Services Content */}
          <div className="lg:col-span-7">
            <div className="services-header mb-12">
              <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
                What I Do
              </span>
              <h2 className="headline-lg mb-4">
                Services I Provide<span className="text-primary">.</span>
              </h2>
              <p className="body-lg max-w-2xl">
                From concept to deployment, I deliver end-to-end solutions that drive results.
              </p>
            </div>

            {/* Services Grid */}
            <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-4 perspective-1000">
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  className="service-card group glass-card p-6 hover:bg-card/70 transition-all duration-300"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.features.slice(0, 3).map((feature) => (
                          <span 
                            key={feature}
                            className="px-2 py-0.5 bg-muted/30 rounded-full text-xs text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium"
                whileHover={{ scale: 1.05, gap: '12px' }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Collaborate
                <ArrowUpRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

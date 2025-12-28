import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Code, Palette, ArrowRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Bot,
    title: 'AI Agent Development',
    description: 'Custom AI voice agents, chatbots, and automation systems that handle calls, qualify leads, and streamline your operations 24/7.',
    features: ['Voice Agents', 'Chatbots', 'Lead Automation', 'Custom Integrations'],
  },
  {
    icon: Code,
    title: 'Full-Stack Development',
    description: 'End-to-end web applications with robust backends, secure authentication, and scalable database architectures.',
    features: ['MERN Stack', 'API Development', 'Database Design', 'Cloud Deployment'],
  },
  {
    icon: Palette,
    title: 'Frontend & UI Development',
    description: 'Stunning, animated interfaces that captivate users and convert visitors into customers.',
    features: ['React/Next.js', 'Motion Design', 'Responsive UI', 'Performance Optimization'],
  },
];

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.services-header',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Service cards stagger
      gsap.fromTo(
        '.service-card',
        { y: 80, opacity: 0, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 lg:py-48 bg-background overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] 
                     bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="services-header text-center mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
            Freelance Services
          </span>
          <h2 className="headline-lg mb-6">
            Let's Build Something<br />
            <span className="text-gradient">Extraordinary Together</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Available for freelance projects and long-term collaborations. 
            Whether you need AI automation or a stunning web presence—I've got you covered.
          </p>
        </div>

        {/* Services grid */}
        <div className="services-grid grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 perspective-1000">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card glass-card p-8 lg:p-10 group hover:border-primary/50 
                        transition-all duration-500 hover:shadow-[0_0_60px_hsl(var(--primary)/0.15)]"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 
                            flex items-center justify-center mb-6 group-hover:scale-110 
                            group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] transition-all duration-500">
                <service.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover arrow */}
              <div className="mt-8 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 
                            translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                <span className="text-sm font-medium">Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <MagneticButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Hire Me for Your Project
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

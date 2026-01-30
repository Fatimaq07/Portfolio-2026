import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, Bot, Code, Palette, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'AI Agent Development',
    description: 'Custom voice agents, chatbots, and intelligent automation systems that handle calls, qualify leads, and boost efficiency.',
    features: ['Voice Agents', 'Chatbots', 'Lead Automation', 'Call Handling'],
  },
  {
    icon: Code,
    title: 'Full-Stack Development',
    description: 'End-to-end web applications with robust backends, seamless authentication, and scalable architecture.',
    features: ['Web Apps', 'APIs', 'Databases', 'Authentication'],
  },
  {
    icon: Palette,
    title: 'Frontend & UI Design',
    description: 'Stunning, animated interfaces with motion design that captivates users and elevates your brand.',
    features: ['React/Next.js', 'Animations', 'Responsive', 'Interactive'],
  },
];

export const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav animation
      gsap.fromTo(
        '.page-nav',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Title animation
      gsap.fromTo(
        '.page-title',
        { y: 60, opacity: 0, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1, delay: 0.3 }
      );

      // Service cards with 3D rotation entrance
      gsap.fromTo(
        '.service-card',
        { 
          y: 100, 
          opacity: 0, 
          rotateY: -15,
          scale: 0.9,
        },
        { 
          y: 0, 
          opacity: 1, 
          rotateY: 0,
          scale: 1,
          duration: 1, 
          stagger: 0.2, 
          delay: 0.5, 
          ease: 'power3.out' 
        }
      );

      // CTA button
      gsap.fromTo(
        '.cta-section',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="page-nav fixed top-0 left-0 right-0 z-50 py-6 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <Link 
              to="/" 
              className="text-xl font-display font-bold text-foreground"
            >
              Your Name
            </Link>
            <Link 
              to="/experience" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Experience →
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 container mx-auto px-6 lg:px-12">
        <div className="overflow-hidden mb-16">
          <h1 className="page-title text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground">
            Services<span className="text-primary">.</span>
          </h1>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 perspective-1000">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="service-card glass-card p-8 group hover:border-primary/50 transition-all duration-500 cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>

              <h3 className="text-2xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 text-xs bg-secondary/50 rounded-full text-foreground/70 border border-border/30"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="cta-section text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Ready to build something amazing?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Let's discuss your project and bring your ideas to life with cutting-edge technology.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg hover:bg-primary/90 transition-all group"
          >
            Get in Touch
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;

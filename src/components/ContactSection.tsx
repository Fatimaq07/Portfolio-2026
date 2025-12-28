import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@yourname.dev', href: 'mailto:hello@yourname.dev' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPin, label: 'Location', value: 'Available Worldwide', href: '#' },
];

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
];

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.contact-header',
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

      // Contact items stagger
      gsap.fromTo(
        '.contact-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Social icons stagger
      gsap.fromTo(
        '.social-icon',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.social-container',
            start: 'top 85%',
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
      id="contact"
      className="relative py-32 lg:py-48 bg-background overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="contact-header text-center mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
            Get in Touch
          </span>
          <h2 className="headline-lg mb-6">
            Let's Create Something<br />
            <span className="text-gradient">Amazing Together</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Have a project in mind? I'm always open to discussing new opportunities, 
            creative ideas, or ways to bring your vision to life.
          </p>
        </div>

        {/* Contact grid */}
        <div className="contact-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {contactInfo.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="contact-item glass-card p-6 text-center group hover:border-primary/50 
                        transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)]"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 border border-primary/30 
                            flex items-center justify-center mb-4 group-hover:scale-110 
                            group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] transition-all duration-500">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                {item.label}
              </h3>
              <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                {item.value}
              </p>
            </a>
          ))}
        </div>

        {/* Social links */}
        <div className="social-container flex justify-center gap-6 mb-16">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon w-14 h-14 rounded-full bg-muted/50 border border-border/50 
                        flex items-center justify-center group hover:bg-primary hover:border-primary 
                        transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
            >
              <social.icon className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors" />
            </a>
          ))}
        </div>

        {/* Marquee */}
        <div ref={marqueeRef} className="overflow-hidden py-8 border-t border-b border-border/30">
          <div className="animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="inline-flex items-center gap-8 mx-8">
                <span className="headline-lg text-muted-foreground/30">Available for Work</span>
                <ArrowUpRight className="w-8 h-8 text-primary/50" />
                <span className="headline-lg text-muted-foreground/30">Let's Collaborate</span>
                <ArrowUpRight className="w-8 h-8 text-primary/50" />
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Your Name. Crafted with passion.
          </p>
        </div>
      </div>
    </section>
  );
};

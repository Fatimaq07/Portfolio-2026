import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@yourname.com', href: 'mailto:hello@yourname.com' },
  { icon: Phone, label: 'Phone', value: '+1 234 567 890', href: 'tel:+1234567890' },
  { icon: MapPin, label: 'Location', value: 'Remote / Worldwide', href: '#' },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
];

export const Contact = () => {
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

      // Contact items with wave entrance
      gsap.fromTo(
        '.contact-item',
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, delay: 0.5, ease: 'back.out(1.7)' }
      );

      // Social links
      gsap.fromTo(
        '.social-link',
        { y: 30, opacity: 0, rotate: -10 },
        { y: 0, opacity: 1, rotate: 0, duration: 0.5, stagger: 0.1, delay: 0.8, ease: 'power3.out' }
      );

      // Marquee text
      gsap.to('.marquee-text', {
        x: '-50%',
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
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
              to="/about" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              About →
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div>
            <div className="overflow-hidden mb-8">
              <h1 className="page-title text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground">
                Let's Talk<span className="text-primary">.</span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-md">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="contact-item glass-card p-6 flex items-center gap-4 group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      {item.label}
                    </span>
                    <p className="text-lg font-display font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Social & CTA */}
          <div className="lg:pt-20">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              Connect With Me
            </h2>

            <div className="flex gap-4 mb-12">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="social-link w-16 h-16 rounded-2xl border border-border/50 flex items-center justify-center 
                           hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>

            {/* Large CTA */}
            <div className="glass-card p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Ready to start a project?
              </h3>
              <p className="text-muted-foreground mb-8">
                Let's create something amazing together.
              </p>
              <a
                href="mailto:hello@yourname.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all"
              >
                <Mail className="w-5 h-5" />
                Send an Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Footer */}
      <div className="fixed bottom-0 left-0 right-0 py-6 bg-secondary/50 backdrop-blur-sm overflow-hidden">
        <div className="marquee-text whitespace-nowrap flex gap-8">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-4xl md:text-6xl font-display font-bold text-foreground/10">
              AVAILABLE FOR WORK • OPEN TO COLLABORATE • LET'S BUILD TOGETHER •
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@fatima.dev' },
  { icon: Phone, label: 'Phone', value: '+91 900 000 0000' },
  { icon: MapPin, label: 'Location', value: 'India' },
];

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

      // Contact items stagger
      gsap.fromTo('.contact-item', {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      // CTA animation
      gsap.fromTo('.contact-cta', {
        y: 40,
        opacity: 0,
        scale: 0.95
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-cta',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 lg:py-48 bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="contact-header text-center mb-16">
            <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
              Get In Touch
            </span>
            <h2 className="headline-lg mb-6">
              Let's work together<span className="text-primary">.</span>
            </h2>
            <p className="body-lg max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. 
              Let's discuss how we can bring your ideas to life.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="contact-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((item) => (
              <motion.div
                key={item.label}
                className="contact-item glass-card p-6 text-center"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                <p className="font-medium text-foreground">{item.value}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div 
            className="contact-cta text-center"
            whileHover={{ scale: 1.02 }}
          >
            <motion.a
              href="mailto:hello@fatima.dev"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg"
              whileHover={{ scale: 1.05, gap: '16px' }}
              whileTap={{ scale: 0.98 }}
            >
              Start a Conversation
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mt-16">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                className="contact-item w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Footer */}
      <div className="mt-32 overflow-hidden border-t border-border/30 pt-8">
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
            <span key={i} className="text-6xl lg:text-8xl font-bold text-foreground/5 mx-8">
              Available for Projects • Let's Collaborate • 
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

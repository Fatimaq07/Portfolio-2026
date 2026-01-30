import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  'Product must be authentic',
  'Solve pain points elegantly',
  'User testing, feedback, and validation',
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

      // Image container animation
      gsap.fromTo('.about-image-container', {
        x: 100,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: About Text Content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="overflow-hidden">
                <div className="about-line flex items-center gap-2">
                  <span className="text-2xl">👋</span>
                  <span className="text-primary text-sm uppercase tracking-widest font-medium">
                    Hello! I'm
                  </span>
                </div>
              </div>
              <div className="overflow-hidden">
                <h2 className="about-line headline-xl font-serif">
                  Fatima<span className="italic ml-4 text-muted-foreground font-light">Qureshi</span>
                </h2>
              </div>
              <div className="overflow-hidden">
                <p className="about-line text-muted-foreground text-lg flex items-center gap-2">
                  — Product Designer <span className="text-primary">✦</span>
                </p>
              </div>
            </div>

            <div className="overflow-hidden">
              <p className="about-line body-md max-w-lg">
                Hello! I'm Fatima. I'm a <span className="text-foreground font-medium">UX leader, design thinker, product designer</span>, 
                experience strategist, generative artist & human-loving introvert.
              </p>
            </div>

            {/* Highlights with checkmarks */}
            <div className="space-y-3">
              {highlights.map((item, index) => (
                <div key={item} className="overflow-hidden">
                  <motion.div 
                    className="about-line flex items-center gap-3"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="overflow-hidden pt-4">
              <motion.div 
                className="about-line flex flex-wrap gap-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium"
                  whileHover={{ scale: 1.05, gap: '12px' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Let's Talk
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full font-medium text-foreground hover:bg-muted/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download CV
                  <Download className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </div>
          </div>

          {/* Right: Image with Hello bubble */}
          <div className="lg:col-span-6 about-image-container">
            <div className="relative">
              {/* Gradient glow behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/10 rounded-3xl blur-3xl opacity-60" />
              
              {/* Main image container */}
              <div className="relative">
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                    alt="Profile"
                    className="w-full aspect-[4/5] object-cover rounded-2xl"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </motion.div>

                {/* Hello bubble */}
                <motion.div
                  className="absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2"
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-foreground/30 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                    <span className="text-foreground font-serif text-xl md:text-2xl italic">Hello</span>
                  </div>
                </motion.div>

                {/* Decorative phone icon */}
                <motion.div
                  className="absolute top-8 right-8"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-10 h-10 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '10+', label: 'AI Agents Built' },
];

export const About = () => {
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

      // Story lines animation
      gsap.fromTo(
        '.story-line',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.5, ease: 'power3.out' }
      );

      // Stats animation with counter
      gsap.fromTo(
        '.stat-item',
        { y: 60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, delay: 0.8, ease: 'back.out(1.7)' }
      );

      // Floating animation for decorative elements
      gsap.to('.float-element', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5,
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
              to="/skills" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Skills →
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Text */}
          <div>
            <div className="overflow-hidden mb-12">
              <h1 className="page-title text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground">
                About Me<span className="text-primary">.</span>
              </h1>
            </div>

            <div className="space-y-6 max-w-xl">
              <p className="story-line text-lg md:text-xl text-foreground/80 leading-relaxed">
                I'm a passionate developer who transforms complex ideas into elegant digital solutions.
              </p>
              <p className="story-line text-lg md:text-xl text-foreground/80 leading-relaxed">
                With expertise spanning full-stack development and AI automation, I build products that don't just work — they inspire.
              </p>
              <p className="story-line text-lg md:text-xl text-foreground/80 leading-relaxed">
                From voice agents that handle calls to intelligent chatbots that convert leads, I craft experiences that push boundaries.
              </p>
              <p className="story-line text-lg md:text-xl text-foreground/80 leading-relaxed">
                Every project is an opportunity to innovate, to learn, and to create something truly remarkable.
              </p>
            </div>
          </div>

          {/* Right Column - Stats & Decorative */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="float-element absolute -top-10 right-10 w-32 h-32 rounded-full border border-primary/20 opacity-50" />
            <div className="float-element absolute top-40 -right-5 w-20 h-20 rounded-full bg-primary/10" />
            <div className="float-element absolute bottom-20 right-20 w-16 h-16 rounded-full border border-primary/30" />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mt-20 lg:mt-32">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="stat-item glass-card p-8 text-center group hover:border-primary/50 transition-all duration-300"
                >
                  <span className="block text-4xl md:text-5xl font-display font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

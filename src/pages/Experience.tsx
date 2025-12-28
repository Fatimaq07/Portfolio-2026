import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, Download } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Senior Full-Stack Developer',
    company: 'Tech Startup',
    period: '2023 - Present',
    description: 'Leading development of AI-powered products and managing a team of developers.',
  },
  {
    type: 'work',
    title: 'AI Agent Developer',
    company: 'Freelance',
    period: '2022 - Present',
    description: 'Building voice agents, chatbots, and automation systems for various clients.',
  },
  {
    type: 'work',
    title: 'Frontend Developer Intern',
    company: 'Digital Agency',
    period: '2021 - 2022',
    description: 'Developed responsive web applications and learned industry best practices.',
  },
  {
    type: 'education',
    title: 'Computer Science',
    company: 'University',
    period: '2018 - 2022',
    description: 'Bachelor\'s degree with focus on software engineering and AI fundamentals.',
  },
];

export const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

      // Timeline line growth
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, delay: 0.5, ease: 'power3.out', transformOrigin: 'top' }
      );

      // Experience items stagger with slide-in
      gsap.fromTo(
        '.exp-item',
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.7, ease: 'power3.out' }
      );

      // Timeline dots pulse
      gsap.fromTo(
        '.timeline-dot',
        { scale: 0 },
        { scale: 1, duration: 0.4, stagger: 0.2, delay: 0.9, ease: 'back.out(2)' }
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
              to="/contact" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Contact →
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="overflow-hidden">
            <h1 className="page-title text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground">
              Experience<span className="text-primary">.</span>
            </h1>
          </div>
          
          <button className="resume-btn inline-flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all group">
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            Download Resume
          </button>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-3xl">
          {/* Timeline line */}
          <div className="timeline-line absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="exp-item relative pl-12 md:pl-20">
                {/* Timeline dot */}
                <div className="timeline-dot absolute left-2 md:left-6 top-2 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                <div className="glass-card p-6 md:p-8 hover:border-primary/50 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <span className="text-xs uppercase tracking-widest text-primary font-medium">
                      {exp.type === 'work' ? '💼 Work' : '🎓 Education'}
                    </span>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-primary mb-4">{exp.company}</p>
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;

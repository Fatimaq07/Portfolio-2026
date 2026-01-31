import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  children: string;
  className?: string;
  type?: 'words' | 'lines' | 'chars';
  delay?: number;
  stagger?: number;
  trigger?: 'scroll' | 'load';
}

export const AnimatedText = ({
  children,
  className = '',
  type = 'words',
  delay = 0,
  stagger = 0.05,
  trigger = 'scroll',
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const text = children;
    
    let elements: string[] = [];
    
    if (type === 'words') {
      elements = text.split(' ');
    } else if (type === 'lines') {
      elements = text.split('\n');
    } else {
      elements = text.split('');
    }

    container.innerHTML = elements
      .map(
        (el, i) =>
          `<span class="inline-block overflow-hidden"><span class="animated-element inline-block" style="transform: translateY(100%); opacity: 0;">${
            type === 'words' ? el + (i < elements.length - 1 ? '&nbsp;' : '') : el
          }</span></span>`
      )
      .join('');

    const animatedElements = container.querySelectorAll('.animated-element');

    const animation = gsap.to(animatedElements, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: stagger,
      delay: delay,
      ease: 'power4.out',
      scrollTrigger:
        trigger === 'scroll'
          ? {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          : undefined,
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [children, type, delay, stagger, trigger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const RevealText = ({ children, className = '', delay = 0 }: RevealTextProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        y: '100%',
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [delay]);

  return (
    <div className="overflow-hidden">
      <div ref={ref} className={className}>
        {children}
      </div>
    </div>
  );
};

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
}

export const MagneticButton = ({
  children,
  className = '',
  onClick,
  href,
  strength = 0.3,
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (text) {
        gsap.to(text, {
          x: x * strength * 0.5,
          y: y * strength * 0.5,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });

      if (text) {
        gsap.to(text, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
        });
      }
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  const baseClasses = `relative inline-flex items-center justify-center px-8 py-4 font-display font-semibold text-primary-foreground bg-primary rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] ${className}`;

  const content = (
    <>
      <span ref={textRef} className="relative z-10">
        {children}
      </span>
      <span className="absolute inset-0 bg-foreground opacity-0 transition-opacity duration-300 hover:opacity-10" />
    </>
  );

  if (href) {
    return (
      <a ref={buttonRef} href={href} className={baseClasses} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button ref={buttonRef} onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
};

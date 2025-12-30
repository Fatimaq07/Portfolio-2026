import { motion } from 'framer-motion';

const bannerItems = [
  'BRANDING',
  'SEO',
  'WEB DEVELOPMENT',
  'AI AGENTS',
  'DESIGN',
  'AUTOMATION',
];

export const ScrollingBanner = () => {
  return (
    <div className="relative w-full overflow-hidden py-6 bg-primary">
      {/* Diagonal stripe effect */}
      <div className="absolute inset-0 bg-primary transform -skew-y-2" />
      
      <motion.div
        className="flex whitespace-nowrap relative z-10"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center">
            {bannerItems.map((item, i) => (
              <div key={`${setIndex}-${i}`} className="flex items-center">
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-primary-foreground uppercase tracking-wide px-4">
                  {item}
                </span>
                <span className="text-primary-foreground/80 text-lg">✦</span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

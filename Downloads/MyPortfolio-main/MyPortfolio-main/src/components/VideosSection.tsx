import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, Bot, Mic, Cpu } from 'lucide-react';

interface VideoItem {
  id: number;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
}

const videos: VideoItem[] = [
  {
    id: 1,
    title: 'AI Voice Assistant',
    category: 'Voice AI',
    description: 'A conversational voice agent built with OpenAI Realtime API that handles complex customer support queries with <500ms latency.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80',
    duration: '2:45',
  },
  {
    id: 2,
    title: 'Autonomous Agent',
    category: 'Automation',
    description: 'Self-healing workflow agent that connects CRM, Email, and Slack to automate lead qualification without human intervention.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    duration: '3:12',
  },
  {
    id: 3,
    title: 'Multi-Modal Bot',
    category: 'GenAI',
    description: 'An intelligent agent capable of analyzing images and voice commands simultaneously to perform data entry tasks.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
    duration: '1:58',
  },
  {
    id: 4,
    title: 'Sentiment Engine',
    category: 'Analytics',
    description: 'Real-time voice sentiment analysis dashboard visualizing customer emotions during live calls.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    duration: '4:20',
  },
];

const VideoCard = ({ 
  video, 
  isActive, 
  onClick 
}: { 
  video: VideoItem; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setProgress(0);
    }
  }, [isActive]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const getIcon = () => {
    if (video.category === 'Voice AI') return <Mic size={14} />;
    if (video.category === 'Automation') return <Bot size={14} />;
    return <Cpu size={14} />;
  };

  return (
    <motion.div
      layout
      onClick={onClick}
      className={`relative h-[320px] md:h-[380px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group ${
        isActive ? 'flex-[3]' : 'flex-[1] hover:flex-[1.2]'
      }`}
    >
      <div className={`absolute inset-0 p-[1px] rounded-3xl transition-all duration-500 ${
        isActive ? 'bg-gradient-to-br from-primary/60 via-primary/40 to-accent/40' : 'bg-border'
      }`}>
        <div className="absolute inset-0 bg-card rounded-[23px] overflow-hidden">
          
          <div className="absolute inset-0 w-full h-full">
            <AnimatePresence mode="wait">
              {isActive ? (
                <motion.video
                  key="video"
                  ref={videoRef}
                  src={video.videoUrl}
                  loop
                  muted={isMuted}
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <motion.div
                  key="image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                >
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
            
            <div className="flex justify-between items-start">
              <motion.div 
                layout="position"
                className={`backdrop-blur-sm border px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${
                  isActive 
                    ? 'bg-primary/20 border-primary/30 text-primary' 
                    : 'bg-card/80 border-border text-muted-foreground group-hover:text-foreground transition-colors'
                }`}
              >
                {getIcon()} {video.category}
              </motion.div>

              {isActive && (
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                    className="p-2 rounded-full bg-card/80 text-muted-foreground hover:bg-foreground hover:text-background transition-colors border border-border"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <motion.h3 
                layout="position"
                className={`font-bold mb-1 leading-tight transition-all duration-500 ${
                  isActive 
                    ? 'text-2xl md:text-3xl text-foreground' 
                    : 'text-lg text-foreground/80 rotate-0 md:-rotate-90 md:origin-bottom-left md:translate-x-6 md:-translate-y-6 whitespace-nowrap'
                }`}
              >
                {video.title}
              </motion.h3>

              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-muted-foreground text-xs max-w-md mb-3 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full text-xs font-bold hover:bg-foreground/90 transition-colors"
                    >
                      <Play size={12} fill="currentColor" /> Watch
                    </motion.button>
                    <span className="text-muted-foreground text-xs font-mono">
                      {video.duration}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
                <motion.div 
                  className="h-full bg-primary"
                  style={{ width: `${progress}%` }}
                  transition={{ type: 'tween', ease: 'linear' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const VideosSection = () => {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section className="relative h-screen flex flex-col justify-center px-6 overflow-hidden"
    >
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 border-b border-border pb-4">
          <div>
            <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium block mb-2">
              Live Demonstrations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tighter font-serif">
              Intelligent <span className="text-primary">Agents</span>.
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Click a card to interact.
            </p>
          </div>
        </div>

        {/* Compact Video Cards */}
        <div className="flex flex-col md:flex-row gap-3 h-auto md:h-[380px]">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isActive={activeId === video.id}
              onClick={() => setActiveId(video.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
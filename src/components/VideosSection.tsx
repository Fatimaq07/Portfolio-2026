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
      <div className={`absolute inset-0 p-[1px] rounded-3xl bg-gradient-to-br from-transparent via-white/10 to-transparent transition-all duration-500 ${
        isActive ? 'from-cyan-500 via-blue-400 to-purple-600' : 'group-hover:from-white/20 group-hover:to-white/5'
      }`}>
        <div className="absolute inset-0 bg-slate-950 rounded-[23px] overflow-hidden">
          
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
                    className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
            
            <div className="flex justify-between items-start">
              <motion.div 
                layout="position"
                className={`backdrop-blur-xl border px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg ${
                  isActive 
                    ? 'bg-cyan-500/20 border-cyan-400/30 text-cyan-200' 
                    : 'bg-white/5 border-white/10 text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-colors'
                }`}
              >
                {getIcon()} {video.category}
              </motion.div>

              {isActive && (
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                    className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors border border-white/10"
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
                    ? 'text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-200' 
                    : 'text-lg text-white/80 rotate-0 md:-rotate-90 md:origin-bottom-left md:translate-x-6 md:-translate-y-6 whitespace-nowrap'
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
                  <p className="text-slate-300 text-xs max-w-md mb-3 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-500 text-white px-4 py-2 rounded-full text-xs font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-shadow"
                    >
                      <Play size={12} fill="currentColor" /> Watch
                    </motion.button>
                    <span className="text-slate-500 text-xs font-mono">
                      {video.duration}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <motion.div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ type: 'tween', ease: 'linear' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {isActive && (
        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 z-[-1] blur-2xl opacity-50" />
      )}
    </motion.div>
  );
};

export const VideosSection = () => {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section className="relative h-screen flex flex-col justify-center px-6 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #0f172a 60%, #020617 100%)'
      }}
    >
      
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/15 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 border-b border-slate-700/30 pb-4">
          <div>
            <span className="text-cyan-400 text-xs uppercase tracking-[0.2em] font-medium block mb-2">
              Live Demonstrations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter font-serif">
              Intelligent <span className="text-cyan-400">Agents</span>.
            </h2>
            <p className="text-slate-400 text-sm mt-1">
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
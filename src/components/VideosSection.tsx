import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VideoItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
}

const videos: VideoItem[] = [
  {
    id: 1,
    title: 'AI Voice Agent Demo',
    description: 'Showcasing an intelligent voice assistant built with n8n and OpenAI for customer support automation.',
    thumbnail: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    duration: '2:45',
  },
  {
    id: 2,
    title: 'Workflow Automation',
    description: 'End-to-end automation pipeline connecting multiple services using Zapier and custom webhooks.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '3:12',
  },
  {
    id: 3,
    title: 'Chatbot Integration',
    description: 'A conversational AI chatbot integrated into a healthcare platform for patient queries.',
    thumbnail: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '1:58',
  },
  {
    id: 4,
    title: 'Data Pipeline',
    description: 'Automated data extraction and processing pipeline for business analytics dashboard.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '4:20',
  },
];

const VideoCard = ({ video, index }: { video: VideoItem; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <motion.div
      className="video-card relative rounded-2xl overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-video bg-card overflow-hidden rounded-2xl border border-border/50">
        {/* Thumbnail */}
        <motion.img
          src={video.thumbnail}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Video */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          muted={isMuted}
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Play button overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/40"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30"
            whileHover={{ scale: 1.1 }}
          >
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </motion.div>
        </motion.div>

        {/* Controls overlay */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            {/* Progress bar */}
            <div className="flex-1 mr-4">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: isPlaying ? '100%' : '0%' }}
                  transition={{ duration: 10, ease: 'linear' }}
                />
              </div>
            </div>
            
            {/* Mute button */}
            <motion.button
              onClick={toggleMute}
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Duration badge */}
        <div className="absolute top-4 right-4 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm">
          <span className="text-xs text-white font-medium">{video.duration}</span>
        </div>

        {/* Decorative sparkles */}
        <motion.div
          className="absolute top-4 left-4"
          animate={{ 
            rotate: isHovered ? 180 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/60">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
          </svg>
        </motion.div>
      </div>

      {/* Card info */}
      <div className="mt-4 space-y-2">
        <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {video.description}
        </p>
      </div>
    </motion.div>
  );
};

export const VideosSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.videos-header', {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="videos" 
      className="relative py-24 lg:py-32 overflow-hidden bg-secondary/20"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="videos-header mb-12 lg:mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
            Automation Showcase
          </span>
          <h2 className="headline-lg mb-4">
            AI & Automation Videos<span className="text-primary">.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Hover over any video to see it in action. These showcase my work with AI agents, workflow automation, and intelligent systems.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/4 right-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  );
};

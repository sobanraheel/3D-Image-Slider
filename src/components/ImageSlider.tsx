import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  "https://picsum.photos/seed/slider1/800/600",
  "https://picsum.photos/seed/slider2/800/600",
  "https://picsum.photos/seed/slider3/800/600",
  "https://picsum.photos/seed/slider4/800/600",
  "https://picsum.photos/seed/slider5/800/600",
  "https://picsum.photos/seed/slider6/800/600",
  "https://picsum.photos/seed/slider7/800/600",
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-screen bg-neutral-950 flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-indigo-500 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="absolute top-12 left-0 right-0 text-center z-50">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          3D Image Slider
        </h1>
        <p className="text-neutral-400 text-sm md:text-base max-w-lg mx-auto">
          Built with React, Framer Motion, and Tailwind CSS. Fully compatible with your Next.js project.
        </p>
      </div>

      {/* Slider Container */}
      <div 
        className="relative w-full max-w-6xl h-[600px] flex items-center justify-center" 
        style={{ perspective: '1200px' }}
      >
        {images.map((src, index) => {
          // Calculate shortest distance in a circular array
          const length = images.length;
          let diff = (index - currentIndex) % length;
          if (diff > Math.floor(length / 2)) diff -= length;
          if (diff < -Math.floor(length / 2)) diff += length;

          const absDiff = Math.abs(diff);
          const isActive = diff === 0;
          
          // Calculate 3D transforms
          const x = diff * 220; // Horizontal spacing
          const z = -absDiff * 150; // Push back
          const rotateY = diff * -15; // Rotate towards center
          const scale = 1 - absDiff * 0.1;
          const opacity = absDiff > 2 ? 0 : 1 - absDiff * 0.2;
          const zIndex = length - absDiff;

          return (
            <motion.div
              key={index}
              className="absolute w-[300px] h-[400px] md:w-[500px] md:h-[350px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              initial={false}
              animate={{
                x,
                z,
                rotateY,
                scale,
                opacity,
                zIndex,
              }}
              transition={{
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1], // Custom spring-like easing
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
              onClick={() => setCurrentIndex(index)}
            >
              <img 
                src={src} 
                alt={`Slide ${index}`} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
              {/* Overlay for inactive slides */}
              <motion.div 
                className="absolute inset-0 bg-black"
                initial={false}
                animate={{ opacity: isActive ? 0 : 0.5 }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Reflection/Glow effect on active slide */}
              {isActive && (
                <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="absolute bottom-12 flex items-center gap-6 z-50">
        <button
          onClick={handlePrev}
          className="p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import heroVideo from "../assets/videos/hero-video.mp4";

const Hero = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowText(true);
    }, 2000); // Show text after 2 seconds

    const timer2 = setTimeout(() => {
      setShowText(false);
    }, 6000); // Completely hide text after 6 seconds

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className={`text-white text-4xl md:text-6xl font-bold transition-opacity  ${
            showText ? 'opacity-100 scale-110' : 'opacity-0 scale-80'
          }`}
        >
          Welcome to CinemaPixiJs
        </h1>
      </div>
    </div>
  );
};

export default Hero;

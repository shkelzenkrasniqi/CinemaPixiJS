import React from 'react';
import PixiTextAnimation from './PixiTextAnimation';

const BackgroundVideo = () => {
  const texts = [
    "This is the biggest cinema in Kosovo",
    "More than 10,000 tickets sold",
    "Experience the magic of movies with us"
  ];
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video autoPlay loop muted className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-0">
        <source src="https://videos.pexels.com/video-files/7988642/7988642-hd_1366_720_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <PixiTextAnimation texts={texts} duration={3000} />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
        </div>
      </div>
    </div>
  );
};

export default BackgroundVideo;

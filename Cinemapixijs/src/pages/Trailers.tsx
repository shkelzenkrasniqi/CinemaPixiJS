import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import poster1 from '../assets/images/poster1.jpg';
import poster2 from '../assets/images/poster2.jpg';
import poster3 from '../assets/images/poster3.jpg';
import poster4 from '../assets/images/poster4.jpg';
import video1 from '../assets/videos/video1.mp4';
import video2 from '../assets/videos/video2.mp4';
import video3 from '../assets/videos/video3.mp4';
import video4 from '../assets/videos/video4.mp4';

const Trailers = () => {
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [hoveredPoster, setHoveredPoster] = useState(null);
  const videoRef = useRef(null);

  const playTrailer = (index) => {
    setSelectedTrailer(index);
    handlePlay();
  };

  const stopTrailer = () => {
    setSelectedTrailer(null);
    handleStop();
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleFastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10; // Forward 10 seconds
    }
  };

  useEffect(() => {
    const posters = document.querySelectorAll('.poster');

    posters.forEach((poster, index) => {
      poster.addEventListener('mouseenter', () => setHoveredPoster(index));
      poster.addEventListener('mouseleave', () => setHoveredPoster(null));
    });

    return () => {
      posters.forEach((poster, index) => {
        poster.removeEventListener('mouseenter', () => setHoveredPoster(index));
        poster.removeEventListener('mouseleave', () => setHoveredPoster(null));
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex justify-center items-center flex-wrap bg-gray-900">
        <div className="grid grid-cols-2 gap-4">
          {[
            { poster: poster1, onClick: () => playTrailer(0) },
            { poster: poster2, onClick: () => playTrailer(1) },
            { poster: poster3, onClick: () => playTrailer(2) },
            { poster: poster4, onClick: () => playTrailer(3) },
          ].map((item, index) => (
            <img
              key={index}
              src={item.poster}
              alt={`Movie Poster ${index + 1}`}
              className={`w-64 h-auto cursor-pointer poster ${hoveredPoster === index ? 'scale-110 transition-transform duration-300' : 'scale-100'}`}
              onClick={item.onClick}
            />
          ))}
        </div>
      </div>
      {selectedTrailer !== null && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center">
          <video
            ref={videoRef}
            src={selectedTrailer === 0 ? video1 : selectedTrailer === 1 ? video2 : selectedTrailer === 2 ? video3 : video4}
            className="w-3/4 h-auto"
            autoPlay
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-0 right-0 m-4 flex space-x-4">
            <button onClick={handlePlay} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Play
            </button>
            <button onClick={handlePause} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Pause
            </button>
            <button onClick={handleStop} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Stop
            </button>
            <button onClick={handleFastForward} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Fast Forward
            </button>
            <button onClick={stopTrailer} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Trailers;

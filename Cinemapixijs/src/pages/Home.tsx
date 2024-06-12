import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieSlider from '../components/MovieSlider';
import Footer from '../components/Footer';
import { Stage } from '@inlet/react-pixi';
import BackgroundVideo from '../components/BackgroundVideo';
import FeaturedSection from '../components/FeaturedSection';


const Home = () => {
    const [showHero, setShowHero] = useState(true);
    const [showBV, setShowBV] = useState(false);
    const [showN, setShowN] = useState(false);
    const [showMs, setShowMs] = useState(false);
    const [showF, setShowF] = useState(false);
    const [showFS, setShowFS] = useState(false);

  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowHero(false);
        setShowBV(true);
        setShowN(true);
        setShowMs(true);
        setShowFS(true);
        setShowF(true);
      }, 5000); // Wait 5 seconds before showing other components
  
      return () => clearTimeout(timer);
    }, []);
    return (
        <div>
          {showHero && <Hero />}
          {showN && <Navbar />}
          {showBV && <BackgroundVideo />}
          
          {showMs && (
            <Stage
              width={document.documentElement.clientWidth}
              height={document.documentElement.clientHeight}
              options={{ backgroundColor: 0xff0000 }}
            >
              <MovieSlider />
            </Stage>
          )}
          
          {showFS && <FeaturedSection />}
          {showF && <Footer />}
        </div>
      );
  
}

export default Home
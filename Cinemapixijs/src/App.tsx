import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieSlider from './components/MovieSlider';
import Footer from './components/Footer';
import { Stage, AppProvider } from '@inlet/react-pixi';

const App = () => {
  const [showHero, setShowHero] = useState(true);
  console.log(window.innerWidth);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHero(false);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showHero && <Hero />}
      <Navbar />
      
      <AppProvider>
        <Stage width={document.documentElement.clientWidth} height={document.documentElement.clientHeight} options={{ backgroundColor: 0xff0000 }} >
          <MovieSlider />
        </Stage>
      </AppProvider>
      <Footer />
    </div>
  );
};

export default App;

import  { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieSlider from './components/MovieSlider';

const App = () => {
  const [showHero, setShowHero] = useState(true);

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
      <MovieSlider/>
    </div>
  );
};

export default App;

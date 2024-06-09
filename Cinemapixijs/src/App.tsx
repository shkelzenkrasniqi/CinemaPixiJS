import  { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

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
    </div>
  );
};

export default App;

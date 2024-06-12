// src/App.tsx

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Trailers from './pages/Trailers';
import AddMovies from './pages/AddMovies';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="trailers" element={<Trailers />} />
          
          <Route path="add" element={<AddMovies />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

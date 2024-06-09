import { useEffect, useState } from 'react';
import { Container, Sprite, Text, useApp } from '@inlet/react-pixi';
import { getAllMovies } from '../services/movieservice';
import * as PIXI from 'pixi.js';

const MovieSlider = () => {
  const [movies, setMovies] = useState([]);
  const [positions, setPositions] = useState([]);

  const app = useApp();

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getAllMovies();
      setMovies(moviesData);
      const initialPositions = moviesData.map((_, i) => ({
        x: app.screen.width + i * 240, // Space between each movie poster
        y: 100,
      }));
      setPositions(initialPositions);
    };

    fetchMovies();
  }, [app.screen.width]);

  useEffect(() => {
    const ticker = new PIXI.Ticker();
    ticker.add(() => {
        // @ts-ignore
      setPositions((prevPositions) =>
        prevPositions.map((pos, i) => {
            // @ts-ignore
          const newX = pos.x - 4;
          
          return {
            // @ts-ignore
            ...pos,
            x: newX < -240 ? app.screen.width + (movies.length - 1) * 240 : newX,
          };
        })
      );
    });
    ticker.start();

    return () => ticker.destroy();
  }, [app.screen.width, movies]);

  return (
    // @ts-ignore
    <Container>
      {positions.map((pos, index) => (
        // @ts-ignore
        <Container key={index} x={pos.x} y={pos.y}>
          <Sprite
          // @ts-ignore
            image={`data:${movies[index].photos[0]?.contentType};base64,${movies[index].photos[0]?.photoData}`}
            width={200}
            height={300}
            interactive
            // @ts-ignore
            pointerdown={() => console.log(`Clicked on ${movies[index].movieName}`)}
          />
          <Text
          // @ts-ignore
            text={movies[index].movieName}
            style={{ fontFamily: 'Arial', fontSize: 24, fill: '#ffffff', align: 'center' }}
            anchor={0.5}
            x={100} // Center text in the middle of the poster
            y={320} // Position text below the poster
          />
        </Container>
      ))}
    </Container>
  );
};

export default MovieSlider;

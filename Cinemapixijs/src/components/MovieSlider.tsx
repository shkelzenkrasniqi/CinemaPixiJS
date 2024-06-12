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
      setPositions((prevPositions) =>
        prevPositions.map((pos, i) => {
          const newX = pos.x - 4;
          return {
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
    <Container>
      {positions.map((pos, index) => (
        <Container key={index} x={pos.x} y={pos.y}>
          <Sprite
            image={`data:${movies[index].photos[0]?.contentType};base64,${movies[index].photos[0]?.photoData}`}
            width={200}
            height={300}
            interactive
            pointerdown={() => console.log(`Clicked on ${movies[index].movieName}`)}
          />
          <Text
            text={movies[index].movieName}
            style={{
              fontFamily: 'Arial',
              fontSize: 24,
              fill: '#ffffff',
              align: 'center',
              fontWeight: 'bold',
              stroke: '#000000', 
              strokeThickness: 1, 
              dropShadow: true, 
              dropShadowColor: '#000000',
              dropShadowBlur: 4,
              dropShadowAngle: Math.PI / 6, 
              dropShadowDistance: 2, 
            }}
            anchor={0.5}
            x={100} 
            y={320}
          />
        </Container>
      ))}
    </Container>
  );
};

export default MovieSlider;

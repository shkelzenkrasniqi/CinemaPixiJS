// components/MovieSlider.jsx
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getAllMovies } from '../services/movieservice';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const MovieSlider = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const moviesData = await getAllMovies();
            setMovies(moviesData);
        };

        fetchMovies();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 4000, 
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0, 
        cssEase: 'linear', 
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="w-4/5 mx-auto py-10 rounded-lg">
            <Slider {...settings}>
                {movies.map(movie => (
                    <div key={movie.id} className="p-4">
                        <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                            {movie.photos && movie.photos.length > 0 ? (
                                <img
                                    src={`data:${movie.photos[0].contentType};base64,${movie.photos[0].photoData}`}
                                    alt={movie.movieName || 'Movie Poster'}
                                    className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-64 flex items-center justify-center bg-gray-700">
                                    <span className="text-white">No Image Available</span>
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                <h2 className="text-xl font-semibold text-white">{movie.movieName}</h2>
                                <span className="text-lg font-bold text-white">{movie.movieTrailer} min</span>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MovieSlider;

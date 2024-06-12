import React, { useState } from 'react';

const FeaturedSection = () => {
  const [hoveredMovieIndex, setHoveredMovieIndex] = useState(null);

  const featuredMovies = [
    {
      title: 'Avengers End Game',
      description: 'Last movie of the famous franchise Avengers',
      image: 'https://th.bing.com/th/id/OIP.gDfDAR1YkSKRt6vD9eZKDQHaE8?w=273&h=181&c=7&r=0&o=5&pid=1.7',
      releaseDate: '2023-06-15',
      stats: {
        earnings: '$1,000,000',
        ratings: 4.5,
        ticketsSold: '500,000',
      },
    },
    {
      title: 'Scream 2',
      description: 'Scream the slasher movie.',
      image: 'scream.avif',
      releaseDate: '2023-07-01',
      stats: {
        earnings: '$2,000,000',
        ratings: 3.7,
        ticketsSold: '800,000',
      },
    },
    {
      title: 'The conjuring 2',
      description: 'The second movie of the franchise, featuring "The Nun',
      image: 'conjuring.jfif',
      releaseDate: '2023-07-20',
      stats: {
        earnings: '$3,000,000',
        ratings: 4.8,
        ticketsSold: '1,200,000',
      },
    },
    {
      title: 'Sinister',
      description: 'Children can also be a nightmare...',
      image: 'sinister.jfif',
      releaseDate: '2023-07-20',
      stats: {
        earnings: '$13,000,000',
        ratings: 4.8,
        ticketsSold: '1,200,000',
      },
    },
    {
      title: 'Spider-Man No Way Home',
      description: 'The three Spideys join forces once and for all.',
      image: 'spiderman.jfif',
      releaseDate: '2023-07-20',
      stats: {
        earnings: '$9,000,000',
        ratings: 4.8,
        ticketsSold: '1,200,000',
      },
    },
    {
      title: 'Pulp Fiction',
      description: 'Highest Rated Movie of All time.',
      image: 'fiction.jfif',
      releaseDate: '2023-07-20',
      stats: {
        earnings: '$3,000,000',
        ratings: 4.8,
        ticketsSold: '1,200,000',
      },
    },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex justify-center">
        {Array(fullStars).fill().map((_, index) => (
          <svg key={index} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.4 4.304a1 1 0 00.95.69h4.517c.969 0 1.371 1.24.588 1.81l-3.646 2.646a1 1 0 00-.364 1.118l1.4 4.305c.3.921-.755 1.688-1.538 1.118l-3.646-2.646a1 1 0 00-1.175 0l-3.646 2.646c-.782.57-1.837-.197-1.538-1.118l1.4-4.305a1 1 0 00-.364-1.118L2.094 9.731c-.783-.57-.381-1.81.588-1.81h4.517a1 1 0 00.95-.69l1.4-4.304z" />
          </svg>
        ))}
        {halfStar && (
          <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.4 4.304a1 1 0 00.95.69h4.517c.969 0 1.371 1.24.588 1.81l-3.646 2.646a1 1 0 00-.364 1.118l1.4 4.305c.3.921-.755 1.688-1.538 1.118l-3.646-2.646a1 1 0 00-1.175 0l-3.646 2.646c-.782.57-1.837-.197-1.538-1.118l1.4-4.305a1 1 0 00-.364-1.118L2.094 9.731c-.783-.57-.381-1.81.588-1.81h4.517a1 1 0 00.95-.69l1.4-4.304z" />
          </svg>
        )}
        {Array(emptyStars).fill().map((_, index) => (
          <svg key={index} className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.4 4.304a1 1 0 00.95.69h4.517c.969 0 1.371 1.24.588 1.81l-3.646 2.646a1 1 0 00-.364 1.118l1.4 4.305c.3.921-.755 1.688-1.538 1.118l-3.646-2.646a1 1 0 00-1.175 0l-3.646 2.646c-.782.57-1.837-.197-1.538-1.118l1.4-4.305a1 1 0 00-.364-1.118L2.094 9.731c-.783-.57-.381-1.81.588-1.81h4.517a1 1 0 00.95-.69l1.4-4.304z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="featured-section py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Movies & Upcoming Releases</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredMovies.map((movie, index) => (
            <div
              key={index}
              className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
              onMouseEnter={() => setHoveredMovieIndex(index)}
              onMouseLeave={() => setHoveredMovieIndex(null)}
            >
              <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover"/>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{movie.title}</h3>
                <p className="text-gray-400 mb-4">{movie.description}</p>
                <p className="text-gray-500 text-sm">Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
              </div>
              <div
                className={`absolute inset-0 bg-gray-900 bg-opacity-90 flex flex-col justify-center items-center text-center p-6 transition-opacity duration-500 ${
                  hoveredMovieIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <h3 className="text-2xl font-bold mb-4">{movie.title} Stats</h3>
                <p className="text-lg mb-2"><span className="font-bold">Earnings:</span> {movie.stats.earnings}</p>
                <div className="text-lg mb-2">
                  <span className="font-bold">Ratings:</span>
                  {renderStars(movie.stats.ratings)}
                </div>
                <p className="text-lg"><span className="font-bold">Tickets Sold:</span> {movie.stats.ticketsSold}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

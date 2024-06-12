import { useState } from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
return(
<nav className="bg-gray-800 shadow-lg">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex justify-between h-16">
    <div className="flex-shrink-0 flex items-center">
      <a href="/" className="text-2xl font-bold text-white">
        CinemaPixijs
      </a>
    </div>
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300"
        >
         <a href="/" className="hover:text-gray-300">Home</a>
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300"
        >
           <a href="/trailers" className="hover:text-gray-300">Trailers</a>
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300"
        >
          Services
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300"
        >
          Contact
        </a>
      </div>
    </div>
    <div className="-mr-2 flex md:hidden">
      <button
        onClick={toggleMenu}
        type="button"
        className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open main menu</span>
        {!isOpen ? (
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        ) : (
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>
    </div>
  </div>
</div>

<div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
    <a
      href="#"
      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium transition duration-300"
    >
      Home
    </a>
    <a
      href="#"
      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium transition duration-300"
    >
      About
    </a>
    <a
      href="#"
      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium transition duration-300"
    >
      Services
    </a>
    <a
      href="#"
      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium transition duration-300"
    >
      Contact
    </a>
  </div>
</div>
</nav>
);
};
export default Navbar;
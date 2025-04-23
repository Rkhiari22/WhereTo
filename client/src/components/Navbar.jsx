import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaUser, FaBars } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import logo from '../logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Where2 Logo" className="navbar-logo" />
          <span className="navbar-title">Where2</span>
        </Link>

        {/* Menu principal */}
        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Accueil
          </Link>
          <Link
            to="/destinations"
            className={`nav-link ${location.pathname === '/destinations' ? 'active' : ''}`}
          >
            Destinations
          </Link>
          <Link
            to="/categories"
            className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}
          >
            Catégories
          </Link>
        </div>

        {/* Barre de recherche et profil */}
        <div className="navbar-actions">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="search-input" 
            />
            <FaSearch className="search-icon" />
          </div>
          <Link
            to="/profile"
            className={`nav-profile ${location.pathname === '/profile' ? 'active' : ''}`}
          >
            <FaUser />
          </Link>
          <button className="navbar-toggle" onClick={toggleMenu}>
            <FaBars />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
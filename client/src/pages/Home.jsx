import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaHeart, FaStar, FaArrowRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import heroImage from '../assets/destinations/chateau-angers.jpg';
import destination1 from '../assets/destinations/beaux-arts.jpg';
import destination2 from '../assets/destinations/chateau-angers.jpg';
import destination3 from '../assets/destinations/beaux-arts.jpg';

const Home = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFavorite, setIsFavorite] = useState({});

  const categories = [
    { name: 'Nature', icon: '🌿', color: '#4CAF50' },
    { name: 'Restaurants & Bars', icon: '🍽️', color: '#FF5722' },
    { name: 'Culture', icon: '🎭', color: '#9C27B0' },
    { name: 'Vie Nocturne', icon: '🌃', color: '#2196F3' },
    { name: 'Jeux & Loisirs', icon: '🎲', color: '#FFC107' }
  ];

  // Rotation automatique des catégories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategory((prev) => (prev + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [categories.length]);

  const trendingDestinations = [
    {
      id: 1,
      name: 'Jardin des Plantes',
      category: 'Nature',
      price: 'Gratuit',
      rating: 4.7,
      image: destination1,
      distance: '1.2 km du centre'
    },
    {
      id: 2,
      name: 'Terra Botanica',
      category: 'Nature',
      price: '15-25€',
      rating: 4.5,
      image: destination2,
      distance: '4.5 km du centre'
    },
    {
      id: 3,
      name: 'Château d\'Angers',
      category: 'Culture',
      price: '9.50€',
      rating: 4.8,
      image: destination3,
      distance: 'Centre-ville'
    }
  ];

  const toggleFavorite = (id) => {
    setIsFavorite(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Découvrez les <span>perles cachées</span> d'Angers</h1>
          <p>Explorez les meilleures adresses recommandées par la communauté</p>
          
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Rechercher un lieu, une activité..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">
              <FaSearch /> Explorer
            </button>
          </div>
        </div>
        <div className="hero-overlay"></div>
        <img src={heroImage} alt="Angers" className="hero-image" />
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Parcourir par <span>catégories</span></h2>
          <Link to="/categories" className="see-all">
            Voir tout <FaArrowRight />
          </Link>
        </div>
        
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link 
              to={`/categories/${category.name.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
              key={index} 
              className={`category-card ${index === currentCategory ? 'active' : ''}`}
              style={{ '--category-color': category.color }}
              onClick={() => setCurrentCategory(index)}
            >
              <span className="category-icon">{category.icon}</span>
              <h3>{category.name}</h3>
              <p>12 lieux</p> {/* Vous pouvez dynamiser ce nombre plus tard */}
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="trending-section">
        <div className="section-header">
          <h2>Destinations <span>tendances</span></h2>
          <Link to="/destinations" className="see-all">
            Voir tout <FaArrowRight />
          </Link>
        </div>
        
        <div className="destinations-grid">
          {trendingDestinations.map(destination => (
            <div key={destination.id} className="destination-card">
              <div className="card-image">
                <img src={destination.image} alt={destination.name} />
                <button 
                  className={`favorite-button ${isFavorite[destination.id] ? 'active' : ''}`}
                  onClick={() => toggleFavorite(destination.id)}
                >
                  <FaHeart />
                </button>
                <span className="category-badge">{destination.category}</span>
              </div>
              <div className="card-content">
                <h3>{destination.name}</h3>
                <div className="destination-meta">
                  <span className="price">{destination.price}</span>
                  <span className="rating">
                    <FaStar /> {destination.rating}
                  </span>
                </div>
                <div className="destination-info">
                  <span className="location">
                    <FaMapMarkerAlt /> {destination.distance}
                  </span>
                  <Link to={`/destination/${destination.id}`} className="explore-button">
                    Découvrir <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Prêt à explorer Angers ?</h2>
          <p>Rejoignez notre communauté et partagez vos découvertes</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">
              S'inscrire gratuitement
            </Link>
            <Link to="/destinations" className="cta-button secondary">
              Voir les destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
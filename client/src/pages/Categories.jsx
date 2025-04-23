import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaStar, FaHeart, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const Categories = () => {
  const [activeTab, setActiveTab] = useState('Toutes');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Données des catégories et destinations
  const categoriesData = [
    {
      id: 1,
      name: 'Nature',
      icon: '🌿',
      description: 'Parcs, jardins et espaces naturels pour se ressourcer',
      count: 24,
      featured: [
        {
          id: 101,
          name: 'Jardin des Plantes',
          rating: 4.7,
          image: '/assets/destinations/jardin-plantes.jpg'
        },
        {
          id: 102,
          name: 'Lac de Maine',
          rating: 4.5,
          image: '/assets/destinations/lac-maine.jpg'
        }
      ]
    },
    {
      id: 2,
      name: 'Restaurants & Bars',
      icon: '🍽️',
      description: 'Découvrez la gastronomie angevine',
      count: 42,
      featured: [
        {
          id: 201,
          name: 'Le Favre d\'Anne',
          rating: 4.8,
          image: '/assets/destinations/table-bergerie.jpg'
        },
        {
          id: 202,
          name: 'La Table de la Bergerie',
          rating: 4.6,
          image: '/assets/destinations/table-bergerie.jpg'
        }
      ]
    },
    {
      id: 3,
      name: 'Culture',
      icon: '🎭',
      description: 'Musées, théâtres et lieux historiques',
      count: 18,
      featured: [
        {
          id: 301,
          name: 'Château d\'Angers',
          rating: 4.9,
          image: '/assets/destinations/chateau-angers.jpg'
        },
        {
          id: 302,
          name: 'Musée des Beaux-Arts',
          rating: 4.4,
          image: '/assets/destinations/musee-beaux-arts.jpg'
        }
      ]
    },
    {
      id: 4,
      name: 'Vie Nocturne',
      icon: '🌃',
      description: 'Bars animés et clubs branchés',
      count: 15,
      featured: [
        {
          id: 401,
          name: 'Le Verre Tige',
          rating: 4.3,
          image: '/assets/destinations/verre-tige.jpg'
        },
        {
          id: 402,
          name: 'La Chapelle',
          rating: 4.5,
          image: '/assets/destinations/verre-tige.jpg'
        }
      ]
    },
    {
      id: 5,
      name: 'Jeux & Loisirs',
      icon: '🎲',
      description: 'Activités ludiques et divertissantes',
      count: 12,
      featured: [
        {
          id: 501,
          name: 'Escape Hunt Angers',
          rating: 4.9,
          image: '/assets/destinations/escape-hunt.jpg'
        },
        {
          id: 502,
          name: 'Bowling d\'Angers',
          rating: 4.2,
          image: '/assets/destinations/escape-hunt.jpg'
        }
      ]
    }
  ];
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  

  const filteredCategories = categoriesData.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayCategories = activeTab === 'Toutes' 
    ? filteredCategories 
    : filteredCategories.filter(cat => cat.name === activeTab);

  // Nouveau : fonction pour générer des couleurs uniques
  const getCategoryColor = (id) => {
    const colors = [
      '#4CAF50', '#2196F3', '#9C27B0', 
      '#FF9800', '#E91E63', '#00BCD4'
    ];
    return colors[id % colors.length];
  };

  return (
    <div className="categories-page">
      <Header 
        title="Explorez Angers"
        subtitle="Découvrez les meilleures adresses par catégorie"
        backgroundImage="/assets/categories-hero.jpg"
      />

      {/* Section Filtres améliorée */}
      <section className="categories-controls">
        <div className="container">
          <motion.div 
            className="search-bar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher une catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          <div className="category-tabs-scroll">
            <div className="category-tabs">
              <button
                className={`tab ${activeTab === 'Toutes' ? 'active' : ''}`}
                onClick={() => setActiveTab('Toutes')}
              >
                Toutes
              </button>
              {categoriesData.map(category => (
                <button
                  key={category.id}
                  className={`tab ${activeTab === category.name ? 'active' : ''}`}
                  onClick={() => setActiveTab(category.name)}
                  style={{
                    backgroundColor: activeTab === category.name 
                      ? getCategoryColor(category.id) 
                      : '#f5f5f5'
                  }}
                >
                  <span className="tab-icon">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Liste des catégories avec état de chargement */}
      <section className="categories-list">
        <div className="container">
          {isLoading ? (
            <div className="loading-grid">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="category-card-skeleton">
                  <div className="skeleton-header"></div>
                  <div className="skeleton-content"></div>
                </div>
              ))}
            </div>
          ) : displayCategories.length > 0 ? (
            <div className="grid">
              {displayCategories.map(category => (
                <motion.div 
                  key={category.id}
                  className="category-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="card-header">
                    <div 
                      className="category-icon"
                      style={{ backgroundColor: getCategoryColor(category.id) }}
                    >
                      {category.icon}
                    </div>
                    <div className="category-info">
                      <h3>{category.name}</h3>
                      <p>{category.description}</p>
                      <span className="count">{category.count} lieux</span>
                    </div>
                  </div>

                  <div className="featured-destinations">
                    <h4>
                      <span className="highlight">À ne pas manquer</span>
                    </h4>
                    <div className="destinations-grid">
                      {category.featured.map(destination => (
                        <Link 
                          to={`/destination/${destination.id}`} 
                          key={destination.id} 
                          className="destination-card"
                        >
                          <div className="image-container">
                            <img 
                              src={destination.image} 
                              alt={destination.name} 
                              loading="lazy"
                            />
                            <button 
                              className="favorite-button"
                              onClick={(e) => {
                                e.preventDefault();
                                // Gérer l'ajout aux favoris
                              }}
                            >
                              <FaHeart />
                            </button>
                            <div className="rating">
                              <FaStar /> {destination.rating}
                            </div>
                          </div>
                          <h5>{destination.name}</h5>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link 
                    to={`/categories/${category.id}`} 
                    className="explore-link"
                    style={{ color: getCategoryColor(category.id) }}
                  >
                    Explorer la catégorie <FaArrowRight />
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3>Aucune catégorie trouvée</h3>
              <p>Essayez de modifier vos critères de recherche</p>
              <button 
                className="reset-button"
                onClick={() => {
                  setSearchTerm('');
                  setActiveTab('Toutes');
                }}
              >
                Réinitialiser les filtres
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Categories;
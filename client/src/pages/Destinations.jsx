import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaStar, FaHeart, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';
import { destinationsData } from '../data/destinations';
import Header from '../components/Header';

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortOption, setSortOption] = useState('popularité');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'map'
  const [isScrolled, setIsScrolled] = useState(false);

  // Animation au scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Catégories uniques pour le filtre
  const categories = ['Toutes', ...new Set(destinationsData.map(item => item.category))];

  // Filtrer les destinations
  const filteredDestinations = destinationsData
    .filter(destination => {
      const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Toutes' || destination.category === selectedCategory;
      const matchesPrice = destination.price >= priceRange[0] && destination.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortOption === 'popularité') return b.rating - a.rating;
      if (sortOption === 'prix croissant') return a.price - b.price;
      if (sortOption === 'prix décroissant') return b.price - a.price;
      return 0;
    });

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="destinations-page">
      <Header
        title="Explorez Angers"
        subtitle="Découvrez les meilleures adresses de la ville"
        backgroundImage="/assets/destinations-hero.jpg"
      />

      {/* Barre de recherche et filtres améliorée */}
      <section className={`search-filters ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="search-container">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher une destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-controls">
              <button
                className={`filter-toggle ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter /> Filtres <FaChevronDown className={`chevron ${showFilters ? 'open' : ''}`} />
              </button>

              <div className="view-options">
                <button
                  className={viewMode === 'grid' ? 'active' : ''}
                  onClick={() => setViewMode('grid')}
                >
                  Grille
                </button>
                <button
                  className={viewMode === 'map' ? 'active' : ''}
                  onClick={() => setViewMode('map')}
                >
                  Carte
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label>Catégorie</label>
                <div className="category-buttons">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={selectedCategory === category ? 'active' : ''}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>Prix: €{priceRange[0]} - €{priceRange[1]}</label>
                <div className="range-slider">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  />
                  <div className="range-values">
                    <span>€{priceRange[0]}</span>
                    <span>€{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="filter-group">
                <label>Trier par</label>
                <div className="sort-options">
                  <button
                    className={sortOption === 'popularité' ? 'active' : ''}
                    onClick={() => setSortOption('popularité')}
                  >
                    Popularité
                  </button>
                  <button
                    className={sortOption === 'prix croissant' ? 'active' : ''}
                    onClick={() => setSortOption('prix croissant')}
                  >
                    Prix ↑
                  </button>
                  <button
                    className={sortOption === 'prix décroissant' ? 'active' : ''}
                    onClick={() => setSortOption('prix décroissant')}
                  >
                    Prix ↓
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Résultats avec animation */}
      <section className="destinations-results">
        <div className="container">
          <div className="results-header">
            <h3>
              <span className="results-count">{filteredDestinations.length}</span>
              {filteredDestinations.length === 1 ? ' résultat trouvé' : ' résultats trouvés'}
            </h3>
          </div>

          {viewMode === 'grid' ? (
            <div className={`destinations-grid ${isScrolled ? 'compact' : ''}`}>
              {filteredDestinations.map((destination, index) => (
                <div
                  key={destination.id}
                  className="destination-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-image">
                    <img src={destination.image} alt={destination.name} loading="lazy" />
                    <button
                      className={`favorite-button ${favorites.includes(destination.id) ? 'active' : ''}`}
                      onClick={() => toggleFavorite(destination.id)}
                      aria-label={favorites.includes(destination.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    >
                      <FaHeart />
                    </button>
                    <span className="category-badge">{destination.category}</span>
                    <div className="rating-badge">
                      <FaStar /> {destination.rating}
                    </div>
                  </div>
                  <div className="card-content">
                    <h3>{destination.name}</h3>
                    <p className="location">
                      <FaMapMarkerAlt /> {destination.location}
                    </p>
                    <p className="description">{destination.description}</p>

                    <div className="price-tag">
                      {destination.price === 0 ? 'Gratuit' : `À partir de €${destination.price}`}
                    </div>

                    <button className="explore-button">
                      Voir les détails
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="map-view">
              <div className="map-placeholder">
                <p>Fonctionnalité carte en développement</p>
                <button
                  className="switch-view-button"
                  onClick={() => setViewMode('grid')}
                >
                  Revenir à la vue grille
                </button>
              </div>
            </div>
          )}

          {filteredDestinations.length === 0 && (
            <div className="no-results">
              <h4>Aucune destination ne correspond à vos critères</h4>
              <p>Essayez d'ajuster vos filtres ou votre recherche</p>
              <button
                className="reset-filters"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Toutes');
                  setPriceRange([0, 100]);
                }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Destinations;
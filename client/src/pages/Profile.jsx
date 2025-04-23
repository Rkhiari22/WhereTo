import { useState } from 'react';
import { 
  FaUserEdit, 
  FaSignOutAlt, 
  FaHeart, 
  FaComment, 
  FaCamera, 
  FaCheck,
  FaStar // Ajout de l'icône manquante
} from 'react-icons/fa';
import { userData, userDestinations, userReviews } from '../data/profileData';
import defaultAvatar from '../assets/profil/Iheb.jpg';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(userData);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const saveProfile = () => {
    // Ici vous ajouteriez la logique pour sauvegarder les modifications
    setIsEditing(false);
    if (selectedImage) {
      setProfileData(prev => ({ ...prev, avatar: selectedImage }));
      setSelectedImage(null);
    }
  };

  return (
    <div className="profile-page">
      {/* Header du profil */}
      <div className="profile-header">
        <div className="profile-avatar-container">
          <img 
            src={selectedImage || profileData.avatar || defaultAvatar} 
            alt="Avatar" 
            className="profile-avatar"
          />
          {isEditing && (
            <div className="avatar-edit">
              <label htmlFor="avatar-upload">
                <FaCamera className="camera-icon" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          )}
        </div>

        <div className="profile-info">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                className="edit-input"
              />
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="edit-input"
              />
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                className="edit-textarea"
                rows="3"
              />
            </div>
          ) : (
            <>
              <h1>{profileData.username}</h1>
              <p className="profile-email">{profileData.email}</p>
              <p className="profile-bio">{profileData.bio || "Aucune biographie"}</p>
              <p className="member-since">Membre depuis {profileData.joinDate}</p>
            </>
          )}

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{profileData.favoritesCount}</span>
              <span className="stat-label">Favoris</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{profileData.reviewsCount}</span>
              <span className="stat-label">Avis</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{profileData.contributionPoints}</span>
              <span className="stat-label">Points</span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <button onClick={saveProfile} className="save-btn">
              <FaCheck /> Enregistrer
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              <FaUserEdit /> Modifier le profil
            </button>
          )}
          <button className="logout-btn">
            <FaSignOutAlt /> Déconnexion
          </button>
        </div>
      </div>

      {/* Contenu du profil */}
      <div className="profile-content">
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <FaHeart /> Mes Favoris
          </button>
          <button
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <FaComment /> Mes Avis
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'favorites' ? (
            <div className="favorites-grid">
              {userDestinations.map(destination => (
                <div key={destination.id} className="favorite-card">
                  <img src={destination.image} alt={destination.name} />
                  <div className="favorite-info">
                    <h3>{destination.name}</h3>
                    <div className="destination-meta">
                      <span className="rating">
                        <FaStar /> {destination.rating}
                      </span>
                      <span className="category">{destination.category}</span>
                    </div>
                    <button className="visit-btn">Visiter</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="reviews-list">
              {userReviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <img src={review.destinationImage} alt={review.destinationName} />
                    <div className="review-destination">
                      <h3>{review.destinationName}</h3>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < review.rating ? 'filled' : ''} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="review-text">{review.text}</p>
                  <div className="review-footer">
                    <span className="review-date">{review.date}</span>
                    <div className="review-actions">
                      <button className="edit-review">Modifier</button>
                      <button className="delete-review">Supprimer</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../logo.png';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    // Ici vous ajouterez la logique d'inscription
    console.log('Registration with:', { username, email, password });
    // Simulation d'inscription réussie
    navigate('/');
  };

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <img src={logo} alt="Where2 Logo" className="auth-logo" />
          <h1>Rejoignez la communauté !</h1>
          <p>Créez un compte pour sauvegarder vos favoris et contribuer</p>
        </div>

        {error && (
          <motion.div 
            className="auth-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="terms-conditions">
            <label>
              <input type="checkbox" required />
              J'accepte les <Link to="/terms">conditions d'utilisation</Link> et la <Link to="/privacy">politique de confidentialité</Link>
            </label>
          </div>

          <button type="submit" className="auth-button">
            S'inscrire
          </button>
        </form>

        <div className="auth-divider">
          <span>ou s'inscrire avec</span>
        </div>

        <div className="social-login">
          <button type="button" className="social-button google">
            <FaGoogle /> Google
          </button>
          <button type="button" className="social-button facebook">
            <FaFacebookF /> Facebook
          </button>
        </div>

        <div className="auth-footer">
          Déjà membre ? <Link to="/login">Se connecter</Link>
        </div>
      </motion.div>

      <div className="auth-background"></div>
    </div>
  );
};

export default Register;
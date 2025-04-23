import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous ajouterez la logique de connexion
    console.log('Login attempt with:', { email, password, rememberMe });
    // Simulation de connexion réussie
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
          <h1>Content de vous revoir !</h1>
          <p>Connectez-vous pour découvrir les meilleures adresses d'Angers</p>
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

          <div className="auth-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Se souvenir de moi
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Mot de passe oublié ?
            </Link>
          </div>

          <button type="submit" className="auth-button">
            Se connecter
          </button>
        </form>

        <div className="auth-divider">
          <span>ou continuer avec</span>
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
          Pas encore membre ? <Link to="/register">S'inscrire</Link>
        </div>
      </motion.div>

      <div className="auth-background"></div>
    </div>
  );
};

export default Login;
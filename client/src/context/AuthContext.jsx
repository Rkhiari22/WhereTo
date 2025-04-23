import { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get('/user/jwtid');
        if (res.data) {
          const userRes = await API.get(`/user/${res.data}`);
          setUser(userRes.data);
        }
      } catch (err) {
        console.log('Not authenticated');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post('/user/login', { email, password });
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response.data.message };
    }
  };

  const logout = async () => {
    await API.get('/user/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
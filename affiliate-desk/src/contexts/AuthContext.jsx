import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Mock auth — accept any non-empty credentials
    if (email && password) {
      setUser({ name: 'Navid Masomi', email, role: 'IB Manager' });
      return true;
    }
    return false;
  };

  const signup = (name, email, password) => {
    if (name && email && password) {
      setUser({ name, email, role: 'IB Manager' });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

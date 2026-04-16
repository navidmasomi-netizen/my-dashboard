import { createContext, useContext, useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (json.success) setUser(json.data); // { name, role }
      return json;
    } catch {
      return { success: false, message: 'Could not connect to the server.' };
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      return await res.json();
    } catch {
      return { success: false, message: 'Could not connect to the server.' };
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

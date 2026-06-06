import { createContext, useContext, useState } from 'react';

const AuthContext = createContext<any>(null);
export function AuthProvider({ children }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);

  const register = (email: string, password: string, name: string) => {
    if (!email || !password || !name) {
      alert('Заповніть усі поля');
      return false;
    }

    const exists = users.find((u) => u.email === email);

    if (exists) {
      alert('Користувач з таким email вже існує');
      return false;
    }
    const newUser = { email, password, name };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    setIsAuthenticated(true);

    return true;
  };

  const login = (email: string, password: string) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      alert('Невірний email або пароль');
      return false;
    }

    setUser(foundUser);
    setIsAuthenticated(true);

    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        users,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
import { auth } from '@/firebase/config';
import {
  EmailAuthProvider,
  User,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        alert('Заповніть email і пароль');
        return false;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      alert(error.message);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        alert('Заповніть email і пароль');
        return false;
      }

      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      alert('Невірний email або пароль');
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    try {
      if (!email) {
        alert('Введіть email');
        return false;
      }

      await sendPasswordResetEmail(auth, email);
      alert('Лист для відновлення паролю відправлено');
      return true;
    } catch (error: any) {
      alert(error.message);
      return false;
    }
  };

  const deleteAccount = async (password: string) => {
    try {
      if (!user || !user.email) {
        alert('Користувач не авторизований');
        return false;
      }

      if (!password) {
        alert('Введіть пароль для підтвердження');
        return false;
      }

      const credential = EmailAuthProvider.credential(user.email, password);

      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);

      alert('Акаунт видалено');
      return true;
    } catch (error: any) {
      alert('Не вдалося видалити акаунт. Перевірте пароль.');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        register,
        login,
        logout,
        resetPassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
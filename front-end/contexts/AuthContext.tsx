import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const userJson = await SecureStore.getItemAsync('user');
      if (userJson) {
        setUser(JSON.parse(userJson));
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      // TODO: Implement actual API call
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: email,
      };

      await SecureStore.setItemAsync('user', JSON.stringify(mockUser));
      setUser(mockUser);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async function signUp(name: string, email: string, password: string) {
    try {
      // TODO: Implement actual API call
      const mockUser = {
        id: '1',
        name: name,
        email: email,
      };

      await SecureStore.setItemAsync('user', JSON.stringify(mockUser));
      setUser(mockUser);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async function signOut() {
    try {
      await SecureStore.deleteItemAsync('user');
      setUser(null);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingScreen } from './LoadingScreen';
import { View } from 'react-native';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
};

export function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        router.replace('/(auth)/login');
      } else if (!requireAuth && user) {
        router.replace('/(tabs)');
      }
    }
  }, [user, isLoading, requireAuth]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (requireAuth && !user) {
    return null;
  }

  if (!requireAuth && user) {
    return null;
  }

  return <View className="flex-1">{children}</View>;
}
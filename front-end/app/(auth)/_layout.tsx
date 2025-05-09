import { Stack } from 'expo-router';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function AuthLayout() {
  return (
    <ProtectedRoute requireAuth={false}>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            title: 'Sign In',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            title: 'Create Account',
            headerShown: false,
          }}
        />
      </Stack>
    </ProtectedRoute>
  );
}
import { Link } from 'expo-router';
import { useState } from 'react';
import { TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Text } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in. Please try again.');
    }
  };

  return (
    <View className="flex-1 p-5 justify-center bg-white">
      <Text className="text-3xl font-bold text-center mb-10 text-cyan-600">TaskMate</Text>
      <View className="space-y-4">
        <TextInput
          className="border border-slate-200 rounded-lg p-3 text-base"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          className="border border-slate-200 rounded-lg p-3 text-base"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity className="bg-cyan-600 p-4 rounded-lg items-center mt-2" onPress={handleLogin}>
          <Text className="text-white text-base font-bold">Login</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center mt-5">
        <Text>Don't have an account? </Text>
        <Link href="signup" className="text-cyan-600 font-bold">
          Sign Up
        </Link>
      </View>
    </View>
  );
}
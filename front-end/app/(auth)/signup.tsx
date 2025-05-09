import { Link } from 'expo-router';
import { useState } from 'react';
import { TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Text } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';


export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp } = useAuth();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      await signUp(name, email, password);
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <View className="flex-1 p-5 justify-center bg-white">
      <Text className="text-3xl font-bold text-center mb-10 text-cyan-600">Create Account</Text>
      <View className="space-y-4">
        <TextInput
          className="border border-slate-200 rounded-lg p-3 text-base"
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
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
        <TextInput
          className="border border-slate-200 rounded-lg p-3 text-base"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity className="bg-cyan-600 p-4 rounded-lg items-center mt-2" onPress={handleSignup}>
          <Text className="text-white text-base font-bold">Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center mt-5">
        <Text>Already have an account? </Text>
        <Link href="login" className="text-cyan-600 font-bold">
          Login
        </Link>
      </View>
    </View>
  );
}


import FontAwesome from '@expo/vector-icons/FontAwesome';

import { TouchableOpacity, View, Alert } from 'react-native';
import { Text } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTask } from '@/contexts/TaskContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { getTaskStats } = useTask();
  const stats = getTaskStats();
  const colorScheme = useColorScheme() ?? 'light';

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  return (
    <View className="flex-1 bg-white p-5">
      <View className="items-center mb-8">
        <FontAwesome name="user-circle" size={80} color={Colors[colorScheme].tint} />
        <Text className="text-2xl font-bold text-slate-900 mt-4">{user?.name}</Text>
        <Text className="text-base text-slate-500 mt-1">{user?.email}</Text>
      </View>

      <View className="flex-row justify-around mb-8 bg-slate-50 p-4 rounded-xl">
        <View className="items-center">
          <Text className="text-2xl font-bold text-cyan-600">{stats.total}</Text>
          <Text className="text-sm text-slate-500 mt-1">Total Tasks</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-cyan-600">{stats.completed}</Text>
          <Text className="text-sm text-slate-500 mt-1">Completed</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-cyan-600">{stats.pending}</Text>
          <Text className="text-sm text-slate-500 mt-1">Pending</Text>
        </View>
      </View>

      <View className="mb-8">
        <Text className="text-lg font-bold text-slate-900 mb-4">Account Settings</Text>
        <TouchableOpacity className="flex-row items-center py-3 border-b border-slate-200 space-x-3">
          <FontAwesome name="edit" size={20} color="#64748b" />
          <Text className="flex-1 text-base text-slate-900">Edit Profile</Text>
          <FontAwesome name="chevron-right" size={16} color="#64748b" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center py-3 border-b border-slate-200 space-x-3">
          <FontAwesome name="bell" size={20} color="#64748b" />
          <Text className="flex-1 text-base text-slate-900">Notifications</Text>
          <FontAwesome name="chevron-right" size={16} color="#64748b" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center py-3 border-b border-slate-200 space-x-3">
          <FontAwesome name="lock" size={20} color="#64748b" />
          <Text className="flex-1 text-base text-slate-900">Privacy & Security</Text>
          <FontAwesome name="chevron-right" size={16} color="#64748b" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="bg-red-500 flex-row items-center justify-center p-4 rounded-lg space-x-2" onPress={handleLogout}>
        <FontAwesome name="sign-out" size={20} color="#fff" />
        <Text className="text-base font-bold text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}


import { ActivityIndicator, View } from 'react-native';
import { ThemedText } from './ThemedText';

export function LoadingScreen() {
  return (
    <View className="flex-1 justify-center items-center space-y-3">
      <ActivityIndicator size="large" color="#0891b2" />
      <ThemedText className="text-base text-slate-500">Loading...</ThemedText>
    </View>
  );
}


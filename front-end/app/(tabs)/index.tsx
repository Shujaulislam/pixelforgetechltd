import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from 'react-native';
import { useTask, Task } from '@/contexts/TaskContext';

export default function TasksScreen() {
  const { tasks, addTask: addTaskToList, toggleTask, deleteTask } = useTask();
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      Alert.alert('Error', 'Task title cannot be empty');
      return;
    }

    addTaskToList(newTask.trim());
    setNewTask('');
  };

  const handleDeleteTask = (taskId: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTask(taskId),
        },
      ]
    );
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View className="flex-row items-center bg-slate-50 p-4 rounded-lg space-x-3">
      <TouchableOpacity
        className="p-1"
        onPress={() => toggleTask(item.id)}>
        <FontAwesome
          name={item.completed ? 'check-square-o' : 'square-o'}
          size={24}
          color={item.completed ? '#0891b2' : '#64748b'}
        />
      </TouchableOpacity>
      <Text
        className={`flex-1 text-base ${item.completed ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
        {item.title}
      </Text>
      <TouchableOpacity
        className="p-1"
        onPress={() => deleteTask(item.id)}>
        <FontAwesome name="trash-o" size={24} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <View className="p-5 border-b border-slate-200 bg-white">
        <Text className="text-3xl font-bold text-slate-900 mb-5">My Tasks</Text>
        <View className="flex-row space-x-2">
          <TextInput
            className="flex-1 border border-slate-200 rounded-lg p-3 text-base"
            placeholder="Add a new task"
            value={newTask}
            onChangeText={setNewTask}
            onSubmitEditing={handleAddTask}
          />
          <TouchableOpacity className="w-12 h-12 bg-cyan-600 rounded-lg justify-center items-center" onPress={handleAddTask}>
            <FontAwesome name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        className="flex-1"
        contentContainerClassName="p-5 space-y-4"
      />
    </View>
  );
}


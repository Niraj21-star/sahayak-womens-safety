import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

// Import screens
import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import EmergencyScreen from './app/screens/EmergencyScreen';
import SafetyTipsScreen from './app/screens/SafetyTipsScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import EmergencyRecordingScreen from './app/screens/EmergencyRecordingScreen';
import FakeCallScreen from './app/screens/FakeCallScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Emergency" 
          component={EmergencyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="emergency-recording" 
          component={EmergencyRecordingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="fake-call" 
          component={FakeCallScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SafetyTips" 
          component={SafetyTipsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 
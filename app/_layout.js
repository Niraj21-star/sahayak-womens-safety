import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './contexts/AuthContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="auth/login"
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen
          name="auth/register"
          options={{
            title: 'Register',
          }}
        />
        <Stack.Screen
          name="emergency"
          options={{
            title: 'Emergency',
          }}
        />
        <Stack.Screen
          name="emergency-recording"
          options={{
            title: 'Emergency Recording',
          }}
        />
        <Stack.Screen
          name="fake-call"
          options={{
            title: 'Fake Call',
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: 'Profile',
          }}
        />
      </Stack>
    </AuthProvider>
  );
} 
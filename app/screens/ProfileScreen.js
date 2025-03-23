import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <View style={styles.profileContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>User Name</Text>
        
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>user@example.com</Text>
        
        <Text style={styles.label}>Emergency Contact</Text>
        <Text style={styles.value}>+1234567890</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          // TODO: Implement logout
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  profileContainer: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF4B4B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 
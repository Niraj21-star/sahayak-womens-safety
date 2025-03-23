import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

export default function SafetyTipsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Safety Tips</Text>
      <View style={styles.tipContainer}>
        <Text style={styles.tipTitle}>1. Stay Alert</Text>
        <Text style={styles.tipText}>Always be aware of your surroundings and avoid distractions like using your phone while walking.</Text>
        
        <Text style={styles.tipTitle}>2. Trust Your Instincts</Text>
        <Text style={styles.tipText}>If something feels wrong, trust your gut and remove yourself from the situation.</Text>
        
        <Text style={styles.tipTitle}>3. Share Your Location</Text>
        <Text style={styles.tipText}>Share your location with trusted friends or family when traveling alone.</Text>
        
        <Text style={styles.tipTitle}>4. Emergency Contacts</Text>
        <Text style={styles.tipText}>Keep emergency contact numbers saved in your phone and easily accessible.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  tipContainer: {
    padding: 20,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  tipText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
}); 
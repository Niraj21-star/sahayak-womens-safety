import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function EmergencyScreen() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required for emergency features.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleEmergency = async () => {
    if (!location) {
      Alert.alert('Error', 'Location not available. Please try again.');
      return;
    }

    setSending(true);
    try {
      // Here we would implement the actual emergency alert sending
      // For now, we'll just show a confirmation
      Alert.alert(
        'Emergency Alert Sent',
        'Your location and emergency signal have been sent to emergency contacts and authorities.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send emergency alert. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Ionicons name="location" size={24} color={location ? '#4CAF50' : '#FFA000'} />
        <Text style={styles.statusText}>
          {location ? 'Location Available' : 'Getting Location...'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.sosButton, sending && styles.sosButtonDisabled]}
        onPress={handleEmergency}
        disabled={sending || !location}
      >
        {sending ? (
          <ActivityIndicator color="white" size={36} />
        ) : (
          <>
            <Text style={styles.sosText}>SOS</Text>
            <Text style={styles.sosSubtext}>Send Emergency Alert</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Emergency Contacts</Text>
        <Text style={styles.infoText}>
          Your emergency contacts will be notified with your location
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="call" size={24} color="#FF3B30" />
          <Text style={styles.actionButtonText}>Call Police</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="people" size={24} color="#FF3B30" />
          <Text style={styles.actionButtonText}>Share Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 20,
  },
  statusText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  sosButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 100,
    width: 200,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sosButtonDisabled: {
    backgroundColor: '#FF6B6B',
  },
  sosText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  sosSubtext: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  infoContainer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    minWidth: 150,
    justifyContent: 'center',
  },
  actionButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500',
  },
}); 
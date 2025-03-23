import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator, Animated, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import { auth, db } from '../config/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function EmergencyScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [sosAnimation] = useState(new Animated.Value(1));
  const [trackingAnimation] = useState(new Animated.Value(1));

  // SOS Button Animation
  useEffect(() => {
    if (loading) {
      Animated.sequence([
        Animated.timing(sosAnimation, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sosAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading]);

  // Tracking Button Animation
  useEffect(() => {
    if (isTracking) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(trackingAnimation, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(trackingAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      trackingAnimation.setValue(1);
    }
  }, [isTracking]);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      return location;
    } catch (error) {
      console.error('Error getting location:', error);
      setErrorMsg('Failed to get location');
      return null;
    }
  };

  const startLocationTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        async (location) => {
          setLocation(location);
          if (auth.currentUser) {
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
              locationHistory: arrayUnion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                timestamp: new Date(),
              }),
            });
          }
        }
      );
      setLocationSubscription(subscription);
      setIsTracking(true);
    } catch (error) {
      console.error('Error starting location tracking:', error);
      setErrorMsg('Failed to start location tracking');
    }
  };

  const stopLocationTracking = async () => {
    if (locationSubscription) {
      await locationSubscription.remove();
      setLocationSubscription(null);
      setIsTracking(false);
    }
  };

  const handleSOS = async () => {
    setLoading(true);
    try {
      const location = await getLocation();
      if (!location) {
        Alert.alert('Error', 'Failed to get location');
        return;
      }

      const { isAvailable } = await SMS.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Error', 'SMS is not available on this device');
        return;
      }

      const message = `EMERGENCY ALERT! I need help! My location: https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;
      await SMS.sendSMSAsync(['100'], message);

      // Update Firestore with emergency alert
      if (auth.currentUser) {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          emergencyAlerts: arrayUnion({
            timestamp: new Date(),
            location: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          }),
        });
      }

      Alert.alert('Success', 'Emergency alert sent successfully');
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      Alert.alert('Error', 'Failed to send emergency alert');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emergency Services</Text>
        <Text style={styles.subtitle}>Quick access to safety features</Text>
      </View>

      <Animated.View style={[styles.sosButtonContainer, { transform: [{ scale: sosAnimation }] }]}>
        <TouchableOpacity 
          style={[styles.sosButton, loading && styles.sosButtonPressed]}
          onPress={handleSOS}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={24} />
          ) : (
            <>
              <MaterialIcons name="warning" size={40} color="#fff" />
              <Text style={styles.sosButtonText}>SOS</Text>
              <Text style={styles.sosButtonSubtext}>Send Emergency Alert</Text>
            </>
          )}
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.featuresContainer}>
        <Animated.View style={[styles.featureButton, { transform: [{ scale: trackingAnimation }] }]}>
          <TouchableOpacity 
            style={[styles.trackingButton, isTracking && styles.trackingButtonActive]}
            onPress={isTracking ? stopLocationTracking : startLocationTracking}
          >
            <MaterialIcons 
              name={isTracking ? "location-on" : "location-off"} 
              size={24} 
              color={isTracking ? "#4CAF50" : "#FF4B4B"} 
            />
            <Text style={[styles.trackingButtonText, isTracking && styles.trackingButtonTextActive]}>
              {isTracking ? 'Stop Tracking' : 'Start Tracking'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity 
          style={styles.recordingButton}
          onPress={() => navigation.navigate('emergency-recording')}
        >
          <MaterialIcons name="videocam" size={24} color="#fff" />
          <Text style={styles.recordingButtonText}>Record Evidence</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.fakeCallButton}
          onPress={() => navigation.navigate('fake-call')}
        >
          <MaterialIcons name="call" size={24} color="#fff" />
          <Text style={styles.fakeCallButtonText}>Fake Call & Quick Escape</Text>
        </TouchableOpacity>
      </View>

      {errorMsg && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}

      {location && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            Last known location:{'\n'}
            {location?.coords?.latitude?.toFixed(6) || 'N/A'}, {location?.coords?.longitude?.toFixed(6) || 'N/A'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF4B4B',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  sosButtonContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sosButton: {
    backgroundColor: '#FF4B4B',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sosButtonPressed: {
    backgroundColor: '#E53935',
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sosButtonSubtext: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  featuresContainer: {
    gap: 15,
  },
  featureButton: {
    width: '100%',
  },
  trackingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    gap: 10,
  },
  trackingButtonActive: {
    backgroundColor: '#E8F5E9',
  },
  trackingButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4B4B',
  },
  trackingButtonTextActive: {
    color: '#4CAF50',
  },
  recordingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    gap: 10,
  },
  recordingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  fakeCallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    gap: 10,
  },
  fakeCallButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
  },
  locationContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 
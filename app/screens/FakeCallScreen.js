import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Vibration } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function FakeCallScreen({ navigation }) {
  const [isRinging, setIsRinging] = useState(true);
  const [inCall, setInCall] = useState(false);
  const [sound, setSound] = useState(null);
  const [callTimer, setCallTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (inCall) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [inCall]);

  useEffect(() => {
    if (isRinging) {
      const pattern = [0, 1000, 1000, 1000];
      Vibration.vibrate(pattern, true);
    } else {
      Vibration.cancel();
    }
    return () => Vibration.cancel();
  }, [isRinging]);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = () => {
    setIsRinging(false);
    setInCall(true);
    Vibration.cancel();
  };

  const handleDecline = () => {
    setIsRinging(false);
    Vibration.cancel();
    navigation.goBack();
  };

  const handleEndCall = () => {
    setInCall(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.callerInfo}>
        <View style={styles.callerImageContainer}>
          <MaterialIcons name="account-circle" size={100} color="#fff" />
        </View>
        <Text style={styles.callerName}>Mom</Text>
        <Text style={styles.callStatus}>
          {isRinging ? 'Incoming call...' : inCall ? formatTime(callTimer) : 'Call ended'}
        </Text>
      </View>

      <View style={styles.actions}>
        {isRinging ? (
          <>
            <TouchableOpacity 
              style={[styles.actionButton, styles.declineButton]}
              onPress={handleDecline}
            >
              <MaterialIcons name="call-end" size={36} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.answerButton]}
              onPress={handleAnswer}
            >
              <MaterialIcons name="call" size={36} color="#fff" />
            </TouchableOpacity>
          </>
        ) : inCall ? (
          <TouchableOpacity 
            style={[styles.actionButton, styles.declineButton]}
            onPress={handleEndCall}
          >
            <MaterialIcons name="call-end" size={36} color="#fff" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'space-between',
    padding: 20,
  },
  callerInfo: {
    alignItems: 'center',
    marginTop: 60,
  },
  callerImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  callerName: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  callStatus: {
    color: '#aaa',
    fontSize: 18,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  actionButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  declineButton: {
    backgroundColor: '#FF4B4B',
  },
  answerButton: {
    backgroundColor: '#4CAF50',
  },
}); 
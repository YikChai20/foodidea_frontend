// src/components/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface SplashScreenProps {
  message?: string;
  duration?: number; // in milliseconds
  onFinish?: () => void; // optional callback (e.g. navigation)
  spinnerColor?: string;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  message = 'Loading...',
  duration,
  onFinish,
  spinnerColor = '#007bff',
}) => {
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>; // ✅ FIXED

    if (duration && onFinish) {
      timeout = setTimeout(() => {
        onFinish();
      }, duration);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [duration, onFinish]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={spinnerColor} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

import React from "react";
import { Text, View } from 'react-native';
import styles from './NotFoundScreen.styles';

const NotFoundScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Page Not Found!</Text>
    </View>
  );
};

export default NotFoundScreen;

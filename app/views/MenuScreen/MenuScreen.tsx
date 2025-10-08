import React from "react";
import { Text, View } from 'react-native';
import styles from './MenuScreen.styles';

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Menu Screen!</Text>
    </View>
  );
};

export default MenuScreen;

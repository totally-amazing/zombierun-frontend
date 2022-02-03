import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AuthScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>AuthScreen</Text>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

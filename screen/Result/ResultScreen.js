import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';

const ResultScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>ResultScreen</Text>
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FONT.X_LARGE,
    color: COLORS.DEEP_RED,
    fontFamily: 'nosifer-regular',
  },
});

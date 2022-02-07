import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';

const RunningScreen = (props) => {
  const speed = useSelector((state) => state.game.speed);
  const time = useSelector((state) => state.game.time);
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>RunningScreen</Text>
    </View>
  );
};

export default RunningScreen;

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

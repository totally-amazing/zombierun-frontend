import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';

const RoomListScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>RoomListScreen</Text>
    </View>
  );
};

export default RoomListScreen;

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

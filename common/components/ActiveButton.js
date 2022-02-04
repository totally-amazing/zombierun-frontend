import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import COLORS from '../constants/COLORS';
import BUTTON_SIZE from '../constants/BUTTON_SIZE';
import FONT_SIZE from '../constants/FONT_SIZE';

const ActiveButton = ({ message, disabled, onPress, style }) => {
  const proveUserHandler = () => {
    onPress();
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={proveUserHandler}
    >
      <View style={styles.screen}>
        <Text style={{ ...styles.button, ...style }}>{message}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActiveButton;

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: BUTTON_SIZE.BUTTON_WIDTH,
    fontSize: FONT_SIZE.LARGE,
    color: COLORS.WHITE,
    backgroundColor: COLORS.RED,
    textAlign: 'center',
    borderRadius: BUTTON_SIZE.BUTTON_ROUND,
    marginBottom: 50,
  },
});

ActiveButton.propTypes = {
  message: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.objectOf,
};

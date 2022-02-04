import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import COLORS from '../constants/COLORS';
import BUTTON_SIZE from '../constants/BUTTON_SIZE';
import FONT_SIZE from '../constants/FONT_SIZE';

const ActiveButton = ({ message, disabled, onPress, style }) => {
  const proveUserHandler = () => {
    return onPress();
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={proveUserHandler}
    >
      <Text style={{ ...styles.loginButton, ...style }}>{message}</Text>
    </TouchableOpacity>
  );
};

export default ActiveButton;

const styles = StyleSheet.create({
  loginButton: {
    width: BUTTON_SIZE.BUTTON_WIDTH,
    fontSize: FONT_SIZE.LARGE,
    textAlign: 'center',
    color: COLORS.WHITE,
    backgroundColor: COLORS.RED,
    borderRadius: BUTTON_SIZE.BUTTON_ROUND,
  },
});

ActiveButton.propTypes = {
  message: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.any),
};

ActiveButton.defaultProps = {
  disabled: true,
  style: {},
};

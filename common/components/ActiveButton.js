import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import COLORS from '../constants/COLORS';
import FONT_SIZE from '../constants/FONT';

const BUTTON_WIDTH = 300;
const BUTTON_ROUND = 24;

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
      <Text style={{ ...styles.loginButton, ...style }}>{message}</Text>
    </TouchableOpacity>
  );
};

export default ActiveButton;

const styles = StyleSheet.create({
  loginButton: {
    width: BUTTON_WIDTH,
    fontSize: FONT_SIZE.LARGE,
    textAlign: 'center',
    color: COLORS.WHITE,
    backgroundColor: COLORS.RED,
    borderRadius: BUTTON_ROUND,
  },
});

ActiveButton.propTypes = {
  message: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
};

ActiveButton.defaultProps = {
  disabled: true,
  style: {},
};

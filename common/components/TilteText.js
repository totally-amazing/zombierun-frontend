import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import FONT from '../constants/FONT';
import COLORS from '../constants/COLORS';

const TitleText = ({ children, style }) => {
  return <Text style={{ ...styles.title, ...style }}>{children}</Text>;
};

export default TitleText;

const styles = StyleSheet.create({
  title: {
    fontSize: FONT.X_SMALL,
    color: COLORS.WHITE,
  },
});

TitleText.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.objectOf),
};

TitleText.defaultProps = {
  style: {},
};

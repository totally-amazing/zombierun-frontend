import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import FONT from '../constants/FONT';
import COLORS from '../constants/COLORS';

const TitleText = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default TitleText;

const styles = StyleSheet.create({
  title: {
    fontSize: FONT.X_SMALL,
    color: COLORS.WHITE,
  },
});

TitleText.propTypes = {
  children: PropTypes.string,
};

TitleText.defaultProps = {
  children: '',
};

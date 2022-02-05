import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import FONT from '../constants/FONT';
import COLORS from '../constants/COLORS';

const UnitText = ({ children }) => {
  return <Text style={styles.unit}>{children}</Text>;
};

export default UnitText;

const styles = StyleSheet.create({
  unit: {
    fontSize: FONT.X_SMALL,
    color: COLORS.WHITE,
  },
});

UnitText.propTypes = {
  children: PropTypes.string,
};

UnitText.defaultProps = {
  children: '',
};

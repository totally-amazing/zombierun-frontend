import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import FONT from '../constants/FONT';
import COLORS from '../constants/COLORS';

const UnitText = ({ children, style }) => {
  return <Text style={{ ...styles.unitText, ...style }}>{children}</Text>;
};

export default UnitText;

const styles = StyleSheet.create({
  unitText: {
    fontSize: FONT.X_SMALL,
    color: COLORS.WHITE,
  },
});

UnitText.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.objectOf),
};

UnitText.defaultProps = {
  style: {},
};

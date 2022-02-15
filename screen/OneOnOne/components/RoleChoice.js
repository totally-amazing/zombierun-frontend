import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import CustomButton from '../../../common/components/CustomButton';
import COLORS from '../../../common/constants/COLORS';
import FONT from '../../../common/constants/FONT';

const RoleChoice = ({ onPress, role }) => {
  return (
    <View>
      <CustomButton
        message={role === 'human' ? 'HUMAN' : 'ZOMBIE'}
        style={styles.switchButton}
        disabled={false}
        onPress={onPress}
      />
      <Text style={styles.role}>
        {role === 'human' ? '인간을 선택하셨습니다' : '좀비를 선택하셨습니다'}
      </Text>
    </View>
  );
};

export default RoleChoice;

const styles = StyleSheet.create({
  role: {
    marginTop: 10,
    fontSize: FONT.X_SMALL,
    color: COLORS.RED,
    textAlign: 'center',
  },
  switchButton: {
    color: COLORS.RED,
    backgroundColor: COLORS.BLACK,
    borderWidth: 3,
    borderColor: COLORS.RED,
    fontSize: FONT.LARGE,
    fontFamily: FONT.BLOOD_FONT,
  },
});

RoleChoice.propTypes = {
  onPress: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};

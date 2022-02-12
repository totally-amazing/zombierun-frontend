import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import CustomButton from '../../../common/components/CustomButton';
import COLORS from '../../../common/constants/COLORS';
import FONT from '../../../common/constants/FONT';

const RoleChoice = ({ isZombieRole, onPress }) => {
  return (
    <View>
      <CustomButton
        message={isZombieRole ? 'ZOMBIE' : 'HUMAN'}
        style={styles.switchButton}
        disabled={false}
        onPress={onPress}
      />
      <Text style={styles.role}>
        {isZombieRole ? '좀비를 선택하셨습니다' : '인간을 선택하셨습니다'}
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
  isZombieRole: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

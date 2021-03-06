import React from 'react';
import { Modal, View, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import SettingScreen from '../../Setting/SettingScreen';
import COLORS from '../../../common/constants/COLORS';
import FONT from '../../../common/constants/FONT';

const Pause = ({ role, onPress, hasOptionClicked, countDownStatus }) => {
  if (hasOptionClicked) {
    return <SettingScreen onClose={onPress} />;
  }

  return (
    <Modal transparent>
      <View style={styles.backdrop}>
        {!countDownStatus && (
          <Text style={styles.startText}>
            {role === 'human' ? 'ZOMBIE IS CHASING U' : 'U FIND FOOD'}
          </Text>
        )}
        {countDownStatus && (
          <FontAwesome
            name="play"
            style={styles.startButton}
            onPress={onPress}
          />
        )}
      </View>
    </Modal>
  );
};

export default Pause;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    opacity: 0.7,
    backgroundColor: COLORS.LIGHT_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    fontSize: 100,
    color: COLORS.BLACK,
  },
  startText: {
    fontFamily: FONT.BLOOD_FONT,
    fontSize: FONT.LARGE,
    color: COLORS.DEEP_RED,
    textAlign: 'center',
  },
});

Pause.propTypes = {
  role: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  hasOptionClicked: PropTypes.bool.isRequired,
  countDownStatus: PropTypes.number,
};

Pause.defaultProps = {
  countDownStatus: null,
};

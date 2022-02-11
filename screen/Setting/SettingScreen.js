import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { toggleEffect, toggleSound } from '../../store/uiSlice';
import StandardModal from '../../common/components/StandardModal';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import ActiveButton from '../../common/components/ActiveButton';
import WindowWithText from './components/WindowWithText';

const SettingScreen = ({ onClose }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const hasSwitchSoundEffectOption = useSelector(
    (state) => state.ui.canHearingEffect,
  );
  const hasSwitchMusicOption = useSelector(
    (state) => state.ui.canHearingBGMusic,
  );
  const [hasExitCheck, setHasExitCheck] = useState(false);

  const soundEffect = hasSwitchSoundEffectOption
    ? '효과음 켜기'
    : '효과음 끄기';
  const backgroundMusic = hasSwitchMusicOption
    ? '배경음악 켜기'
    : '배경음악 끄기';

  const toggleSoundEffect = () => {
    dispatch(toggleEffect());
  };

  const toggleBackgroundMusic = () => {
    dispatch(toggleSound());
  };

  const handlePressExitConfirmButton = () => {
    setHasExitCheck(true);
  };

  const handlePressExitButton = () => {
    navigation.navigate('Main');
  };

  return (
    <View>
      <StandardModal onClose={onClose}>
        {!hasExitCheck && (
          <View style={styles.screen}>
            <WindowWithText onPress={toggleSoundEffect} message={soundEffect} />
            <WindowWithText
              onPress={toggleBackgroundMusic}
              message={backgroundMusic}
            />
            <WindowWithText
              onPress={handlePressExitConfirmButton}
              message="러닝 종료"
            />
          </View>
        )}
        {hasExitCheck && (
          <View style={styles.screen}>
            <Text style={styles.text}>러닝을 종료하시겠습니까?</Text>
            <ActiveButton
              onPress={handlePressExitButton}
              message="종료"
              style={styles.exitButton}
              disabled={false}
            />
          </View>
        )}
      </StandardModal>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 70,
  },
  text: {
    fontSize: FONT.LARGE,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  exitButton: {
    width: 220,
    fontSize: FONT.MEDIUM,
  },
});

SettingScreen.propTypes = {
  onClose: PropTypes.func.isRequired,
};

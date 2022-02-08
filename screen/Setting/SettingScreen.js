import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import {
  showSetting,
  toggleEffect,
  toggleSound,
  checkExit,
} from '../../store/settingSlice';
import StandardModal from '../../common/components/StandardModal';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import ActiveButton from '../../common/components/ActiveButton';
import WindowWithText from './components/WindowWithText';

const SettingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isOnModal = useSelector((state) => state.setting.shouldStopGame);
  const isSwitchEffect = useSelector((state) => state.setting.canHearingEffect);
  const isSwitchSound = useSelector((state) => state.setting.canHearingBGMusic);
  const isOffGame = useSelector((state) => state.setting.shouldExitGame);

  const soundEffect = isSwitchEffect ? '효과음 켜기' : '효과음 끄기';
  const backgroundMusic = isSwitchSound ? '배경음악 켜기' : '배경음악 끄기';
  const settingButton = <Feather name="settings" size={24} color="black" />;

  const stopGame = () => {
    dispatch(showSetting(true));
  };

  const restartHandler = (close) => {
    dispatch(showSetting(close));
    dispatch(checkExit(false));
  };

  const toggleSoundEffect = () => {
    dispatch(toggleEffect());
  };

  const toggleBackgroundMusic = () => {
    dispatch(toggleSound());
  };

  const confirmExit = () => {
    dispatch(checkExit(true));
  };

  const pressExitHandler = () => {
    dispatch(checkExit(false));
    dispatch(showSetting(false));
    navigation.goBack();
  };

  return (
    <View>
      <WindowWithText onPress={stopGame} message={settingButton} />
      <StandardModal isVisible={isOnModal} setIsVisible={restartHandler}>
        {!isOffGame && (
          <View style={styles.screen}>
            <WindowWithText onPress={toggleSoundEffect} message={soundEffect} />
            <WindowWithText
              onPress={toggleBackgroundMusic}
              message={backgroundMusic}
            />
            <WindowWithText onPress={confirmExit} message="러닝 종료" />
          </View>
        )}
        {isOffGame && (
          <View style={styles.screen}>
            <Text style={styles.text}>러닝을 종료하시겠습니까?</Text>
            <ActiveButton
              onPress={pressExitHandler}
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

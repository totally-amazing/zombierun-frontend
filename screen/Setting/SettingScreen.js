import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';

import {
  checkStop,
  checkEffect,
  checkSound,
  checkIsExit,
} from '../../store/settingSlice';
import StandardModal from '../../common/components/StandardModal';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import ActiveButton from '../../common/components/ActiveButton';

const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const switchModal = useSelector((state) => state.setting.isStop);
  const switchSoundEffect = useSelector((state) => state.setting.isEffect);
  const switchBackgroundMusic = useSelector((state) => state.setting.isSound);
  const switchExit = useSelector((state) => state.setting.isExit);

  const stopGameHandler = () => {
    dispatch(checkStop(true));
  };

  const startAgainHandler = (close) => {
    dispatch(checkStop(close));
    dispatch(checkIsExit(false));
  };

  const changeSoundEffectHandler = () => {
    dispatch(checkEffect());
  };

  const changeBackgroundMusciHandler = () => {
    dispatch(checkSound());
  };

  const confirmExitHandler = () => {
    dispatch(checkIsExit(true));
  };

  const pressFinishHandler = () => {
    dispatch(checkIsExit(false));
    dispatch(checkStop(false));

    navigation.goBack();
  };

  return (
    <View>
      <Pressable onPress={stopGameHandler}>
        <Text>
          <Feather name="settings" size={24} color="black" />
        </Text>
      </Pressable>
      {switchModal && (
        <StandardModal isVisible={switchModal} setIsVisible={startAgainHandler}>
          {!switchExit && (
            <View style={styles.screen}>
              <Text>hello</Text>
              <Pressable onPress={changeSoundEffectHandler}>
                <Text style={styles.text}>
                  {switchSoundEffect ? '효과음 켜기' : '효과음 끄기'}
                </Text>
              </Pressable>
              <Pressable onPress={changeBackgroundMusciHandler}>
                <Text style={styles.text}>
                  {switchBackgroundMusic ? '배경음악 켜기' : '배경음악 끄기'}
                </Text>
              </Pressable>
              <Pressable onPress={confirmExitHandler}>
                <Text style={styles.text}>러닝 종료</Text>
              </Pressable>
            </View>
          )}
          {switchExit && (
            <View style={styles.screen}>
              <Text style={styles.text}>러닝을 종료하시겠습니까?</Text>
              <ActiveButton
                onPress={pressFinishHandler}
                message="종료"
                style={styles.exitButton}
                disabled={false}
              />
            </View>
          )}
        </StandardModal>
      )}
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
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};

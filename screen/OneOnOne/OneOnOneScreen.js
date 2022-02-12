import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import RoleChoice from './components/RoleChoice';
import ArrowMain from '../../common/components/ArrowMain';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import Profile from '../../common/components/Profile';
import PROFILE from '../../common/constants/PROFILE';
import CustomButton from '../../common/components/CustomButton';

const OneOnOneScreen = () => {
  const { nickname } = useSelector((state) => state.user);
  const [isZombieRole, setIsZombieRole] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handlePressToggleButton = () => {
    setIsZombieRole((prev) => !prev);
  };

  const handlePressStartButton = () => {
    setIsReady((prev) => !prev);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>원하는 역할을 선택해주세요</Text>
      <RoleChoice
        isZombieRole={isZombieRole}
        onPress={handlePressToggleButton}
      />
      <View style={styles.profileContainer}>
        <Profile size="medium" />
        <Text style={styles.nickname}>{nickname}</Text>
        <Image
          source={require('../../assets/waiting.jpeg')}
          style={styles.waiting}
        />
      </View>
      <CustomButton
        message="Ready"
        style={isReady ? styles.start : styles.ready}
        disabled={false}
        onPress={handlePressStartButton}
      />
      <ArrowMain style={styles.main} />
    </View>
  );
};

export default OneOnOneScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: COLORS.BLACK,
  },
  title: {
    color: COLORS.GRAY,
    fontSize: FONT.X_SMALL,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    marginHorizontal: 40,
    marginTop: 100,
    height: 300,
  },
  nickname: {
    marginBottom: 50,
    color: COLORS.WHITE,
    fontSize: FONT.MEDIUM,
    lineHeight: PROFILE.MEDIUM,
  },
  waiting: {
    width: PROFILE.MEDIUM,
    height: PROFILE.MEDIUM,
    marginLeft: 130,
    borderRadius: PROFILE.MEDIUM_BORDER_RADIUS,
  },
  ready: {
    color: COLORS.RED,
    backgroundColor: COLORS.BLACK,
    borderWidth: 3,
    borderColor: COLORS.RED,
    fontSize: FONT.LARGE,
    fontFamily: FONT.BLOOD_FONT,
  },
  start: {
    color: COLORS.BLACK,
    backgroundColor: COLORS.GRAY,
    fontSize: FONT.LARGE,
    fontFamily: FONT.BLOOD_FONT,
  },
});

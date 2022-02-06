import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import COLORS from '../../common/constants/COLORS';
import Profile from '../../common/components/Profile';
import FONT from '../../common/constants/FONT';
import PROFILE from '../../common/constants/PROFILE';
import GameService from '../../service/game';
import TitleText from '../../common/components/TitleText';
import UnitText from '../../common/components/UnitText';
import TextChunk from '../../common/components/TextChunk';
import LineWithText from './components/LineWithText';

const MyPageScreen = ({ gameService }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Profile size="medium" />
        <Text style={styles.nickname}>nickname</Text>
      </View>
      <View style={styles.row}>
        <TextChunk title="총 거리" value="0" unit="km" />
        <TitleText title="총 러닝 타임">
          <UnitText value="0" unit="h" />
          <UnitText value="0" unit="m" />
        </TitleText>
      </View>
      <LineWithText text="인간" />
      <View style={styles.row}>
        <TextChunk title="생존" value="25" />
        <TextChunk title="사망" value="25" />
      </View>
      <LineWithText text="좀비" />
      <View style={styles.row}>
        <TextChunk title="감염" value="25" />
        <TextChunk title="놓침" value="25" />
      </View>
      <LineWithText text="서바이벌" />
      <View style={styles.row}>
        <TextChunk title="1위" value="25" />
      </View>
      <View style={styles.row} />
      <View style={styles.row} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 50,
    backgroundColor: COLORS.BLACK,
  },
  nickname: {
    marginBottom: 50,
    color: COLORS.WHITE,
    fontSize: FONT.MEDIUM,
    lineHeight: PROFILE.MEDIUM,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    justifyContent: 'space-around',
  },
});

MyPageScreen.propTypes = {
  gameService: PropTypes.instanceOf(GameService).isRequired,
};

export default MyPageScreen;

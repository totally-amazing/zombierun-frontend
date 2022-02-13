import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import LineWithText from './components/LineWithText';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import Profile from '../../common/components/Profile';
import PROFILE from '../../common/constants/PROFILE';
import TinyTitle from '../../common/components/TinyTitle';
import ValueWithUnit from '../../common/components/ValueWithUnit';
import TextChunk from '../../common/components/TextChunk';

const MyPageScreen = () => {
  const record = useSelector((state) => state.game.totalRecord);
  const { nickname } = useSelector((state) => state.user.nickname);

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Profile size="medium" />
        <Text style={styles.nickname}>{nickname}</Text>
      </View>
      <View style={styles.row}>
        <TextChunk title="총 거리" value={String(record.distance)} unit="km" />
        <TinyTitle title="총 러닝 타임">
          <ValueWithUnit value={String(record.time?.hour)} unit="h" />
          <ValueWithUnit value={String(record.time?.minute)} unit="m" />
        </TinyTitle>
      </View>
      <LineWithText text="솔로" />
      <View style={styles.row}>
        <TextChunk title="생존" value={String(record.solo?.isWinner)} />
        <TextChunk title="사망" value={String(record.solo?.isLoser)} />
      </View>
      <LineWithText text="1:1" />
      <View style={styles.row}>
        <TextChunk title="승리" value={String(record.oneOnOne?.isWinner)} />
        <TextChunk title="패배" value={String(record.oneOnOne?.isLoser)} />
      </View>
      <LineWithText text="서바이벌" />
      <View style={styles.row}>
        <TextChunk title="1위" value={String(record.survival?.isWinner)} />
      </View>
      <View style={styles.row} />
      <View style={styles.row} />
    </View>
  );
};

export default MyPageScreen;

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

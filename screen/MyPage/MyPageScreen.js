import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { BASE_URL } from '@env';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import GameService from '../../service/game';
import Profile from '../../common/components/Profile';
import PROFILE from '../../common/constants/PROFILE';
import showErrorMessage from '../../common/components/ErrorMessage';
import TitleText from '../../common/components/TitleText';
import UnitText from '../../common/components/UnitText';
import TextChunk from '../../common/components/TextChunk';
import LineWithText from './components/LineWithText';
import HttpClient from '../../service/http';

const httpClient = new HttpClient(BASE_URL);
const gameService = new GameService(httpClient);

const MyPageScreen = () => {
  const [record, setRecord] = useState({
    distance: 0,
    time: {
      hour: 0,
      minute: 0,
    },
    solo: {
      isWinner: 0,
      isLoser: 0,
    },
    oneOnOne: {
      isWinner: 0,
      isLoser: 0,
    },
    survival: {
      isWinner: 0,
    },
  });
  const { id, nickname } = useSelector((state) => state.user); // TODO: 전역 상태에 user.id 데이터 있나 확인

  useEffect(() => {
    gameService
      .getTotalRecord(id)
      .then((totalRecord) => {
        setRecord({
          ...totalRecord,
          time: {
            hour: totalRecord.time && Math.floor(totalRecord.time / 60),
            minute: totalRecord.time && totalRecord.time % 60,
          },
        });
      })
      .catch((error) => {
        showErrorMessage(error.message);
      });
  }, [gameService]);

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Profile size="medium" />
        <Text style={styles.nickname}>{nickname}</Text>
      </View>
      <View style={styles.row}>
        <TextChunk title="총 거리" value={String(record.distance)} unit="km" />
        <TitleText title="총 러닝 타임">
          <UnitText value={String(record.time.hour)} unit="h" />
          <UnitText value={String(record.time.minute)} unit="m" />
        </TitleText>
      </View>
      <LineWithText text="솔로" />
      <View style={styles.row}>
        <TextChunk title="생존" value={String(record.solo.isWinner)} />
        <TextChunk title="사망" value={String(record.solo.isLoser)} />
      </View>
      <LineWithText text="1:1" />
      <View style={styles.row}>
        <TextChunk title="승리" value={String(record.oneOnOne.isWinner)} />
        <TextChunk title="패배" value={String(record.oneOnOne.isLoser)} />
      </View>
      <LineWithText text="서바이벌" />
      <View style={styles.row}>
        <TextChunk title="1위" value={String(record.survival.isWinner)} />
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

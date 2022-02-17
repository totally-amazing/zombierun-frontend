import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import StandardModal from '../../common/components/StandardModal';
import FONT from '../../common/constants/FONT';
import COLORS from '../../common/constants/COLORS';
import TextChunk from '../../common/components/TextChunk';
import getResultMessage from '../../common/utils/getResultMessage';
import { UNIT } from '../../common/constants/MESSAGE';

const PreviousResultScreen = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const record = useSelector((state) => state.game.recentRecord);

  const previousResult = (
    <View>
      <View style={styles.main}>
        <TextChunk
          title="최근 속도"
          value={record.speed || 0}
          unit={UNIT.SPEED}
        />
        <TextChunk
          title="최근 러닝 타임"
          value={record.time || 0}
          unit={UNIT.MINUTE}
        />
        <TextChunk
          title="최근 거리"
          value={record.distance || 0}
          unit={UNIT.KILOMETER}
        />
      </View>
      <Text style={styles.result}>
        {getResultMessage(record.mode, record.role, record.isWinner)}
      </Text>
    </View>
  );

  return (
    <StandardModal>
      {isLoading && <ActivityIndicator size="large" color={COLORS.RED} />}
      {!isLoading && previousResult}
    </StandardModal>
  );
};

export default PreviousResultScreen;

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  result: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: FONT.LARGE,
    fontFamily: FONT.BLOOD_FONT,
    color: COLORS.WHITE,
  },
});

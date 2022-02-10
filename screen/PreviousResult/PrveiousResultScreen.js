import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import StandardModal from '../../common/components/StandardModal';
import showErrorMessage from '../../common/utils/showErrorMessage';
import FONT from '../../common/constants/FONT';
import COLORS from '../../common/constants/COLORS';
import { useRecentGameRecord } from '../../common/hooks/useGame';
import useUser from '../../common/hooks/useUser';
import TextChunk from '../../common/components/TextChunk';

const SURVIVED = "YOU'RE SURVIVED";
const FAILED = 'YOU WERE INFECTED';
const SPPED = 'km/h';
const KILOMETER = 'km';
const MINUTE = 'm';

const PreviousResultScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [record, setRecord] = useState({
    distance: 0,
    time: 0,
    speed: 0,
    isWinner: false,
  });
  const { id } = useUser();

  useRecentGameRecord(id, setRecord, (error) => {
    setIsLoading(false);
    setHasError(true);
    showErrorMessage(error.message);
  });

  const previousResult = (
    <View>
      <View style={styles.main}>
        <TextChunk title="최근 속도" value={record.speed} unit={SPPED} />
        <TextChunk title="최근 러닝 타임" value={record.time} unit={MINUTE} />
        <TextChunk title="최근 거리" value={record.distance} unit={KILOMETER} />
      </View>
      <Text style={styles.result}>{record.isWinner ? SURVIVED : FAILED}</Text>
    </View>
  );

  return (
    <StandardModal>
      {isLoading && <ActivityIndicator size="large" color={COLORS.RED} />}
      {!isLoading && !hasError && previousResult}
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

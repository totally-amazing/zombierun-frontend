import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import StandardModal from '../../common/components/StandardModal';
import TitleText from '../../common/components/TilteText';
import UnitText from '../../common/components/UnitText';
import showErrorMessage from '../../common/utils/showErrorMessage';
import FONT from '../../common/constants/FONT';
import COLORS from '../../common/constants/COLORS';
import { useRecentGameRecord } from '../../common/hooks/useGame';
import useUser from '../../common/hooks/useUser';

const SURVIVED = "YOU'RE SURVIVED";
const FAILED = 'YOU WERE INFECTED';
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
        <View style={styles.header}>
          <TitleText>최근 속도</TitleText>
          <View style={styles.title}>
            <Text style={styles.value}>{record.speed}</Text>
            <UnitText style={styles.unit}>{KILOMETER}</UnitText>
          </View>
        </View>
        <View style={styles.header}>
          <TitleText>최근 러닝 타임</TitleText>
          <View style={styles.title}>
            <Text style={styles.value}>{record.time}</Text>
            <UnitText style={styles.unit}>{MINUTE}</UnitText>
          </View>
        </View>
        <View style={styles.header}>
          <TitleText>최근 거리</TitleText>
          <View style={styles.title}>
            <Text style={styles.value}>{record.distance}</Text>
            <UnitText style={styles.unit}>{KILOMETER}</UnitText>
          </View>
        </View>
      </View>
      <Text style={styles.result}>{record.isWinner ? SURVIVED : FAILED}</Text>
    </View>
  );

  return (
    <StandardModal>
      {isLoading && <ActivityIndicator size="large" color={COLORS.RED} />}
      {!isLoading && !hasError && record && previousResult}
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
  },
  header: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  title: {
    flexDirection: 'row',
  },
  result: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: FONT.LARGE,
    fontFamily: FONT.BLOOD_FONT,
    color: COLORS.WHITE,
  },
  value: {
    fontSize: FONT.MEDIUM,
    color: COLORS.WHITE,
  },
  unit: {
    marginTop: 20,
  },
});

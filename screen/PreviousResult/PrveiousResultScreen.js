import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import StandardModal from '../../common/components/StandardModal';
import TitleText from '../../common/components/TilteText';
import UnitText from '../../common/components/UnitText';
import ShowErrorMessage from '../../common/components/ShowErrorMessage';
import FONT from '../../common/constants/FONT';
import COLORS from '../../common/constants/COLORS';

const SURVIVED = "YOU'RE SURVIVED";
const FAILED = 'YOU WERE INFECTED';
const KILOMETER = 'km';
const MINUTE = 'm';

const PreviousResultScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  let record = {
    distance: 0,
    time: 0,
    speed: 0,
    solo: {
      isWinner: false,
    },
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('backendAddress', {
        method: 'GET',
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      setHasError(false);
      record = responseData;
      return record;
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
      return ShowErrorMessage(error.message);
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

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
      <Text style={styles.result}>
        {record.solo.isWinner ? SURVIVED : FAILED}
      </Text>
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

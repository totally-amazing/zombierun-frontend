import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import StandardModal from '../../common/components/StandardModal';
import TitleText from '../../common/components/TilteText';
import UnitText from '../../common/components/UnitText';
import ErrorMessage from '../../common/components/ErrorMessage';
import FONT from '../../common/constants/FONT';
import COLORS from '../../common/constants/COLORS';

const SURVIVED = "YOU'RE SURVIVED";
const FAILED = 'YOU WERE INFECTED';
const KILOMETER = 'km';
const TIME = 'm';

const PreviousResultScreen = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let record = {
    distance: 0,
    time: 0,
    speed: 0,
    solo: {
      isWinner: false,
    },
  };

  const openModalHandler = async () => {
    setModalVisible(true);
    try {
      const response = await fetch('backendAddress', {
        method: 'GET',
      });

      setIsLoading(true);
      record = response.json();
      setIsLoading(false);
      setIsError(true);

      return record;
    } catch (error) {
      setIsLoading(false);
      return ErrorMessage(error.message);
    }
  };

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
            <UnitText style={styles.unit}>{TIME}</UnitText>
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

  if (isLoading) {
    return <ActivityIndicator size="large" color={COLORS.RED} />;
  }

  return (
    <View style={styles.screen}>
      <Button
        color={COLORS.BLACK}
        disable={false}
        title="이전기록보기"
        onPress={openModalHandler}
      />
      {isError && (
        <StandardModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <View>{previousResult}</View>
        </StandardModal>
      )}
    </View>
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

import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import CustomButton from '../../common/components/CustomButton';
import TextChunk from '../../common/components/TextChunk';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import getProfileHeaderOption from '../../common/utils/getProfileHeaderOption';
import getResultMessage from '../../common/utils/getResultMessage';

const ResultScreen = ({ navigation }) => {
  const { mode, isWinner, time, speed, distance, role } = useSelector(
    (state) => state.game.result,
  );

  const handlePressButton = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.message}>
        {getResultMessage(mode, role, isWinner)}
      </Text>
      <View style={styles.row}>
        <TextChunk title="평균속도" value={speed} unit="km/h" />
        <TextChunk title="생존시간" value={time} unit="분" />
        <TextChunk title="거리" value={distance} unit="km" />
      </View>
      <CustomButton
        message="To the Main"
        disabled={false}
        onPress={handlePressButton}
      />
      <View style={styles.map} />
    </View>
  );
};

export default ResultScreen;

export const screenOption = getProfileHeaderOption();

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginVertical: 30,
  },
  message: {
    maxWidth: 300,
    textAlign: 'center',
    fontSize: FONT.LARGE,
    fontFamily: FONT.BLOOD_FONT,
    color: COLORS.WHITE,
  },
  map: {
    backgroundColor: COLORS.WHITE,
    marginTop: 30,
    width: 250,
    height: 250,
  },
});

ResultScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};

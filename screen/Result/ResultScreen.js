import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import ActiveButton from '../../common/components/ActiveButton';
import TextChunk from '../../common/components/TextChunk';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import getProfileHeaderOption from '../../common/screenOptions/profileHeaderOption';

const ResultScreen = ({ navigation }) => {
  const handlePressButton = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.result}>You are infected</Text>
      <View style={styles.row}>
        <TextChunk title="평균속도" value="5.3" unit="km/h" />
        <TextChunk title="생존시간" value="10" unit="분" />
        <TextChunk title="거리" value="3" unit="km" />
      </View>
      <ActiveButton
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
  result: {
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

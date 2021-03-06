import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';

import FONT from '../../common/constants/FONT';
import COLORS from '../../common/constants/COLORS';
import getProfileHeaderOption from '../../common/utils/getProfileHeaderOption';
import showErrorMessage from '../../common/utils/showErrorMessage';
import { getRooms } from '../../store/roomSlice';
import { ERROR } from '../../common/constants/MESSAGE';

const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSingleText = () => {
    navigation.navigate('Solo');
  };

  const handleTogetherText = () => {
    navigation.navigate('RoomList');
    dispatch(getRooms());
  };

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        showErrorMessage(ERROR.NO_AUTHORIZED);
      }
    };
    getLocationPermission();
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.text} onPress={handleSingleText}>
        Solo
      </Text>
      <Text style={styles.text} onPress={handleTogetherText}>
        Together
      </Text>
    </View>
  );
};

export default MainScreen;

export const screenOption = getProfileHeaderOption();

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
  text: {
    marginVertical: 30,
    fontSize: FONT.X_LARGE,
    color: COLORS.DEEP_RED,
    fontFamily: FONT.BLOOD_FONT,
  },
  buttonContainer: {
    marginLeft: 40,
  },
});

MainScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};

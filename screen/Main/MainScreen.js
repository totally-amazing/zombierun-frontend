import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

import FONT from '../../common/constants/FONT';
import COLORS from '../../common/constants/COLORS';
import showErrorMessage from '../../common/utils/showErrorMessage';
import Profile from '../../common/components/Profile';

const MainScreen = () => {
  const navigation = useNavigation();
  const handleSingleText = () => {
    navigation.navigate('Solo');
  };

  const handleTogetherText = () => {
    navigation.navigate('RoomList');
  };

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        showErrorMessage('권한이 허가 되지 않았습니다');
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

export const screenOption = (navData) => {
  const handleProfileButton = () => {
    navData.navigation.navigate('MyPage');
  };

  return {
    headerTitle: '',
    headerLeft: () => {
      return (
        <View style={styles.buttonContainer}>
          <HeaderButtons HeaderButtonComponent={Profile}>
            <Item size="small" onPress={handleProfileButton} />
          </HeaderButtons>
        </View>
      );
    },
  };
};

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

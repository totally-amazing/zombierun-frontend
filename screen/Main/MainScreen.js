import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import PropTypes from 'prop-types';

import FONT from '../../common/constants/FONT';
import COLORS from '../../common/constants/COLORS';
import Profile from '../../common/components/Profile';

const MainScreen = ({ navigation }) => {
  const handleSingleText = () => {
    navigation.navigate('Solo');
  };

  const handleTogetherText = () => {
    navigation.navigate('RoomList');
  };

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

MainScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};

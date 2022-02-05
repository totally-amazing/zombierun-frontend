import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import PropTypes from 'prop-types';

import FONT from '../../common/constants/FONT';
import COLORS from '../../common/constants/COLORS';
import ProfileButton from './ProfileButton';

const MainScreen = ({ navigation }) => {
  const pressSingleTextHandler = () => {
    navigation.navigate('Solo');
  };

  const pressTogetherTextHandler = () => {
    navigation.navigate('RoomList');
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.text} onPress={pressSingleTextHandler}>
        Solo
      </Text>
      <Text style={styles.text} onPress={pressTogetherTextHandler}>
        Together
      </Text>
    </View>
  );
};

export default MainScreen;

export const screenOption = (navData) => {
  const pressProfileButtonHandler = () => {
    navData.navigation.navigate('MyPage');
  };

  return {
    headerTitle: '',
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={ProfileButton}>
          <Item
            title="Menu"
            iconName="user-circle-o"
            onPress={pressProfileButtonHandler}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    marginVertical: 30,
    fontSize: FONT.X_LARGE,
    color: COLORS.DEEP_RED,
    fontFamily: FONT.BLOOD_FONT,
  },
});

MainScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func),
};

MainScreen.defaultProps = {
  navigation: PropTypes.objectOf(PropTypes.func),
};

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Profile from '../components/Profile';

function getProfileHeaderOption(headerRight) {
  return (nav) => {
    const handleProfileButton = () => {
      nav.navigation.push('MyPage');
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
      headerRight,
    };
  };
}

export default getProfileHeaderOption;

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 40,
  },
});

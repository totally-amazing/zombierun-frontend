import React from 'react';
import { View, imageUrl, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalRecord } from '../../store/gameSlice';

import Profile from '../components/Profile';

function getProfileHeaderOption(headerRight) {
  return (nav) => {
    return {
      headerTitle: '',
      headerLeft: () => {
        const dispatch = useDispatch();
        const { id } = useSelector((state) => state.user);

        const handleProfileButton = () => {
          nav.navigation.push('MyPage');
          dispatch(getTotalRecord(id));
        };

        return (
          <View style={styles.buttonContainer}>
            <HeaderButtons
              HeaderButtonComponent={Profile}
              size="small"
              onPress={handleProfileButton}
              imageUrl={imageUrl}
            />
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

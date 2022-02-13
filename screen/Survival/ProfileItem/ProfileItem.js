import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import COLORS from '../../../common/constants/COLORS';
import Profile from '../../../common/components/Profile';

const ProfileItem = ({ item }) => {
  console.log(item);
  return (
    <View style={styles.profile}>
      {item.isReady && (
        <AntDesign
          name="check"
          size={30}
          color={COLORS.RED}
          style={styles.icon}
        />
      )}
      <Profile size="small" imageUrl={item.imageUrl} />
    </View>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    zIndex: 99,
    bottom: 10,
  },
});

ProfileItem.propTypes = {
  item: PropTypes.shape({
    nickname: PropTypes.string,
    imageUrl: PropTypes.string,
    isReady: PropTypes.bool,
  }).isRequired,
};

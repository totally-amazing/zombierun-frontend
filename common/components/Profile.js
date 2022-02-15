import React from 'react';
import PropTypes from 'prop-types';
import { Image, Pressable, StyleSheet } from 'react-native';

import PROFILE from '../constants/PROFILE';

const Profile = ({ size, onPress, imageUrl }) => {
  const image = imageUrl
    ? { uri: imageUrl }
    : require('../../assets/avatar.jpeg');

  return (
    <Pressable onPress={onPress}>
      <Image source={image} style={styles[size]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  small: {
    width: PROFILE.SMALL,
    height: PROFILE.SMALL,
    borderRadius: PROFILE.SAMLL_BORDER_RADIUS,
  },
  medium: {
    width: PROFILE.MEDIUM,
    height: PROFILE.MEDIUM,
    borderRadius: PROFILE.MEDIUM_BORDER_RADIUS,
  },
  large: {
    width: PROFILE.LARGE,
    height: PROFILE.LARGE,
    borderRadius: PROFILE.LARGE_BORDER_RADIUS,
  },
});

Profile.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  onPress: PropTypes.func,
  imageUrl: PropTypes.string,
};

Profile.defaultProps = {
  onPress: () => {},
  imageUrl: null,
};

export default Profile;

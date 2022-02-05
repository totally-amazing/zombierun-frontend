import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { HeaderButton } from 'react-navigation-header-buttons';

import PROFILE_SIZE from '../../common/constants/PROFILE_SIZE';

const ProfileButton = ({ iconName, onPress, title, renderButtonElement }) => {
  return (
    <HeaderButton
      onPress={onPress}
      title={title}
      renderButtonElement={renderButtonElement}
      iconName={iconName}
      IconComponent={FontAwesome}
      iconSize={PROFILE_SIZE.PROFILE_SMALL_WIDTH}
      style={style.iconButton}
      color="white"
    />
  );
};

const style = StyleSheet.create({
  iconButton: {
    marginHorizontal: 30,
    backgroundColor: 'black',
  },
});

ProfileButton.propTypes = {
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  renderButtonElement: PropTypes.func.isRequired,
};

export default ProfileButton;

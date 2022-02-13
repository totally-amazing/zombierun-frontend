import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import Timer from './Timer';
import SurvivalCount from './SurvivalCount';
import COLORS from '../../../common/constants/COLORS';
import FONT from '../../../common/constants/FONT';
import ValueWithUnit from '../../../common/components/ValueWithUnit';

const Header = ({
  navigation,
  mode,
  speed,
  time,
  hasStarted,
  hasFinished,
  onFinish,
  onPress,
  userCounts,
}) => {
  const headerOptionButton = useCallback(() => {
    return <FontAwesome name="gear" style={styles.option} onPress={onPress} />;
  }, []);

  useEffect(() => {
    const setNavigatorOptions = () => {
      navigation.setOptions({
        headerTitle: '',
        headerLeft: () => {},
        headerRight: mode === 'solo' ? headerOptionButton : () => {},
      });
    };

    setNavigatorOptions();
  }, [navigation]);

  return (
    <View style={styles.header}>
      {mode === 'solo' ? (
        <SurvivalCount
          userCounts={userCounts}
          hasStarted={hasStarted}
          hasFinished={hasFinished}
          onFinish={onFinish}
        />
      ) : (
        <Timer
          time={time}
          hasStarted={hasStarted}
          hasFinished={hasFinished}
          onFinish={onFinish}
        />
      )}
      <ValueWithUnit value={speed} unit="km/h" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  option: {
    fontSize: FONT.MEDIUM,
    color: COLORS.WHITE,
    marginHorizontal: 30,
  },
});

Header.propTypes = {
  speed: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  hasStarted: PropTypes.bool.isRequired,
  hasFinished: PropTypes.bool.isRequired,
  onFinish: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
  userCounts: PropTypes.number,
};

Header.defaultProps = {
  userCounts: '',
};
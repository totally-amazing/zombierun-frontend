import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import GameController from '../controllers/gameController';
import COLORS from '../../../common/constants/COLORS';
import FONT from '../../../common/constants/FONT';
import Socket from '../../../network/socket';

const GameView = ({
  role,
  hasStarted,
  gameController,
  distanceGap,
  onFinish,
}) => {
  const [zombieSize, setZombieSize] = useState('far');
  const opponentImage = () => {
    if (role === 'zombie') {
      return require('../../../assets/images/human.gif');
    }

    return require('../../../assets/images/zombie.gif');
  };

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    if (distanceGap >= 400) {
      setZombieSize('far');
      gameController.controlSoundEffectVolume(0.2);
      return;
    }

    if (distanceGap >= 200 && distanceGap < 400) {
      setZombieSize('middle');
      gameController.controlSoundEffectVolume(0.5);
      return;
    }

    if (distanceGap >= 100 && distanceGap < 200) {
      setZombieSize('close');
      gameController.controlSoundEffectVolume(1);
      return;
    }

    if (distanceGap <= 0) {
      onFinish();
    }
  }, [distanceGap, hasStarted]);

  return (
    <View style={styles.gameView}>
      <View style={styles.imageContainer}>
        <Image style={styles[zombieSize]} source={opponentImage()} />
      </View>
      <View>
        <Text style={styles.distance}>Distance</Text>
        <Text style={styles.distanceNumber}>{distanceGap}M</Text>
      </View>
    </View>
  );
};

export default GameView;

const styles = StyleSheet.create({
  gameView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  distance: {
    textAlign: 'center',
    fontSize: FONT.MEDIUM,
    fontFamily: FONT.BLOOD_FONT,
    color: COLORS.WHITE,
  },
  distanceNumber: {
    textAlign: 'center',
    fontSize: FONT.X_LARGE,
    fontFamily: FONT.BLOOD_FONT,
    color: COLORS.WHITE,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    width: 400,
    height: 400,
  },
  middle: {
    width: 200,
    height: 200,
  },
  far: {
    width: 100,
    height: 100,
  },
});

GameView.propTypes = {
  role: PropTypes.string.isRequired,
  hasStarted: PropTypes.bool.isRequired,
  distanceGap: PropTypes.number.isRequired,
  onFinish: PropTypes.func.isRequired,
  gameController: PropTypes.instanceOf(GameController).isRequired,
};

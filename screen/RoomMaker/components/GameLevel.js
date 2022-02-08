import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Input from '../../../common/components/Input';

const GameLevel = ({ onInputChange, mode }) => {
  const [isSwitched, setIsSwitched] = useState(false);

  useEffect(() => {
    if (mode !== 'servival') {
      setIsSwitched((prevState) => !prevState);
    }
  }, [mode]);

  return (
    <View>
      {isSwitched && (
        <Input
          id="servival"
          type="number"
          label="좀비속도"
          placeholder="0"
          keyboardType="decimal-pad"
          min={1}
          max={20}
          unit="km/h"
          onInputChange={onInputChange}
        />
      )}
      {!isSwitched && (
        <Input
          id="oneOnOne"
          type="number"
          label="러닝타임"
          placeholder="0"
          keyboardType="decimal-pad"
          min={30}
          max={2000}
          unit="분"
          onInputChange={onInputChange}
        />
      )}
    </View>
  );
};

export default GameLevel;

GameLevel.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};

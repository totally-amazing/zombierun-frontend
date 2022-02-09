import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Input from '../../../common/components/Input';

const GameModeInput = ({ onInputChange, mode }) => {
  const [modeName, setModeName] = useState('survival');

  useEffect(() => {
    if (modeName !== mode) {
      setModeName(mode);
    }
  }, [mode]);

  return (
    <View>
      {modeName === 'survival' && (
        <Input
          id="survival"
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
      {modeName !== 'survival' && (
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

export default GameModeInput;

GameModeInput.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};

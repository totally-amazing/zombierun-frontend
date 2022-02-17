import React, { useCallback, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import FONT from '../../common/constants/FONT';
import COLORS from '../../common/constants/COLORS';
import Input from '../../common/components/Input';
import CustomButton from '../../common/components/CustomButton';
import PreviousResultScreen from '../PreviousResult/PrveiousResultScreen';
import showErrorMessage from '../../common/utils/showErrorMessage';
import getProfileHeaderOption from '../../common/utils/getProfileHeaderOption';
import ArrowMainButton from '../../common/components/ArrowMainButton';
import { getRecentRecord, startGame } from '../../store/gameSlice';
import { toggleModal } from '../../store/uiSlice';
import Difficulty from './components/Difficulty';
import { EVENT, ERROR } from '../../common/constants/MESSAGE';

const formReducer = (state, action) => {
  if (action.type === EVENT.FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidation = {
      ...state.inputValidation,
      [action.input]: action.hasValidInput,
    };
    let updatedFormValidation = true;

    for (const value of Object.values(updatedValidation)) {
      updatedFormValidation = updatedFormValidation && value;
    }

    return {
      inputValues: updatedValues,
      inputValidation: updatedValidation,
      formIsValid: updatedFormValidation,
    };
  }

  return state;
};

const SoloScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.ui.isModalVisible);
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {},
    inputValidation: {},
    formIsValid: false,
  });

  const handlePressStartButton = () => {
    const { inputValues, formIsValid } = formState;
    if (!formIsValid) {
      showErrorMessage(ERROR.WRONG_INPUT_VALUE);
      return;
    }

    dispatch(
      startGame({
        mode: 'solo',
        speed: inputValues.speed,
        time: inputValues.time,
      }),
    );
    navigation.navigate('Running');
  };

  const handleInputChange = useCallback(
    (inputIdentifier, inputValue, inputValidation) => {
      dispatchForm({
        type: EVENT.FORM_UPDATE,
        value: inputValue,
        hasValidInput: inputValidation,
        input: inputIdentifier,
      });
    },
    [dispatchForm],
  );

  return (
    <View style={styles.screen}>
      {isModalVisible && <PreviousResultScreen />}
      <Difficulty speed={formState.inputValues.speed} />
      <View>
        <Input
          id="speed"
          type="number"
          label="좀비속도"
          placeholder="0"
          keyboardType="decimal-pad"
          min={1}
          max={20}
          unit="km/h"
          onInputChange={handleInputChange}
        />
        <Input
          id="time"
          type="number"
          label="러닝타임"
          placeholder="0"
          keyboardType="decimal-pad"
          min={30}
          max={2000}
          unit="분"
          onInputChange={handleInputChange}
        />
      </View>
      <View>
        <CustomButton
          message="START TO SURVIVE"
          style={styles.button}
          disabled={false}
          onPress={handlePressStartButton}
        />
      </View>
      <ArrowMainButton />
    </View>
  );
};

export default SoloScreen;

export const screenOption = getProfileHeaderOption(() => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);

  const handlePreviousText = () => {
    dispatch(toggleModal());
    dispatch(getRecentRecord(id));
  };
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.text} onPress={handlePreviousText}>
        이전 기록 보기
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
  text: {
    fontSize: FONT.X_SMALL,
    color: COLORS.DEEP_RED,
  },
  buttonContainer: {
    marginHorizontal: 40,
  },
  button: {
    fontFamily: FONT.BLOOD_FONT,
  },
});

SoloScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};

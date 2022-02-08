import React, { useCallback, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import FONT from '../../common/constants/FONT';
import COLORS from '../../common/constants/COLORS';
import Input from '../../common/components/Input';
import ActiveButton from '../../common/components/ActiveButton';
import Difficulty from './components/Difficulty';
import Profile from '../../common/components/Profile';
import { addGameSetting } from '../../store/gameSlice';
import PreviousResultScreen from '../PreviousResult/PrveiousResultScreen';
import ShowErrorMessage from '../../common/components/ShowErrorMessage';
import { toggleModal } from '../../store/uiSlice';

const INVALID_FORM_ERROR_MESSAGE = '잘못된 입력값이 존재합니다';
const FORM_UPDATE = 'FORM_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
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
  const handlePressdStartButton = () => {
    const { inputValues, formIsValid } = formState;
    if (!formIsValid) {
      ShowErrorMessage(INVALID_FORM_ERROR_MESSAGE);
      return;
    }

    dispatch(addGameSetting(inputValues));
    navigation.navigate('Running');
  };
  const handleArrowButton = () => {
    navigation.navigate('Main');
  };
  const handleInputChange = useCallback(
    (inputIdentifier, inputValue, inputValidation) => {
      dispatchForm({
        type: FORM_UPDATE,
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
        <ActiveButton
          message="START TO SURVIVE"
          style={styles.button}
          disabled={false}
          onPress={handlePressdStartButton}
        />
      </View>
      <View style={styles.navButtonContainer}>
        <Pressable style={styles.navButton} onPress={handleArrowButton}>
          <AntDesign name="arrowleft" size={20} color={COLORS.DEEP_RED} />
          <Text style={styles.text}>To the Main</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SoloScreen;

export const screenOption = (navData) => {
  const handleProfileButton = () => {
    navData.navigation.navigate('MyPage');
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
    headerRight: () => {
      const dispatch = useDispatch();
      const handlePreviousText = () => {
        dispatch(toggleModal());
      };
      return (
        <View style={styles.buttonContainer}>
          <Text style={styles.text} onPress={handlePreviousText}>
            이전 기록 보기
          </Text>
        </View>
      );
    },
  };
};

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
  navButtonContainer: {
    width: '80%',
    justifyContent: 'flex-start',
  },
  navButton: {
    flexDirection: 'row',
  },
});

SoloScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};

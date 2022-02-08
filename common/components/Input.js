import React, { useEffect, useReducer, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import propType from 'prop-types';

import COLORS from '../constants/COLORS';
import FONT from '../constants/FONT';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        inputIsValid: action.inputIsValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = ({
  initialValue,
  initiallyValid,
  type,
  min,
  max,
  unit,
  minLength,
  maxLength,
  id,
  label,
  placeholder,
  keyboardType,
  onInputChange,
  autoCorrect,
}) => {
  const [errorMessage, setErrorMessage] = useState('잘못된 입력 값 입니다');
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    inputIsValid: initiallyValid,
    isTouched: false,
  });

  const inputChangeHandler = (value) => {
    let inputIsValid = true;

    if (type === 'number') {
      const valueNum = Number(value);

      if (Number.isNaN(valueNum)) {
        inputIsValid = false;
        setErrorMessage('잘못된 입력 값 입니다');
      }

      if (min && Number(value) < min) {
        inputIsValid = false;
        setErrorMessage(`최소 값은 ${min}${unit} 입니다`);
      }

      if (max && Number(value) > max) {
        inputIsValid = false;
        setErrorMessage(`최대 값은 ${max}${unit} 입니다`);
      }
    }

    if (type === 'string') {
      const trimedString = value.trim();

      if (!trimedString) {
        inputIsValid = false;
        setErrorMessage('잘못된 입력 값 입니다');
      }

      if (minLength && trimedString < minLength) {
        inputIsValid = false;
        setErrorMessage(`최소 ${minLength}자 이상 입력해주세요`);
      }

      if (maxLength && trimedString > maxLength) {
        inputIsValid = false;
        setErrorMessage(`최대 ${maxLength}자 까지만 입력 가능합니다`);
      }
    }

    dispatch({ type: INPUT_CHANGE, value, inputIsValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  useEffect(() => {
    onInputChange(id, inputState.value, inputState.inputIsValid);
  }, [id, inputState.value, inputState.inputIsValid]);

  return (
    <View style={style.inputControl}>
      <Text style={style.label}>{label}</Text>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          autoCorrect={autoCorrect}
          placeholder={placeholder}
          placeholderTextColor={COLORS.LIGHT_GRAY}
          keyboardType={keyboardType}
          value={inputState.value}
          onBlur={lostFocusHandler}
          onChangeText={inputChangeHandler}
        />
        <Text style={style.unit}>{unit}</Text>
      </View>
      {inputState.isTouched && !inputState.inputIsValid && (
        <View>
          <Text style={style.errorText}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const style = StyleSheet.create({
  inputControl: {
    flexDirection: 'column',
    marginVertical: 20,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    textAlign: 'center',
    color: COLORS.WHITE,
    paddingVertical: 5,
    borderBottomColor: COLORS.WHITE,
    borderBottomWidth: 1,
  },
  unit: {
    paddingHorizontal: 7,
    paddingTop: 10,
    color: COLORS.WHITE,
  },
  label: {
    color: COLORS.WHITE,
  },
  errorText: {
    fontSize: FONT.X_SMALL,
    color: COLORS.WHITE,
  },
});

Input.propTypes = {
  initialValue: propType.string,
  initiallyValid: propType.bool,
  type: propType.string,
  min: propType.number,
  max: propType.number,
  minLength: propType.number,
  maxLength: propType.number,
  unit: propType.string,
  id: propType.string,
  label: propType.string,
  placeholder: propType.string,
  keyboardType: propType.string,
  onInputChange: propType.func,
  autoCorrect: propType.string,
};

Input.defaultProps = {
  initialValue: null,
  initiallyValid: null,
  type: null,
  min: null,
  max: null,
  unit: null,
  minLength: null,
  maxLength: null,
  id: null,
  label: null,
  placeholder: null,
  keyboardType: null,
  onInputChange: null,
  autoCorrect: null,
};

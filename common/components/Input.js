import React, { useEffect, useReducer, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import propType from 'prop-types';

import COLORS from '../constants/COLORS';
import FONT from '../constants/FONT';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const DEFAULT_ERROR_MESSAGE = '잘못된 입력 값 입니다';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
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
  required,
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
  const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR_MESSAGE);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isValid: initiallyValid,
    isTouched: false,
  });

  const inputChangeHandler = (value) => {
    let isValid = true;

    if (required && !value) {
      isValid = false;
    }

    if (type === 'number') {
      const valueNum = Number(value);
      if (Number.isNaN(valueNum)) {
        isValid = false;
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
      if (min && Number(value) < min) {
        isValid = false;
        const MIN_ERROR_MESSAGE = `최소 값은 ${min}${unit} 입니다`;
        setErrorMessage(MIN_ERROR_MESSAGE);
      }

      if (max && Number(value) > max) {
        isValid = false;
        const MAX_ERROR_MESSAGE = `최대 값은 ${max}${unit} 입니다`;
        setErrorMessage(MAX_ERROR_MESSAGE);
      }
    }

    if (type === 'string') {
      const trimedString = value.trim();
      if (!trimedString) {
        isValid = false;
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
      if (minLength && trimedString < minLength) {
        isValid = false;
        const MIN_LENGTH_ERROR_MESSAGE = `최소 ${minLength}자 이상 입력해주세요`;
        setErrorMessage(MIN_LENGTH_ERROR_MESSAGE);
      }
      if (maxLength && trimedString > maxLength) {
        isValid = false;
        const MAX_LENGTH_ERROR_MESSAGE = `최대 ${maxLength}자 까지만 입력 가능합니다`;
        setErrorMessage(MAX_LENGTH_ERROR_MESSAGE);
      }
    }

    dispatch({ type: INPUT_CHANGE, value, isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  useEffect(() => {
    onInputChange(id, inputState.value, inputState.isValid);
  }, [id, inputState.value, inputState.isValid]);

  return (
    <View style={style.inputControl}>
      <Text style={style.label}>{label}</Text>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          autoCorrect={autoCorrect}
          required={required}
          placeholder={placeholder}
          placeholderTextColor={COLORS.LIGHT_GRAY}
          keyboardType={keyboardType}
          value={inputState.value}
          onBlur={lostFocusHandler}
          onChangeText={inputChangeHandler}
        />
        <Text style={style.unit}>{unit}</Text>
      </View>
      {inputState.isTouched && !inputState.isValid && (
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
  required: propType.bool,
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
  required: null,
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

import React, { useState, useReducer, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

import RoomTitle from './components/RoomTitle';
import GameModeInput from './components/GameModeInput';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import showErrorMessage from '../../common/utils/showErrorMessage';
import StandardModal from '../../common/components/StandardModal';
import CustomButton from '../../common/components/CustomButton';
import { toggleModal } from '../../store/uiSlice';
import { createRoom } from '../../store/roomSlice';

const formReducer = (state, action) => {
  if (action.type === 'INPUT_CHANGE') {
    const { gameMode } = action;
    const updatedValue = action.input;
    const updatedValidation = action.isValidValue;

    return {
      modeValue: gameMode,
      inputValue: updatedValue,
      isValid: updatedValidation,
    };
  }

  return state;
};

const RoomMakerScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.ui.isModalVisible);

  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('survival');
  const [items, setItems] = useState([
    { label: 'Survival', value: 'survival' },
    { label: '1 : 1', value: 'oneOnOne' },
  ]);

  const handlePressButton = () => {
    if (!isModalVisible) {
      setMode('survival');
    }

    dispatch(toggleModal());
  };

  const [formState, dispatchForm] = useReducer(formReducer, {
    modeValue: {},
    inputValue: {},
    isValid: {},
  });

  const handleInputChange = useCallback(
    (modeValue, inputValue, isValid) => {
      dispatchForm({
        type: 'INPUT_CHANGE',
        gameMode: modeValue,
        input: inputValue,
        isValidValue: isValid,
      });
    },
    [dispatchForm],
  );

  const verifyInputValue = () => {
    const { modeValue, inputValue, isValid } = formState;

    if (title.trim().length > 20 || title.trim().length === 0) {
      showErrorMessage('방 제목은 20글자 아래로 입력해주세요');
      return;
    }

    if (!isValid) {
      showErrorMessage('잘못된 입력값이 존재합니다');
      return;
    }

    handleCreateRoomButton(Number(inputValue), modeValue);
  };

  const user = useSelector((state) => state.user);

  const handleCreateRoomButton = async (inputValue, modeValue) => {
    setTitle('');
    const speed = modeValue === 'survival' ? inputValue : null;
    const time = modeValue === 'survival' ? null : inputValue;

    const roomInfo = {
      mode: modeValue,
      title: title.trim(),
      speed,
      time,
    };

    dispatch(createRoom({ room: roomInfo, user }));

    if (mode === 'oneOnOne') {
      navigation.navigate('OneOnOne');
    }

    if (mode === 'survival') {
      navigation.navigate('Survival');
    }

    dispatch(toggleModal());
  };

  return (
    <View>
      <CustomButton
        message="방 만들기"
        onPress={handlePressButton}
        disabled={false}
      />
      {isModalVisible && (
        <StandardModal>
          <View style={styles.screen}>
            <Text style={styles.title}>모드선택</Text>
            <DropDownPicker
              open={open}
              value={mode}
              items={items}
              setOpen={setOpen}
              setValue={setMode}
              setItems={setItems}
              style={styles.selectedBox}
              containerStyle={{ width: 120 }}
            />
            <RoomTitle value={title} onInputChange={setTitle} />
            <GameModeInput onInputChange={handleInputChange} mode={mode} />
            <CustomButton
              style={styles.createButton}
              message="생성"
              disabled={false}
              onPress={verifyInputValue}
            />
          </View>
        </StandardModal>
      )}
    </View>
  );
};

export default RoomMakerScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: FONT.X_SMALL,
    color: COLORS.WHITE,
  },
  createButton: {
    width: 200,
  },
  selectedBox: {
    width: 120,
  },
});

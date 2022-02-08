import React, { useState, useReducer, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { BASE_URL } from '@env';
import RoomTitle from './components/RoomTitle';
import GameLevel from './components/GameLevel';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import showErrorMessage from '../../common/utils/showErrorMessage';
import StandardModal from '../../common/components/StandardModal';
import ActiveButton from '../../common/components/ActiveButton';
import HttpClient from '../../service/http';
import RoomService from '../../service/room';
import { toggleModal } from '../../store/uiSlice';

const httpClient = new HttpClient(BASE_URL);
const roomService = new RoomService(httpClient);

const roomReducer = (state, action) => {
  if (action.type === 'GAME_CHOICE') {
    const switchMode = action.gameMode;
    const updatedValue = action.input;
    const updatedValidation = action.isValidValue;

    return {
      modeValue: switchMode,
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

  const handlePressedButton = () => {
    if (!isModalVisible) {
      setMode('survival');
    }

    dispatch(toggleModal());
  };

  const [formState, dispatchForm] = useReducer(roomReducer, {
    modeValue: {},
    inputValue: {},
    isValid: {},
  });

  const handleInputChange = useCallback(
    (modeValue, inputValue, isValid) => {
      dispatchForm({
        type: 'GAME_CHOICE',
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

    handleCreateRoom(inputValue, modeValue);
  };

  const handleCreateRoom = (inputValue, modeValue) => {
    setTitle('');
    const speed = modeValue === 'survival' ? inputValue : null;
    const time = modeValue === 'survival' ? null : inputValue;

    const roomInform = {
      mode: modeValue,
      title: title.trim(),
      speed,
      time,
    };

    roomService
      .createRoom(roomInform)
      .then(({ id }) => {
        if (mode === 'oneOnOne') {
          navigation.navigate('OneOnOne', {
            roomdId: id,
          });
        }

        if (mode === 'survival') {
          navigation.navigate('Survival', {
            roomId: id,
          });
        }
        dispatch(toggleModal());
      })
      .catch((error) => showErrorMessage(error.message));
  };

  return (
    <View>
      <ActiveButton
        message="방 만들기"
        onPress={handlePressedButton}
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
            <RoomTitle value={title} onChangeText={setTitle} />
            <GameLevel onInputChange={handleInputChange} mode={mode} />
            <ActiveButton
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

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';

import Socket from '../../network/socket';
import HttpClient from '../../network/http';
import RoomService from '../../service/room';
import {
  onLeave,
  markNotReady,
  markReady,
  onJoinRoom,
} from '../../store/playerSlice';
import GameService from '../../service/game';
import { startGame, switchRole } from '../../store/gameSlice';

export const socket = new Socket(BASE_URL);
const httpClient = new HttpClient(BASE_URL);
const roomService = new RoomService(httpClient, socket);
const gameService = new GameService(httpClient, socket);

const useSocket = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const room = useSelector((state) => state.room.current);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (Object.keys(room).length) {
      emitJoin(room, user);
    }

    const offJoin = roomService.on('join', (player) => {
      dispatch(onJoinRoom(player));
    });
    const offReady = roomService.on('ready', (player) => {
      dispatch(markReady(player));
    });
    const offNotReady = roomService.on('notReady', (player) => {
      dispatch(markNotReady(player));
    });
    const offLeave = roomService.on('leave', (player) => {
      dispatch(onLeave(player));
    });
    const offChooseZombie = roomService.on('zombie', () => {
      dispatch(switchRole('human'));
    });
    const offChooseHuman = roomService.on('human', () => {
      dispatch(switchRole('zombie'));
    });

    const offStart = gameService.on('start', (id) => {
      dispatch(
        startGame({ id, mode: room.mode, speed: room.speed, time: room.time }),
      );
      navigation.navigate('Running');
    });

    return () => {
      offJoin();
      offReady();
      offNotReady();
      offLeave();
      offStart();
      offChooseZombie();
      offChooseHuman();
    };
  }, [room]);
};

export const emitJoin = (room, user) => {
  const mappedUser = { ...user, isReady: false };
  roomService.emit('join', room, mappedUser);
};

export const emitLeave = async (room, players) => {
  if (players.length === 1) {
    await roomService.deleteRoom(room.id);
  }

  roomService.emit('leave');
};

export const emitReady = () => {
  roomService.emit('ready');
};

export const emitNotReady = () => {
  roomService.emit('notReady');
};

export const emitGameStart = (gameId) => {
  gameService.emit('start', gameId);
};

export const emitUserSpeed = (speed) => {
  gameService.emit('userSpeed', speed);
};

export const emitFinishGame = () => {
  gameService.emit('finish');
};

export const emitZombie = () => {
  roomService.emit('zombie');
};

export const emitHuman = () => {
  roomService.emit('human');
};

export default useSocket;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '@env';

import Socket from '../../network/socket';
import HttpClient from '../../network/http';
import RoomService from '../../service/room';
import {
  onLeave,
  markNotReady,
  markReady,
  onJoinRoom,
} from '../../store/roomSlice';

const socket = new Socket(BASE_URL);
const httpClient = new HttpClient(BASE_URL);
const roomService = new RoomService(httpClient, socket);

const usePlayers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const offJoin = roomService.on('join', (user) => {
      dispatch(onJoinRoom(user));
    });
    const offReady = roomService.on('ready', (user) => {
      dispatch(markReady(user));
    });
    const offNotReady = roomService.on('notReady', (user) => {
      dispatch(markNotReady(user));
    });

    const offLetPlayerOut = roomService.on('leave', (user) => {
      dispatch(onLeave(user));
    });

    return () => {
      offJoin();
      offReady();
      offNotReady();
      offLetPlayerOut();
    };
  }, []);

  const allPlayerIds = useSelector((state) => state.room.allPlayerIds);
  const playersById = useSelector((state) => state.room.playersById);
  const players = allPlayerIds.map((id) => playersById[id]);

  return players;
};

export const emitJoin = (room, user) => {
  user.isReady = false;
  roomService.emit('join', room, user);
};

export const emitLeave = () => {
  roomService.emit('leave');
};

export const emitReady = () => {
  roomService.emit('ready');
};
export const emitNotReady = () => {
  roomService.emit('notReady');
};

export default usePlayers;

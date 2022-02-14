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
} from '../../store/playerSlice';

const socket = new Socket(BASE_URL);
const httpClient = new HttpClient(BASE_URL);
const roomService = new RoomService(httpClient, socket);

const usePlayers = () => {
  const dispatch = useDispatch();

  const room = useSelector((state) => state.room.current);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (room) {
      console.log(room);
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
    const offLetPlayerOut = roomService.on('leave', (player) => {
      dispatch(onLeave(player));
    });

    return () => {
      offJoin();
      offReady();
      offNotReady();
      offLetPlayerOut();
    };
  }, [room]);

  const allPlayerIds = useSelector((state) => state.player.allIds);
  const playersById = useSelector((state) => state.player.byId);
  const players = allPlayerIds.map((id) => playersById[id]);

  return players;
};

export const emitJoin = (room, user) => {
  user.isReady = false;
  roomService.emit('join', room, user);
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

export default usePlayers;

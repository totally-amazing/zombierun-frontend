import { BASE_URL } from '@env';
import { useEffect } from 'react';

import HttpClient from '../../network/http';
import RoomService from '../../service/room';

const httpClient = new HttpClient(BASE_URL);
const roomService = new RoomService(httpClient);

const useRoomList = (onSuccess, onFailure) => {
  useEffect(() => {
    roomService.getRooms().then(onSuccess).catch(onFailure);
  }, [roomService]);
};

export default useRoomList;

import { ERROR } from '../common/constants/MESSAGE';
import getAuthorizationHeader from '../common/utils/getAuthorizationHeader';

class RoomService {
  constructor(httpClient, socket) {
    this.httpClient = httpClient;
    this.socket = socket;
  }

  getRooms = async () => {
    const result = await this.httpClient.fetch({
      url: '/room',
      method: 'get',
      headers: getAuthorizationHeader(),
    });

    if (!result) {
      throw new Error(ERROR.NO_ROOM_LIST);
    }

    return result;
  };

  createRoom = async (room) => {
    const result = await this.httpClient.fetch({
      url: '/room',
      method: 'post',
      data: room,
      headers: getAuthorizationHeader(),
    });

    if (!result) {
      throw new Error(ERROR.NO_ROOM_ID);
    }

    return result;
  };

  deleteRoom = async (roomId) => {
    await this.httpClient.fetch({
      url: `/room/${roomId}`,
      method: 'delete',
      headers: getAuthorizationHeader(),
    });
  };

  on = (event, callback) => {
    return this.socket.on(`room/${event}`, callback);
  };

  emit = (event, ...args) => {
    this.socket.emit(`room/${event}`, args);
  };
}

export default RoomService;

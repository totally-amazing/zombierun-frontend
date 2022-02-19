import { ERROR } from '../common/constants/MESSAGE';
import getAuthorizationHeader from '../common/utils/getAuthorizationHeader';

class RoomService {
  constructor(httpClient, socket) {
    this.httpClient = httpClient;
    this.socket = socket;
  }

  getRooms = async () => {
    const authHeader = await getAuthorizationHeader();

    const result = await this.httpClient.fetch({
      url: '/room',
      method: 'get',
      headers: authHeader,
    });

    if (!result) {
      throw new Error(ERROR.NO_ROOM_LIST);
    }

    return result;
  };

  createRoom = async (room) => {
    const authHeader = await getAuthorizationHeader();

    const result = await this.httpClient.fetch({
      url: '/room',
      method: 'post',
      data: room,
      headers: authHeader,
    });

    if (!result) {
      throw new Error(ERROR.NO_ROOM_ID);
    }

    return result;
  };

  deleteRoom = async (roomId) => {
    const authHeader = await getAuthorizationHeader();

    await this.httpClient.fetch({
      url: `/room/${roomId}`,
      method: 'delete',
      headers: authHeader,
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

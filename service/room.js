import { ERROR_MESSAGE } from '../common/constants/MESSAGE';

class RoomService {
  constructor(httpClient, socket) {
    this.httpClient = httpClient;
    this.socket = socket;
  }

  getRooms = async () => {
    const result = await this.httpClient.fetch({
      url: '/room',
      method: 'get',
    });

    if (!result) {
      throw new Error(ERROR_MESSAGE.NO_ROOM_LIST);
    }

    return result;
  };

  createRoom = async (room) => {
    const result = await this.httpClient.fetch({
      url: '/room',
      method: 'post',
      data: room,
    });

    if (!result) {
      throw new Error(ERROR_MESSAGE.NO_ROOM_ID);
    }

    return result;
  };

  deleteRoom = async (roomId) => {
    await this.httpClient.fetch({
      url: `/room/${roomId}`,
      method: 'delete',
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

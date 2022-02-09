class RoomService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getRooms = async () => {
    const result = await this.httpClient.fetch({
      url: '/room',
      method: 'get',
    });

    return result;
  };

  createRoom = async (room) => {
    const result = await this.httpClient.fetch({
      url: '/room',
      method: 'post',
      data: room,
    });

    if (!result) {
      throw new Error('room id가 없습니다');
    }

    return result;
  };
}

export default RoomService;

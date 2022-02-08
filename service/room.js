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

  createRoom = async () => {
    const result = await this.httpClient.fetch({
      url: '/room',
      method: 'post',
    });

    if (!result) {
      throw new Error('roomId가 존재하지 않습니다');
    }

    return result;
  };
}

export default RoomService;

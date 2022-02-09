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
      throw new Error('에러가 발생했습니다 다시 시도해주세요');
    }

    return result;
  };
}

export default RoomService;

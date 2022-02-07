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
}

export default RoomService;

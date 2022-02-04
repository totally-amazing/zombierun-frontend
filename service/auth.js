class AuthService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async signIn() {
    const result = await this.httpClient.fetch({
      url: '/auth/signin',
      method: 'post',
    });

    return result;
  }
}

export default AuthService;

class AuthService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  signIn = async (idToken) => {
    const result = await this.httpClient.fetch({
      url: '/auth/signin',
      method: 'post',
      data: { idToken },
    });

    return result;
  };
}

export default AuthService;

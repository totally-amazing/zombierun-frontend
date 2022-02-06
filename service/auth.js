import showErrorMessage from '../common/components/ErrorMessage';

class AuthService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  signIn = async () => {
    const result = await this.httpClient.fetch({
      url: '/auth/signin',
      method: 'post',
    });

    return result;
  };
}

export default AuthService;

import axios from 'axios';

class HttpClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
    });
  }

  fetch = async (req) => {
    const res = await this.client(req);

    return res?.data;
  };
}

export default HttpClient;

import axios from 'axios';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;

    this.client = axios.create({
      baseURL: this.baseUrl,
    });
  }

  fetch = async (req) => {
    const res = await this.client(req);

    return res.data;
  };
}

export default HttpClient;

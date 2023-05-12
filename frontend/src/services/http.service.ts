import axios, { AxiosRequestHeaders } from "axios";
import { APP_KEYS } from "../consts";

export class HttpService {
  constructor(
    public baseUrl = process.env.REACT_APP_BASE_URL,
    public apiKey = APP_KEYS.BACKEND_KEYS.IMAGES,
    public fetchingService = axios
  ) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.fetchingService = fetchingService;
  }

  private getFullApiUrl(url: string): string {
    return `${this.baseUrl}/${this.apiKey}/${url}`;
  }

  private extractUrlAndDataFromConfig({
    data,
    url,
    ...pureConfig
  }: {
    data?: File | { file: File; id: string };
    url: string;
    headers?: AxiosRequestHeaders;
  }) {
    return pureConfig;
  }

  async get(config: { url: string }) {
    const response = await this.fetchingService.get(
      this.getFullApiUrl(config.url)
    );
    return response;
  }

  async post(config: {
    data: File;
    url: string;
    headers?: AxiosRequestHeaders;
  }) {
    let formData = new FormData();
    formData.append("file", config.data);
    config.headers = {
      "Content-Type": "multipart/form-data",
    } as AxiosRequestHeaders;
    const response = await this.fetchingService.post(
      this.getFullApiUrl(config.url),
      formData,
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }

  async patch(config: {
    data: File;
    url: string;
    headers?: AxiosRequestHeaders;
  }) {
    let formData = new FormData();
    formData.append("file", config.data);
    config.headers = {
      "Content-Type": "multipart/form-data",
    } as AxiosRequestHeaders;
    const response = await this.fetchingService.patch(
      this.getFullApiUrl(config.url),
      formData,
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }

  async delete(config: { url: string }) {
    const response = await this.fetchingService.delete(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }
}

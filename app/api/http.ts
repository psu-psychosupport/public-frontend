import { ErrorResponseCodes } from "~/api/types/enums";
import axios, { AxiosInstance } from "axios";
import { getErrorMessage } from "~/api/responses/message";
import { ICategory, IPost } from "~/api/types/content";
import { IUser } from "~/api/types/users";
import { IUserForm } from "~/api/types/payloads";

export const API_URL = "http://localhost:8000" //"https://stoboi.damego.ru/api";

export interface IApiError {
  code: ErrorResponseCodes;
  message: string;
}

export interface IApiResponse<T> {
  error?: IApiError;
  data?: T;
}

export default class HttpClient {
  private client: AxiosInstance;
  private accessToken: string | null;
  private refreshToken: string | null;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      withCredentials: true,
      validateStatus: (status) => status < 500,
    });
    this.accessToken = null;
    this.refreshToken = null;
  }

  async request<T>(
    method: string,
    endpoint: string,
    {
      data,
      file,
      asFormData,
    }: { data?: object; file?: File; asFormData?: boolean } = {},
  ): Promise<IApiResponse<T>> {
    let payload = undefined;

    if (file) {
      payload = new FormData();
      payload.append("file", file);
      if (data) {
        payload.append("json_payload", JSON.stringify(data));
      }
    } else if (asFormData) {
      payload = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        payload.append(key, value);
      });
    } else {
      payload = data;
    }
    console.log(`[HTTP] [${method}] '${endpoint}' data: ${payload}`);
    let cookies = "";
    if (this.accessToken) cookies += `access_token=${this.accessToken}; `;
    if (this.refreshToken) cookies += `refresh_token=${this.refreshToken}; `;

    const response = await this.client.request({
      method,
      url: endpoint,
      data: payload,
      headers: {
        "Content-Type":
          payload instanceof FormData
            ? "multipart/form-data"
            : "application/json",
        Cookie: cookies,
      },
    });

    if (response.status >= 400) {
      console.log(response.status, response.data);
      if (response.data.detail.code === ErrorResponseCodes.TOKEN_EXPIRED) {
        await this.refreshAccessToken();
        await this.request(method, endpoint, { data, file, asFormData });
      }
      const error = {
        code: response.data.detail.code,
        message: getErrorMessage(response.data.detail.code),
      };

      console.error(
        `HTTP Error with code ${error.code}. Message: ${error.message}`,
      );
      return { error };
    }
    return {
      data: response.data,
    };
  }

  setTokens({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  async refreshAccessToken() {
    this.accessToken = null;
    const res = await this.request<{
      access_token: string;
    }>("POST", "/refresh");
    if (res.data) {
      this.accessToken = res.data.access_token;
    }
    return res;
  }

  async signIn(email: string, password: string) {
    const form = new FormData();
    form.append("email", email);
    form.append("password", password);

    const res = await this.request<{
      access_token: string;
      refresh_token: string;
    }>("POST", "/signin", { data: form });

    if (res.data) {
      this.accessToken = res.data.access_token;
      this.refreshToken = res.data.refresh_token;
    }

    return res;
  }

  getMe() {
    return this.request<IUser>("GET", "/users/me");
  }
  updateUser(userId: number, user: IUserForm) {
    return this.request<IUser>("PATCH", `/users/${userId}`, { data: user });
  }

  getCategories() {
    return this.request<ICategory[]>("GET", "/categories");
  }

  getCategory(categoryId: number) {
    return this.request<ICategory>("GET", `/categories/${categoryId}`);
  }

  getPostById(postId: number) {
    return this.request<IPost>("GET", `/posts/${postId}?fetch_all=true`);
  }

  getPopularPosts() {
    return this.request<IPost[]>("GET", `/popular`);
  }
}

export const httpClient = new HttpClient();
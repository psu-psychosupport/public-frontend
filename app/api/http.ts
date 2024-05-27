import { ErrorResponseCodes, UserContentTypes } from "~/api/types/enums";
import axios, { AxiosInstance } from "axios";
import { getErrorMessage } from "~/api/responses/message";
import { ICategory, IPost, IUserContent } from "~/api/types/content";
import { IUser } from "~/api/types/users";
import {
  ICreateUserContent,
  IUserContentUpdate,
  IUserForm,
} from "~/api/types/payloads";

export const API_URL = "http://127.0.0.1:8000"; //"https://stoboi.damego.ru/api";

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
      params,
      asFormData,
      sendCredentials = true,
    }: {
      data?: object;
      file?: File;
      asFormData?: boolean;
      params?: object;
      sendCredentials?: boolean;
    } = {},
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
    let cookies = undefined;
    if (sendCredentials) {
      cookies = "";
      if (this.accessToken) cookies += `access_token=${this.accessToken}; `;
      if (this.refreshToken) cookies += `refresh_token=${this.refreshToken}; `;
    }

    const response = await this.client.request({
      method,
      url: endpoint,
      data: payload,
      params,
      headers: {
        "Content-Type":
          payload instanceof FormData
            ? "multipart/form-data"
            : "application/json",
        Cookie: cookies,
      },
    });

    console.log(
      `[HTTP] [${response.status}] [${method}] '${endpoint}' data: ${JSON.stringify(response.data)}`,
    );

    if (response.status >= 400) {
      if (response.data.detail.code === ErrorResponseCodes.TOKEN_EXPIRED && sendCredentials) {
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

  getTokens() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
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

  signUp(username: string, email: string, password: string) {
    const formData = new FormData();
    formData.append("name", username);
    formData.append("email", email);
    formData.append("password", password);

    return this.request<null>("POST", "/signup", { data: formData });
  }

  getMe() {
    return this.request<IUser>("GET", "/users/me");
  }

  changeUserName(name: string) {
    return this.request<null>("PATCH", "/users/me/name", { params: { name } });
  }

  requestChangeUserEmail(email: string) {
    return this.request<null>("POST", `/request-email-change`, {
      data: { email },
      sendCredentials: !email,
    });
  }

  requestChangeUserPassword(email?: string) {
    return this.request<null>("POST", `/request-password-change`, {
      data: email ? { email } : undefined,
    });
  }

  changeUserEmail(token: string) {
    return this.request<null>("POST", `/change-email`, { data: { token } });
  }

  changePassword(token: string, password: string) {
    return this.request<null>("POST", `/change-password`, {
      data: { password, token },
    });
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

  getUserContentList({
    type,
    postId,
  }: {
    type?: UserContentTypes;
    postId?: number;
  }) {
    return this.request<IUserContent[]>("GET", "/me/content", {
      params: { type, post_id: postId },
    });
  }

  addUserContent(content: ICreateUserContent) {
    return this.request<null>("POST", "/me/content", { data: content });
  }

  updateUserContent(contentId: number, contentUpdate: IUserContentUpdate) {
    return this.request<null>("PATCH", `/me/content/${contentId}`, {
      data: contentUpdate,
    });
  }

  deleteUserContent(contentId: number) {
    return this.request<null>("DELETE", `/me/content/${contentId}`);
  }

  searchPosts(query: string, postId?: number) {
    return this.request<IPost>("GET", "/search", { params: { query, post_id: postId } });
  }
}

export const httpClient = new HttpClient();

import { AxiosHttpClient } from './axios/axios.http.client';
import { IHttpClient } from './contract/http.client';
import { MockHttpClient } from "./mock/mock.http.client";

const httpClient: IHttpClient
    = process.env.NODE_ENV !== 'development' ?
        new MockHttpClient() :
        new AxiosHttpClient();

export default httpClient;
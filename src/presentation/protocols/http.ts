export interface IHttpRequest {
  body?: any;
  params?: any;
  headers?: any;
}

export interface IHttpResponse {
  statusCode: number;
  body: any;
}

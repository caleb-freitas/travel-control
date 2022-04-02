export interface IHttpRequest {
  body?: any;
  params?: any;
}

export interface IHttpResponse {
  statusCode: number;
  body: any;
}

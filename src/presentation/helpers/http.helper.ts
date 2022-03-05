import { ServerError } from "../errors/server.error";
import { IHttpResponse } from "../protocols/http";

export function badRequest(error: Error): IHttpResponse {
  return {
    statusCode: 400,
    body: error,
  };
}

export function serverError(error: any): IHttpResponse {
  return {
    statusCode: 500,
    body: new ServerError(error.stack),
  };
}

import { UnauthorizedError } from "../errors";
import { ServerError } from "../errors/server.error";
import { IHttpResponse } from "../protocols/http";

export function ok(data?: any): IHttpResponse {
  return {
    statusCode: 200,
    body: data,
  };
}

export function badRequest(error: Error): IHttpResponse {
  return {
    statusCode: 400,
    body: error,
  };
}

export function unauthorized(): IHttpResponse {
  return {
    statusCode: 401,
    body: new UnauthorizedError(),
  };
}

export function forbidden(error: Error): IHttpResponse {
  return {
    statusCode: 403,
    body: error,
  };
}

export function notFound(error: Error): IHttpResponse {
  return {
    statusCode: 404,
    body: error,
  };
}

export function serverError(error: any): IHttpResponse {
  return {
    statusCode: 500,
    body: new ServerError(error.stack),
  };
}

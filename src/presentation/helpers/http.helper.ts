import { IAccountModel } from "../../data/usecases";
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

export function ok(data: any): IHttpResponse {
  return {
    statusCode: 200,
    body: data,
  };
}

export function forbidden(error: Error): IHttpResponse {
  return {
    statusCode: 403,
    body: error,
  };
}
